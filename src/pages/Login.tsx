import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BCHeader from "@/components/BCHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronRight, Home, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    phone: "",
    projectName: "",
    description: "",
    managerName: "",
    managerEmail: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitRequest = () => {
    toast({
      title: "Request Submitted",
      description: "Your IDIR access request has been submitted. You will receive a response within 2-3 business days. Please check your email for further instructions.",
    });
    setIsModalOpen(false);
    setFormData({
      fullName: "",
      email: "",
      organization: "",
      phone: "",
      projectName: "",
      description: "",
      managerName: "",
      managerEmail: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BCHeader />
      
      <main className="container mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <button onClick={() => navigate('/')} className="hover:text-primary">
            <Home className="h-4 w-4" />
          </button>
          <ChevronRight className="h-4 w-4" />
          <span>Sign in</span>
        </nav>

        <div className="max-w-md mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Sign in to Common Hosted Credential Service
            </h1>
            <p className="text-muted-foreground">
              Use your IDIR credentials to access the service
            </p>
          </div>

          {/* IDIR Information */}
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              IDIR (Integrated Directory) is the secure authentication system for BC government employees and authorized partners.
            </AlertDescription>
          </Alert>

          {/* Login Form */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Sign in with IDIR</CardTitle>
              <CardDescription>
                Enter your IDIR username and password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">IDIR Username</Label>
                <Input 
                  id="username" 
                  placeholder="your.name" 
                  type="text"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                />
              </div>

              <Button 
                className="w-full" 
                onClick={() => navigate('/client')}
              >
                Sign in
              </Button>

              <div className="text-center">
                <button className="text-sm text-primary hover:underline">
                  Forgot your password?
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Alternative Access */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need IDIR Access?</CardTitle>
              <CardDescription>
                If you do not have an IDIR but are building a service within a BC government organization or authorized public sector agency, you can request access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Request IDIR Access
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Request IDIR Access</DialogTitle>
                    <DialogDescription>
                      Complete this form to request IDIR access for your project
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input 
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization/Ministry *</Label>
                      <Input 
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => handleInputChange('organization', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectName">Project/Service Name *</Label>
                      <Input 
                        id="projectName"
                        value={formData.projectName}
                        onChange={(e) => handleInputChange('projectName', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Brief description of your project *</Label>
                      <Textarea 
                        id="description"
                        placeholder="Describe your project and why you need IDIR access..."
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="managerName">Manager/Supervisor Name *</Label>
                      <Input 
                        id="managerName"
                        value={formData.managerName}
                        onChange={(e) => handleInputChange('managerName', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="managerEmail">Manager/Supervisor Email *</Label>
                      <Input 
                        id="managerEmail"
                        type="email"
                        value={formData.managerEmail}
                        onChange={(e) => handleInputChange('managerEmail', e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSubmitRequest} className="flex-1">
                        Submit Request
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Support */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Need help?{" "}
              <button className="text-primary hover:underline">
                Contact our support team
              </button>
            </p>
            <button 
              onClick={() => navigate('/')}
              className="text-sm text-primary hover:underline mt-2"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;