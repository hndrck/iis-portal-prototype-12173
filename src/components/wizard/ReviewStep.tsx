
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
              <span>Technical Requirements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border rounded-lg p-3">
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Client Protocol:</span>{' '}
                  {data.requirements.clientProtocol === 'oidc' ? 'OpenID Connect' : data.requirements.clientProtocol === 'saml' ? 'SAML' : data.requirements.clientProtocol}
                </div>
                <div>
                  <span className="font-medium">Use Case:</span>{' '}
                  {data.requirements.useCase === 'browser-login' ? 'Browser Login' : 
                   data.requirements.useCase === 'service-principal' ? 'Service Principal' :
                   data.requirements.useCase === 'browser-and-service' ? 'Browser Login and Service Principal' : 
                   data.requirements.useCase}
                </div>
                <div>
                  <span className="font-medium">Client Type:</span>{' '}
                  {data.requirements.clientType === 'confidential' ? 'Confidential Client' : 
                   data.requirements.clientType === 'public' ? 'Public Client' : 
                   data.requirements.clientType}
                </div>
                <div>
                  <span className="font-medium">Data Classification:</span> {data.requirements.dataClassification}
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
              const dataClassification = data.requirements.dataClassification || "";
              
              data.projectInfo.userTypes.forEach((userType) => {
                let provider = "";
                
                switch (userType) {
                  case "BC residents/Canadian residents":
                    provider = (dataClassification === "public" || dataClassification === "protected-a") ? "BCeID Basic" : "BC Services Card";
                    break;
                  case "International users":
                    provider = "BCeID Basic";
                    break;
                  case "Individuals representing businesses or organizations":
                    provider = "BCeID Business";
                    break;
                  case "Government employees":
                    provider = "IDIR";
                    break;
                  case "Government contractors":
                    provider = "Entra Guest";
                    break;
                  case "Broader public service employees":
                  case "Business entities that have a B2B relationship with the government to deliver services on behalf or in parallel with the province":
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
            <div className="border rounded-lg p-3">
              <h4 className="font-medium mb-2">{data.projectInfo.productName || 'Product'}</h4>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="font-medium">Environments:</span>{' '}
                  {[
                    data.configuration.development && 'Development',
                    data.configuration.test && 'Test', 
                    data.configuration.production && 'Production'
                  ].filter(Boolean).join(', ')}
                </div>
                {data.configuration.development && (
                  <div>
                    <span className="font-medium">Dev App:</span> {data.configuration.developmentConfig?.applicationName}
                  </div>
                )}
                {data.configuration.test && (
                  <div>
                    <span className="font-medium">Test App:</span> {data.configuration.testConfig?.applicationName}
                  </div>
                )}
                {data.configuration.production && (
                  <div>
                    <span className="font-medium">Prod App:</span> {data.configuration.productionConfig?.applicationName}
                  </div>
                )}
              </div>
            </div>
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
