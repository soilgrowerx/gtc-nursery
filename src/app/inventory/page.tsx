'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Search, Filter, SortAsc, SortDesc, ExternalLink, Download, ChevronDown, ChevronUp, FileText, Printer, ChevronLeft, ChevronRight, Heart, AlertTriangle, DollarSign, Package, X, CheckSquare, Square, ShoppingCart, RefreshCw, Users } from 'lucide-react';
import { Tree, TreeFilter } from '@/types/tree';
import { useWishlist } from '@/hooks/use-wishlist';
import treesData from '../../../data/trees.json';

const trees: Tree[] = treesData as Tree[];

const categories = Array.from(new Set(trees.map(tree => tree.category)));
const sizeCategories = Array.from(new Set(trees.map(tree => {
  if (tree.size.includes('1 Gallon')) return 'Small (1 Gallon)';
  if (tree.size.includes('3-5 Gallon') || tree.size.includes('5 Gallon')) return 'Medium (3-5 Gallon)';
  return 'Large';
})));

const priceRange = {
  min: Math.min(...trees.map(t => t.price)),
  max: Math.max(...trees.map(t => t.price))
};

export default function InventoryPage() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [filters, setFilters] = useState<TreeFilter>({
    searchTerm: '',
    category: '',
    sizeFilter: '',
    priceRange: { min: priceRange.min, max: priceRange.max },
    availabilityFilter: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuickFilter, setActiveQuickFilter] = useState<'lowStock' | 'highValue' | 'outOfStock' | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [reorderItems, setReorderItems] = useState<Set<string>>(new Set());
  const itemsPerPage = 12;

  // Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [filters]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const filteredAndSortedTrees = useMemo(() => {
    let filtered = trees.filter(tree => {
      // Enhanced search across multiple fields
      const matchesSearch = 
        tree.commonName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        tree.botanicalName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        tree.category.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        tree.sku.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesCategory = 
        !filters.category || tree.category === filters.category;
      
      // Size-based filtering
      const matchesSize = !filters.sizeFilter || (() => {
        const treeSize = tree.size.includes('1 Gallon') ? 'Small (1 Gallon)' : 
                        tree.size.includes('3-5 Gallon') || tree.size.includes('5 Gallon') ? 'Medium (3-5 Gallon)' : 'Large';
        return treeSize === filters.sizeFilter;
      })();
      
      // Price range filtering
      const matchesPrice = tree.price >= filters.priceRange.min && tree.price <= filters.priceRange.max;
      
      // Availability filtering
      const matchesAvailability = (() => {
        switch (filters.availabilityFilter) {
          case 'inStock': return tree.quantityInStock > 5;
          case 'lowStock': return tree.quantityInStock > 0 && tree.quantityInStock <= 5;
          case 'outOfStock': return tree.quantityInStock === 0;
          default: return true;
        }
      })();

      // Quick filter logic
      const matchesQuickFilter = (() => {
        switch (activeQuickFilter) {
          case 'lowStock': return tree.quantityInStock > 0 && tree.quantityInStock <= 5;
          case 'highValue': return tree.price > 50;
          case 'outOfStock': return tree.quantityInStock === 0;
          default: return true;
        }
      })();
      
      return matchesSearch && matchesCategory && matchesSize && matchesPrice && matchesAvailability && matchesQuickFilter;
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'name':
          comparison = a.commonName.localeCompare(b.commonName);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'availability':
          comparison = a.quantityInStock - b.quantityInStock;
          break;
        case 'size':
          // Sort by size category and then by specific size
          const aSize = a.size.includes('1 Gallon') ? 1 : a.size.includes('3-5 Gallon') ? 2 : 3;
          const bSize = b.size.includes('1 Gallon') ? 1 : b.size.includes('3-5 Gallon') ? 2 : 3;
          comparison = aSize - bSize;
          break;
      }
      
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [filters, activeQuickFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedTrees.length / itemsPerPage);
  const paginatedTrees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedTrees.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedTrees, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, searchTerm: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFilters(prev => ({ ...prev, category: value === 'all' ? '' : value }));
  };

  const handleSortChange = (field: 'name' | 'price' | 'availability' | 'size') => {
    setFilters(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const exportToCSV = () => {
    const csvData = filteredAndSortedTrees.map(tree => ({
      'Common Name': tree.commonName,
      'Botanical Name': tree.botanicalName,
      'Category': tree.category,
      'Size': tree.size,
      'Price': tree.price,
      'Quantity in Stock': tree.quantityInStock,
      'SKU': tree.sku,
      'Availability': tree.quantityInStock > 0 ? 'In Stock' : 'Out of Stock'
    }));
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => 
        typeof value === 'string' && value.includes(',') ? `"${value}"` : value
      ).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tree_inventory_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const openPrintView = () => {
    const printContent = `
      <html>
        <head>
          <title>Tree Inventory - ${new Date().toLocaleDateString()}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .header { margin-bottom: 20px; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Greentree Co. - Tree Inventory</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <p>Total Trees: ${filteredAndSortedTrees.length}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Common Name</th>
                <th>Botanical Name</th>
                <th>Category</th>
                <th>Size</th>
                <th>Price</th>
                <th>Stock</th>
                <th>SKU</th>
              </tr>
            </thead>
            <tbody>
              ${filteredAndSortedTrees.map(tree => `
                <tr>
                  <td>${tree.commonName}</td>
                  <td><em>${tree.botanicalName}</em></td>
                  <td>${tree.category}</td>
                  <td>${tree.size}</td>
                  <td>$${tree.price}</td>
                  <td>${tree.quantityInStock}</td>
                  <td>${tree.sku}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const clearAllFilters = () => {
    setFilters({
      searchTerm: '',
      category: '',
      sizeFilter: '',
      priceRange: { min: priceRange.min, max: priceRange.max },
      availabilityFilter: 'all',
      sortBy: 'name',
      sortOrder: 'asc'
    });
    setActiveQuickFilter(null);
    setCurrentPage(1);
  };

  const handleQuickFilter = (filterType: 'lowStock' | 'highValue' | 'outOfStock' | null) => {
    setActiveQuickFilter(activeQuickFilter === filterType ? null : filterType);
    setCurrentPage(1);
  };

  // Bulk Actions Functions
  const toggleSelectItem = (treeId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(treeId)) {
      newSelected.delete(treeId);
    } else {
      newSelected.add(treeId);
    }
    setSelectedItems(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === paginatedTrees.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(paginatedTrees.map(tree => tree.id)));
    }
  };

  const handleAddToRequest = () => {
    const selectedTrees = trees.filter(tree => selectedItems.has(tree.id));
    // Simulate adding to request form
    alert(`Added ${selectedTrees.length} trees to request form:\n${selectedTrees.map(t => `• ${t.commonName}`).join('\n')}`);
    setSelectedItems(new Set());
  };

  const handleExportSelected = () => {
    const selectedTrees = trees.filter(tree => selectedItems.has(tree.id));
    const csvData = selectedTrees.map(tree => ({
      'Common Name': tree.commonName,
      'Botanical Name': tree.botanicalName,
      'Category': tree.category,
      'Size': tree.size,
      'Price': tree.price,
      'Quantity in Stock': tree.quantityInStock,
      'SKU': tree.sku,
      'Availability': tree.quantityInStock > 0 ? 'In Stock' : 'Out of Stock'
    }));
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => 
        typeof value === 'string' && value.includes(',') ? `"${value}"` : value
      ).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `selected_trees_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    setSelectedItems(new Set());
  };

  const handleMarkForReorder = () => {
    const newReorderItems = new Set(reorderItems);
    selectedItems.forEach(id => newReorderItems.add(id));
    setReorderItems(newReorderItems);
    setSelectedItems(new Set());
  };

  const clearSelection = () => {
    setSelectedItems(new Set());
  };

  const TreeCardSkeleton = () => (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-8"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-10"></div>
            <div className="h-6 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 rounded flex-1"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Tree Inventory</h1>
        <p className="text-muted-foreground">
          Browse our collection of {trees.length} premium trees
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-card rounded-lg border p-4 sm:p-6 mb-6 sm:mb-8">
        {/* Basic Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-4">
          {/* Enhanced Search */}
          <div className="relative sm:col-span-2 lg:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, category, or SKU..."
              value={filters.searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 h-12 sm:h-10 text-base sm:text-sm"
            />
          </div>

          {/* Category Filter */}
          <Select value={filters.category || 'all'} onValueChange={handleCategoryChange}>
            <SelectTrigger className="h-12 sm:h-10">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Advanced Filters Toggle */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Collapsible open={isAdvancedFiltersOpen} onOpenChange={setIsAdvancedFiltersOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full h-12 sm:h-10">
                  <Filter className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Advanced</span>
                  <span className="sm:hidden">Filters</span>
                  {isAdvancedFiltersOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
          </div>

          {/* Export Actions */}
          <div className="flex gap-2 sm:col-span-2 lg:col-span-1">
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              className="flex-1 h-12 sm:h-10"
            >
              <Download className="mr-1 h-3 w-3" />
              <span className="hidden sm:inline">CSV</span>
              <span className="sm:hidden">Export</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={openPrintView}
              className="flex-1 h-12 sm:h-10"
            >
              <Printer className="mr-1 h-3 w-3" />
              <span className="hidden sm:inline">Print</span>
              <span className="sm:hidden">Print</span>
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        <Collapsible open={isAdvancedFiltersOpen} onOpenChange={setIsAdvancedFiltersOpen}>
          <CollapsibleContent className="space-y-4">
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Size Filter */}
              <div className="space-y-2">
                <Label>Tree Size</Label>
                <Select value={filters.sizeFilter || 'all'} onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, sizeFilter: value === 'all' ? '' : value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="All Sizes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sizes</SelectItem>
                    {sizeCategories.map(size => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <Label>Price Range: ${filters.priceRange.min} - ${filters.priceRange.max}</Label>
                <Slider
                  value={[filters.priceRange.min, filters.priceRange.max]}
                  onValueChange={([min, max]) => 
                    setFilters(prev => ({ ...prev, priceRange: { min, max } }))
                  }
                  max={priceRange.max}
                  min={priceRange.min}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Availability Filter */}
              <div className="space-y-2">
                <Label>Availability</Label>
                <Select value={filters.availabilityFilter} onValueChange={(value: any) => 
                  setFilters(prev => ({ ...prev, availabilityFilter: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="inStock">In Stock (5+)</SelectItem>
                    <SelectItem value="lowStock">Low Stock (1-5)</SelectItem>
                    <SelectItem value="outOfStock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Sort Options and Results */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-2 items-start sm:items-center justify-between mt-4">
          <div className="flex gap-2 flex-wrap order-2 sm:order-1">
            {/* Select All Checkbox */}
            <div className="flex items-center gap-2 mr-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSelectAll}
                className="h-8 px-2 hover:bg-blue-50"
              >
                {selectedItems.size === paginatedTrees.length && paginatedTrees.length > 0 ? 
                  <CheckSquare className="h-4 w-4 text-blue-600" /> : 
                  <Square className="h-4 w-4 text-gray-400" />
                }
                <span className="ml-2 text-xs text-muted-foreground">
                  Select All
                </span>
              </Button>
            </div>
            <Label className="text-sm text-muted-foreground self-center hidden sm:inline">Sort by:</Label>
            <Button
              variant={filters.sortBy === 'name' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('name')}
            >
              Name
              {filters.sortBy === 'name' && (
                filters.sortOrder === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
              )}
            </Button>
            <Button
              variant={filters.sortBy === 'price' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('price')}
            >
              Price
              {filters.sortBy === 'price' && (
                filters.sortOrder === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
              )}
            </Button>
            <Button
              variant={filters.sortBy === 'availability' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('availability')}
            >
              Stock
              {filters.sortBy === 'availability' && (
                filters.sortOrder === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
              )}
            </Button>
            <Button
              variant={filters.sortBy === 'size' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('size')}
            >
              Size
              {filters.sortBy === 'size' && (
                filters.sortOrder === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
              )}
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 order-1 sm:order-2 w-full sm:w-auto">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              {filteredAndSortedTrees.length} result{filteredAndSortedTrees.length !== 1 ? 's' : ''}
              {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
            </Badge>
            {(filters.searchTerm || filters.category || filters.sizeFilter || 
              filters.priceRange.min > priceRange.min || filters.priceRange.max < priceRange.max || 
              filters.availabilityFilter !== 'all' || activeQuickFilter) && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 px-2 text-xs">
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Filter Toolbar */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="font-medium text-sm text-gray-700">Quick Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Show Low Stock */}
            <Button
              variant={activeQuickFilter === 'lowStock' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleQuickFilter('lowStock')}
              className={`h-8 px-3 text-xs font-medium transition-all ${
                activeQuickFilter === 'lowStock' 
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-md border-yellow-500' 
                  : 'hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-700'
              }`}
            >
              <AlertTriangle className="h-3 w-3 mr-1.5" />
              Low Stock
              {activeQuickFilter === 'lowStock' && (
                <X className="h-3 w-3 ml-1.5" />
              )}
            </Button>

            {/* Show High Value */}
            <Button
              variant={activeQuickFilter === 'highValue' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleQuickFilter('highValue')}
              className={`h-8 px-3 text-xs font-medium transition-all ${
                activeQuickFilter === 'highValue' 
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-md border-green-600' 
                  : 'hover:bg-green-50 hover:border-green-300 hover:text-green-700'
              }`}
            >
              <DollarSign className="h-3 w-3 mr-1.5" />
              High Value
              {activeQuickFilter === 'highValue' && (
                <X className="h-3 w-3 ml-1.5" />
              )}
            </Button>

            {/* Show Out of Stock */}
            <Button
              variant={activeQuickFilter === 'outOfStock' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleQuickFilter('outOfStock')}
              className={`h-8 px-3 text-xs font-medium transition-all ${
                activeQuickFilter === 'outOfStock' 
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-md border-red-500' 
                  : 'hover:bg-red-50 hover:border-red-300 hover:text-red-700'
              }`}
            >
              <Package className="h-3 w-3 mr-1.5" />
              Out of Stock
              {activeQuickFilter === 'outOfStock' && (
                <X className="h-3 w-3 ml-1.5" />
              )}
            </Button>

            {/* Show All */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuickFilter(null)}
              className={`h-8 px-3 text-xs font-medium transition-all ${
                !activeQuickFilter 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              Show All
            </Button>
          </div>

          {/* Active Filter Indicator */}
          {activeQuickFilter && (
            <div className="flex items-center gap-2 ml-auto">
              <Badge 
                variant="secondary" 
                className={`text-xs ${
                  activeQuickFilter === 'lowStock' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                  activeQuickFilter === 'highValue' ? 'bg-green-100 text-green-800 border-green-200' :
                  activeQuickFilter === 'outOfStock' ? 'bg-red-100 text-red-800 border-red-200' : ''
                }`}
              >
                {activeQuickFilter === 'lowStock' && '≤5 units'}
                {activeQuickFilter === 'highValue' && '>$50'}
                {activeQuickFilter === 'outOfStock' && '0 units'}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedItems.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckSquare className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-800">
                {selectedItems.size} item{selectedItems.size !== 1 ? 's' : ''} selected
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={handleAddToRequest}
                className="bg-green-600 hover:bg-green-700 text-white h-8 px-3 text-xs"
              >
                <ShoppingCart className="h-3 w-3 mr-1.5" />
                Add to Request
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleExportSelected}
                className="border-blue-300 text-blue-700 hover:bg-blue-50 h-8 px-3 text-xs"
              >
                <Download className="h-3 w-3 mr-1.5" />
                Export Selected
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleMarkForReorder}
                className="border-orange-300 text-orange-700 hover:bg-orange-50 h-8 px-3 text-xs"
              >
                <RefreshCw className="h-3 w-3 mr-1.5" />
                Mark for Reorder
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={clearSelection}
                className="text-gray-600 hover:bg-gray-100 h-8 px-3 text-xs"
              >
                <X className="h-3 w-3 mr-1.5" />
                Clear Selection
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tree Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {isLoading ? (
          Array.from({ length: itemsPerPage }).map((_, i) => (
            <TreeCardSkeleton key={i} />
          ))
        ) : (
          paginatedTrees.map((tree) => (
          <div key={tree.id} className="relative">
            <Card className={`hover:shadow-lg transition-all cursor-pointer touch-manipulation ${
              selectedItems.has(tree.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            } ${reorderItems.has(tree.id) ? 'border-orange-300 bg-orange-50' : ''}`}>
              {/* Selection Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-blue-100"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSelectItem(tree.id);
                  }}
                >
                  {selectedItems.has(tree.id) ? 
                    <CheckSquare className="h-4 w-4 text-blue-600" /> : 
                    <Square className="h-4 w-4 text-gray-400 hover:text-blue-500" />
                  }
                </Button>
              </div>

              {/* Reorder Indicator */}
              {reorderItems.has(tree.id) && (
                <div className="absolute top-2 right-2 z-10">
                  <Badge className="bg-orange-500 text-white text-xs">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Reorder
                  </Badge>
                </div>
              )}

            <Link href={`/inventory/${tree.id}`}>
            <CardHeader className="p-4 sm:p-6 pt-8">
              <div className="flex justify-between items-start mb-2 gap-2">
                <Badge variant="outline" className="text-xs flex-shrink-0">{tree.category}</Badge>
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-8 w-8 touch-manipulation"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(tree.id);
                    }}
                  >
                    <Heart 
                      className={`h-4 w-4 ${isInWishlist(tree.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    />
                  </Button>
                  <Badge variant={tree.quantityInStock > 0 ? 'default' : 'destructive'} className="text-xs">
                    <span className="hidden sm:inline">{tree.quantityInStock > 0 ? `${tree.quantityInStock} in stock` : 'Out of stock'}</span>
                    <span className="sm:hidden">{tree.quantityInStock > 0 ? `${tree.quantityInStock}` : 'Out'}</span>
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-base sm:text-lg leading-tight">{tree.commonName}</CardTitle>
              <CardDescription className="italic text-sm">{tree.botanicalName}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                {tree.description}
              </p>
              
              <div className="space-y-2 mb-3 sm:mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span className="text-right flex-1 ml-2 truncate">{tree.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SKU:</span>
                  <span className="font-mono text-xs text-right">{tree.sku}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="text-lg sm:text-xl font-bold text-primary">${tree.price}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  size="sm" 
                  className="flex-1 h-10 touch-manipulation"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="h-10 touch-manipulation"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a 
                    href={tree.iNaturalistUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span className="hidden sm:inline">iNaturalist</span>
                    <span className="sm:hidden">Info</span>
                  </a>
                </Button>
              </div>
            </CardContent>
            </Link>
            </Card>
          </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && !isLoading && (
        <div className="flex items-center justify-center space-x-2 mt-6 sm:mt-8 px-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-10 px-3 touch-manipulation"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
          
          <div className="flex space-x-1 overflow-x-auto">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => goToPage(pageNum)}
                  className="w-10 h-10 touch-manipulation flex-shrink-0"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-10 px-3 touch-manipulation"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {filteredAndSortedTrees.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            No trees found matching your criteria.
          </div>
          <Button variant="outline" onClick={clearAllFilters}>
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}