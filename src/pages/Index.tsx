
import BCHeader from "@/components/BCHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Zap, Users, Layers, CheckCircle } from "lucide-react";

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
      description: "System automatically determines the right identity solution for your needs"
    },
    {
      icon: Users,
      title: "Future-Proof",
      description: "Identity providers can be updated without affecting your integration"
    },
    {
      icon: Layers,
      title: "Self-Service",
      description: "Complete setup and configuration through our developer portal"
    }
  ];

  const currentState = [
    "Direct integration with multiple identity providers",
    "Complex provider-specific configurations",
    "Tight coupling between applications and identity services",
    "Manual coordination for changes and updates"
  ];

  const futureState = [
    "Single integration with the IIS Broker",
    "Requirement-driven configuration",
    "Abstracted identity complexity",
    "Automated updates and provider management"
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
          <h1 className="text-5xl font-bold text-primary mb-6">
            Integrated Identity Services Broker
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A revolutionary self-service platform that transforms how developers integrate identity services. 
            One door to all BC Government identity solutions.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate('/client')}
            >
              Developer Portal <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/admin')}
            >
              Administration
            </Button>
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

        {/* Transformation Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="bc-card">
            <CardHeader>
              <CardTitle className="text-xl text-center">Current State</CardTitle>
              <CardDescription className="text-center">
                Fragmented Direct Integration Model
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentState.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bc-card border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl text-center text-primary">Future State</CardTitle>
              <CardDescription className="text-center">
                Unified Broker Integration Model
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {futureState.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Architecture Overview */}
        <Card className="bc-card mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">How It Works</CardTitle>
            <CardDescription>
              The IIS Broker acts as an intelligent intermediary between your application and BC's identity ecosystem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold">Describe Your Needs</h3>
                <p className="text-muted-foreground">
                  Answer questions about your service requirements, user base, and security needs
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold">Get Your Solution</h3>
                <p className="text-muted-foreground">
                  The broker automatically determines the optimal identity configuration for your use case
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold">Integrate & Deploy</h3>
                <p className="text-muted-foreground">
                  Receive configuration details, sample code, and go live with confidence
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bc-card max-w-2xl mx-auto bc-gradient text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Experience the Future?</h2>
              <p className="mb-6 opacity-90">
                Explore the prototype and see how the IIS Broker will transform identity integration for BC Government services.
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate('/client')}
                >
                  Start Developer Journey
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => navigate('/admin')}
                >
                  View Admin Console
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
