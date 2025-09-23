
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectInfoIntakeForm from "./wizard/ProjectInfoIntakeForm";
import TechnicalRequirementsForm from "./wizard/TechnicalRequirementsForm";
import SolutionStep from "./wizard/SolutionStep";
import ConfigurationStep from "./wizard/ConfigurationStep";
import ReviewStep from "./wizard/ReviewStep";

export interface WizardData {
  projectInfo: {
    serviceName: string;
    serviceDescription: string;
    userTypes: string[];
    accountability: string;
    delegateProductOwnerName: string;
    delegateProductOwnerEmail: string;
    delegateTechnicalContactName: string;
    delegateTechnicalContactEmail: string;
    contactName: string;
    contactEmail: string;
    ministry: string;
    // Legacy fields for compatibility with other steps
    description: string;
    sponsor: string;
    technicalContact: string;
    timeline: string;
    environments: string[];
  };
  requirements: {
    applicationType: string;
    applicationTypeOther: string;
    assuranceLevel: string;
    requiredAttributes: string[];
    customAttributes: string;
    environments: string[];
    additionalRequirements: string;
    // Legacy fields for compatibility with other steps
    primaryPurpose: string;
    userBase: string[];
    dataSensitivity: string;
    specialRequirements: string[];
  };
  solution: {
    recommended: string;
    components: string[];
    reasoning: string;
  };
  configuration: {
    redirectUrls: string[];
    scopes: string[];
    clientId: string;
    environment: string;
  };
}

const IntegrationWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<WizardData>({
    projectInfo: {
      serviceName: "",
      serviceDescription: "",
      userTypes: [],
      accountability: "",
      delegateProductOwnerName: "",
      delegateProductOwnerEmail: "",
      delegateTechnicalContactName: "",
      delegateTechnicalContactEmail: "",
      contactName: "John Doe", // Pre-filled from IDIR
      contactEmail: "john.doe@gov.bc.ca", // Pre-filled from IDIR
      ministry: "",
      // Legacy fields for compatibility
      description: "",
      sponsor: "",
      technicalContact: "",
      timeline: "",
      environments: []
    },
    requirements: {
      applicationType: "",
      applicationTypeOther: "",
      assuranceLevel: "",
      requiredAttributes: [],
      customAttributes: "",
      environments: [],
      additionalRequirements: "",
      // Legacy fields for compatibility
      primaryPurpose: "",
      userBase: [],
      dataSensitivity: "",
      specialRequirements: []
    },
    solution: {
      recommended: "",
      components: [],
      reasoning: ""
    },
    configuration: {
      redirectUrls: [],
      scopes: ["openid", "profile"],
      clientId: "",
      environment: "development"
    }
  });

  const steps = [
    {
      title: "Project Information",
      description: "Service details and team information"
    },
    {
      title: "Requirements",
      description: "Define your identity needs"
    },
    {
      title: "Solution",
      description: "Review our recommendation"
    },
    {
      title: "Configuration",
      description: "Set up your integration"
    },
    {
      title: "Review",
      description: "Confirm and submit"
    }
  ];

  const updateData = (section: keyof WizardData, updates: any) => {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }));
  };

  const nextStep = () => {
    if (data.projectInfo.accountability === "no" && currentStep === 0) {
      // Show success message and return to dashboard for delegation
      alert("Request delegation email sent successfully!");
      navigate('/client');
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        const requiredFields = data.projectInfo.serviceName && data.projectInfo.serviceDescription && data.projectInfo.userTypes.length > 0 && data.projectInfo.accountability;
        if (data.projectInfo.accountability === "no") {
          return requiredFields && 
            data.projectInfo.delegateProductOwnerName && 
            data.projectInfo.delegateProductOwnerEmail && 
            data.projectInfo.delegateTechnicalContactName && 
            data.projectInfo.delegateTechnicalContactEmail;
        }
        return requiredFields;
      case 1:
        return data.requirements.applicationType && data.requirements.assuranceLevel && data.requirements.requiredAttributes.length > 0 && data.requirements.environments.length > 0;
      case 2:
        return data.solution.recommended;
      case 3:
        // For configuration step, we need at least one redirect URL and a client ID
        return data.configuration.redirectUrls.length > 0 && data.configuration.clientId;
      case 4:
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    console.log("Integration submitted:", data);
    navigate('/client');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ProjectInfoIntakeForm
            data={data.projectInfo}
            onUpdate={(updates) => updateData('projectInfo', updates)}
            onNext={nextStep}
            onSaveAndClose={() => navigate('/client')}
            currentStep={currentStep + 1}
            totalSteps={steps.length}
            progressValue={(currentStep / (steps.length - 1)) * 100}
          />
        );
      case 1:
        return (
          <TechnicalRequirementsForm
            data={data.requirements}
            onUpdate={(updates) => updateData('requirements', updates)}
            onNext={nextStep}
            onBack={prevStep}
            onSaveAndClose={() => navigate('/client')}
            currentStep={currentStep + 1}
            totalSteps={steps.length}
            progressValue={(currentStep / (steps.length - 1)) * 100}
          />
        );
      case 2:
        return (
          <SolutionStep
            data={data}
            onUpdate={(updates) => updateData('solution', updates)}
          />
        );
      case 3:
        return (
          <ConfigurationStep
            data={data.configuration}
            onUpdate={(updates) => updateData('configuration', updates)}
          />
        );
      case 4:
        return (
          <ReviewStep data={data} />
        );
      default:
        return null;
    }
  };

  // For steps 0 and 1, render the forms directly without the card wrapper
  if (currentStep === 0 || currentStep === 1) {
    return renderStep();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bc-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">New Integration</CardTitle>
              <CardDescription>
                Step {currentStep + 1} of {steps.length}: {steps[currentStep].description}
              </CardDescription>
            </div>
            <Button variant="outline" onClick={() => navigate('/client')}>
              Cancel
            </Button>
          </div>
          <div className="mt-6">
            <Progress value={(currentStep / (steps.length - 1)) * 100} className="w-full" />
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`text-xs ${
                    index <= currentStep ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {step.title}
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          {renderStep()}
        </CardContent>
        <div className="flex justify-between p-6 border-t">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          {currentStep === steps.length - 1 ? (
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
              Submit Integration
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="bg-primary hover:bg-primary/90"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default IntegrationWizard;
