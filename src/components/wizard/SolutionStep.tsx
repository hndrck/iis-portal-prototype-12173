
import { useEffect, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, Users, Globe } from "lucide-react";
import { WizardData } from "../IntegrationWizard";

interface SolutionStepProps {
  data: WizardData;
  onUpdate: (data: any) => void;
}

const SolutionStep = ({ data, onUpdate }: SolutionStepProps) => {
  // Memoize the generated solution to prevent infinite loops
  const generatedSolution = useMemo(() => {
    let recommended = "";
    let components: string[] = [];
    let reasoning = "";

    // Logic to determine solution based on requirements
    if (data.requirements.primaryPurpose === "public" || data.requirements.primaryPurpose === "both") {
      if (data.requirements.userBase.includes("BC Residents")) {
        recommended = "BC Services Card + BCeID";
        components = ["BC Services Card", "BCeID Business", "OAuth 2.0 / OpenID Connect"];
      }
    }

    if (data.requirements.primaryPurpose === "internal") {
      recommended = "IDIR Integration";
      components = ["IDIR", "Active Directory", "SAML 2.0"];
    }

    if (data.requirements.dataSensitivity === "protected-c" || data.requirements.assuranceLevel === "verified") {
      if (!components.includes("BC Services Card")) {
        components.unshift("BC Services Card");
      }
    }

    // Fallback solution
    if (!recommended) {
      recommended = "BC Services Card + BCeID";
      components = ["BC Services Card", "BCeID Business", "OAuth 2.0 / OpenID Connect"];
    }

    reasoning = `Based on your requirements for ${data.requirements.primaryPurpose} service with ${data.requirements.dataSensitivity} data sensitivity, this solution provides the appropriate level of identity assurance while maintaining ease of integration.`;

    return { recommended, components, reasoning };
  }, [data.requirements.primaryPurpose, data.requirements.userBase, data.requirements.dataSensitivity, data.requirements.assuranceLevel]);

  useEffect(() => {
    // Only update if the current solution data doesn't match the generated solution
    if (
      data.solution.recommended !== generatedSolution.recommended ||
      JSON.stringify(data.solution.components) !== JSON.stringify(generatedSolution.components) ||
      data.solution.reasoning !== generatedSolution.reasoning
    ) {
      onUpdate(generatedSolution);
    }
  }, [generatedSolution, data.solution, onUpdate]);

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Recommended Solution</span>
          </CardTitle>
          <CardDescription>
            Automatically selected based on your service requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg text-primary">{data.solution.recommended}</h4>
              <p className="text-muted-foreground mt-2">{data.solution.reasoning}</p>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium">Included Components:</h5>
              <div className="flex flex-wrap gap-2">
                {data.solution.components.map((component) => (
                  <Badge key={component} variant="secondary" className="bg-accent text-primary">
                    {component}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-sm">Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Meets {data.requirements.dataSensitivity} data classification requirements
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle className="text-sm">User Experience</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Optimized for {data.requirements.userBase.join(", ")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle className="text-sm">Standards</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              OAuth 2.0 / OpenID Connect compliant
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SolutionStep;
