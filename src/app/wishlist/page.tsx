'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/hooks/use-wishlist';
import { Tree } from '@/types/tree';
import { Heart, Download, ExternalLink, Trash2 } from 'lucide-react';
import treesData from '../../../data/trees.json';

const trees: Tree[] = treesData as Tree[];

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();

  const wishlistTrees = useMemo(() => {
    return trees.filter(tree => wishlist.includes(tree.id));
  }, [wishlist]);

  const exportWishlistToCSV = () => {
    if (wishlistTrees.length === 0) return;
    
    const csvData = wishlistTrees.map(tree => ({
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
    a.download = `wishlist_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">
          Your favorite trees ({wishlistCount} item{wishlistCount !== 1 ? 's' : ''})
        </p>
      </div>

      {/* Wishlist Actions */}
      {wishlistTrees.length > 0 && (
        <div className="flex gap-4 mb-6">
          <Button onClick={exportWishlistToCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export to CSV
          </Button>
          <Button 
            onClick={clearWishlist} 
            variant="outline" 
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Wishlist
          </Button>
        </div>
      )}

      {/* Wishlist Grid */}
      {wishlistTrees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistTrees.map((tree) => (
            <Card key={tree.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{tree.category}</Badge>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-8 w-8"
                      onClick={() => removeFromWishlist(tree.id)}
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                    <Badge variant={tree.quantityInStock > 0 ? 'default' : 'destructive'}>
                      {tree.quantityInStock > 0 ? `${tree.quantityInStock} in stock` : 'Out of stock'}
                    </Badge>
                  </div>
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
                  <Link href={`/inventory/${tree.id}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
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
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6">
            Start browsing our tree inventory and click the heart icon to add trees to your wishlist.
          </p>
          <Link href="/inventory">
            <Button>Browse Trees</Button>
          </Link>
        </div>
      )}
    </div>
  );
}