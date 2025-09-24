
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, User, Shield, Settings, Globe } from "lucide-react";
import { WizardData } from "../IntegrationWizard";

interface ReviewStepProps {
  data: WizardData;
}

const ReviewStep = ({ data }: ReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
        <h3 className="text-2xl font-semibold text-primary">Integration Ready</h3>
        <p className="text-muted-foreground">
          Review your configuration below and submit to complete the setup
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base">
              <User className="h-5 w-5 text-primary" />
              <span>Project Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Product Name:</span> {data.projectInfo.productName}
            </div>
            <div>
              <span className="font-medium">Ministry:</span> {data.projectInfo.ministry}
            </div>
            <div>
              <span className="font-medium">User Types:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.projectInfo.userTypes.map((userType) => (
                  <Badge key={userType} variant="outline">{userType}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base">
              <Shield className="h-5 w-5 text-primary" />
              <span>Requirements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Use Case:</span> {data.requirements.useCase}
            </div>
            <div>
              <span className="font-medium">Assurance:</span> {data.requirements.assuranceLevel}
            </div>
            <div>
              <span className="font-medium">Attributes:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.requirements.requiredAttributes?.length > 0 ? (
                  data.requirements.requiredAttributes.map((attr) => (
                    <Badge key={attr} variant="outline">{attr}</Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground">None specified</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base">
              <Globe className="h-5 w-5 text-primary" />
              <span>Recommended Solutions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(() => {
              // Group user types by their identity provider
              const providerGroups: Record<string, string[]> = {};
              const loa = data.requirements.assuranceLevel || "";
              
              data.projectInfo.userTypes.forEach((userType) => {
                let provider = "";
                
                switch (userType) {
                  case "BC residents":
                  case "Canadian residents (outside BC)":
                  case "International users":
                    provider = loa === "low" ? "BCeID Basic" : "BC Services Card";
                    break;
                  case "People representing businesses or organizations":
                    provider = "BCeID Business";
                    break;
                  case "BC government employees":
                  case "Government contractors":
                    provider = "IDIR";
                    break;
                  case "Broader public service employees":
                  case "Other organizations with government relationships (RCMP, consulates, etc.)":
                    provider = "Entra Guest";
                    break;
                  default:
                    provider = "To be determined";
                }
                
                if (!providerGroups[provider]) {
                  providerGroups[provider] = [];
                }
                providerGroups[provider].push(userType);
              });
              
              return Object.entries(providerGroups).map(([provider, userTypes]) => (
                <div key={provider} className="border rounded-lg p-3">
                  <div className="font-medium mb-2">{provider}</div>
                  <div className="flex flex-wrap gap-1">
                    {userTypes.map((userType) => (
                      <Badge key={userType} variant="outline">
                        {userType}
                      </Badge>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base">
              <Settings className="h-5 w-5 text-primary" />
              <span>Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(data.configuration.providers).map(([provider, config]: [string, any]) => (
              <div key={provider} className="border rounded-lg p-3">
                <h4 className="font-medium mb-2">{provider}</h4>
                <div className="space-y-1 text-sm">
                  <div>
                    <span className="font-medium">Environments:</span>{' '}
                    {[
                      config.development && 'Development',
                      config.test && 'Test', 
                      config.production && 'Production'
                    ].filter(Boolean).join(', ')}
                  </div>
                  {config.development && (
                    <div>
                      <span className="font-medium">Dev App:</span> {config.developmentConfig?.applicationName}
                    </div>
                  )}
                  {config.test && (
                    <div>
                      <span className="font-medium">Test App:</span> {config.testConfig?.applicationName}
                    </div>
                  )}
                  {config.production && (
                    <div>
                      <span className="font-medium">Prod App:</span> {config.productionConfig?.applicationName}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {Object.keys(data.configuration.providers).length === 0 && (
              <p className="text-muted-foreground">No environments configured yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator />

      <Card className="border-accent/20 bg-accent/5">
        <CardHeader>
          <CardTitle className="text-primary">Next Steps</CardTitle>
          <CardDescription>
            After submission, you'll receive implementation documentation and credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Integration request will be processed automatically</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Development credentials will be generated</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Implementation guide will be emailed to technical contact</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Testing environment will be provisioned within 24 hours</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewStep;
