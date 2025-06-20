'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trees, Users, Search, Leaf, TrendingUp, Package, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { useRecentTrees } from '@/hooks/use-recent-trees';
import { Tree } from '@/types/tree';
import treesData from '../../data/trees.json';

const trees: Tree[] = treesData as Tree[];

export default function Home() {
  const router = useRouter();
  const { recentTrees } = useRecentTrees();
  const [searchTerm, setSearchTerm] = useState('');

  const stats = useMemo(() => {
    const totalTrees = trees.length;
    const categories = new Set(trees.map(t => t.category)).size;
    const avgPrice = trees.reduce((sum, t) => sum + t.price, 0) / totalTrees;
    const lowStock = trees.filter(t => t.quantityInStock <= 5 && t.quantityInStock > 0).length;
    const totalInventory = trees.reduce((sum, t) => sum + t.quantityInStock, 0);
    
    return { totalTrees, categories, avgPrice, lowStock, totalInventory };
  }, []);

  const recentTreesData = useMemo(() => {
    return trees.filter(tree => recentTrees.includes(tree.id)).slice(0, 3);
  }, [recentTrees]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/inventory?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Trees className="h-24 w-24 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              The Greentree Co.
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner in professional tree inventory management. 
              Cultivating sustainable landscapes with expert tree selection and care.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/inventory">
                  Browse Inventory
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/requests">
                  Submit Request
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Dashboard */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              Quick Actions Dashboard
            </h2>
            <p className="text-lg text-muted-foreground">
              Your inventory overview and quick access tools
            </p>
          </div>

          {/* Quick Search */}
          <div className="max-w-md mx-auto mb-12">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Search trees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Trees</CardTitle>
                <Trees className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalTrees}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.totalInventory} items in stock
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.categories}</div>
                <p className="text-xs text-muted-foreground">
                  Tree varieties available
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Price</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.avgPrice.toFixed(0)}</div>
                <p className="text-xs text-muted-foreground">
                  Per tree
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.lowStock}</div>
                <p className="text-xs text-muted-foreground">
                  Items need restocking
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Links and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5" />
                  Quick Links
                </CardTitle>
                <CardDescription>Fast access to popular sections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/inventory?sort=price&order=desc" className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span>Most Popular Trees</span>
                  </div>
                  <Badge variant="secondary">High Value</Badge>
                </Link>
                <Link href="/inventory?availability=inStock" className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex items-center gap-3">
                    <Package className="h-4 w-4 text-blue-600" />
                    <span>In Stock Items</span>
                  </div>
                  <Badge variant="secondary">{trees.filter(t => t.quantityInStock > 5).length}</Badge>
                </Link>
                <Link href="/inventory?availability=lowStock" className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <span>Low Stock Items</span>
                  </div>
                  <Badge variant="destructive">{stats.lowStock}</Badge>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Trees you've viewed recently</CardDescription>
              </CardHeader>
              <CardContent>
                {recentTreesData.length > 0 ? (
                  <div className="space-y-3">
                    {recentTreesData.map((tree) => (
                      <Link 
                        key={tree.id} 
                        href={`/inventory/${tree.id}`}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                      >
                        <div>
                          <div className="font-medium">{tree.commonName}</div>
                          <div className="text-sm text-muted-foreground">{tree.botanicalName}</div>
                        </div>
                        <Badge variant="outline">${tree.price}</Badge>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No recent activity</p>
                    <p className="text-sm">Start browsing to see recent trees</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Professional Tree Services
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need for your landscaping projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Trees className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Extensive Inventory</CardTitle>
                <CardDescription>
                  Browse our comprehensive collection of native and ornamental trees, 
                  each with detailed care information and botanical data.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Search className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Smart Search & Filtering</CardTitle>
                <CardDescription>
                  Find the perfect trees for your project with advanced search by 
                  common name, botanical name, category, and availability.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Client Request System</CardTitle>
                <CardDescription>
                  Submit and track custom requests for specific trees or 
                  landscaping projects with our streamlined client portal.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl p-8 md:p-16 text-center">
            <Leaf className="h-16 w-16 text-primary-foreground mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Explore our inventory of quality trees or submit a custom request 
              for your landscaping needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/inventory">
                  View All Trees
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/requests">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Credentials Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Professional Credentials
            </h3>
            <div className="flex justify-center items-center">
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 shadow-md inline-block mb-4">
                  <img 
                    src="/certified-arborist-isa-logo.png" 
                    alt="ISA Certified Arborist" 
                    className="w-24 h-24 object-contain" 
                  />
                </div>
                <p className="text-lg font-medium text-foreground">
                  ISA Certified Arborist
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Certified by the International Society of Arboriculture
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}