
import BCHeader from "@/components/BCHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Zap, Settings, TrendingUp, CheckCircle, ExternalLink } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Shield,
      title: "Single Integration Point",
      description: "Connect once to access all BC Government identity services"
    },
    {
      icon: Zap,
      title: "Intelligent Routing",
      description: "Answer questions about your needs and get the right solution automatically"
    },
    {
      icon: Settings,
      title: "Self-Service Setup",
      description: "Complete configuration and receive development credentials instantly"
    },
    {
      icon: TrendingUp,
      title: "Future-Proof",
      description: "Built to evolve with new identity providers and authentication standards"
    }
  ];

  const processSteps = [
    {
      title: "Describe Your Needs",
      description: "Answer questions about your service requirements and user base"
    },
    {
      title: "Get Your Solution", 
      description: "Receive recommended identity configuration with clear rationale"
    },
    {
      title: "Start Building",
      description: "Receive development credentials and documentation immediately"
    }
  ];

  const requirements = [
    "IDIR account for BC government employees",
    "Basic project information (service name, team contacts)",
    "Understanding of your user base and security requirements"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BCHeader />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent text-primary" variant="secondary">
            Prototype - Future State Vision
          </Badge>
          <h1 className="text-5xl font-bold text-primary mb-4">
            Common Hosted Credential Service
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Connect to BC government identity solutions
          </p>
          <p className="text-lg text-foreground max-w-3xl mx-auto mb-8">
            A single service for BC government teams to integrate with identity providers and authentication services. 
            Get the right identity solution for your project automatically.
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate('/client')}
            >
              Get started
            </Button>
            <Button 
              size="lg" 
              variant="outline"
            >
              Learn more about identity services <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* IDIR Authentication */}
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-4">
              This service requires IDIR authentication for BC government employees and authorized partners
            </p>
            <div className="space-y-3">
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                Sign in with IDIR
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                size="sm"
              >
                Request IDIR access
              </Button>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bc-card hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-4">
                <benefit.icon className="h-12 w-12 text-primary mx-auto mb-3" />
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Overview */}
        <Card className="bc-card mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">How It Works</CardTitle>
            <CardDescription>
              Simple process to get the right identity solution for your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {processSteps.map((step, index) => (
                <div key={index} className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-bold text-xl">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What You'll Need */}
        <Card className="bc-card mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">What You'll Need</CardTitle>
            <CardDescription>
              Requirements to get started with the Common Hosted Credential Service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-2xl mx-auto space-y-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{requirement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bc-card max-w-2xl mx-auto bc-gradient text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="mb-6 opacity-90">
                Explore the prototype and see how CHCS will streamline identity integration for BC Government services.
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate('/client')}
                >
                  Developer Portal
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => navigate('/admin')}
                >
                  Administration
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About the Service</h3>
              <p className="text-sm text-blue-100">
                CHCS provides a single integration point for BC government identity services, 
                managed by Cybersecurity and Digital Trust, CITZ.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-blue-100 hover:text-white">Technical Documentation</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white">API Reference</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white">Integration Guide</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-blue-100 hover:text-white">Contact Support</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white">Service Status</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white">Known Issues</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Government</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-blue-100 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white">Accessibility</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-8 text-center">
            <p className="text-sm text-blue-100">
              © 2024 Government of British Columbia - Cybersecurity and Digital Trust, CITZ
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
