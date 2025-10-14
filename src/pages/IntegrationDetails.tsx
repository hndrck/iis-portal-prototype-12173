import { useParams, useNavigate } from "react-router-dom";
import BCHeader from "@/components/BCHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Copy, CheckCircle, Info, Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import RoleManagementTab from "@/components/wizard/RoleManagementTab";
import AssignUsersTab from "@/components/wizard/AssignUsersTab";
import MetricsTab from "@/components/wizard/MetricsTab";
import LogsTab from "@/components/wizard/LogsTab";
import ChangeHistoryTab from "@/components/wizard/ChangeHistoryTab";

const IntegrationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copiedEnv, setCopiedEnv] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isTechConfigOpen, setIsTechConfigOpen] = useState(false);

  // Mock data - in a real app this would come from an API
  const integration = {
    id: id,
    requestId: "00006128",
    name: "Citizen Services Portal",
    status: "Active",
    ministry: "Citizens' Services",
    userTypes: ["BC residents/Canadian residents", "Government employees"],
    privacyZone: "Citizens' Services (Citizen)",
    identityProviders: ["BC Services Card", "BCeID Basic", "IDIR"],
    productOwner: {
      name: "Jane Smith",
      email: "jane.smith@gov.bc.ca"
    },
    technicalLead: {
      name: "John Doe",
      email: "john.doe@gov.bc.ca"
    },
    clientType: "Confidential",
    clientProtocol: "OpenID Connect",
    useCase: "Browser Login and Service Account",
    dataClassification: "Protected B",
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

  const handleDelete = () => {
    toast({
      title: "Integration deleted",
      description: `Integration ${integration.name} has been deleted`,
    });
    navigate('/client');
  };

  const handleEdit = () => {
    navigate(`/client/integrations/${id}/edit`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BCHeader />
      
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/client')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* Summary Card */}
        <Card className="mb-6 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-foreground">
                    {integration.name}
                  </h1>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {integration.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Request ID: {integration.requestId}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  className="gap-1.5"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteDialog(true)}
                  className="gap-1.5 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {/* Basic Information */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <span className="text-xs font-medium text-muted-foreground">Ministry</span>
                <p className="text-sm mt-0.5">{integration.ministry}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground">Environment</span>
                <p className="text-sm mt-0.5">
                  {integration.environments.map(env => env.name).join(', ')}
                </p>
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground">Product Owner</span>
                <p className="text-sm mt-0.5 font-medium">{integration.productOwner.name}</p>
                <p className="text-xs text-muted-foreground">{integration.productOwner.email}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground">Technical Lead</span>
                <p className="text-sm mt-0.5 font-medium">{integration.technicalLead.name}</p>
                <p className="text-xs text-muted-foreground">{integration.technicalLead.email}</p>
              </div>
            </div>

            {/* User Types & Identity Providers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <span className="text-xs font-medium text-muted-foreground">User Types</span>
                <div className="flex flex-wrap gap-1.5 mt-0.5">
                  {integration.userTypes.map((type) => (
                    <Badge key={type} variant="outline" className="text-xs py-0">{type}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground">Identity Providers</span>
                <div className="flex flex-wrap gap-1.5 mt-0.5">
                  {integration.identityProviders.map((idp) => (
                    <Badge key={idp} variant="secondary" className="text-xs py-0">{idp}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Privacy Zone - only if applicable */}
            {integration.privacyZone && (
              <div>
                <span className="text-xs font-medium text-muted-foreground">Privacy Zone</span>
                <p className="text-sm mt-0.5">{integration.privacyZone}</p>
              </div>
            )}

            <Separator className="my-2" />

            {/* Technical Configuration - Collapsible */}
            <Collapsible open={isTechConfigOpen} onOpenChange={setIsTechConfigOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
                  <span className="text-xs font-medium">Technical Configuration</span>
                  {isTechConfigOpen ? (
                    <ChevronUp className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-muted/30 rounded-lg">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Client Type</span>
                    <p className="text-sm mt-0.5">{integration.clientType}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Client Protocol</span>
                    <p className="text-sm mt-0.5">{integration.clientProtocol}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Use Case</span>
                    <p className="text-sm mt-0.5">{integration.useCase}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Data Classification</span>
                    <p className="text-sm mt-0.5">{integration.dataClassification}</p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-5 w-5" />
                Delete Integration?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base">
                Are you sure you want to delete <strong>{integration.name}</strong>? This action cannot be undone and will remove all associated configurations, roles, and user assignments.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Integration
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

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
                <RoleManagementTab />
              </TabsContent>

              <TabsContent value="assign" className="p-6">
                <AssignUsersTab />
              </TabsContent>

              <TabsContent value="history" className="p-6">
                <ChangeHistoryTab />
              </TabsContent>

              <TabsContent value="metrics" className="p-6">
                <MetricsTab />
              </TabsContent>

              <TabsContent value="logs" className="p-6">
                <LogsTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IntegrationDetails;
