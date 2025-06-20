import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ExternalLink, Leaf, Droplets, Sun, Users } from 'lucide-react';
import { Tree } from '@/types/tree';
import treesData from '../../../../data/trees.json';

const trees: Tree[] = treesData as Tree[];

interface TreeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TreeDetailPage({ params }: TreeDetailPageProps) {
  const { id } = await params;
  const tree = trees.find(t => t.id === id);

  if (!tree) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Back Button */}
      <div className="mb-4 sm:mb-6">
        <Button variant="ghost" asChild className="h-12 sm:h-10 px-3 touch-manipulation">
          <Link href="/inventory" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm sm:text-base">Back to Inventory</span>
          </Link>
        </Button>
      </div>

      {/* Tree Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 leading-tight">{tree.commonName}</h1>
            <p className="text-lg sm:text-xl text-muted-foreground italic">{tree.botanicalName}</p>
          </div>
          <div className="flex flex-row sm:flex-col gap-2 sm:items-end">
            <Badge variant="outline" className="text-xs">{tree.category}</Badge>
            <Badge variant={tree.quantityInStock > 0 ? 'default' : 'destructive'} className="text-xs">
              <span className="hidden sm:inline">{tree.quantityInStock > 0 ? `${tree.quantityInStock} in stock` : 'Out of stock'}</span>
              <span className="sm:hidden">{tree.quantityInStock > 0 ? `${tree.quantityInStock}` : 'Out'}</span>
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Description */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Leaf className="h-5 w-5 text-primary" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{tree.description}</p>
            </CardContent>
          </Card>

          {/* Planting & Care */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Droplets className="h-5 w-5 text-primary" />
                <span className="leading-tight">Planting & Care Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{tree.plantingCareInfo}</p>
            </CardContent>
          </Card>

          {/* Companion Plants */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Sun className="h-5 w-5 text-primary" />
                Companion Plants
              </CardTitle>
              <CardDescription className="text-sm">
                Plants that grow well alongside this tree
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="flex flex-wrap gap-2">
                {tree.companionPlants.map((plant, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {plant}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Complementary Trees */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Users className="h-5 w-5 text-primary" />
                Complementary Trees
              </CardTitle>
              <CardDescription className="text-sm">
                Trees that pair beautifully with this variety
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="flex flex-wrap gap-2">
                {tree.complementaryTrees.map((complementaryTree, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {complementaryTree}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Purchase Info */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Purchase Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Price:</span>
                <span className="text-2xl sm:text-3xl font-bold text-primary">${tree.price}</span>
              </div>
              
              <Separator />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SKU:</span>
                  <span className="font-mono text-right">{tree.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span className="text-right">{tree.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="text-right">{tree.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stock:</span>
                  <span className={`text-right ${tree.quantityInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {tree.quantityInStock > 0 ? `${tree.quantityInStock} available` : 'Out of stock'}
                  </span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Button 
                  className="w-full h-12 text-base touch-manipulation" 
                  disabled={tree.quantityInStock === 0}
                  asChild
                >
                  <Link href={`/requests?tree=${tree.id}`}>
                    {tree.quantityInStock > 0 ? 'Request Quote' : 'Out of Stock'}
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full h-10 touch-manipulation" asChild>
                  <a 
                    href={tree.iNaturalistUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm">View on iNaturalist</span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Quick Facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm p-4 sm:p-6 pt-0">
              <div className="flex items-start justify-between gap-2">
                <span className="text-muted-foreground flex-shrink-0">Botanical Name:</span>
                <span className="italic text-right flex-1 text-xs sm:text-sm">{tree.botanicalName}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-muted-foreground flex-shrink-0">Common Name:</span>
                <span className="text-right flex-1 text-xs sm:text-sm">{tree.commonName}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-muted-foreground flex-shrink-0">Type:</span>
                <span className="text-right flex-1 text-xs sm:text-sm">{tree.category}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return trees.map((tree) => ({
    id: tree.id,
  }));
}