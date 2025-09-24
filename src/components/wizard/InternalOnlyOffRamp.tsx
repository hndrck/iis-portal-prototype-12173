import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { CheckCircle, ArrowLeft, Users, Clock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface InternalOnlyOffRampProps {
  data: any;
  onBack: () => void;
  onSubmit: () => void;
  progressValue?: number;
  currentStep?: number;
  totalSteps?: number;
}

const InternalOnlyOffRamp = ({ 
  data, 
  onBack, 
  onSubmit,
  progressValue = 100,
  currentStep = 5,
  totalSteps = 5
}: InternalOnlyOffRampProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // After showing confirmation, redirect to dashboard
      setTimeout(() => {
        onSubmit();
      }, 2000);
    }, 1000);
  };

  if (isSubmitted) {
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
                <BreadcrumbPage>Integration Request Submitted</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-green-800 mb-4">Request Submitted Successfully!</h1>
            <p className="text-muted-foreground mb-6">
              Your integration request has been forwarded to our ADMS team. You will receive a confirmation email shortly.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                <strong>Status:</strong> Referred to ADMS Team
              </p>
            </div>
            <p className="text-sm text-muted-foreground">Redirecting to dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold">Integration Request - Next Steps</h1>
          <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
        </div>
        <Progress value={progressValue} className="w-full" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Internal-only request</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-6">
            <p className="text-lg mb-6">
              Based on your requirements for internal-only access, you'll be connected directly with our ADMS team for IDIR/Entra onboarding.
            </p>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Internal-only identity services are managed through a separate process to ensure proper security and compliance.
            </AlertDescription>
          </Alert>

          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Next Steps</span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Our ADMS team will contact you within 2-3 business days</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>They will guide you through IDIR/Entra setup and configuration</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>No additional information is needed at this time</span>
              </li>
            </ul>
          </div>

          {/* Product Information Summary */}
          <div className="bg-muted/20 rounded-lg p-4">
            <h4 className="font-medium mb-2">Request Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Product Name:</span> {data.productName}
              </div>
              <div>
                <span className="font-medium">Product Description:</span> {data.productDescription}
              </div>
              <div>
                <span className="font-medium">Ministry:</span> {data.ministry}
              </div>
              <div>
                <span className="font-medium">Product Owner:</span> {data.productOwnerName}
              </div>
              <div>
                <span className="font-medium">Technical Lead:</span> {data.technicalLeadName}
              </div>
            </div>
          </div>
        </CardContent>

        {/* Footer Actions */}
        <div className="flex justify-between items-center p-6 border-t bg-muted/30">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isSubmitting}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Edit</span>
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default InternalOnlyOffRamp;