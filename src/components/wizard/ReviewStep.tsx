
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
              <span className="font-medium">Service:</span> {data.projectInfo.serviceName}
            </div>
            <div>
              <span className="font-medium">Contact:</span> {data.projectInfo.technicalContact}
            </div>
            <div>
              <span className="font-medium">Timeline:</span> {data.projectInfo.timeline}
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {data.projectInfo.environments.map((env) => (
                <Badge key={env} variant="outline">{env}</Badge>
              ))}
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
              <span className="font-medium">Purpose:</span> {data.requirements.primaryPurpose}
            </div>
            <div>
              <span className="font-medium">Data Level:</span> {data.requirements.dataSensitivity}
            </div>
            <div>
              <span className="font-medium">Assurance:</span> {data.requirements.assuranceLevel}
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {data.requirements.userBase.map((user) => (
                <Badge key={user} variant="outline">{user}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base">
              <Globe className="h-5 w-5 text-primary" />
              <span>Recommended Solution</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Identity Solution:</span> {data.solution.recommended}
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {data.solution.components.map((component) => (
                <Badge key={component} variant="secondary" className="bg-accent text-primary">
                  {component}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base">
              <Settings className="h-5 w-5 text-primary" />
              <span>Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Client ID:</span> {data.configuration.clientId}
            </div>
            <div>
              <span className="font-medium">Environment:</span> {data.configuration.environment}
            </div>
            <div>
              <span className="font-medium">Redirect URLs:</span> {data.configuration.redirectUrls.length}
            </div>
            <div>
              <span className="font-medium">Scopes:</span> {data.configuration.scopes.length}
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
