'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  DollarSign, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  BarChart3, 
  Activity,
  TreePine,
  ShoppingCart,
  Users,
  Calendar,
  ArrowUp,
  ArrowDown,
  Download
} from 'lucide-react';
import treesData from '../../../data/trees.json';
import { Tree } from '@/types/tree';

const trees: Tree[] = treesData as Tree[];

// Sample client requests data for analytics
const clientRequests = [
  { id: 'REQ-001', date: '2024-06-15', client: 'Austin Parks & Recreation', value: 970, status: 'pending' },
  { id: 'REQ-002', date: '2024-06-18', client: 'Highland Homes', value: 2720, status: 'approved' },
  { id: 'REQ-003', date: '2024-06-20', client: 'University of Texas', value: 2000, status: 'quoted' },
  { id: 'REQ-004', date: '2024-06-19', client: 'Four Points Landscape Co.', value: 630, status: 'fulfilled' },
  { id: 'REQ-005', date: '2024-06-21', client: 'Sarah Johnson', value: 48, status: 'pending' }
];

interface DashboardMetrics {
  totalInventoryValue: number;
  totalTrees: number;
  lowStockItems: Tree[];
  outOfStockItems: Tree[];
  averagePrice: number;
  categoryBreakdown: { category: string; count: number; value: number }[];
  priceDistribution: { range: string; count: number; percentage: number }[];
  recentActivity: any[];
  topValueTrees: Tree[];
  stockByCategory: { category: string; inStock: number; total: number }[];
}

