'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  BarChart3, 
  Activity,
  TreePine,
  ShoppingCart,
  Users,
  Calendar,
  ArrowUp,
  ArrowDown,
  Download,
  MapPin,
  Clock,
  Target,
  Leaf,
  Sun,
  Snowflake,
  Bell,
  PieChart,
  LineChart,
  Award,
  Zap
} from 'lucide-react';
import treesData from '../../../data/trees.json';
import { Tree } from '@/types/tree';

const trees: Tree[] = treesData as Tree[];

// Enhanced client requests data with geographic information
const clientRequests = [
  { id: 'REQ-001', date: '2024-06-15', client: 'Austin Parks & Recreation', value: 970, status: 'pending', location: 'Austin, TX', type: 'municipal' },
  { id: 'REQ-002', date: '2024-06-18', client: 'Highland Homes', value: 2720, status: 'approved', location: 'Cedar Park, TX', type: 'residential' },
  { id: 'REQ-003', date: '2024-06-20', client: 'University of Texas', value: 2000, status: 'quoted', location: 'Austin, TX', type: 'institutional' },
  { id: 'REQ-004', date: '2024-06-19', client: 'Four Points Landscape Co.', value: 630, status: 'fulfilled', location: 'Lakeway, TX', type: 'commercial' },
  { id: 'REQ-005', date: '2024-06-21', client: 'Sarah Johnson', value: 480, status: 'pending', location: 'Round Rock, TX', type: 'residential' },
  { id: 'REQ-006', date: '2024-06-14', client: 'Dell Technologies', value: 3500, status: 'fulfilled', location: 'Austin, TX', type: 'corporate' },
  { id: 'REQ-007', date: '2024-06-12', client: 'Westlake HOA', value: 1200, status: 'quoted', location: 'Westlake, TX', type: 'residential' }
];

// Simulated historical data for trends
const monthlyData = [
  { month: 'Jan', revenue: 15000, orders: 45, averageOrder: 333 },
  { month: 'Feb', revenue: 18500, orders: 52, averageOrder: 356 },
  { month: 'Mar', revenue: 22000, orders: 61, averageOrder: 361 },
  { month: 'Apr', revenue: 28000, orders: 74, averageOrder: 378 },
  { month: 'May', revenue: 35000, orders: 89, averageOrder: 393 },
  { month: 'Jun', revenue: 42000, orders: 105, averageOrder: 400 }
];

interface BusinessMetrics {
  // Existing metrics
  totalInventoryValue: number;
  totalTrees: number;
  lowStockItems: Tree[];
  outOfStockItems: Tree[];
  averagePrice: number;
  categoryBreakdown: { category: string; count: number; value: number; margin: number }[];
  
  // New advanced metrics
  monthlyProjection: number;
  profitabilityAnalysis: { category: string; revenue: number; cost: number; margin: number; profitability: string }[];
  customerInsights: { location: string; count: number; totalValue: number; avgValue: number; type: string }[];
  inventoryTurnover: { tree: Tree; popularity: number; daysInStock: number; turnoverRate: string }[];
  seasonalRecommendations: { season: string; recommendations: string[]; priority: string }[];
  reorderAlerts: { tree: Tree; urgency: string; recommendedAction: string; daysUntilOutOfStock: number }[];
  keyKPIs: { 
    salesGrowth: number; 
    inventoryTurnover: number; 
    avgOrderValue: number; 
    customerRetention: number;
    profitMargin: number;
    stockEfficiency: number;
  };
}

