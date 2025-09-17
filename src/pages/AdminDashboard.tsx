
import BCHeader from "@/components/BCHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Users, Shield, Activity, AlertTriangle, Settings, FileText } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const systemStats = [
    {
      title: "Active Integrations",
      value: "147",
      change: "+12 this month",
      icon: Activity,
      color: "text-blue-600"
    },
    {
      title: "Pending Approvals",
      value: "8",
      change: "Requires attention",
      icon: AlertTriangle,
      color: "text-orange-600"
    },
    {
      title: "Total Users",
      value: "2.3M",
      change: "+5.2% this month",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "System Health",
      value: "99.9%",
      change: "All systems operational",
      icon: Shield,
      color: "text-green-600"
    }
  ];

  const recentActivity = [
    {
      action: "New integration request",
      service: "Health Portal System",
      time: "2 hours ago",
      status: "pending"
    },
    {
      action: "Integration approved",
      service: "Education Services",
      time: "4 hours ago",
      status: "approved"
    },
    {
      action: "System maintenance completed",
      service: "BC Services Card Provider",
      time: "1 day ago",
      status: "completed"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BCHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and manage the IIS Broker system
            </p>
          </div>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => console.log("System settings")}
          >
            <Settings className="mr-2 h-5 w-5" />
            System Settings
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => (
            <Card key={index} className="bc-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pending Approvals */}
          <div className="lg:col-span-2">
            <Card className="bc-card">
              <CardHeader>
                <CardTitle>Pending Integration Requests</CardTitle>
                <CardDescription>New integrations awaiting approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">Health Portal System</h4>
                        <p className="text-sm text-muted-foreground">BC Services Card + BCeID</p>
                      </div>
                      <Badge variant="secondary">Pending Review</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Public health service for appointment booking and medical records access
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm">Approve</Button>
                      <Button size="sm" variant="outline">Review</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Activity */}
          <div className="space-y-6">
            <Card className="bc-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Identity Providers
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  System Reports
                </Button>
              </CardContent>
            </Card>

            <Card className="bc-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
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

export default AdminDashboard;
