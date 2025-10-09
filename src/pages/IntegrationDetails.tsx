import { useParams, useNavigate } from "react-router-dom";
import BCHeader from "@/components/BCHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Copy, CheckCircle, Info } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const IntegrationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copiedEnv, setCopiedEnv] = useState<string | null>(null);

  // Mock data - in a real app this would come from an API
  const integration = {
    id: id,
    requestId: "00006128",
    name: "Citizen Services Portal",
    status: "Completed",
    useCase: "Browser Login",
    serviceType: "Gold",
    environments: [
      {
        name: "Development",
        idps: ["IDIR - MFA", "Basic BCeID"],
        ready: true,
        clientId: "dev-client-123",
        redirectUris: ["https://dev.example.com/callback"],
        json: {
          clientId: "dev-client-123",
          authority: "https://dev.loginproxy.gov.bc.ca",
          redirectUri: "https://dev.example.com/callback"
        }
      },
      {
        name: "Test",
        idps: ["IDIR - MFA", "Basic BCeID"],
        ready: true,
        clientId: "test-client-456",
        redirectUris: ["https://test.example.com/callback"],
        json: {
          clientId: "test-client-456",
          authority: "https://test.loginproxy.gov.bc.ca",
          redirectUri: "https://test.example.com/callback"
        }
      },
      {
        name: "Production",
        idps: ["IDIR - MFA", "Basic BCeID"],
        ready: false,
        clientId: "prod-client-789",
        redirectUris: ["https://example.com/callback"],
        json: {
          clientId: "prod-client-789",
          authority: "https://loginproxy.gov.bc.ca",
          redirectUri: "https://example.com/callback"
        }
      }
    ]
  };

  const handleCopy = (envName: string, jsonData: any) => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    setCopiedEnv(envName);
    toast({
      title: "Copied to clipboard",
      description: `${envName} configuration has been copied.`,
    });
    setTimeout(() => setCopiedEnv(null), 2000);
  };

  const handleDownload = (envName: string, jsonData: any) => {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${envName.toLowerCase()}-config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Download started",
      description: `${envName} configuration is downloading.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BCHeader />
      
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/client/integrations')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Integrations
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Integration Details - {integration.requestId}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">{integration.name}</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {integration.status}
            </Badge>
          </div>
        </div>

        <Card className="bc-card">
          <CardContent className="p-0">
            <Tabs defaultValue="technical" className="w-full">
              <div className="border-b px-6 pt-6">
                <TabsList className="h-auto p-0 bg-transparent border-b-0 w-full justify-start">
                  <TabsTrigger 
                    value="technical" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                  >
                    Technical Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="roles" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                  >
                    Role Management
                  </TabsTrigger>
                  <TabsTrigger 
                    value="assign" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                  >
                    Assign Users to Roles
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                  >
                    Change History
                  </TabsTrigger>
                  <TabsTrigger 
                    value="metrics" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                  >
                    Metrics
                  </TabsTrigger>
                  <TabsTrigger 
                    value="logs" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                  >
                    Logs
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="technical" className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Installation JSONs</h2>
                  
                  <div className="space-y-4">
                    {integration.environments.map((env) => (
                      <Card key={env.name} className="border-2">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-semibold">
                              {env.name} ({env.idps.join(', ')})
                            </CardTitle>
                            {env.ready && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Ready
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleCopy(env.name, env.json)}
                              className="bg-primary hover:bg-primary/90"
                            >
                              {copiedEnv === env.name ? (
                                <CheckCircle className="mr-2 h-4 w-4" />
                              ) : (
                                <Copy className="mr-2 h-4 w-4" />
                              )}
                              Copy
                            </Button>
                            <Button
                              onClick={() => handleDownload(env.name, env.json)}
                              className="bg-primary hover:bg-primary/90"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="mt-6 border-blue-200 bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-900">
                          For more information on how to use these details, or for the public endpoints associated to your client,{' '}
                          <a href="#" className="font-medium underline hover:no-underline">
                            click to learn more on our wiki page
                          </a>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="roles" className="p-6">
                <div className="text-center py-12 text-muted-foreground">
                  Role Management functionality coming soon
                </div>
              </TabsContent>

              <TabsContent value="assign" className="p-6">
                <div className="text-center py-12 text-muted-foreground">
                  Assign Users to Roles functionality coming soon
                </div>
              </TabsContent>

              <TabsContent value="history" className="p-6">
                <div className="text-center py-12 text-muted-foreground">
                  Change History functionality coming soon
                </div>
              </TabsContent>

              <TabsContent value="metrics" className="p-6">
                <div className="text-center py-12 text-muted-foreground">
                  Metrics functionality coming soon
                </div>
              </TabsContent>

              <TabsContent value="logs" className="p-6">
                <div className="text-center py-12 text-muted-foreground">
                  Logs functionality coming soon
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IntegrationDetails;
