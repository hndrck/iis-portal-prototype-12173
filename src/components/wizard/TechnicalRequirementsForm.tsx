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
  useCase: string;
  dataClassification: string;
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
  steps?: Array<{ title: string; description: string }>;
  userCategory?: string;
  userTypes?: string[];
}

const TechnicalRequirementsForm = ({ 
  data, 
  onUpdate, 
  onNext, 
  onBack,
  onSaveAndClose,
  currentStep = 2,
  totalSteps = 5,
  progressValue = 25,
  steps = [],
  userCategory = "",
  userTypes = []
}: TechnicalRequirementsFormProps) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const allUseCaseOptions = [
    {
      value: "browser-login",
      label: "Browser Login",
      description: "Users sign in to your web application or website to access their account and use your service"
    },
    {
      value: "service-account",
      label: "Service Account",
      description: "Your application needs to access government data or services automatically in the background, without requiring individual user login each time"
    },
    {
      value: "browser-and-service",
      label: "Browser Login and Service Account",
      description: "Users sign in to access your service, and your application also needs to automatically access government data or services on their behalf"
    }
  ];

  // Filter use case options based on user category
  const useCaseOptions = userCategory === "external" 
    ? allUseCaseOptions.filter(option => option.value !== "service-account")
    : allUseCaseOptions;

  const dataClassificationOptions = [
    {
      value: "low",
      label: "Low sensitivity",
      description: "General information, no personal data (e.g., newsletters, public information)"
    },
    {
      value: "medium",
      label: "Medium sensitivity",
      description: "Some personal information (e.g., contact details, preferences, service applications)"
    },
    {
      value: "high",
      label: "High sensitivity",
      description: "Financial, health, or confidential data requiring strong identity verification"
    }
  ];

  // Generate attribute options based on selected user types
  const getAttributeOptionsByUserType = () => {
    const attributeOptions = new Set<string>();
    
    userTypes.forEach(userType => {
      // Common attributes for all types
      attributeOptions.add("Basic Identity (Name, unique identifier)");
      attributeOptions.add("Contact Information (Email address, phone number)");
      
      if (userType === "BC residents/Canadian residents/International users") {
        attributeOptions.add("Demographics (Date of birth, gender)");
        attributeOptions.add("Address Information (Mailing address, postal code)");
        attributeOptions.add("BC Services Card verification status");
      }
      
      if (userType === "Individuals representing businesses or organizations") {
        attributeOptions.add("Business Information (Business name, registration number)");
        attributeOptions.add("Business Address");
        attributeOptions.add("Authorized representative status");
      }
      
      if (userType === "Government employees") {
        attributeOptions.add("Government Employee Status (Ministry, role, employee ID)");
        attributeOptions.add("Security clearance level");
        attributeOptions.add("Organizational unit");
      }
      
      if (userType === "Government contractors" || userType === "Broader public service employees") {
        attributeOptions.add("Contractor/Partner Status (Organization, contract details)");
        attributeOptions.add("Access authorization level");
      }
    });
    
    return Array.from(attributeOptions);
  };

  const attributeOptions = getAttributeOptionsByUserType();

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
      if (data.useCase || data.dataClassification) {
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
    return data.useCase && data.dataClassification && data.requiredAttributes.length > 0 && data.environments.length > 0;
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
        {steps.length > 0 && (
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-2 ${
                    index < (currentStep - 1)
                      ? 'bg-primary text-primary-foreground'
                      : index === (currentStep - 1)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </div>
                <div
                  className={`text-xs text-center max-w-20 ${
                    index <= (currentStep - 1) ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {step.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Card>
        <CardContent className="p-8 space-y-8">
          {/* Section 1: Use Case */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Select Use Case</h2>
              <p className="text-sm text-muted-foreground">Choose the authentication pattern that best describes how users will interact with your service</p>
            </div>
            
            <div className="space-y-4">
              <Label>Select Use Case *</Label>
              <RadioGroup
                value={data.useCase}
                onValueChange={(value) => onUpdate({ useCase: value })}
                className="space-y-4"
              >
                {useCaseOptions.map((option) => (
                  <div key={option.value} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="font-medium">{option.label}</Label>
                    </div>
                    {option.description && (
                      <p className="text-sm text-muted-foreground ml-6">{option.description}</p>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Section 2: Data Classification */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Data Classification</h2>
              <p className="text-sm text-muted-foreground">This determines the level of identity verification required for individuals accessing your service</p>
            </div>
            
            <div className="space-y-4">
              <Label>What type of information does your product handle? *</Label>
              <p className="text-sm text-muted-foreground">This question determines identity verification requirements for individual users only</p>
              <RadioGroup
                value={data.dataClassification}
                onValueChange={(value) => onUpdate({ dataClassification: value })}
                className="space-y-4"
              >
                {dataClassificationOptions.map((option) => (
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
              <p className="text-sm text-muted-foreground">Select all that apply - attributes shown are based on your selected user types</p>
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
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label>Custom attributes</Label>
                <Textarea
                  value={data.customAttributes}
                  onChange={(e) => onUpdate({ customAttributes: e.target.value })}
                  placeholder="Don't see an attribute you need? Describe custom attributes here..."
                  rows={2}
                />
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Don't see an attribute you need? <Button variant="link" className="p-0 h-auto text-sm" onClick={onBack}>Go back to modify your user types</Button> or contact support for assistance.
                </p>
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