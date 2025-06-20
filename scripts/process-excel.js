const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

function parseTreeFromRow(row, treeSize, idCounter) {
  // Skip header rows and empty rows
  if (!row.__EMPTY || 
      row.__EMPTY === 'SMALL TREES' || 
      row.__EMPTY === 'LARGE TREES' ||
      row.__EMPTY === 'COMMON NAME' ||
      row.__EMPTY === 'Commonly referred to as') {
    return null;
  }

  const commonName = (row.__EMPTY && typeof row.__EMPTY === 'string') ? row.__EMPTY.trim() : String(row.__EMPTY || '').trim();
  const botanicalName = (row.__EMPTY_1 && typeof row.__EMPTY_1 === 'string') ? row.__EMPTY_1.trim() : String(row.__EMPTY_1 || '').trim();
  
  if (!commonName || !botanicalName) {
    return null;
  }

  // Parse pricing and quantity information
  let price = 0;
  let quantityInStock = 0;
  let size = '';
  let notes = (row.__EMPTY_13 && typeof row.__EMPTY_13 === 'string') ? row.__EMPTY_13.trim() : String(row.__EMPTY_13 || '').trim();

  // For 1 Gallon (columns 7 and 9)
  if (row.__EMPTY_7 && row.__EMPTY_9) {
    price = parseFloat(row.__EMPTY_7) || 0;
    quantityInStock = parseInt(row.__EMPTY_9) || 0;
    size = '1 Gallon';
  }
  // For 3/5 Gallon (columns 10 and 12)
  else if (row.__EMPTY_10 && row.__EMPTY_12) {
    price = parseFloat(row.__EMPTY_10) || 0;
    quantityInStock = parseInt(row.__EMPTY_12) || 0;
    size = '3-5 Gallon';
  }
  // If we have price but no clear size, use the tree size parameter
  else if (row.__EMPTY_7 || row.__EMPTY_10) {
    price = parseFloat(row.__EMPTY_7 || row.__EMPTY_10) || 0;
    quantityInStock = parseInt(row.__EMPTY_9 || row.__EMPTY_12) || 0;
    size = treeSize;
  }

  // Extract size info from notes if available
  if (notes) {
    const sizeMatch = notes.match(/(\d+G?\/[\d-"']+)/);
    if (sizeMatch) {
      size = size + ' - ' + sizeMatch[1];
    }
  }

  // Determine category
  let category = 'Trees';
  if (treeSize === 'Small') {
    category = 'Small Trees';
  } else if (treeSize === 'Large') {
    category = 'Large Trees';
  }

  // Generate SKU from common name
  const sku = commonName
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(' ')
    .map(word => word.substring(0, 3).toUpperCase())
    .join('-') + '-' + String(idCounter).padStart(3, '0');

  return {
    id: String(idCounter),
    commonName,
    botanicalName,
    iNaturalistUrl: `https://www.inaturalist.org/search?q=${encodeURIComponent(botanicalName)}`,
    category,
    description: `${commonName} (${botanicalName}) - A native tree perfect for landscaping projects.`,
    plantingCareInfo: 'Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.',
    companionPlants: [], // Could be populated later
    complementaryTrees: [], // Could be populated later
    sku,
    size: size || 'Unknown',
    price,
    quantityInStock,
    image: `https://placehold.co/300x200/228B22/FFFFFF?text=${encodeURIComponent(commonName)}`
  };
}

async function processExcelFile() {
  try {
    console.log('Starting Excel file processing...');
    
    // Read the Excel file
    const excelFilePath = path.join(__dirname, '../GTC Availability 3-29-24.xlsx');
    const workbook = XLSX.readFile(excelFilePath);
    
    console.log('Excel file loaded successfully');
    console.log('Worksheets:', workbook.SheetNames);
    
    const allTrees = [];
    let idCounter = 1;
    
    // Process each worksheet
    for (const sheetName of workbook.SheetNames) {
      console.log(`\nProcessing worksheet: ${sheetName}`);
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      console.log(`Rows in ${sheetName}:`, jsonData.length);
      
      // Save raw data for each sheet
      fs.writeFileSync(
        path.join(__dirname, `../data/raw-${sheetName.toLowerCase().replace(/\s+/g, '-')}-data.json`),
        JSON.stringify(jsonData, null, 2)
      );
      
      // Parse trees from this sheet
      for (const row of jsonData) {
        const tree = parseTreeFromRow(row, sheetName.includes('Small') ? 'Small' : 'Large', idCounter);
        if (tree) {
          allTrees.push(tree);
          idCounter++;
        }
      }
      
      console.log(`Valid trees extracted from ${sheetName}:`, allTrees.filter(t => t.category.includes(sheetName.includes('Small') ? 'Small' : 'Large')).length);
    }
    
    console.log(`\nTotal trees processed: ${allTrees.length}`);
    
    // Sort trees by category and name
    allTrees.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.commonName.localeCompare(b.commonName);
    });
    
    // Save processed data
    fs.writeFileSync(
      path.join(__dirname, '../data/processed-trees.json'),
      JSON.stringify(allTrees, null, 2)
    );
    
    console.log(`Processed trees saved to data/processed-trees.json`);
    
    // Show summary
    const summary = allTrees.reduce((acc, tree) => {
      acc[tree.category] = (acc[tree.category] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\nTree summary by category:');
    Object.entries(summary).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} trees`);
    });
    
    console.log('\nPrice range:', 
      `$${Math.min(...allTrees.filter(t => t.price > 0).map(t => t.price))} - $${Math.max(...allTrees.map(t => t.price))}`
    );
    
    console.log('Total inventory items:', allTrees.reduce((sum, tree) => sum + tree.quantityInStock, 0));
    
    return {
      processedData: allTrees,
      summary
    };
    
  } catch (error) {
    console.error('Error processing Excel file:', error);
    throw error;
  }
}

// Run the script if called directly
if (require.main === module) {
  processExcelFile()
    .then(result => {
      console.log('\n✅ Excel processing completed successfully!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Excel processing failed:', error.message);
      process.exit(1);
    });
}

module.exports = { processExcelFile };