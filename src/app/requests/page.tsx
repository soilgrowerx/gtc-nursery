'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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
import { Send, Check, Clock, Eye } from 'lucide-react';
import treesData from '../../../data/trees.json';

const trees: Tree[] = treesData as Tree[];

function RequestsPageContent() {
  const { toast } = useToast();
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
      title: 'Request Submitted',
      description: 'We\'ll get back to you within 24 hours.',
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Client Requests</h1>
        <p className="text-muted-foreground">
          Submit new requests or view existing ones
        </p>
      </div>

      <Tabs defaultValue="submit" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="submit">Submit Request</TabsTrigger>
          <TabsTrigger value="view">View Requests</TabsTrigger>
        </TabsList>

        {/* Submit Request Tab */}
        <TabsContent value="submit">
          <Card ref={formRef}>
            <CardHeader>
              <CardTitle>Submit a New Request</CardTitle>
              <CardDescription>
                Fill out the form below to request trees or get a consultation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
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
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* View Requests Tab */}
        <TabsContent value="view">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Recent Requests</h2>
              <Badge variant="outline">{requests.length} total</Badge>
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