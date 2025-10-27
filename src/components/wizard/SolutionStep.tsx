
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Shield, Users, Globe, AlertCircle, ExternalLink, Info } from "lucide-react";
import { WizardData } from "../IntegrationWizard";

interface SolutionStepProps {
  data: WizardData;
  onUpdate: (data: any) => void;
}

const SolutionStep = ({ data, onUpdate }: SolutionStepProps) => {
  const [showAppealModal, setShowAppealModal] = useState(false);
  const [appealData, setAppealData] = useState({
    explanation: "",
    contactMethod: "",
    bestTime: ""
  });

  // Get documentation link for each IDP
  const getIdpDocLink = (provider: string): string => {
    const docLinks: Record<string, string> = {
      "BC Services Card": "https://github.com/bcgov/sso-docs/wiki/BC-Services-Card",
      "BCeID Basic": "https://github.com/bcgov/sso-docs/wiki/BCeID",
      "BCeID Business": "https://github.com/bcgov/sso-docs/wiki/BCeID",
      "IDIR": "https://github.com/bcgov/sso-docs/wiki/IDIR",
      "Entra Guest": "https://github.com/bcgov/sso-docs/wiki/Azure-IDIR"
    };
    return docLinks[provider] || "#";
  };

  // Get recommendation reasoning for each IDP
  const getRecommendationReason = (provider: string, userType: string, dataClassification: string): string => {
    if (provider === "BC Services Card") {
      return "Recommended because you need BC residents with Protected B/C data classification";
    } else if (provider === "BCeID Basic" || provider === "BCeID Business") {
      if (userType === "International users") {
        return "Recommended because you need international users";
      } else if (userType === "Individuals representing businesses or organizations") {
        return "Recommended because you need business representatives";
      }
      return "Recommended because you need international users or business representatives";
    } else if (provider === "IDIR" || provider === "Entra Guest") {
      return "Recommended because you selected internal government users only";
    }
    return "";
  };

  // Decision logic based on user types and Level of Assurance
  const recommendedSolutions = useMemo(() => {
    const solutions: Array<{
      userType: string;
      provider: string;
      description: string;
      userExperience: string;
      icon?: string;
    }> = [];

    const userTypes = data.projectInfo.userTypes || [];
    const dataClassification = data.requirements.dataClassification || "";

    userTypes.forEach(userType => {
      switch (userType) {
        case "BC residents/Canadian residents":
          if (dataClassification === "public" || dataClassification === "protected-a") {
            solutions.push({
              userType,
              provider: "BCeID Basic",
              description: "Basic identity verification for general access",
              userExperience: "Users create a simple account with email verification"
            });
          } else {
            solutions.push({
              userType,
              provider: "BC Services Card",
              description: "Verified identity for BC residents",
              userExperience: "Users sign in with BC Services Card app or website"
            });
          }
          break;
        case "International users":
          solutions.push({
            userType,
            provider: "BCeID Basic",
            description: "Basic identity verification for general access",
            userExperience: "Users create a simple account with email verification"
          });
          break;
        case "Individuals representing businesses or organizations":
          solutions.push({
            userType,
            provider: "BCeID Business",
            description: "Secure authentication for business representatives",
            userExperience: "Users sign in with their organization credentials"
          });
          break;
        case "Government employees":
          solutions.push({
            userType,
            provider: "IDIR",
            description: "Secure authentication for government staff",
            userExperience: "Users sign in with their government credentials"
          });
          break;
        case "Government contractors":
          solutions.push({
            userType,
            provider: "Entra Guest",
            description: "Enterprise authentication for external organizations",
            userExperience: "Users sign in with their organization's Microsoft credentials"
          });
          break;
        case "Broader public service employees":
        case "Business entities that have a B2B relationship with the government to deliver services on behalf or in parallel with the province":
          solutions.push({
            userType,
            provider: "Entra Guest",
            description: "Enterprise authentication for external organizations",
            userExperience: "Users sign in with their organization's Microsoft credentials"
          });
          break;
      }
    });

    return solutions;
  }, [data.projectInfo.userTypes, data.requirements.assuranceLevel]);

  const solutionSummary = useMemo(() => {
    const providers = recommendedSolutions.map(s => s.provider);
    let recommended = "";
    let components: string[] = [];
    let reasoning = "";

    if (providers.length === 1) {
      recommended = providers[0];
      components = [providers[0]];
    } else if (providers.length > 1) {
      recommended = providers.join(" + ");
      components = providers;
    } else {
      recommended = "BC Services Card";
      components = ["BC Services Card"];
    }

    reasoning = `Based on your selected user types (${data.projectInfo.userTypes?.join(", ")}) and ${data.requirements.dataClassification} data classification, this solution provides the appropriate identity verification.`;

    return { recommended, components, reasoning };
  }, [recommendedSolutions, data.projectInfo.userTypes, data.requirements.assuranceLevel]);

  useEffect(() => {
    // Only update if the current solution data doesn't match the generated solution
    if (
      data.solution.recommended !== solutionSummary.recommended ||
      JSON.stringify(data.solution.components) !== JSON.stringify(solutionSummary.components) ||
      data.solution.reasoning !== solutionSummary.reasoning
    ) {
      onUpdate(solutionSummary);
    }
  }, [solutionSummary, data.solution, onUpdate]);

  const handleAppealSubmit = () => {
    console.log("Appeal submitted:", appealData);
    setShowAppealModal(false);
    // Here you would typically send the appeal to your backend
    alert("Your request has been submitted. Our identity services team will contact you within 2 business days.");
  };

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl">Your Requirements</CardTitle>
          <CardDescription>
            User types: {data.projectInfo.userTypes?.join(", ")} | Data Classification: {data.requirements.dataClassification}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-4">Recommended Identity Services:</h3>
          
          {/* Solution Cards */}
          <div className="space-y-4">
            {recommendedSolutions.map((solution, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-lg">{solution.userType} will use:</h4>
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                          {solution.provider}
                        </Badge>
                        <a 
                          href={getIdpDocLink(solution.provider)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                          title="View documentation"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {getRecommendationReason(solution.provider, solution.userType, data.requirements.dataClassification || "")}
                      </p>
                      <p className="text-muted-foreground mb-2">{solution.description}</p>
                      <p className="text-sm text-muted-foreground italic">{solution.userExperience}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* General Documentation Link */}
          <div className="mt-6 pt-6 border-t">
            <a 
              href="https://github.com/bcgov/sso-docs/wiki" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Info className="h-4 w-4" />
              Want to learn more about all available identity providers? View complete IDP guide
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 bg-primary hover:bg-primary/90">
          <CheckCircle className="mr-2 h-4 w-4" />
          Accept These Recommendations
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => setShowAppealModal(true)}
        >
          <AlertCircle className="mr-2 h-4 w-4" />
          Request Different Identity Service(s)
        </Button>
      </div>

      {/* Appeal Modal */}
      <Dialog open={showAppealModal} onOpenChange={setShowAppealModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Different Identity Services</DialogTitle>
            <DialogDescription>
              Tell us why the recommended identity service(s) doesn't work for your product
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="explanation">Explanation</Label>
              <Textarea
                id="explanation"
                placeholder="Please explain why you need a different identity service..."
                value={appealData.explanation}
                onChange={(e) => setAppealData({...appealData, explanation: e.target.value})}
                className="min-h-[100px]"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="contactMethod">Preferred contact method <span className="text-sm text-muted-foreground">(optional)</span></Label>
              <Select 
                value={appealData.contactMethod} 
                onValueChange={(value) => setAppealData({...appealData, contactMethod: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contact method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="bestTime">Best time to reach you <span className="text-sm text-muted-foreground">(optional)</span></Label>
              <Input
                id="bestTime"
                placeholder="e.g., Weekdays 9-5 PST"
                value={appealData.bestTime}
                onChange={(e) => setAppealData({...appealData, bestTime: e.target.value})}
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              Our identity services team will review your request and contact you within 2 business days.
            </p>
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button 
              onClick={handleAppealSubmit}
              disabled={!appealData.explanation.trim()}
              className="flex-1"
            >
              Submit Request
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowAppealModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SolutionStep;
