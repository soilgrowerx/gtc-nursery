import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trees, Users, Search, Leaf } from 'lucide-react';

export default function Home() {
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