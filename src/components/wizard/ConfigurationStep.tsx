
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
import { CalendarIcon, ChevronDown, Info, Save } from "lucide-react";
import { WizardData } from "../IntegrationWizard";

interface EnvironmentConfig {
  applicationName: string;
  redirectUris: string;
  additionalNotes: string;
  goLiveDate?: Date;
  businessApprovalContact?: string;
}

interface ProviderEnvironments {
  development: boolean;
  test: boolean;
  production: boolean;
  developmentConfig: EnvironmentConfig;
  testConfig: EnvironmentConfig;
  productionConfig: EnvironmentConfig;
}

interface ConfigurationData {
  providers: Record<string, ProviderEnvironments>;
  lastSaved?: Date;
}

interface ConfigurationStepProps {
  data: WizardData;
  onUpdate: (data: Partial<ConfigurationData>) => void;
}

const ConfigurationStep = ({ data, onUpdate }: ConfigurationStepProps) => {
  const [configData, setConfigData] = useState<ConfigurationData>(() => {
    const initialData: ConfigurationData = { providers: {} };
    
    // Initialize providers from solution data
    if (data.solution.components) {
      data.solution.components.forEach(provider => {
        initialData.providers[provider] = {
          development: true, // Pre-check development as default
          test: false,
          production: false,
          developmentConfig: {
            applicationName: `${data.projectInfo.serviceName || 'Service'} - Dev`,
            redirectUris: 'http://localhost:3000/auth/callback\nhttp://localhost:8080/auth/callback',
            additionalNotes: ''
          },
          testConfig: {
            applicationName: `${data.projectInfo.serviceName || 'Service'} - Test`,
            redirectUris: 'https://test.example.com/auth/callback',
            additionalNotes: ''
          },
          productionConfig: {
            applicationName: data.projectInfo.serviceName || 'Service',
            redirectUris: 'https://example.com/auth/callback',
            additionalNotes: '',
            businessApprovalContact: ''
          }
        };
      });
    }
    
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

  const updateProviderEnvironment = (provider: string, environment: 'development' | 'test' | 'production', enabled: boolean) => {
    setConfigData(prev => ({
      ...prev,
      providers: {
        ...prev.providers,
        [provider]: {
          ...prev.providers[provider],
          [environment]: enabled
        }
      }
    }));
  };

  const updateEnvironmentConfig = (provider: string, environment: 'development' | 'test' | 'production', field: keyof EnvironmentConfig, value: string | Date) => {
    const configKey = `${environment}Config` as const;
    setConfigData(prev => ({
      ...prev,
      providers: {
        ...prev.providers,
        [provider]: {
          ...prev.providers[provider],
          [configKey]: {
            ...prev.providers[provider][configKey],
            [field]: value
          }
        }
      }
    }));
  };

  const environments = [
    { key: 'development', label: 'Development', description: 'For initial integration and testing' },
    { key: 'test', label: 'Test', description: 'For user acceptance testing and staging' },
    { key: 'production', label: 'Production', description: 'For live service delivery (requires approval)' }
  ] as const;

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Environment Configuration</h3>
        <p className="text-muted-foreground">
          Configure your environments for each identity provider
        </p>
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
                  <th className="text-left py-3 px-4 font-medium">Identity Provider</th>
                  <th className="text-center py-3 px-4 font-medium">Development</th>
                  <th className="text-center py-3 px-4 font-medium">Test</th>
                  <th className="text-center py-3 px-4 font-medium">Production</th>
                </tr>
              </thead>
              <tbody>
                {data.solution.components.map((provider) => (
                  <tr key={provider} className="border-b hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium">{provider}</td>
                    {environments.map(({ key }) => (
                      <td key={key} className="py-4 px-4 text-center">
                        <Checkbox
                          checked={configData.providers[provider]?.[key] || false}
                          onCheckedChange={(checked) => updateProviderEnvironment(provider, key, !!checked)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Details */}
      {data.solution.components.map((provider) => (
        <div key={provider} className="space-y-4">
          {environments.map(({ key, label, description }) => {
            const isEnabled = configData.providers[provider]?.[key];
            const configKey = `${key}Config` as const;
            const config = configData.providers[provider]?.[configKey];
            
            if (!isEnabled) return null;

            return (
              <Card key={`${provider}-${key}`}>
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <CardTitle className="text-base">
                            {provider} - {label} Environment
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
                          onChange={(e) => updateEnvironmentConfig(provider, key, 'applicationName', e.target.value)}
                          placeholder={`${data.projectInfo.serviceName || 'Service'} - ${label}`}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Redirect URIs</Label>
                        <Textarea
                          value={config?.redirectUris || ''}
                          onChange={(e) => updateEnvironmentConfig(provider, key, 'redirectUris', e.target.value)}
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
                            <Label>Go-live Date (Optional)</Label>
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
                                  onSelect={(date) => date && updateEnvironmentConfig(provider, key, 'goLiveDate', date)}
                                  className={cn("p-3 pointer-events-auto")}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="space-y-2">
                            <Label>Business Approval Contact *</Label>
                            <Input
                              value={config?.businessApprovalContact || ''}
                              onChange={(e) => updateEnvironmentConfig(provider, key, 'businessApprovalContact', e.target.value)}
                              placeholder="Name and email of business approver"
                              required
                            />
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start space-x-2">
                              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-blue-900">Production Environment Notice</p>
                                <p className="text-sm text-blue-700 mt-1">
                                  Production environments require additional approval and may take 3-5 business days to process.
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="space-y-2">
                        <Label>Additional Notes (Optional)</Label>
                        <Textarea
                          value={config?.additionalNotes || ''}
                          onChange={(e) => updateEnvironmentConfig(provider, key, 'additionalNotes', e.target.value)}
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
      ))}

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
