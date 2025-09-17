
import BCHeader from "@/components/BCHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Plus, Settings, Activity } from "lucide-react";

const IntegrationManagement = () => {
  const navigate = useNavigate();

  const integrations = [
    {
      id: "1",
      name: "Citizen Services Portal",
      status: "active",
      environment: "Production",
      identityProvider: "BC Services Card + BCeID",
      lastActivity: "2 hours ago",
      monthlyUsers: "12.5K",
      created: "2024-01-15"
    },
    {
      id: "2",
      name: "Internal HR System", 
      status: "development",
      environment: "Development",
      identityProvider: "IDIR",
      lastActivity: "1 day ago",
      monthlyUsers: "0",
      created: "2024-03-01"
    },
    {
      id: "3",
      name: "Education Portal",
      status: "testing",
      environment: "Test",
      identityProvider: "BC Services Card",
      lastActivity: "3 hours ago",
      monthlyUsers: "856",
      created: "2024-02-20"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'development': return 'bg-blue-100 text-blue-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (integrationId: string) => {
    console.log(`Viewing details for integration ${integrationId}`);
    // For now, just show an alert - in a real app this would navigate to a details page
    alert(`Integration Details for ID: ${integrationId}\n\nThis would normally open a detailed view of the integration configuration, usage statistics, and management options.`);
  };

  const handleSettings = (integrationId: string) => {
    console.log(`Opening settings for integration ${integrationId}`);
    alert(`Settings for Integration ID: ${integrationId}\n\nThis would open the integration settings page.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BCHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Integration Management</h1>
            <p className="text-muted-foreground">
              View and manage all your identity service integrations
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

        {/* Filters and Search */}
        <Card className="bc-card mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search integrations..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Integrations List */}
        <div className="space-y-4">
          {integrations.map((integration) => (
            <Card key={integration.id} className="bc-card hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{integration.name}</h3>
                    <p className="text-muted-foreground">{integration.identityProvider}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(integration.status)}>
                      {integration.status}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleSettings(integration.id)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block">Environment</span>
                    <span className="font-medium">{integration.environment}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Monthly Users</span>
                    <span className="font-medium">{integration.monthlyUsers}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Last Activity</span>
                    <span className="font-medium">{integration.lastActivity}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Created</span>
                    <span className="font-medium">{integration.created}</span>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(integration.id)}
                    >
                      <Activity className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Card */}
        <Card className="bc-card mt-8">
          <CardHeader>
            <CardTitle>Integration Summary</CardTitle>
            <CardDescription>Overview of your integration portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{integrations.length}</div>
                <div className="text-sm text-muted-foreground">Total Integrations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {integrations.filter(i => i.status === 'active').length}
                </div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {integrations.filter(i => i.status === 'development').length}
                </div>
                <div className="text-sm text-muted-foreground">In Development</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {integrations.filter(i => i.status === 'testing').length}
                </div>
                <div className="text-sm text-muted-foreground">Testing</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IntegrationManagement;
