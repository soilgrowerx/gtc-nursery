// Google Apps Script server-side code for Tree Inventory Platform

// Tree data - extracted from the Next.js project
const TREE_DATA = [
  {
    "id": "43",
    "commonName": "Cypress, Bald",
    "botanicalName": "Taxodium distichum",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Taxodium%20distichum",
    "category": "Large Trees",
    "description": "Cypress, Bald (Taxodium distichum) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "CYP-BAL-043",
    "size": "1 Gallon",
    "price": 160,
    "quantityInStock": 6,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Cypress%2C%20Bald"
  },
  {
    "id": "44",
    "commonName": "Elm, American",
    "botanicalName": "Ulmus americana",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Ulmus%20americana",
    "category": "Large Trees",
    "description": "Elm, American (Ulmus americana) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "ELM-AME-044",
    "size": "1 Gallon",
    "price": 160,
    "quantityInStock": 0,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Elm%2C%20American"
  },
  {
    "id": "1",
    "commonName": "Anacua",
    "botanicalName": "Ehretia anacua",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Ehretia%20anacua",
    "category": "Small Trees",
    "description": "Anacua (Ehretia anacua) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "ANA-001",
    "size": "1 Gallon - 1G/16-20\"",
    "price": 14,
    "quantityInStock": 4,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Anacua"
  },
  {
    "id": "2",
    "commonName": "Ash, Wafer (Common Hoptree)",
    "botanicalName": "Ptelea trifoliata",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Ptelea%20trifoliata",
    "category": "Small Trees",
    "description": "Ash, Wafer (Common Hoptree) (Ptelea trifoliata) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "ASH-WAF-COM-HOP-002",
    "size": "1 Gallon - 1G/6-10\"",
    "price": 16,
    "quantityInStock": 4,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Ash%2C%20Wafer%20(Common%20Hoptree)"
  },
  {
    "id": "16",
    "commonName": "Elm, Cedar",
    "botanicalName": "Ulmus crassifolia",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Ulmus%20crassifolia",
    "category": "Small Trees",
    "description": "Elm, Cedar (Ulmus crassifolia) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "ELM-CED-016",
    "size": "1 Gallon - 1G/12-24\"",
    "price": 14,
    "quantityInStock": 40,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Elm%2C%20Cedar"
  },
  {
    "id": "30",
    "commonName": "Oak, Shumard Red",
    "botanicalName": "Quercus shumardii",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Quercus%20shumardii",
    "category": "Small Trees",
    "description": "Oak, Shumard Red (Quercus shumardii) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "OAK-SHU-RED-030",
    "size": "1 Gallon",
    "price": 12,
    "quantityInStock": 20,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Oak%2C%20Shumard%20Red"
  }
];

/**
 * Main function to serve the HTML web app
 * Required for Google Apps Script web apps
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Greentree Co. - Tree Inventory')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Server-side function to get all inventory data
 * Called from client-side JavaScript
 */
function getInventory() {
  try {
    return {
      success: true,
      data: TREE_DATA,
      totalCount: TREE_DATA.length,
      categories: [...new Set(TREE_DATA.map(tree => tree.category))],
      priceRange: {
        min: Math.min(...TREE_DATA.map(t => t.price)),
        max: Math.max(...TREE_DATA.map(t => t.price))
      }
    };
  } catch (error) {
    console.error('Error getting inventory:', error);
    return {
      success: false,
      error: error.toString(),
      data: []
    };
  }
}

/**
 * Server-side function to get a specific tree by ID
 * Called from client-side JavaScript
 */
function getTreeById(treeId) {
  try {
    const tree = TREE_DATA.find(t => t.id === treeId);
    if (!tree) {
      return {
        success: false,
        error: 'Tree not found',
        data: null
      };
    }
    
    return {
      success: true,
      data: tree
    };
  } catch (error) {
    console.error('Error getting tree by ID:', error);
    return {
      success: false,
      error: error.toString(),
      data: null
    };
  }
}

/**
 * Server-side function to filter trees
 * Called from client-side JavaScript
 */
function searchTrees(searchTerm, category, minPrice, maxPrice, availabilityFilter) {
  try {
    let filtered = TREE_DATA.filter(tree => {
      // Search term filter
      const matchesSearch = !searchTerm || 
        tree.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tree.botanicalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tree.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tree.sku.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = !category || tree.category === category;
      
      // Price range filter
      const matchesPrice = tree.price >= (minPrice || 0) && tree.price <= (maxPrice || 9999);
      
      // Availability filter
      const matchesAvailability = !availabilityFilter || availabilityFilter === 'all' || (() => {
        switch (availabilityFilter) {
          case 'inStock': return tree.quantityInStock > 5;
          case 'lowStock': return tree.quantityInStock > 0 && tree.quantityInStock <= 5;
          case 'outOfStock': return tree.quantityInStock === 0;
          default: return true;
        }
      })();
      
      return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
    });
    
    return {
      success: true,
      data: filtered,
      totalCount: filtered.length
    };
  } catch (error) {
    console.error('Error searching trees:', error);
    return {
      success: false,
      error: error.toString(),
      data: []
    };
  }
}

/**
 * Utility function to include HTML files
 * Required for Google Apps Script templating
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Server-side function to log user actions
 * Called from client-side JavaScript for analytics
 */
function logAction(action, data) {
  try {
    console.log('User Action:', action, JSON.stringify(data));
    return { success: true };
  } catch (error) {
    console.error('Error logging action:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Server-side function to get app metadata
 * Called from client-side JavaScript
 */
function getAppMetadata() {
  return {
    appName: 'Greentree Co. Tree Inventory',
    version: '1.0.0',
    totalTrees: TREE_DATA.length,
    lastUpdated: new Date().toISOString(),
    categories: [...new Set(TREE_DATA.map(tree => tree.category))].sort()
  };
}