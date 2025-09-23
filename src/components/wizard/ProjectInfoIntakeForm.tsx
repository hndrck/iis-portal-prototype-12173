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
}

interface ProjectInfoIntakeFormProps {
  data: ProjectInfoIntakeData;
  onUpdate: (data: Partial<ProjectInfoIntakeData>) => void;
  onNext: () => void;
  onSaveAndClose: () => void;
}

const ProjectInfoIntakeForm = ({ data, onUpdate, onNext, onSaveAndClose }: ProjectInfoIntakeFormProps) => {
  const navigate = useNavigate();
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const userTypeOptions = [
    "BC residents",
    "Canadian residents (outside BC)",
    "International users",
    "BC government employees",
    "Government contractors",
    "Broader public service employees",
    "People representing businesses or organizations",
    "Other organizations with government relationships (RCMP, consulates, etc.)"
  ];

  const ministryOptions = [
    "Ministry of Citizens' Services",
    "Ministry of Health",
    "Ministry of Education and Child Care",
    "Ministry of Transportation and Infrastructure",
    "Ministry of Social Development and Poverty Reduction",
    "Other"
  ];

  // Auto-save functionality
  useEffect(() => {
    const timer = setInterval(() => {
      if (data.serviceName || data.serviceDescription) {
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
    const requiredFields = data.serviceName && data.serviceDescription && data.userTypes.length > 0 && data.accountability;
    
    if (data.accountability === "no") {
      return requiredFields && 
        data.delegateProductOwnerName && 
        data.delegateProductOwnerEmail && 
        data.delegateTechnicalContactName && 
        data.delegateTechnicalContactEmail;
    }
    
    return requiredFields;
  };

  const handleSubmit = () => {
    if (data.accountability === "no") {
      // Show success message and return to dashboard
      alert("Request delegation email sent successfully!");
      navigate('/client');
    } else {
      onNext();
    }
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
          <span className="text-sm text-muted-foreground">Step 1 of 2</span>
        </div>
        <Progress value={50} className="w-full" />
      </div>

      <Card>
        <CardContent className="p-8 space-y-8">
          {/* Section 1: Service Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Service Details</h2>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serviceName">What is the name of your service or application? *</Label>
              <p className="text-sm text-muted-foreground">This is what users will see (e.g., 'BC Health Gateway', 'Internal HR Portal')</p>
              <Input
                id="serviceName"
                value={data.serviceName}
                onChange={(e) => onUpdate({ serviceName: e.target.value })}
                placeholder="Enter service name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceDescription">Briefly describe what your service does *</Label>
              <p className="text-sm text-muted-foreground">In 1-2 sentences, explain the main purpose of your service</p>
              <Textarea
                id="serviceDescription"
                value={data.serviceDescription}
                onChange={(e) => onUpdate({ serviceDescription: e.target.value })}
                placeholder="Describe your service..."
                rows={3}
                required
              />
            </div>
          </div>

          {/* Section 2: Users & Access */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Users & Access</h2>
              <p className="text-sm text-muted-foreground">Select all that apply</p>
            </div>
            
            <div className="space-y-4">
              <Label>Who will use this service? *</Label>
              <div className="grid grid-cols-1 gap-3">
                {userTypeOptions.map((userType) => (
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
          </div>

          {/* Section 3: Project Team */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Project Team</h2>
            </div>
            
            <div className="space-y-4">
              <Label>Are you the product owner or technical contact for this project? *</Label>
              <RadioGroup
                value={data.accountability}
                onValueChange={(value) => onUpdate({ accountability: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="product-owner" id="product-owner" />
                  <Label htmlFor="product-owner" className="font-normal">Yes, I'm the product owner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="technical-contact" id="technical-contact" />
                  <Label htmlFor="technical-contact" className="font-normal">Yes, I'm the technical contact</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="delegate" />
                  <Label htmlFor="delegate" className="font-normal">No, I'm submitting this on behalf of someone else</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Conditional Delegation Fields */}
            {data.accountability === "no" && (
              <div className="space-y-6 p-4 bg-muted/50 rounded-lg">
                <div>
                  <h3 className="font-medium mb-2">Who should we send this request to?</h3>
                  <p className="text-sm text-muted-foreground">We'll send them a link to continue this request. Only the accountable person should submit integration requests.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="delegateProductOwnerName">Product owner name *</Label>
                    <Input
                      id="delegateProductOwnerName"
                      value={data.delegateProductOwnerName}
                      onChange={(e) => onUpdate({ delegateProductOwnerName: e.target.value })}
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delegateProductOwnerEmail">Product owner email *</Label>
                    <Input
                      id="delegateProductOwnerEmail"
                      type="email"
                      value={data.delegateProductOwnerEmail}
                      onChange={(e) => onUpdate({ delegateProductOwnerEmail: e.target.value })}
                      placeholder="email@gov.bc.ca"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="delegateTechnicalContactName">Technical contact name *</Label>
                    <Input
                      id="delegateTechnicalContactName"
                      value={data.delegateTechnicalContactName}
                      onChange={(e) => onUpdate({ delegateTechnicalContactName: e.target.value })}
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delegateTechnicalContactEmail">Technical contact email *</Label>
                    <Input
                      id="delegateTechnicalContactEmail"
                      type="email"
                      value={data.delegateTechnicalContactEmail}
                      onChange={(e) => onUpdate({ delegateTechnicalContactEmail: e.target.value })}
                      placeholder="email@gov.bc.ca"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Your Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Your Contact Information</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Name</Label>
                <Input
                  id="contactName"
                  value={data.contactName || "John Doe"}
                  readOnly
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">Pre-filled from IDIR session</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  value={data.contactEmail || "john.doe@gov.bc.ca"}
                  readOnly
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">Pre-filled from IDIR session</p>
              </div>
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
              {data.accountability === "no" ? "Send Delegation Email" : "Next"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectInfoIntakeForm;