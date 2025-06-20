'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, SortAsc, SortDesc, ExternalLink } from 'lucide-react';
import { Tree, TreeFilter } from '@/types/tree';
import treesData from '../../../data/trees.json';

const trees: Tree[] = treesData as Tree[];

const categories = Array.from(new Set(trees.map(tree => tree.category)));

export default function InventoryPage() {
  const [filters, setFilters] = useState<TreeFilter>({
    searchTerm: '',
    category: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const filteredAndSortedTrees = useMemo(() => {
    let filtered = trees.filter(tree => {
      const matchesSearch = 
        tree.commonName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        tree.botanicalName.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesCategory = 
        !filters.category || tree.category === filters.category;
      
      return matchesSearch && matchesCategory;
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
      }
      
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [filters]);

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, searchTerm: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFilters(prev => ({ ...prev, category: value === 'all' ? '' : value }));
  };

  const handleSortChange = (field: 'name' | 'price' | 'availability') => {
    setFilters(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Tree Inventory</h1>
        <p className="text-muted-foreground">
          Browse our collection of {trees.length} premium trees
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-card rounded-lg border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={filters.searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={filters.category || 'all'} onValueChange={handleCategoryChange}>
            <SelectTrigger>
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

          {/* Sort Options */}
          <div className="flex gap-2">
            <Button
              variant={filters.sortBy === 'name' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('name')}
              className="flex-1"
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
              className="flex-1"
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
              className="flex-1"
            >
              Stock
              {filters.sortBy === 'availability' && (
                filters.sortOrder === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
              )}
            </Button>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-end">
            <Badge variant="secondary">
              {filteredAndSortedTrees.length} result{filteredAndSortedTrees.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </div>
      </div>

      {/* Tree Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedTrees.map((tree) => (
          <Link key={tree.id} href={`/inventory/${tree.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline">{tree.category}</Badge>
                <Badge variant={tree.quantityInStock > 0 ? 'default' : 'destructive'}>
                  {tree.quantityInStock > 0 ? `${tree.quantityInStock} in stock` : 'Out of stock'}
                </Badge>
              </div>
              <CardTitle className="text-lg">{tree.commonName}</CardTitle>
              <CardDescription className="italic">{tree.botanicalName}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {tree.description}
              </p>
              
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span>{tree.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SKU:</span>
                  <span className="font-mono text-xs">{tree.sku}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="text-lg font-bold text-primary">${tree.price}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a 
                    href={tree.iNaturalistUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    iNaturalist
                  </a>
                </Button>
              </div>
            </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredAndSortedTrees.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            No trees found matching your criteria.
          </div>
          <Button 
            variant="outline" 
            onClick={() => setFilters({ searchTerm: '', category: '', sortBy: 'name', sortOrder: 'asc' })}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}