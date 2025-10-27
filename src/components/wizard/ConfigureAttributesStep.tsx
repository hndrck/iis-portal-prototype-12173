import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { WizardData } from "../IntegrationWizard";
import { Check, ChevronDown, Info, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ConfigureAttributesStepProps {
  data: WizardData;
  onUpdate: (data: any) => void;
}

const ConfigureAttributesStep = ({ data, onUpdate }: ConfigureAttributesStepProps) => {
  const [bcscOpen, setBcscOpen] = useState(true);
  const [bceidOpen, setBceidOpen] = useState(true);
  const [entraOpen, setEntraOpen] = useState(false);
  const [addressChecked, setAddressChecked] = useState(false);
  const [contactChecked, setContactChecked] = useState(false);
  const [demographicsChecked, setDemographicsChecked] = useState(false);

  // Determine which IDPs were recommended
  const recommendedIDPs = data.solution.components || [];
  const hasBCSC = recommendedIDPs.some(c => c.toLowerCase().includes('bc services card') || c.toLowerCase().includes('bcsc'));
  const hasBCeID = recommendedIDPs.some(c => c.toLowerCase().includes('bceid'));
  const hasEntra = recommendedIDPs.some(c => c.toLowerCase().includes('entra') || c.toLowerCase().includes('azure') || c.toLowerCase().includes('microsoft'));

  const hasAnyIDP = hasBCSC || hasBCeID || hasEntra;

  if (!hasAnyIDP) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Configure Attributes</h3>
          <p className="text-muted-foreground">
            Based on your selected identity providers, configure which user attributes your application needs
          </p>
        </div>
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            No attribute configuration needed. Your selected identity providers use fixed attribute sets.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Configure Attributes</h3>
        <p className="text-muted-foreground">
          Based on your selected identity providers, configure which user attributes your application needs
        </p>
      </div>

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
                        onCheckedChange={(checked) => setAddressChecked(checked === true)}
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
                      onCheckedChange={(checked) => setContactChecked(checked === true)}
                      className="mt-1" 
                    />
                    <div className="flex-1">
                      <div className="font-medium">Contact information</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox 
                      checked={demographicsChecked} 
                      onCheckedChange={(checked) => setDemographicsChecked(checked === true)}
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
    </div>
  );
};

export default ConfigureAttributesStep;
