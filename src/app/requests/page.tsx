'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ClientRequest, Tree } from '@/types/tree';
import { Send, Check, Clock, Eye, Download, Share2, Copy } from 'lucide-react';
import treesData from '../../../data/trees.json';

const trees: Tree[] = treesData as Tree[];

function RequestsPageContent() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    requestedTrees: [] as string[]
  });

  const [requests, setRequests] = useState<ClientRequest[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      message: 'Looking for shade trees for a residential project. Need 5-10 mature trees.',
      requestedTrees: ['American Oak', 'Sugar Maple'],
      status: 'pending',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@landscaping.com',
      phone: '(555) 987-6543',
      message: 'Commercial landscaping project requiring native ornamental trees.',
      requestedTrees: ['Eastern Redbud', 'Flowering Dogwood'],
      status: 'reviewed',
      createdAt: '2024-01-14T14:15:00Z'
    }
  ]);

  useEffect(() => {
    const treeId = searchParams.get('tree');
    if (treeId) {
      const tree = trees.find(t => t.id === treeId);
      if (tree) {
        setFormData(prev => ({
          ...prev,
          requestedTrees: [tree.commonName]
        }));
        
        setTimeout(() => {
          if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, [searchParams]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTreeSelection = (treeId: string, checked: boolean) => {
    const tree = trees.find(t => t.id === treeId);
    if (!tree) return;

    setFormData(prev => ({
      ...prev,
      requestedTrees: checked 
        ? [...prev.requestedTrees, tree.commonName]
        : prev.requestedTrees.filter(name => name !== tree.commonName)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    const newRequest: ClientRequest = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setRequests(prev => [newRequest, ...prev]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      requestedTrees: []
    });

    toast({
      title: '🎉 Quote Request Submitted Successfully!',
      description: 'Thank you! We\'ll send your personalized quote within 24 hours. Check your email!',
    });
  };

  const getStatusColor = (status: ClientRequest['status']) => {
    switch (status) {
      case 'pending': return 'default';
      case 'reviewed': return 'secondary';
      case 'completed': return 'outline';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: ClientRequest['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-3 w-3" />;
      case 'reviewed': return <Eye className="h-3 w-3" />;
      case 'completed': return <Check className="h-3 w-3" />;
      default: return null;
    }
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Get your FREE tree quote from Greentree Co! 🌳 Premium trees, professional service, quick quotes. Transform your landscape today!');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
  };

  const copyShareableLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: 'Link Copied! 📋',
        description: 'Share this link on social media or with friends!',
      });
    }).catch(() => {
      toast({
        title: 'Error',
        description: 'Could not copy link. Please try again.',
        variant: 'destructive'
      });
    });
  };

  const exportRequestsToCSV = () => {
    const csvData = requests.map(request => ({
      'Request ID': request.id,
      'Name': request.name,
      'Email': request.email,
      'Phone': request.phone,
      'Message': request.message,
      'Requested Trees': request.requestedTrees.join('; '),
      'Status': request.status,
      'Created Date': new Date(request.createdAt).toLocaleDateString(),
      'Created Time': new Date(request.createdAt).toLocaleTimeString()
    }));
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => 
        typeof value === 'string' && (value.includes(',') || value.includes(';')) ? `"${value}"` : value
      ).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `client_requests_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Professional Header Section */}
      <div className="text-center mb-12">
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12 px-8 rounded-2xl mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🌳 Request Your Free Quote</h1>
          <p className="text-xl md:text-2xl mb-6 text-green-100">
            Professional Tree Services by Greentree Co.
          </p>
          <div className="max-w-4xl mx-auto text-lg md:text-xl text-green-50 space-y-4">
            <p>
              Transform your landscape with premium trees from Austin's trusted nursery. 
              We provide expert consultation, quality trees, and professional installation services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl mb-2">🌿</div>
                <h3 className="font-semibold mb-2">Premium Quality</h3>
                <p className="text-sm">Hand-selected trees from our 50+ variety inventory</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl mb-2">🚚</div>
                <h3 className="font-semibold mb-2">Professional Service</h3>
                <p className="text-sm">Delivery, planting, and consultation services</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl mb-2">💰</div>
                <h3 className="font-semibold mb-2">Free Quotes</h3>
                <p className="text-sm">No obligation estimates within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-8">
          <div className="flex items-center">
            <div className="text-yellow-600 text-2xl mr-3">⚡</div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">Ready to Get Started?</h3>
              <p className="text-yellow-700">Fill out our quick form below and we'll contact you within 24 hours with your personalized quote!</p>
            </div>
          </div>
        </div>
        
        {/* Social Sharing Section */}
        <div className="bg-white border-2 border-green-200 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-green-800 mb-2">📢 Share with Friends & Family</h3>
              <p className="text-green-600">Know someone who needs tree services? Share this page!</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => shareToFacebook()}
                className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share on Facebook
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => copyShareableLink()}
                className="bg-green-600 text-white hover:bg-green-700 border-green-600"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="submit" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="submit" className="text-lg py-3">Get Free Quote</TabsTrigger>
          <TabsTrigger value="view">View Requests</TabsTrigger>
        </TabsList>

        {/* Submit Request Tab */}
        <TabsContent value="submit">
          <Card ref={formRef} className="shadow-xl border-2 border-green-100">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg">
              <CardTitle className="text-2xl text-green-800 text-center">🌳 Get Your Free Tree Quote</CardTitle>
              <CardDescription className="text-center text-lg text-green-700">
                Tell us about your project and we'll provide a personalized quote within 24 hours!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg font-medium">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      className="text-lg py-3 px-4"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-lg font-medium">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className="text-lg py-3 px-4"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-lg font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        className="text-lg py-3 px-4"
                      />
                    </div>
                  </div>
                </div>

                {/* Tree Selection */}
                <div className="space-y-4">
                  <Label>Interested Trees (Optional)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto border rounded-md p-4">
                    {trees.map((tree) => (
                      <div key={tree.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={tree.id}
                          checked={formData.requestedTrees.includes(tree.commonName)}
                          onCheckedChange={(checked) => handleTreeSelection(tree.id, checked as boolean)}
                        />
                        <Label 
                          htmlFor={tree.id} 
                          className="text-sm cursor-pointer flex-1"
                        >
                          {tree.commonName}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {formData.requestedTrees.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.requestedTrees.map((treeName, index) => (
                        <Badge key={index} variant="secondary">
                          {treeName}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-lg font-medium">Tell Us About Your Project *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Describe your landscaping project: How many trees do you need? What's your timeline? Any specific requirements or questions?"
                    rows={6}
                    className="text-lg py-3 px-4"
                    required
                  />
                </div>

                <div className="text-center">
                  <Button type="submit" size="lg" className="w-full md:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg font-semibold rounded-xl transform transition-all duration-200 hover:scale-105 shadow-lg">
                    <Send className="h-5 w-5 mr-3" />
                    Get My FREE Quote Now! 🌟
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3">✅ No obligation • ✅ Quick response • ✅ Expert advice</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* View Requests Tab */}
        <TabsContent value="view">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Recent Requests</h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{requests.length} total</Badge>
                {requests.length > 0 && (
                  <Button variant="outline" size="sm" onClick={exportRequestsToCSV}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                )}
              </div>
            </div>
            
            {requests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{request.name}</CardTitle>
                      <CardDescription>{request.email} • {request.phone}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(request.status)} className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        {request.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{request.message}</p>
                  {request.requestedTrees.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Requested Trees:</p>
                      <div className="flex flex-wrap gap-2">
                        {request.requestedTrees.map((tree, index) => (
                          <Badge key={index} variant="outline">
                            {tree}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {requests.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No requests submitted yet.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function RequestsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RequestsPageContent />
    </Suspense>
  );
}