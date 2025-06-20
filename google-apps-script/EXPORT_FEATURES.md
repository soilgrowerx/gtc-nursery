# Export Features Documentation

## Overview
The Google Apps Script Tree Inventory Platform now includes comprehensive bulk export functionality for business operations.

## New Server-Side Functions (Code.gs)

### 1. `exportInventoryData(filteredTreeIds)`
- Exports tree inventory data in CSV format
- Accepts filtered tree IDs to export only current filtered results
- Returns comprehensive data including stock status, stock value, and metadata
- Includes 12 columns: SKU, Common Name, Botanical Name, Category, Size, Price, Quantity, Stock Status, Stock Value, Description, Care Info, iNaturalist URL

### 2. `exportClientRequests(statusFilter)`
- Exports client request data in CSV format
- Can filter by request status (pending, approved, quoted, fulfilled)
- Includes 13 columns: Request ID, Client Name, Email, Phone, Request Date, Status, Priority, Project Type, Total Value, Tree Count, Tree Details, Notes, Delivery Address
- Includes sample business data with realistic Austin-area clients

### 3. `getClientRequestSummary()`
- Returns summary statistics for client requests
- Provides status counts, total values, and recent requests

## Sample Client Request Data
- 5 realistic client requests including:
  - Austin Parks & Recreation (Municipal project)
  - Highland Homes (Residential development)
  - University of Texas (Campus beautification)
  - Four Points Landscape Co. (Commercial landscaping)
  - Individual homeowner (Residential yard)

## New Client-Side Functions (logic.html)

### Export Functions
- `exportFilteredInventory()` - Exports currently filtered inventory
- `exportClientRequests(statusFilter)` - Exports client requests
- `getCurrentlyFilteredTreeIds()` - Gets IDs of currently filtered trees
- `downloadCSV(data, filename)` - Handles CSV file creation and download
- `createCSVContent(data)` - Formats data into CSV with metadata
- `getExportStatistics()` - Provides export statistics for UI

### User Experience Functions
- `showExportSuccessMessage()` - Shows success notification
- `showExportErrorMessage()` - Shows error notification
- Export info updates in real-time showing how many trees will be exported

## UI Enhancements (index.html & stylesheet.html)

### New Export Controls
- Export buttons in the filter panel
- "📄 Export Inventory" button - exports current filtered results
- "📋 Export Requests" button - exports all client requests
- Real-time export info showing filtered vs total trees
- Professional styling matching the existing design

### Styling
- `.export-controls` - Styled export button container
- `.btn-small` - Smaller button variant for export buttons
- `.export-info` - Info text styling
- Success/error message styling with proper positioning

## File Naming Convention
- Inventory exports: `greentree-inventory-YYYY-MM-DD.csv`
- Client requests: `greentree-client-requests-YYYY-MM-DD.csv`
- Automatic date inclusion for easy file management

## CSV Features
- Proper quote escaping for text fields
- Metadata comments at end of file
- Professional headers
- Calculated fields (stock status, stock value)
- Business-ready formatting

## Filter Integration
- Export respects all current filters:
  - Search terms
  - Category filters
  - Price range filters
  - Availability filters
- Real-time UI updates showing export scope
- Export statistics available for business analysis

## Business Value
- Enables Excel/Sheets integration for business operations
- Supports inventory management workflows
- Facilitates client relationship management
- Provides data for business analytics
- Professional formatting suitable for business use

## Usage Instructions
1. Apply desired filters to inventory
2. Click "Export Inventory" to download filtered results
3. Click "Export Requests" to download client request data
4. Files automatically download with timestamped names
5. Open in Excel/Google Sheets for business analysis

This export functionality makes the Google Apps Script version production-ready for actual business operations.