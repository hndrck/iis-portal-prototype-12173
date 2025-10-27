import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WizardData } from "../IntegrationWizard";

interface ConfigureAttributesStepProps {
  data: WizardData;
  onUpdate: (data: any) => void;
}

const ConfigureAttributesStep = ({ data, onUpdate }: ConfigureAttributesStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Configure Attributes</h3>
        <p className="text-muted-foreground">
          Based on your selected identity providers, configure which user attributes your application needs
        </p>
      </div>

      {/* Placeholder for future attribute configuration content */}
      <Card>
        <CardHeader>
          <CardTitle>User Attributes</CardTitle>
          <CardDescription>
            Configure the user attributes required by your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Attribute configuration will be available here
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigureAttributesStep;
