
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
      description: "Answer questions about your product requirements and user base"
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
      
      <main className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mb-20">
          <Badge className="mb-6 bg-accent text-primary" variant="secondary">
            Prototype - Future State Vision
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            Connect to BC government identity services
          </h1>
          <p className="text-xl text-foreground mb-8 max-w-2xl">
            A single platform for BC government teams to integrate with identity providers. Answer questions about your needs and get a recommendation for the authentication service that meets your requirements.
          </p>
          
          <div className="flex gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate('/login')}
            >
              Get started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
            >
              Learn more about identity services <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>


        {/* Process Overview */}
        <div className="max-w-4xl mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-6">How it works</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Simple process to get the right identity solution for your project
          </p>
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What You'll Need */}
        <div className="max-w-4xl mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-6">What you'll need to get started</h2>
          <div className="space-y-4">
            {requirements.map((requirement, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground text-lg">{requirement}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About the Service</h3>
              <p className="text-sm text-blue-100">
                Identity Services BC provides a single integration point for BC government identity services, 
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
