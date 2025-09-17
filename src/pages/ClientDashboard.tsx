
import BCHeader from "@/components/BCHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Plus, Activity, Shield, Clock, ArrowRight, BookOpen, Code, Users } from "lucide-react";

const ClientDashboard = () => {
  const navigate = useNavigate();

  const integrations = [
    {
      name: "Citizen Services Portal",
      status: "active",
      environment: "Production",
      identityProvider: "BC Services Card + BCeID",
      lastActivity: "2 hours ago",
      monthlyUsers: "12.5K"
    },
    {
      name: "Internal HR System",
      status: "development",
      environment: "Development",
      identityProvider: "IDIR",
      lastActivity: "1 day ago",
      monthlyUsers: "0"
    }
  ];

  const recentActivity = [
    {
      action: "Configuration updated",
      service: "Citizen Services Portal",
      time: "2 hours ago",
      type: "update"
    },
    {
      action: "New environment created",
      service: "Internal HR System",
      time: "1 day ago",
      type: "create"
    },
    {
      action: "Integration approved",
      service: "Citizen Services Portal",
      time: "3 days ago",
      type: "approval"
    }
  ];

  const quickActions = [
    {
      title: "Implementation Guides",
      description: "Step-by-step integration documentation",
      icon: BookOpen,
      action: () => console.log("View guides")
    },
    {
      title: "Code Samples",
      description: "Ready-to-use implementation examples",
      icon: Code,
      action: () => console.log("View samples")
    },
    {
      title: "Support",
      description: "Get help from our technical team",
      icon: Users,
      action: () => console.log("Contact support")
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BCHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Developer Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your identity integrations and monitor service performance
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate('/client/new-integration')}
          >
            <Plus className="mr-2 h-5 w-5" />
            New Integration
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bc-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span className="font-medium">Active Integrations</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold">2</span>
                <span className="text-muted-foreground ml-2">services</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bc-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">Monthly Users</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold">12.5K</span>
                <span className="text-muted-foreground ml-2">authenticated</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bc-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium">Security Status</span>
              </div>
              <div className="mt-2">
                <Badge className="bg-green-100 text-green-800">All Good</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bc-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">Uptime</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold">99.9%</span>
                <span className="text-muted-foreground ml-2">last 30 days</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Integrations */}
          <div className="lg:col-span-2">
            <Card className="bc-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Integrations</CardTitle>
                  <CardDescription>Manage and monitor your active services</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/client/integrations')}
                >
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrations.map((integration, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">{integration.identityProvider}</p>
                      </div>
                      <Badge 
                        variant={integration.status === 'active' ? 'default' : 'secondary'}
                        className={integration.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {integration.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Environment:</span>
                        <p className="font-medium">{integration.environment}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Monthly Users:</span>
                        <p className="font-medium">{integration.monthlyUsers}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Activity:</span>
                        <p className="font-medium">{integration.lastActivity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Activity */}
          <div className="space-y-6">
            <Card className="bc-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common developer resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="w-full text-left p-3 rounded-lg border hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <action.icon className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">{action.title}</h4>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="bc-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates to your integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-3">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.service}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
