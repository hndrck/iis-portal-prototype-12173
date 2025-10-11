import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Check, Save, Package, Users, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductTeamSection from "./ProductTeamSection";

interface ProjectInfoIntakeData {
  productName: string;
  productDescription: string;
  ministry: string;
  userCategory: string;
  userTypes: string[];
  privacyZone?: string;
  productOwnerName: string;
  productOwnerEmail: string;
  technicalLeadName: string;
  technicalLeadEmail: string;
}

interface ProjectInfoIntakeFormProps {
  data: ProjectInfoIntakeData;
  onUpdate: (data: Partial<ProjectInfoIntakeData>) => void;
  onNext: () => void;
  onSaveAndClose: () => void;
  currentStep?: number;
  totalSteps?: number;
  progressValue?: number;
  steps?: Array<{ title: string; description: string }>;
}

const ProjectInfoIntakeForm = ({ 
  data, 
  onUpdate, 
  onNext, 
  onSaveAndClose,
  currentStep = 1,
  totalSteps = 5,
  progressValue = 0,
  steps = []
}: ProjectInfoIntakeFormProps) => {
  const navigate = useNavigate();
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const userCategoryOptions = [
    {
      value: "external",
      label: "External Only",
      description: "My product serves the public accessing government services (e.g., citizens, residents, or business owners accessing services for their own needs)",
      userTypes: [
        "BC residents/Canadian residents",
        "International users",
        "Individuals representing businesses or organizations"
      ]
    },
    {
      value: "internal",
      label: "Internal Only", 
      description: "My product is used to deliver or support government services (e.g., government staff, contractors, or authorized partner businesses operating on behalf of the province)",
      userTypes: [
        "Government employees",
        "Government contractors",
        "Broader public service employees",
        "Business entities that have a B2B relationship with the government to deliver services on behalf or in parallel with the province"
      ]
    },
    {
      value: "both",
      label: "Both",
      description: "My product serves both citizens and government employees (e.g., public portal with admin functions)",
      userTypes: []
    }
  ];

  const ministryOptions = [
    "Agriculture and Food",
    "Attorney General",
    "Children and Family Development",
    "Citizens' Services",
    "Education and Child Care",
    "Emergency Management and Climate Readiness",
    "Energy and Climate Solutions",
    "Environment and Parks",
    "Finance",
    "Forests",
    "Health",
    "Housing and Municipal Affairs",
    "Indigenous Relations and Reconciliation",
    "Infrastructure",
    "Jobs and Economic Growth",
    "Labour",
    "Mining and Critical Minerals",
    "Post-Secondary Education and Future Skills",
    "Public Safety and Solicitor General",
    "Social Development and Poverty Reduction",
    "Tourism, Arts, Culture and Sport",
    "Transportation and Transit",
    "Water, Land and Resource Stewardship",
    "Other"
  ];

  const privacyZoneOptions = [
    "BC Public Service Agency (Citizen)",
    "Business and Economy (Citizen)",
    "Citizens' Services (Citizen)",
    "Citizens' Services (Professional)",
    "Education (Citizen)",
    "Education (Professional)",
    "Finance (Citizen)",
    "Health (Citizen)",
    "Health (Provider)",
    "Justice (Citizen)",
    "Justice (Professional)",
    "Natural Resources (Citizen)",
    "Natural Resources (Professional)",
    "Social (Citizen)",
    "Social (Professional)",
    "Transportation (Professional)"
  ];

  // Auto-save functionality
  useEffect(() => {
    const timer = setInterval(() => {
      if (data.productName || data.productDescription) {
        setIsAutoSaving(true);
        // Simulate auto-save
        setTimeout(() => {
          setLastSaved(new Date());
          setIsAutoSaving(false);
        }, 500);
      }
    }, 30000);

    return () => clearInterval(timer);
  }, [data]);

  const handleUserTypeChange = (userType: string, checked: boolean) => {
    if (checked) {
      onUpdate({ userTypes: [...data.userTypes, userType] });
    } else {
      onUpdate({ userTypes: data.userTypes.filter(type => type !== userType) });
    }
  };

  const isFormValid = () => {
    const baseValid = data.productName && 
           data.productDescription && 
           data.ministry && 
           data.userCategory &&
           data.userTypes.length > 0 && 
           data.productOwnerName && 
           data.productOwnerEmail && 
           data.technicalLeadName && 
           data.technicalLeadEmail;
    
    // If external or both is selected, privacy zone is required
    const needsPrivacyZone = data.userCategory === "external" || data.userCategory === "both";
    if (needsPrivacyZone && !data.privacyZone) {
      return false;
    }
    
    return baseValid;
  };

  const handleSubmit = () => {
    onNext();
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
              <BreadcrumbPage>New Integration</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">New Integration Request</h1>
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
        {/* Section 1: Product Details */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Product Details</CardTitle>
            </div>
            <CardDescription className="text-sm">Tell us about your product or application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="productName">What is the name of your product or application?</Label>
              <p className="text-sm text-muted-foreground">This is what users will see (e.g., 'BC Health Gateway', 'Internal HR Portal'). Please avoid using abbreviations in your product name.</p>
              <Input
                id="productName"
                value={data.productName}
                onChange={(e) => onUpdate({ productName: e.target.value })}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productDescription">Briefly describe what your product does</Label>
              <p className="text-sm text-muted-foreground">In 1-2 sentences, explain the main purpose of your product</p>
              <Textarea
                id="productDescription"
                value={data.productDescription}
                onChange={(e) => onUpdate({ productDescription: e.target.value })}
                placeholder="Describe your product..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ministry">Ministry/Organization</Label>
              <Select value={data.ministry} onValueChange={(value) => onUpdate({ ministry: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your ministry" />
                </SelectTrigger>
                <SelectContent>
                  {ministryOptions.map((ministry) => (
                    <SelectItem key={ministry} value={ministry}>
                      {ministry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Users & Access */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Users & Access</CardTitle>
            </div>
            <CardDescription className="text-sm">Define who will be using your product</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Who will use this product?</Label>
              <RadioGroup
                value={data.userCategory}
                onValueChange={(value) => {
                  onUpdate({ userCategory: value, userTypes: [] });
                }}
                className="space-y-2"
              >
                {userCategoryOptions.map((category) => (
                  <div key={category.value} className="flex items-start space-x-3">
                    <RadioGroupItem value={category.value} id={category.value} className="mt-0.5" />
                    <div className="flex-1">
                      <Label htmlFor={category.value} className="cursor-pointer font-normal">{category.label}</Label>
                      <p className="text-sm text-muted-foreground mt-0.5">{category.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Conditional User Groups */}
            {data.userCategory === "both" ? (
              <div className="space-y-4">
                <Separator />
                
                {/* External User Groups */}
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <Label>Select specific external user groups:</Label>
                  </div>
                  <div className="space-y-1.5 pl-2 border-l-2 border-primary/20">
                    {userCategoryOptions
                      .find(cat => cat.value === "external")
                      ?.userTypes.map((userType) => (
                        <div key={userType} className="flex items-center space-x-3 p-2 rounded hover:bg-accent/30 transition-colors">
                          <Checkbox
                            id={`external-${userType}`}
                            checked={data.userTypes.includes(userType)}
                            onCheckedChange={(checked) => handleUserTypeChange(userType, !!checked)}
                          />
                          <Label htmlFor={`external-${userType}`} className="text-sm font-normal cursor-pointer">{userType}</Label>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Internal User Groups */}
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <Label>Select specific internal user groups:</Label>
                  </div>
                  <div className="space-y-1.5 pl-2 border-l-2 border-primary/20">
                    {userCategoryOptions
                      .find(cat => cat.value === "internal")
                      ?.userTypes.map((userType) => (
                        <div key={userType} className="flex items-center space-x-3 p-2 rounded hover:bg-accent/30 transition-colors">
                          <Checkbox
                            id={`internal-${userType}`}
                            checked={data.userTypes.includes(userType)}
                            onCheckedChange={(checked) => handleUserTypeChange(userType, !!checked)}
                          />
                          <Label htmlFor={`internal-${userType}`} className="text-sm font-normal cursor-pointer">{userType}</Label>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : data.userCategory && (
              <>
                <Separator />
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <Label>Select specific user groups:</Label>
                  </div>
                  <div className="space-y-1.5 pl-2 border-l-2 border-primary/20">
                    {userCategoryOptions
                      .find(cat => cat.value === data.userCategory)
                      ?.userTypes.map((userType) => (
                        <div key={userType} className="flex items-center space-x-3 p-2 rounded hover:bg-accent/30 transition-colors">
                          <Checkbox
                            id={userType}
                            checked={data.userTypes.includes(userType)}
                            onCheckedChange={(checked) => handleUserTypeChange(userType, !!checked)}
                          />
                          <Label htmlFor={userType} className="text-sm font-normal cursor-pointer">{userType}</Label>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}

            {/* Privacy Zone - Only show for external or both */}
            {(data.userCategory === "external" || data.userCategory === "both") && (
              <>
                <Separator />
                <div className="space-y-3">
                  <Label htmlFor="privacyZone">Select Privacy Zone</Label>
                  <p className="text-sm text-muted-foreground">
                    A privacy zone is a logical grouping of services that share the same user identifiers. Choose the government sector you are in or supporting (Health, Justice, Natural Resources, etc.) and the type of user logging in (member of the public vs a professional in that sector).
                  </p>
                  <Select 
                    value={data.privacyZone} 
                    onValueChange={(value) => onUpdate({ privacyZone: value })}
                  >
                    <SelectTrigger id="privacyZone" className="bg-background">
                      <SelectValue placeholder="Select privacy zone" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      {privacyZoneOptions.map((zone) => (
                        <SelectItem key={zone} value={zone}>
                          {zone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm">
                    <a 
                      href="https://developer.gov.bc.ca/docs/default/component/bc-services-card-onboarding/developer-guide/#privacy-zones" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Learn more about privacy zones
                    </a>
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Section 3: Product Team */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Product Team</CardTitle>
            </div>
            <CardDescription className="text-sm">Who should we contact about this integration?</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductTeamSection 
              data={{
                productOwnerName: data.productOwnerName,
                productOwnerEmail: data.productOwnerEmail,
                technicalLeadName: data.technicalLeadName,
                technicalLeadEmail: data.technicalLeadEmail
              }}
              onUpdate={onUpdate}
            />
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <Card>
          <CardContent className="pt-6">
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
                  onClick={onSaveAndClose}
                >
                  Save and Close
                </Button>
                <Button
                  onClick={handleSubmit}
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
    </div>
  );
};

export default ProjectInfoIntakeForm;