export default function AdminDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate comprehensive business metrics with advanced analytics
  const metrics: BusinessMetrics = useMemo(() => {
    // Basic calculations
    const totalInventoryValue = trees.reduce((sum, tree) => sum + (tree.price * tree.quantityInStock), 0);
    const totalTrees = trees.reduce((sum, tree) => sum + tree.quantityInStock, 0);
    const lowStockItems = trees.filter(tree => tree.quantityInStock > 0 && tree.quantityInStock <= 5);
    const outOfStockItems = trees.filter(tree => tree.quantityInStock === 0);
    const averagePrice = trees.reduce((sum, tree) => sum + tree.price, 0) / trees.length;

    // Monthly revenue projection based on current trends
    const currentMonthRevenue = monthlyData[monthlyData.length - 1].revenue;
    const previousMonthRevenue = monthlyData[monthlyData.length - 2].revenue;
    const growthRate = (currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue;
    const monthlyProjection = currentMonthRevenue * (1 + growthRate);

    // Enhanced category breakdown with profitability
    const categoryMap = trees.reduce((acc, tree) => {
      const category = tree.category;
      if (!acc[category]) {
        acc[category] = { count: 0, value: 0, cost: 0 };
      }
      acc[category].count += tree.quantityInStock;
      acc[category].value += tree.price * tree.quantityInStock;
      // Estimate cost at 60% of price
      acc[category].cost += (tree.price * 0.6) * tree.quantityInStock;
      return acc;
    }, {} as Record<string, { count: number; value: number; cost: number }>);

    const categoryBreakdown = Object.entries(categoryMap).map(([category, data]) => ({
      category,
      count: data.count,
      value: data.value,
      margin: ((data.value - data.cost) / data.value) * 100
    }));

    // Profitability Analysis
    const profitabilityAnalysis = Object.entries(categoryMap).map(([category, data]) => {
      const margin = ((data.value - data.cost) / data.value) * 100;
      let profitability = 'Low';
      if (margin > 45) profitability = 'High';
      else if (margin > 35) profitability = 'Medium';
      
      return {
        category,
        revenue: data.value,
        cost: data.cost,
        margin,
        profitability
      };
    }).sort((a, b) => b.margin - a.margin);

    // Customer Insights with geographic analysis
    const locationMap = clientRequests.reduce((acc, req) => {
      const location = req.location;
      if (!acc[location]) {
        acc[location] = { count: 0, totalValue: 0, types: new Set() };
      }
      acc[location].count += 1;
      acc[location].totalValue += req.value;
      acc[location].types.add(req.type);
      return acc;
    }, {} as Record<string, { count: number; totalValue: number; types: Set<string> }>);

    const customerInsights = Object.entries(locationMap).map(([location, data]) => ({
      location,
      count: data.count,
      totalValue: data.totalValue,
      avgValue: data.totalValue / data.count,
      type: Array.from(data.types).join(', ')
    })).sort((a, b) => b.totalValue - a.totalValue);

    // Inventory Turnover Analysis (simulated based on price and stock)
    const inventoryTurnover = trees.map(tree => {
      // Simulate popularity based on price point and stock levels
      const popularity = Math.max(0, 100 - (tree.price / 10) + (20 - tree.quantityInStock));
      const daysInStock = Math.floor(Math.random() * 90) + 30; // 30-120 days
      let turnoverRate = 'Slow';
      if (popularity > 80) turnoverRate = 'Fast';
      else if (popularity > 60) turnoverRate = 'Medium';
      
      return { tree, popularity, daysInStock, turnoverRate };
    }).sort((a, b) => b.popularity - a.popularity);

    // Seasonal Planning Recommendations
    const currentMonth = new Date().getMonth();
    const seasonalRecommendations = [
      {
        season: 'Summer (Current)',
        recommendations: [
          'Stock drought-resistant varieties',
          'Promote shade trees for immediate planting',
          'Increase irrigation supplies inventory'
        ],
        priority: 'High'
      },
      {
        season: 'Fall Planning',
        recommendations: [
          'Prepare deciduous trees for fall planting season',
          'Stock winter-hardy varieties',
          'Plan promotional campaigns for fall landscaping'
        ],
        priority: 'Medium'
      },
      {
        season: 'Winter Preparation',
        recommendations: [
          'Focus on evergreen inventory',
          'Prepare cold protection supplies',
          'Plan spring marketing campaigns'
        ],
        priority: 'Low'
      }
    ];

    // Reorder Alerts for high-value trees
    const reorderAlerts = trees
      .filter(tree => tree.quantityInStock <= 10 && tree.price > 50)
      .map(tree => {
        let urgency = 'Low';
        let daysUntilOutOfStock = Math.floor(tree.quantityInStock * 7); // Assume 1 tree sold per week
        
        if (tree.quantityInStock <= 3) {
          urgency = 'Critical';
          daysUntilOutOfStock = tree.quantityInStock * 3;
        } else if (tree.quantityInStock <= 7) {
          urgency = 'High';
          daysUntilOutOfStock = tree.quantityInStock * 5;
        }
        
        const recommendedAction = urgency === 'Critical' 
          ? 'Immediate reorder required' 
          : urgency === 'High' 
          ? 'Schedule reorder within 1 week'
          : 'Monitor and reorder when convenient';
        
        return {
          tree,
          urgency,
          recommendedAction,
          daysUntilOutOfStock
        };
      })
      .sort((a, b) => {
        const urgencyOrder = { 'Critical': 3, 'High': 2, 'Low': 1 };
        return urgencyOrder[b.urgency as keyof typeof urgencyOrder] - urgencyOrder[a.urgency as keyof typeof urgencyOrder];
      });

    // Key Performance Indicators
    const keyKPIs = {
      salesGrowth: ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100,
      inventoryTurnover: (totalInventoryValue / currentMonthRevenue) * 30, // Days to sell current inventory
      avgOrderValue: clientRequests.reduce((sum, req) => sum + req.value, 0) / clientRequests.length,
      customerRetention: 85, // Simulated
      profitMargin: ((totalInventoryValue * 0.4) / totalInventoryValue) * 100, // Assume 40% margin
      stockEfficiency: ((trees.length - outOfStockItems.length) / trees.length) * 100
    };

    return {
      totalInventoryValue,
      totalTrees,
      lowStockItems,
      outOfStockItems,
      averagePrice,
      categoryBreakdown,
      monthlyProjection,
      profitabilityAnalysis,
      customerInsights,
      inventoryTurnover,
      seasonalRecommendations,
      reorderAlerts,
      keyKPIs
    };
  }, []);

  // Chart Components
  const LineChart = ({ data, title, valueKey, color = '#4a7c1f' }: any) => {
    if (!data || data.length === 0) return null;
    const maxValue = Math.max(...data.map((item: any) => item[valueKey]));
    
    return (
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-muted-foreground">{title}</h4>
        <div className="h-32 flex items-end justify-between gap-2">
          {data.map((item: any, index: number) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full rounded-t transition-all duration-500"
                style={{ 
                  height: `${(item[valueKey] / maxValue) * 100}%`,
                  backgroundColor: color,
                  minHeight: '4px'
                }}
              />
              <div className="text-xs text-muted-foreground mt-1 text-center">
                {item.month}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const KPICard = ({ title, value, change, icon: Icon, trend, suffix = '' }: any) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}{suffix}</p>
            {change !== undefined && (
              <div className={`flex items-center text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend === 'up' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {Math.abs(change).toFixed(1)}%
              </div>
            )}
          </div>
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Business Intelligence Dashboard</h1>
            <p className="text-muted-foreground">
              Advanced analytics and operational insights for Greentree Co.
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

      {/* Tabs for different dashboard views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4 h-auto sm:h-10">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="analytics" className="text-sm">Analytics</TabsTrigger>
          <TabsTrigger value="insights" className="text-sm">Customer Insights</TabsTrigger>
          <TabsTrigger value="planning" className="text-sm">Planning</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <KPICard 
              title="Sales Growth" 
              value={metrics.keyKPIs.salesGrowth.toFixed(1)} 
              change={metrics.keyKPIs.salesGrowth}
              icon={TrendingUp} 
              trend="up"
              suffix="%" 
            />
            <KPICard 
              title="Avg Order Value" 
              value={`$${Math.round(metrics.keyKPIs.avgOrderValue).toLocaleString()}`}
              change={12.5}
              icon={DollarSign} 
              trend="up"
            />
            <KPICard 
              title="Stock Efficiency" 
              value={`${metrics.keyKPIs.stockEfficiency.toFixed(1)}`}
              change={metrics.keyKPIs.stockEfficiency - 90}
              icon={Package} 
              trend={metrics.keyKPIs.stockEfficiency > 90 ? "up" : "down"}
              suffix="%" 
            />
            <KPICard 
              title="Inventory Turnover" 
              value={`${Math.round(metrics.keyKPIs.inventoryTurnover)}`}
              icon={Activity} 
              suffix=" days"
            />
            <KPICard 
              title="Profit Margin" 
              value={`${metrics.keyKPIs.profitMargin.toFixed(1)}`}
              change={2.3}
              icon={Target} 
              trend="up"
              suffix="%" 
            />
            <KPICard 
              title="Customer Retention" 
              value={`${metrics.keyKPIs.customerRetention}`}
              change={5.2}
              icon={Users} 
              trend="up"
              suffix="%" 
            />
          </div>

          {/* Sales Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Sales Trends & Revenue Projection
              </CardTitle>
              <CardDescription>
                Monthly revenue growth with projected earnings for next month: 
                <span className="font-bold text-green-600 ml-2">
                  ${metrics.monthlyProjection.toLocaleString()}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart 
                data={monthlyData}
                title="Monthly Revenue Trend"
                valueKey="revenue"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-4 border-t">
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold text-green-600">
                    ${monthlyData[monthlyData.length - 1].revenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Month</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold text-blue-600">
                    ${metrics.monthlyProjection.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Projected Next Month</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold">
                    {metrics.keyKPIs.salesGrowth.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Growth Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Critical Alerts */}
          {metrics.reorderAlerts.length > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Bell className="h-5 w-5" />
                  Reorder Alerts - High-Value Inventory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {metrics.reorderAlerts?.slice(0, 6).map((alert, index) => (
                    <div key={index} className={`p-4 rounded-lg border-2 ${
                      alert.urgency === 'Critical' ? 'border-red-300 bg-red-50' :
                      alert.urgency === 'High' ? 'border-orange-300 bg-orange-50' :
                      'border-yellow-300 bg-yellow-50'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-sm">{alert.tree.commonName}</div>
                        <Badge variant={alert.urgency === 'Critical' ? 'destructive' : 'outline'} className="text-xs">
                          {alert.urgency}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div>Stock: {alert.tree.quantityInStock} units</div>
                        <div>Value: ${alert.tree.price}</div>
                        <div>Est. {alert.daysUntilOutOfStock} days until depleted</div>
                      </div>
                      <div className="mt-3 text-xs font-medium">
                        {alert.recommendedAction}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Profitability Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Profitability Analysis by Category
              </CardTitle>
              <CardDescription>Revenue, costs, and profit margins by tree category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.profitabilityAnalysis?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{item.category}</div>
                      <div className="text-sm text-muted-foreground">
                        Revenue: ${item.revenue.toLocaleString()} | Cost: ${item.cost.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{item.margin.toFixed(1)}%</div>
                      <Badge variant={
                        item.profitability === 'High' ? 'default' :
                        item.profitability === 'Medium' ? 'secondary' : 'outline'
                      }>
                        {item.profitability}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inventory Turnover */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Inventory Turnover Analysis
              </CardTitle>
              <CardDescription>Most and least popular trees based on turnover rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-green-600">Top Performers (Fast Turnover)</h4>
                  <div className="space-y-2">
                    {metrics.inventoryTurnover?.filter(item => item.turnoverRate === 'Fast').slice(0, 5).map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <div>
                          <div className="font-medium text-sm">{item.tree.commonName}</div>
                          <div className="text-xs text-muted-foreground">
                            ${item.tree.price} | {item.tree.quantityInStock} in stock
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold">{item.popularity.toFixed(0)}%</div>
                          <div className="text-xs text-green-600">Fast</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-orange-600">Slow Movers (Needs Attention)</h4>
                  <div className="space-y-2">
                    {metrics.inventoryTurnover?.filter(item => item.turnoverRate === 'Slow').slice(0, 5).map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-orange-50 rounded">
                        <div>
                          <div className="font-medium text-sm">{item.tree.commonName}</div>
                          <div className="text-xs text-muted-foreground">
                            ${item.tree.price} | {item.tree.quantityInStock} in stock
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold">{item.popularity.toFixed(0)}%</div>
                          <div className="text-xs text-orange-600">Slow</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Geographic Customer Analysis
              </CardTitle>
              <CardDescription>Client distribution and value by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {metrics.customerInsights?.map((insight, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <div className="font-medium">{insight.location}</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Clients:</span>
                        <span className="font-medium">{insight.count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Value:</span>
                        <span className="font-medium">${insight.totalValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Value:</span>
                        <span className="font-medium">${Math.round(insight.avgValue).toLocaleString()}</span>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="text-xs text-muted-foreground">Types: {insight.type}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Types Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Client Type Analysis</CardTitle>
              <CardDescription>Revenue breakdown by customer segment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {Object.entries(
                  clientRequests.reduce((acc, req) => {
                    if (!acc[req.type]) acc[req.type] = { count: 0, value: 0 };
                    acc[req.type].count += 1;
                    acc[req.type].value += req.value;
                    return acc;
                  }, {} as Record<string, { count: number; value: number }>)
                ).map(([type, data]) => (
                  <div key={type} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold">${data.value.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{type}</div>
                    <div className="text-xs text-muted-foreground mt-1">{data.count} clients</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Planning Tab */}
        <TabsContent value="planning" className="space-y-6">
          {/* Seasonal Planning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Seasonal Planning Recommendations
              </CardTitle>
              <CardDescription>Strategic recommendations for upcoming seasons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {metrics.seasonalRecommendations?.map((season, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 ${
                    season.priority === 'High' ? 'border-green-300 bg-green-50' :
                    season.priority === 'Medium' ? 'border-blue-300 bg-blue-50' :
                    'border-gray-300 bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      {index === 0 ? <Sun className="h-5 w-5 text-yellow-600" /> :
                       index === 1 ? <Leaf className="h-5 w-5 text-orange-600" /> :
                       <Snowflake className="h-5 w-5 text-blue-600" />}
                      <div className="font-medium">{season.season}</div>
                      <Badge variant={season.priority === 'High' ? 'default' : 'secondary'} className="text-xs">
                        {season.priority}
                      </Badge>
                    </div>
                    <ul className="space-y-2 text-sm">
                      {season.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Business Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Business Performance Summary
              </CardTitle>
              <CardDescription>Key achievements and areas for improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-green-600 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Strengths
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Strong sales growth of {metrics.keyKPIs.salesGrowth.toFixed(1)}%
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      High stock efficiency at {metrics.keyKPIs.stockEfficiency.toFixed(1)}%
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Healthy profit margins across categories
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Diverse customer base across locations
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-orange-600 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Opportunities
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-orange-600">→</span>
                      Focus on slow-moving inventory
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-600">→</span>
                      Expand high-margin categories
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-600">→</span>
                      Improve inventory turnover rate
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-600">→</span>
                      Develop corporate client relationships
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}