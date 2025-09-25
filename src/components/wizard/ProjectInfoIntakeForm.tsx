import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Check, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectInfoIntakeData {
  productName: string;
  productDescription: string;
  ministry: string;
  userCategory: string;
  userTypes: string[];
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
      description: "My product serves citizens, residents, or businesses accessing government services",
      userTypes: [
        "BC residents/Canadian residents/International users",
        "Individuals representing businesses or organizations"
      ]
    },
    {
      value: "internal",
      label: "Internal Only", 
      description: "My product is only used by government employees, contractors, or authorized partners",
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
    return data.productName && 
           data.productDescription && 
           data.ministry && 
           data.userCategory &&
           data.userTypes.length > 0 && 
           data.productOwnerName && 
           data.productOwnerEmail && 
           data.technicalLeadName && 
           data.technicalLeadEmail;
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

      <Card>
        <CardContent className="p-8 space-y-8">
          {/* Section 1: Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Product Details</h2>
            </div>
            
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
          </div>

          {/* Section 2: Users & Access */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Users & Access</h2>
            </div>
            
            <div className="space-y-4">
              <Label>Who will use this product?</Label>
              <RadioGroup
                value={data.userCategory}
                onValueChange={(value) => {
                  onUpdate({ userCategory: value, userTypes: [] });
                }}
                className="space-y-4"
              >
                {userCategoryOptions.map((category) => (
                  <div key={category.value} className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value={category.value} id={category.value} className="mt-1" />
                      <div className="space-y-1">
                        <Label htmlFor={category.value} className="font-medium">{category.label}</Label>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Conditional User Groups */}
            {data.userCategory === "both" ? (
              <div className="space-y-6">
                {/* External User Groups */}
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                  <Label>Select specific external user groups:</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {userCategoryOptions
                      .find(cat => cat.value === "external")
                      ?.userTypes.map((userType) => (
                        <div key={userType} className="flex items-center space-x-2">
                          <Checkbox
                            id={`external-${userType}`}
                            checked={data.userTypes.includes(userType)}
                            onCheckedChange={(checked) => handleUserTypeChange(userType, !!checked)}
                          />
                          <Label htmlFor={`external-${userType}`} className="text-sm font-normal">{userType}</Label>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Internal User Groups */}
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                  <Label>Select specific internal user groups:</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {userCategoryOptions
                      .find(cat => cat.value === "internal")
                      ?.userTypes.map((userType) => (
                        <div key={userType} className="flex items-center space-x-2">
                          <Checkbox
                            id={`internal-${userType}`}
                            checked={data.userTypes.includes(userType)}
                            onCheckedChange={(checked) => handleUserTypeChange(userType, !!checked)}
                          />
                          <Label htmlFor={`internal-${userType}`} className="text-sm font-normal">{userType}</Label>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : data.userCategory && (
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <Label>Select specific user groups:</Label>
                <div className="grid grid-cols-1 gap-3">
                  {userCategoryOptions
                    .find(cat => cat.value === data.userCategory)
                    ?.userTypes.map((userType) => (
                      <div key={userType} className="flex items-center space-x-2">
                        <Checkbox
                          id={userType}
                          checked={data.userTypes.includes(userType)}
                          onCheckedChange={(checked) => handleUserTypeChange(userType, !!checked)}
                        />
                        <Label htmlFor={userType} className="text-sm font-normal">{userType}</Label>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Product Team */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Product Team</h2>
              <p className="text-sm text-muted-foreground">All specified contacts will receive updates about this integration request</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="productOwnerName">Product Owner Name</Label>
                  <Input
                    id="productOwnerName"
                    value={data.productOwnerName}
                    onChange={(e) => onUpdate({ productOwnerName: e.target.value })}
                    placeholder="Full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productOwnerEmail">Product Owner Email</Label>
                  <Input
                    id="productOwnerEmail"
                    type="email"
                    value={data.productOwnerEmail}
                    onChange={(e) => onUpdate({ productOwnerEmail: e.target.value })}
                    placeholder="email@gov.bc.ca"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="technicalLeadName">Technical Lead Name</Label>
                  <Input
                    id="technicalLeadName"
                    value={data.technicalLeadName}
                    onChange={(e) => onUpdate({ technicalLeadName: e.target.value })}
                    placeholder="Full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="technicalLeadEmail">Technical Lead Email</Label>
                  <Input
                    id="technicalLeadEmail"
                    type="email"
                    value={data.technicalLeadEmail}
                    onChange={(e) => onUpdate({ technicalLeadEmail: e.target.value })}
                    placeholder="email@gov.bc.ca"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 font-medium">Note: These contacts must be the individuals accountable for this product</p>
            </div>
          </div>

          {/* Section 4: Your Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Your Information</h2>
              <p className="text-sm text-muted-foreground">You are submitting this request on behalf of the product team above</p>
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
      </Card>
    </div>
  );
};

export default ProjectInfoIntakeForm;