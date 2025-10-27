import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Check, Save, ArrowLeft, Settings, Shield, Users } from "lucide-react";

interface TechnicalRequirementsData {
  clientProtocol: string;
  useCase: string;
  clientType: string;
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

  const clientProtocolOptions = [
    {
      value: "oidc",
      label: "OpenID Connect (Recommended)",
      description: ""
    },
    {
      value: "saml",
      label: "SAML",
      description: ""
    }
  ];

  const useCaseOptions = [
    {
      value: "browser-login",
      label: "Browser Login",
      description: "Users sign in through a web browser interface"
    },
    {
      value: "service-principal",
      label: "Service Account",
      description: "Machine-to-machine authentication without user interaction (e.g., API calls, background processes, automated services)"
    },
    {
      value: "browser-and-service",
      label: "Browser Login and Service Account",
      description: "Your product requires both user sign-in and automated system access"
    }
  ];

  const clientTypeOptions = [
    {
      value: "confidential",
      label: "Confidential Client",
      description: "Your application has a secure back-end component that can safely store secrets to communicate with the authentication server"
    },
    {
      value: "public",
      label: "Public Client",
      description: "Your application runs entirely in the browser or on user devices and uses PKCE (Proof Key for Code Exchange) for secure authentication without storing secrets"
    }
  ];

  const dataClassificationOptions = [
    {
      value: "public",
      label: "Public (No Sensitivity)",
      description: "Information with no harm if disclosed (e.g., publicly available documents, general announcements, published reports)"
    },
    {
      value: "protected-a",
      label: "Protected A (Low Sensitivity)",
      description: "Information where disclosure could cause harm to an individual, organization or government (e.g., internal directories, draft policies, basic personal information)"
    },
    {
      value: "protected-b",
      label: "Protected B (Medium Sensitivity)",
      description: "Information where disclosure could cause serious harm to an individual, organization or government (e.g., personal records, financial information, detailed service applications)"
    },
    {
      value: "protected-c",
      label: "Protected C (High Sensitivity)",
      description: "Information where disclosure could cause extremely grave harm to an individual, organization or government (e.g., health records, law enforcement data, classified documents, security information)"
    }
  ];

  // Generate attribute options based on selected user types
  const getAttributeOptionsByUserType = (userType: string) => {
    const attributeOptions: string[] = [];
    
    if (userType === "BC residents/Canadian residents") {
      attributeOptions.push(
        "Basic Identity (Name, unique identifier)",
        "Contact Information (Email address, phone number)",
        "Demographics (Date of birth, gender)",
        "Address Information (Mailing address, postal code)",
        "BC Services Card verification status"
      );
    }
    
    if (userType === "International users") {
      attributeOptions.push(
        "Basic Identity (Name, unique identifier)",
        "Contact Information (Email address, phone number)",
        "Demographics (Date of birth, gender)",
        "Address Information (Mailing address, postal code)"
      );
    }
    
    if (userType === "Individuals representing businesses or organizations") {
      attributeOptions.push(
        "Business Information (Business name, registration number)",
        "Business Address",
        "Authorized representative status"
      );
    }
    
    if (userType === "Government employees") {
      attributeOptions.push(
        "Government Employee Status (Ministry, role, employee ID)",
        "Security clearance level",
        "Organizational unit"
      );
    }
    
    if (userType === "Government contractors" || userType === "Broader public service employees") {
      attributeOptions.push(
        "Contractor/Partner Status (Organization, contract details)",
        "Access authorization level"
      );
    }
    
    return attributeOptions;
  };

  // Get external and internal user types
  const externalUserTypes = userTypes.filter(type => 
    type === "BC residents/Canadian residents" || 
    type === "International users" ||
    type === "Individuals representing businesses or organizations"
  );
  
  const internalUserTypes = userTypes.filter(type => 
    type === "Government employees" || 
    type === "Government contractors" || 
    type === "Broader public service employees"
  );


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


  const isFormValid = () => {
    return data.clientProtocol && data.useCase && data.clientType && data.dataClassification;
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

      <div className="space-y-4">
        {/* Section 1: Integration Set-up */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Settings className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Integration Set-up</CardTitle>
            </div>
            <CardDescription className="text-sm">Configure the technical details of your integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Client Protocol */}
            <div className="space-y-3">
              <div>
                <Label>Select Client Protocol</Label>
                <p className="text-sm text-muted-foreground mt-1">Choose the protocol your application will use to communicate with the identity service.</p>
              </div>
              <RadioGroup
                value={data.clientProtocol}
                onValueChange={(value) => onUpdate({ clientProtocol: value })}
                className="space-y-2"
              >
                {clientProtocolOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3">
                    <RadioGroupItem value={option.value} id={`protocol-${option.value}`} />
                    <Label htmlFor={`protocol-${option.value}`} className="cursor-pointer font-normal">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Separator />

            {/* Use Case */}
            <div className="space-y-3">
              <div>
                <Label>Select Use Case</Label>
                <p className="text-sm text-muted-foreground mt-1">Choose how users will interact with your product.</p>
              </div>
              <RadioGroup
                value={data.useCase}
                onValueChange={(value) => onUpdate({ useCase: value })}
                className="space-y-2"
              >
                {useCaseOptions.map((option) => (
                  <div key={option.value} className="flex items-start space-x-3">
                    <RadioGroupItem value={option.value} id={`usecase-${option.value}`} className="mt-0.5" />
                    <div className="flex-1">
                      <Label htmlFor={`usecase-${option.value}`} className="cursor-pointer font-normal">{option.label}</Label>
                      {option.description && (
                        <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Separator />

            {/* Client Type */}
            <div className="space-y-3">
              <div>
                <Label>Select Client Type</Label>
                <p className="text-sm text-muted-foreground mt-1">Choose the configuration based on your application architecture.</p>
              </div>
              <RadioGroup
                value={data.clientType}
                onValueChange={(value) => onUpdate({ clientType: value })}
                className="space-y-2"
              >
                {clientTypeOptions.map((option) => (
                  <div key={option.value} className="flex items-start space-x-3">
                    <RadioGroupItem value={option.value} id={`clienttype-${option.value}`} className="mt-0.5" />
                    <div className="flex-1">
                      <Label htmlFor={`clienttype-${option.value}`} className="cursor-pointer font-normal">{option.label}</Label>
                      {option.description && (
                        <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </RadioGroup>
              <p className="text-sm">
                <a href="#" className="text-primary hover:underline inline-flex items-center">
                  Click here to get help deciding which client type to use.
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Data Classification */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Data Classification</CardTitle>
            </div>
            <CardDescription className="text-sm">This classification determines identity verification requirements for individual users accessing your service</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>What type of information does your product handle?</Label>
              <p className="text-sm text-muted-foreground mt-1">
                <a href="https://www2.gov.bc.ca/assets/gov/government/services-for-government-and-broader-public-sector/information-technology-services/standards-files/618_information_security_classification_standard.pdf" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-primary hover:underline">
                  Learn more about BC government data classification standards
                </a>
              </p>
            </div>
            <RadioGroup
              value={data.dataClassification}
              onValueChange={(value) => onUpdate({ dataClassification: value })}
              className="space-y-2"
            >
              {dataClassificationOptions.map((option) => (
                <div key={option.value} className="flex items-start space-x-3">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="cursor-pointer font-normal">{option.label}</Label>
                    <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

      </div>

      {/* Footer Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalRequirementsForm;