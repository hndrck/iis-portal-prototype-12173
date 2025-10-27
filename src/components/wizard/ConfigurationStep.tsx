
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, Info, Save, Check, AlertTriangle } from "lucide-react";
import { WizardData } from "../IntegrationWizard";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EnvironmentConfig {
  applicationName: string;
  redirectUris: string;
  additionalNotes: string;
  goLiveDate?: Date;
  businessApprovalContact?: string;
}

interface ConfigurationData {
  development: boolean;
  test: boolean;
  production: boolean;
  developmentConfig: EnvironmentConfig;
  testConfig: EnvironmentConfig;
  productionConfig: EnvironmentConfig;
  lastSaved?: Date;
}

interface ConfigurationStepProps {
  data: WizardData;
  onUpdate: (data: Partial<ConfigurationData>) => void;
  onUpdateRequirements?: (data: { requiredAttributes: string[] }) => void;
}

const ConfigurationStep = ({ data, onUpdate, onUpdateRequirements }: ConfigurationStepProps) => {
  // Initialize attribute state from data
  const [bcscOpen, setBcscOpen] = useState(true);
  const [bceidOpen, setBceidOpen] = useState(true);
  const [entraOpen, setEntraOpen] = useState(false);
  const [addressChecked, setAddressChecked] = useState(
    data.requirements.requiredAttributes?.includes('Address information') || false
  );
  const [contactChecked, setContactChecked] = useState(
    data.requirements.requiredAttributes?.includes('Contact information') || false
  );
  const [demographicsChecked, setDemographicsChecked] = useState(
    data.requirements.requiredAttributes?.includes('Demographics') || false
  );

  // Determine which IDPs were recommended
  const recommendedIDPs = data.solution.components || [];
  const hasBCSC = recommendedIDPs.some(c => c.toLowerCase().includes('bc services card') || c.toLowerCase().includes('bcsc'));
  const hasBCeID = recommendedIDPs.some(c => c.toLowerCase().includes('bceid'));
  const hasEntra = recommendedIDPs.some(c => c.toLowerCase().includes('entra') || c.toLowerCase().includes('azure') || c.toLowerCase().includes('microsoft'));
  const hasAnyIDP = hasBCSC || hasBCeID || hasEntra;

  const [configData, setConfigData] = useState<ConfigurationData>(() => {
    const initialData: ConfigurationData = {
      development: true, // Pre-check development as default
      test: false,
      production: false,
      developmentConfig: {
        applicationName: `${data.projectInfo.productName || 'Product'} - Dev`,
        redirectUris: 'http://localhost:3000/auth/callback\nhttp://localhost:8080/auth/callback',
        additionalNotes: ''
      },
      testConfig: {
        applicationName: `${data.projectInfo.productName || 'Product'} - Test`,
        redirectUris: 'https://test.example.com/auth/callback',
        additionalNotes: ''
      },
      productionConfig: {
        applicationName: data.projectInfo.productName || 'Product',
        redirectUris: 'https://example.com/auth/callback',
        additionalNotes: '',
        businessApprovalContact: ''
      }
    };
    
    return initialData;
  });

  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      onUpdate(configData);
      setLastSaved(new Date());
    }, 1000);

    return () => clearTimeout(timer);
  }, [configData, onUpdate]);

  const updateEnvironment = (environment: 'development' | 'test' | 'production', enabled: boolean) => {
    setConfigData(prev => ({
      ...prev,
      [environment]: enabled
    }));
  };

  const updateEnvironmentConfig = (environment: 'development' | 'test' | 'production', field: keyof EnvironmentConfig, value: string | Date) => {
    const configKey = `${environment}Config` as const;
    setConfigData(prev => ({
      ...prev,
      [configKey]: {
        ...prev[configKey],
        [field]: value
      }
    }));
  };

  const environments = [
    { key: 'development', label: 'Development', description: 'For initial integration and testing' },
    { key: 'test', label: 'Test', description: 'For user acceptance testing and staging' },
    { key: 'production', label: 'Production', description: 'For live service delivery (requires additional approval)' }
  ] as const;

  return (
    <div className="space-y-8">
      {/* Configure Attributes Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Configure Attributes</h3>
          <p className="text-muted-foreground">
            Based on your selected identity providers, configure which user attributes your application needs
          </p>
        </div>

        {hasAnyIDP ? (
          <div className="space-y-4">
            {/* BC Services Card */}
            {hasBCSC && (
              <Card className="border-2">
                <Collapsible open={bcscOpen} onOpenChange={setBcscOpen}>
                  <CardHeader className="pb-3">
                    <CollapsibleTrigger className="flex items-center justify-between w-full group">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <CardTitle className="text-lg">BC Services Card</CardTitle>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${bcscOpen ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                  </CardHeader>
                  <CollapsibleContent>
                    <CardContent className="space-y-4">
                      {/* Required attribute */}
                      <div className="flex items-start gap-3">
                        <Checkbox checked disabled className="mt-1" />
                        <div className="flex-1">
                          <div className="font-medium">Basic identity (Required)</div>
                          <div className="text-sm text-muted-foreground">
                            → Name, Date of birth, Unique identifier
                          </div>
                        </div>
                      </div>

                      {/* Optional attribute with warning */}
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            checked={addressChecked} 
                            onCheckedChange={(checked) => {
                              setAddressChecked(checked === true);
                              if (onUpdateRequirements) {
                                const newAttrs = checked 
                                  ? [...(data.requirements.requiredAttributes || []).filter(a => a !== 'Address information'), 'Address information']
                                  : (data.requirements.requiredAttributes || []).filter(a => a !== 'Address information');
                                onUpdateRequirements({ requiredAttributes: newAttrs });
                              }
                            }}
                            className="mt-1" 
                          />
                          <div className="flex-1">
                            <div className="font-medium">Address information</div>
                          </div>
                        </div>
                        {addressChecked && (
                          <Alert className="border-l-4 border-l-orange-500 bg-orange-50 dark:bg-orange-950/20">
                            <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                            <AlertDescription className="text-sm">
                              <div className="font-semibold text-orange-900 dark:text-orange-100 mb-1">
                                Requires MISO/MPO approval
                              </div>
                              <div className="text-orange-800 dark:text-orange-200">
                                💡 Only request if essential for service delivery
                              </div>
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>

                      {/* Simple optional attributes */}
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          checked={contactChecked} 
                          onCheckedChange={(checked) => {
                            setContactChecked(checked === true);
                            if (onUpdateRequirements) {
                              const newAttrs = checked 
                                ? [...(data.requirements.requiredAttributes || []).filter(a => a !== 'Contact information'), 'Contact information']
                                : (data.requirements.requiredAttributes || []).filter(a => a !== 'Contact information');
                              onUpdateRequirements({ requiredAttributes: newAttrs });
                            }
                          }}
                          className="mt-1" 
                        />
                        <div className="flex-1">
                          <div className="font-medium">Contact information</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Checkbox 
                          checked={demographicsChecked} 
                          onCheckedChange={(checked) => {
                            setDemographicsChecked(checked === true);
                            if (onUpdateRequirements) {
                              const newAttrs = checked 
                                ? [...(data.requirements.requiredAttributes || []).filter(a => a !== 'Demographics'), 'Demographics']
                                : (data.requirements.requiredAttributes || []).filter(a => a !== 'Demographics');
                              onUpdateRequirements({ requiredAttributes: newAttrs });
                            }
                          }}
                          className="mt-1" 
                        />
                        <div className="flex-1">
                          <div className="font-medium">Demographics</div>
                        </div>
                      </div>

                      {/* Info box */}
                      <Alert className="border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950/20">
                        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <AlertDescription className="text-sm text-blue-900 dark:text-blue-100">
                          Selected attributes will require production approval. Timeline may vary based on complexity.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            )}

            {/* Basic BCeID */}
            {hasBCeID && (
              <Card className="border-2">
                <Collapsible open={bceidOpen} onOpenChange={setBceidOpen}>
                  <CardHeader className="pb-3">
                    <CollapsibleTrigger className="flex items-center justify-between w-full group">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <CardTitle className="text-lg">Basic BCeID</CardTitle>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${bceidOpen ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                  </CardHeader>
                  <CollapsibleContent>
                    <CardContent className="space-y-4">
                      {/* Fixed attribute */}
                      <div className="flex items-start gap-3">
                        <Checkbox checked disabled className="mt-1" />
                        <div className="flex-1">
                          <div className="font-medium">Basic identity only</div>
                          <div className="text-sm text-muted-foreground">
                            → Username, Email (if provided by user)
                          </div>
                        </div>
                      </div>

                      {/* Info box */}
                      <Alert className="border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950/20">
                        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <AlertDescription className="text-sm text-blue-900 dark:text-blue-100">
                          BCeID Basic has limited attribute support. Your application must collect any additional required data directly from users.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            )}

            {/* Microsoft Entra */}
            {hasEntra && (
              <Card className="border-2">
                <Collapsible open={entraOpen} onOpenChange={setEntraOpen}>
                  <CardHeader className="pb-3">
                    <CollapsibleTrigger className="flex items-center justify-between w-full group">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <CardTitle className="text-lg">Microsoft Entra</CardTitle>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${entraOpen ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                  </CardHeader>
                  <CollapsibleContent>
                    <CardContent className="space-y-4">
                      {/* Fixed attribute set */}
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-foreground mt-2" />
                        <div className="flex-1">
                          <div className="font-medium">Fixed attribute set</div>
                          <div className="text-sm text-muted-foreground">
                            → Employee ID, Display name, Email address, Department
                          </div>
                        </div>
                      </div>

                      {/* Info box */}
                      <Alert className="border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950/20">
                        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <AlertDescription className="text-sm text-blue-900 dark:text-blue-100">
                          Entra attributes are predetermined by your organization's Active Directory and cannot be customized through this portal.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            )}
          </div>
        ) : (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              No attribute configuration needed. Your selected identity providers use fixed attribute sets.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Environment Configuration Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Environment Selection</h3>
          <p className="text-muted-foreground">
            Configure access for each environment where users will authenticate
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {data.solution.components.map((provider) => (
            <span key={provider} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {provider}
            </span>
          ))}
        </div>
      </div>

      {/* Environment Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Environment Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Product</th>
                  <th className="text-center py-3 px-4 font-medium">Development</th>
                  <th className="text-center py-3 px-4 font-medium">Test</th>
                  <th className="text-center py-3 px-4 font-medium">Production</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-4 px-4 font-medium">{data.projectInfo.productName || 'Product'}</td>
                  {environments.map(({ key }) => (
                    <td key={key} className="py-4 px-4 text-center">
                      <Checkbox
                        checked={configData[key] || false}
                        onCheckedChange={(checked) => updateEnvironment(key, !!checked)}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Details */}
      <div className="space-y-4">
        {environments.map(({ key, label, description }) => {
          const isEnabled = configData[key];
          const configKey = `${key}Config` as const;
          const config = configData[configKey];
          
          if (!isEnabled) return null;

          return (
            <Card key={key}>
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <CardTitle className="text-base">
                          {data.projectInfo.productName || 'Product'} - {label} Environment
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Application Name</Label>
                      <Input
                        value={config?.applicationName || ''}
                        onChange={(e) => updateEnvironmentConfig(key, 'applicationName', e.target.value)}
                        placeholder={`${data.projectInfo.productName || 'Product'} - ${label}`}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Redirect URIs</Label>
                      <Textarea
                        value={config?.redirectUris || ''}
                        onChange={(e) => updateEnvironmentConfig(key, 'redirectUris', e.target.value)}
                        placeholder={
                          key === 'development' 
                            ? 'http://localhost:3000/auth/callback\nhttp://localhost:8080/auth/callback'
                            : key === 'test'
                            ? 'https://test.example.com/auth/callback'
                            : 'https://example.com/auth/callback'
                        }
                        rows={3}
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-muted-foreground">
                        {key === 'development' && 'Use localhost URLs for local development'}
                        {key === 'test' && 'Use staging/test environment URLs'}
                        {key === 'production' && 'Use live production URLs'}
                      </p>
                    </div>

                    {key === 'production' && (
                      <>
                        <div className="space-y-2">
                          <Label>Go-live Date <span className="text-sm text-muted-foreground">(optional)</span></Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !config?.goLiveDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {config?.goLiveDate ? format(config.goLiveDate, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={config?.goLiveDate}
                                onSelect={(date) => date && updateEnvironmentConfig(key, 'goLiveDate', date)}
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label>Business Approval Contact</Label>
                          <Input
                            value={config?.businessApprovalContact || ''}
                            onChange={(e) => updateEnvironmentConfig(key, 'businessApprovalContact', e.target.value)}
                            placeholder="Name and email of business approver"
                            required
                          />
                        </div>

                        {(() => {
                          // Check if BC Services Card or BCeID are in recommended solutions
                          const hasBCServicesOrBCeID = data.solution.components.some(
                            provider => provider === "BC Services Card" || provider.includes("BCeID")
                          );
                          
                          if (!hasBCServicesOrBCeID) return null;
                          
                          return (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <div className="flex items-start space-x-2">
                                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-blue-900">Production Environment Notice</p>
                                  <p className="text-sm text-blue-700 mt-1">
                                    BC Services Card and BCeID production environments require additional approvals. Our team will guide you through this approval process.
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </>
                    )}

                    <div className="space-y-2">
                      <Label>Additional Notes <span className="text-sm text-muted-foreground">(optional)</span></Label>
                      <Textarea
                        value={config?.additionalNotes || ''}
                        onChange={(e) => updateEnvironmentConfig(key, 'additionalNotes', e.target.value)}
                        placeholder="Any additional requirements or notes..."
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>

      {/* Help Section */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <Info className="h-4 w-4" />
            <span>Environment Guidelines</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-green-700">Development</h4>
              <p className="text-muted-foreground">For initial integration and testing with localhost URLs</p>
            </div>
            <div>
              <h4 className="font-medium text-yellow-700">Test</h4>
              <p className="text-muted-foreground">For user acceptance testing and staging environments</p>
            </div>
            <div>
              <h4 className="font-medium text-red-700">Production</h4>
              <p className="text-muted-foreground">For live service delivery - requires business approval</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auto-save Status */}
      {lastSaved && (
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Save className="h-4 w-4" />
          <span>Last saved at {format(lastSaved, 'HH:mm:ss')}</span>
        </div>
      )}
    </div>
  );
};

export default ConfigurationStep;