export default function AdminDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  // Calculate comprehensive business metrics
  const metrics: DashboardMetrics = useMemo(() => {
    // Basic calculations
    const totalInventoryValue = trees.reduce((sum, tree) => sum + (tree.price * tree.quantityInStock), 0);
    const totalTrees = trees.reduce((sum, tree) => sum + tree.quantityInStock, 0);
    const lowStockItems = trees.filter(tree => tree.quantityInStock > 0 && tree.quantityInStock <= 5);
    const outOfStockItems = trees.filter(tree => tree.quantityInStock === 0);
    const averagePrice = trees.reduce((sum, tree) => sum + tree.price, 0) / trees.length;

    // Category breakdown
    const categoryMap = trees.reduce((acc, tree) => {
      const category = tree.category;
      if (!acc[category]) {
        acc[category] = { count: 0, value: 0 };
      }
      acc[category].count += tree.quantityInStock;
      acc[category].value += tree.price * tree.quantityInStock;
      return acc;
    }, {} as Record<string, { count: number; value: number }>);

    const categoryBreakdown = Object.entries(categoryMap).map(([category, data]) => ({
      category,
      count: data.count,
      value: data.value
    }));

    // Price distribution
    const priceRanges = [
      { range: '$10-20', min: 10, max: 20 },
      { range: '$21-40', min: 21, max: 40 },
      { range: '$41-60', min: 41, max: 60 },
      { range: '$61-100', min: 61, max: 100 },
      { range: '$100+', min: 100, max: Infinity }
    ];

    const priceDistribution = priceRanges.map(range => {
      const count = trees.filter(tree => tree.price >= range.min && tree.price <= range.max).length;
      return {
        range: range.range,
        count,
        percentage: (count / trees.length) * 100
      };
    });

    // Top value trees (highest inventory value)
    const topValueTrees = [...trees]
      .map(tree => ({ ...tree, inventoryValue: tree.price * tree.quantityInStock }))
      .sort((a, b) => b.inventoryValue - a.inventoryValue)
      .slice(0, 5);

    // Stock by category
    const stockByCategory = Object.entries(categoryMap).map(([category, data]) => {
      const categoryTrees = trees.filter(tree => tree.category === category);
      const inStock = categoryTrees.filter(tree => tree.quantityInStock > 0).length;
      return {
        category,
        inStock,
        total: categoryTrees.length
      };
    });

    // Recent activity (mock data based on client requests)
    const recentActivity = [
      ...clientRequests.slice(0, 3).map(req => ({
        type: 'order',
        description: `New order from ${req.client}`,
        value: req.value,
        time: req.date,
        status: req.status
      })),
      {
        type: 'inventory',
        description: `${lowStockItems.length} items running low on stock`,
        time: new Date().toISOString().split('T')[0],
        status: 'alert'
      },
      {
        type: 'restock',
        description: 'Received shipment of 25 Oak trees',
        time: '2024-06-19',
        status: 'completed'
      }
    ];

    return {
      totalInventoryValue,
      totalTrees,
      lowStockItems,
      outOfStockItems,
      averagePrice,
      categoryBreakdown,
      priceDistribution,
      recentActivity,
      topValueTrees,
      stockByCategory
    };
  }, []);

  // Chart component for visual data
  const BarChart = ({ data, title, valueKey, labelKey, color = '#4a7c1f' }: any) => {
    const maxValue = Math.max(...data.map((item: any) => item[valueKey]));
    
    return (
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-muted-foreground">{title}</h4>
        <div className="space-y-2">
          {data.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-20 text-xs font-medium truncate">
                {item[labelKey]}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                <div 
                  className="h-2 rounded-full"
                  style={{ 
                    width: `${(item[valueKey] / maxValue) * 100}%`,
                    backgroundColor: color
                  }}
                />
              </div>
              <div className="w-16 text-xs text-muted-foreground text-right">
                {typeof item[valueKey] === 'number' && item[valueKey] > 1000 
                  ? `$${Math.round(item[valueKey] / 1000)}k`
                  : valueKey === 'percentage' 
                  ? `${item[valueKey].toFixed(1)}%`
                  : item[valueKey]
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DonutChart = ({ data, title }: any) => {
    const total = data.reduce((sum: number, item: any) => sum + item.count, 0);
    let currentAngle = 0;
    
    return (
      <div className="flex flex-col items-center space-y-3">
        <h4 className="font-medium text-sm text-muted-foreground">{title}</h4>
        <div className="relative">
          <svg width="120" height="120" className="transform -rotate-90">
            {data.map((item: any, index: number) => {
              const percentage = (item.count / total) * 100;
              const strokeDasharray = `${percentage * 2.51} 251.2`;
              const strokeDashoffset = -currentAngle * 2.51;
              const color = index === 0 ? '#4a7c1f' : '#7ca95a';
              currentAngle += percentage;
              
              return (
                <circle
                  key={index}
                  cx="60"
                  cy="60"
                  r="40"
                  fill="none"
                  stroke={color}
                  strokeWidth="12"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold">{total}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          {data.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded"
                style={{ backgroundColor: index === 0 ? '#4a7c1f' : '#7ca95a' }}
              />
              <span>{item.category}: {item.count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Business Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive analytics for Greentree Co. inventory and operations
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Link href="/inventory">
              <Button variant="outline" size="sm">
                Back to Inventory
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.totalInventoryValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {trees.length} tree varieties
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trees in Stock</CardTitle>
            <TreePine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalTrees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Average: {Math.round(metrics.totalTrees / trees.length)} per variety
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {metrics.lowStockItems.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Items with ≤5 units remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Tree Price</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(metrics.averagePrice)}</div>
            <p className="text-xs text-muted-foreground">
              Range: ${Math.min(...trees.map(t => t.price))} - ${Math.max(...trees.map(t => t.price))}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      {(metrics.lowStockItems.length > 0 || metrics.outOfStockItems.length > 0) && (
        <div className="mb-8">
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <AlertTriangle className="h-5 w-5" />
                Inventory Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {metrics.lowStockItems.length > 0 && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>{metrics.lowStockItems.length} items</strong> are running low on stock (≤5 units):
                    <div className="mt-2 flex flex-wrap gap-2">
                      {metrics.lowStockItems.slice(0, 6).map(tree => (
                        <Badge key={tree.id} variant="outline" className="text-xs">
                          {tree.commonName} ({tree.quantityInStock})
                        </Badge>
                      ))}
                      {metrics.lowStockItems.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{metrics.lowStockItems.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              
              {metrics.outOfStockItems.length > 0 && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>{metrics.outOfStockItems.length} items</strong> are completely out of stock:
                    <div className="mt-2 flex flex-wrap gap-2">
                      {metrics.outOfStockItems.slice(0, 4).map(tree => (
                        <Badge key={tree.id} variant="destructive" className="text-xs">
                          {tree.commonName}
                        </Badge>
                      ))}
                      {metrics.outOfStockItems.length > 4 && (
                        <Badge variant="destructive" className="text-xs">
                          +{metrics.outOfStockItems.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory by Category</CardTitle>
            <CardDescription>Stock levels and values by tree category</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={metrics.categoryBreakdown}
              title="Inventory Value by Category"
              valueKey="value"
              labelKey="category"
            />
          </CardContent>
        </Card>

        {/* Price Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Price Distribution</CardTitle>
            <CardDescription>How trees are distributed across price ranges</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={metrics.priceDistribution}
              title="Trees by Price Range"
              valueKey="percentage"
              labelKey="range"
              color="#7ca95a"
            />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Top Value Trees */}
        <Card>
          <CardHeader>
            <CardTitle>Highest Value Inventory</CardTitle>
            <CardDescription>Trees with highest total inventory value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.topValueTrees.map((tree, index) => (
                <div key={tree.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-sm">{tree.commonName}</div>
                    <div className="text-xs text-muted-foreground">
                      {tree.quantityInStock} × ${tree.price}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">
                      ${(tree.price * tree.quantityInStock).toLocaleString()}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      #{index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stock Status by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Stock Status</CardTitle>
            <CardDescription>In-stock vs total varieties by category</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart 
              data={metrics.stockByCategory}
              title="Stock Availability"
            />
            <Separator className="my-4" />
            <div className="space-y-2">
              {metrics.stockByCategory.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.category}</span>
                  <span className="font-medium">
                    {item.inStock}/{item.total} in stock
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest business activities and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-2 border-l-2 border-gray-200">
                  <div className="flex-shrink-0 mt-1">
                    {activity.type === 'order' && <ShoppingCart className="h-4 w-4 text-green-600" />}
                    {activity.type === 'inventory' && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                    {activity.type === 'restock' && <Package className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.description}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {activity.time}
                      {activity.value && (
                        <>
                          <span>•</span>
                          <span className="font-medium">${activity.value.toLocaleString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Badge 
                    variant={
                      activity.status === 'completed' ? 'default' :
                      activity.status === 'alert' ? 'destructive' :
                      'secondary'
                    }
                    className="text-xs"
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Requests Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Client Requests</CardTitle>
          <CardDescription>Overview of recent business inquiries and orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                ${clientRequests.reduce((sum, req) => sum + req.value, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Request Value</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">{clientRequests.length}</div>
              <div className="text-sm text-muted-foreground">Active Requests</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">
                ${Math.round(clientRequests.reduce((sum, req) => sum + req.value, 0) / clientRequests.length).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Average Request</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {clientRequests.filter(req => req.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground">Pending Review</div>
            </div>
          </div>
          
          <div className="space-y-2">
            {clientRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{request.client}</div>
                  <div className="text-sm text-muted-foreground">{request.id} • {request.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">${request.value.toLocaleString()}</div>
                  <Badge 
                    variant={
                      request.status === 'fulfilled' ? 'default' :
                      request.status === 'approved' ? 'secondary' :
                      request.status === 'pending' ? 'destructive' :
                      'outline'
                    }
                    className="text-xs"
                  >
                    {request.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}