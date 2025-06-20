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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/inventory" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Inventory
          </Link>
        </Button>
      </div>

      {/* Tree Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{tree.commonName}</h1>
            <p className="text-xl text-muted-foreground italic">{tree.botanicalName}</p>
          </div>
          <div className="flex flex-col sm:items-end gap-2">
            <Badge variant="outline" className="w-fit">{tree.category}</Badge>
            <Badge variant={tree.quantityInStock > 0 ? 'default' : 'destructive'} className="w-fit">
              {tree.quantityInStock > 0 ? `${tree.quantityInStock} in stock` : 'Out of stock'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{tree.description}</p>
            </CardContent>
          </Card>

          {/* Planting & Care */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-primary" />
                Planting & Care Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{tree.plantingCareInfo}</p>
            </CardContent>
          </Card>

          {/* Companion Plants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-primary" />
                Companion Plants
              </CardTitle>
              <CardDescription>
                Plants that grow well alongside this tree
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tree.companionPlants.map((plant, index) => (
                  <Badge key={index} variant="secondary">
                    {plant}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Complementary Trees */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Complementary Trees
              </CardTitle>
              <CardDescription>
                Trees that pair beautifully with this variety
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tree.complementaryTrees.map((complementaryTree, index) => (
                  <Badge key={index} variant="outline">
                    {complementaryTree}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Purchase Info */}
          <Card>
            <CardHeader>
              <CardTitle>Purchase Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Price:</span>
                <span className="text-2xl font-bold text-primary">${tree.price}</span>
              </div>
              
              <Separator />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SKU:</span>
                  <span className="font-mono">{tree.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span>{tree.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span>{tree.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stock:</span>
                  <span className={tree.quantityInStock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {tree.quantityInStock > 0 ? `${tree.quantityInStock} available` : 'Out of stock'}
                  </span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  disabled={tree.quantityInStock === 0}
                  asChild
                >
                  <Link href={`/requests?tree=${tree.id}`}>
                    {tree.quantityInStock > 0 ? 'Request Quote' : 'Out of Stock'}
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a 
                    href={tree.iNaturalistUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View on iNaturalist
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Botanical Name:</span>
                <span className="italic text-right flex-1 ml-2">{tree.botanicalName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Common Name:</span>
                <span className="text-right flex-1 ml-2">{tree.commonName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="text-right flex-1 ml-2">{tree.category}</span>
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