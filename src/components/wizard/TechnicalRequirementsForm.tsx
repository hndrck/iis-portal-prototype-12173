import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Check, Save, ArrowLeft } from "lucide-react";

interface TechnicalRequirementsData {
  applicationType: string;
  applicationTypeOther: string;
  assuranceLevel: string;
  requiredAttributes: string[];
  customAttributes: string;
  environments: string[];
  additionalRequirements: string;
}

interface TechnicalRequirementsFormProps {
  data: TechnicalRequirementsData;
  onUpdate: (data: Partial<TechnicalRequirementsData>) => void;
  onNext: () => void;
  onBack: () => void;
  onSaveAndClose: () => void;
  currentStep?: number;
  totalSteps?: number;
  progressValue?: number;
}

const TechnicalRequirementsForm = ({ 
  data, 
  onUpdate, 
  onNext, 
  onBack,
  onSaveAndClose,
  currentStep = 2,
  totalSteps = 5,
  progressValue = 25
}: TechnicalRequirementsFormProps) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const applicationTypeOptions = [
    {
      value: "web-app",
      label: "Web Application",
      description: "Browser-based application that can securely store credentials on the server"
    },
    {
      value: "spa",
      label: "Single Page Application (SPA)",
      description: "JavaScript application running entirely in the browser"
    },
    {
      value: "mobile",
      label: "Mobile Application",
      description: "Native iOS or Android application"
    },
    {
      value: "service-api",
      label: "Service/API",
      description: "Backend service or API that needs to authenticate on behalf of users"
    },
    {
      value: "other",
      label: "Other",
      description: ""
    }
  ];

  const assuranceLevelOptions = [
    {
      value: "low",
      label: "Low",
      description: "Self-declared identity is sufficient (e.g., newsletter signup, general information)"
    },
    {
      value: "medium",
      label: "Medium",
      description: "Some identity verification required (e.g., service applications, personal information access)"
    },
    {
      value: "high",
      label: "High",
      description: "Strong identity verification required (e.g., financial services, health records, sensitive data)"
    },
    {
      value: "very-high",
      label: "Very High",
      description: "In-person identity verification required (e.g., high-value transactions, classified information)"
    }
  ];

  const attributeOptions = [
    "Basic Identity (Name, unique identifier)",
    "Contact Information (Email address, phone number)",
    "Demographics (Date of birth, gender)",
    "Address Information (Mailing address, postal code)",
    "Government Employee Status (Ministry, role, employee ID)",
    "Professional Credentials (License numbers, certifications)",
    "Custom Attributes"
  ];

  const environmentOptions = [
    {
      value: "development",
      label: "Development",
      description: "For initial development and testing"
    },
    {
      value: "test",
      label: "Test",
      description: "For user acceptance testing and staging"
    },
    {
      value: "production",
      label: "Production",
      description: "For live service delivery"
    }
  ];

  // Auto-save functionality
  useEffect(() => {
    const timer = setInterval(() => {
      if (data.applicationType || data.assuranceLevel) {
        setIsAutoSaving(true);
        setTimeout(() => {
          setLastSaved(new Date());
          setIsAutoSaving(false);
        }, 500);
      }
    }, 30000);

    return () => clearInterval(timer);
  }, [data]);

  const handleAttributeChange = (attribute: string, checked: boolean) => {
    if (checked) {
      onUpdate({ requiredAttributes: [...data.requiredAttributes, attribute] });
    } else {
      onUpdate({ requiredAttributes: data.requiredAttributes.filter(attr => attr !== attribute) });
    }
  };

  const handleEnvironmentChange = (environment: string, checked: boolean) => {
    if (checked) {
      onUpdate({ environments: [...data.environments, environment] });
    } else {
      onUpdate({ environments: data.environments.filter(env => env !== environment) });
    }
  };

  const isFormValid = () => {
    return data.applicationType && data.assuranceLevel && data.requiredAttributes.length > 0 && data.environments.length > 0;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/client">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/client/new-integration">New Integration</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Technical Requirements</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Technical Requirements</h1>
          <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
        </div>
        <Progress value={progressValue} className="w-full" />
      </div>

      <Card>
        <CardContent className="p-8 space-y-8">
          {/* Section 1: Application Type */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Application Type</h2>
              <p className="text-sm text-muted-foreground">This determines how your application will securely communicate with the identity service</p>
            </div>
            
            <div className="space-y-4">
              <Label>What type of application are you building? *</Label>
              <RadioGroup
                value={data.applicationType}
                onValueChange={(value) => onUpdate({ applicationType: value })}
                className="space-y-4"
              >
                {applicationTypeOptions.map((option) => (
                  <div key={option.value} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="font-medium">{option.label}</Label>
                    </div>
                    {option.description && (
                      <p className="text-sm text-muted-foreground ml-6">{option.description}</p>
                    )}
                    {option.value === "other" && data.applicationType === "other" && (
                      <div className="ml-6">
                        <Input
                          value={data.applicationTypeOther}
                          onChange={(e) => onUpdate({ applicationTypeOther: e.target.value })}
                          placeholder="Please describe your application type"
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Section 2: Level of Assurance */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Level of Assurance</h2>
              <p className="text-sm text-muted-foreground">Higher levels require more rigorous identity verification and determine which identity providers can be used</p>
            </div>
            
            <div className="space-y-4">
              <Label>How certain do you need to be of user identities? *</Label>
              <RadioGroup
                value={data.assuranceLevel}
                onValueChange={(value) => onUpdate({ assuranceLevel: value })}
                className="space-y-4"
              >
                {assuranceLevelOptions.map((option) => (
                  <div key={option.value} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="font-medium">{option.label}</Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">{option.description}</p>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Section 3: User Information Requirements */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">User Information Requirements</h2>
              <p className="text-sm text-muted-foreground">Only request information that's essential for your service to function</p>
            </div>
            
            <div className="space-y-4">
              <Label>What information do you need about users? *</Label>
              <p className="text-sm text-muted-foreground">Select all that apply</p>
              <div className="space-y-3">
                {attributeOptions.map((attribute) => (
                  <div key={attribute} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={attribute}
                        checked={data.requiredAttributes.includes(attribute)}
                        onCheckedChange={(checked) => handleAttributeChange(attribute, !!checked)}
                      />
                      <Label htmlFor={attribute} className="text-sm font-normal">{attribute}</Label>
                    </div>
                    {attribute === "Custom Attributes" && data.requiredAttributes.includes(attribute) && (
                      <div className="ml-6">
                        <Textarea
                          value={data.customAttributes}
                          onChange={(e) => onUpdate({ customAttributes: e.target.value })}
                          placeholder="Describe the custom attributes you need"
                          rows={2}
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Environment Setup */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Environment Setup</h2>
            </div>
            
            <div className="space-y-4">
              <Label>Which environments do you need? *</Label>
              <p className="text-sm text-muted-foreground">Select all that apply</p>
              <div className="space-y-3">
                {environmentOptions.map((env) => (
                  <div key={env.value} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={env.value}
                        checked={data.environments.includes(env.value)}
                        onCheckedChange={(checked) => handleEnvironmentChange(env.value, !!checked)}
                      />
                      <Label htmlFor={env.value} className="font-medium">{env.label}</Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">{env.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalRequirements">Any additional technical requirements or constraints?</Label>
              <p className="text-sm text-muted-foreground">Describe specific hosting requirements, integration timelines, or other technical considerations</p>
              <Textarea
                id="additionalRequirements"
                value={data.additionalRequirements}
                onChange={(e) => onUpdate({ additionalRequirements: e.target.value })}
                placeholder="Additional technical details..."
                rows={4}
              />
            </div>
          </div>
        </CardContent>

        {/* Footer Actions */}
        <div className="flex justify-between items-center p-6 border-t bg-muted/30">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            {lastSaved && (
              <>
                <Check className="h-4 w-4 text-green-600" />
                <span>Last saved at {lastSaved.toLocaleTimeString()}</span>
              </>
            )}
            {isAutoSaving && (
              <>
                <Save className="h-4 w-4 animate-pulse" />
                <span>Saving...</span>
              </>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              variant="outline"
              onClick={onSaveAndClose}
            >
              Save and Close
            </Button>
            <Button
              onClick={onNext}
              disabled={!isFormValid()}
              className="bg-primary hover:bg-primary/90"
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TechnicalRequirementsForm;