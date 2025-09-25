
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface RequirementsData {
  primaryPurpose: string;
  userBase: string[];
  dataSensitivity: string;
  assuranceLevel: string;
  specialRequirements: string[];
}

interface RequirementsStepProps {
  data: RequirementsData;
  onUpdate: (data: Partial<RequirementsData>) => void;
}

const RequirementsStep = ({ data, onUpdate }: RequirementsStepProps) => {
  const userBaseOptions = [
    "BC Residents",
    "Canadian Residents", 
    "International Users",
    "Government Employees",
    "Business Users"
  ];

  const specialRequirements = [
    "Geographic Restrictions",
    "Device Management",
    "Multi-factor Authentication",
    "Age Verification",
    "Professional Licensing"
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Primary Purpose</Label>
        <RadioGroup
          value={data.primaryPurpose}
          onValueChange={(value) => onUpdate({ primaryPurpose: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="public" id="public" />
            <Label htmlFor="public">Public Service</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="internal" id="internal" />
            <Label htmlFor="internal">Internal Government</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="both" />
            <Label htmlFor="both">Both Public and Internal</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>Expected User Base</Label>
        <div className="space-y-2">
          {userBaseOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={option}
                checked={data.userBase.includes(option)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onUpdate({ userBase: [...data.userBase, option] });
                  } else {
                    onUpdate({ userBase: data.userBase.filter(u => u !== option) });
                  }
                }}
              />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Data Sensitivity Level <span className="text-sm text-muted-foreground">(optional)</span></Label>
        <RadioGroup
          value={data.dataSensitivity}
          onValueChange={(value) => onUpdate({ dataSensitivity: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="public" id="data-public" />
            <Label htmlFor="data-public">Public</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="protected-a" id="protected-a" />
            <Label htmlFor="protected-a">Protected A</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="protected-b" id="protected-b" />
            <Label htmlFor="protected-b">Protected B</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="protected-c" id="protected-c" />
            <Label htmlFor="protected-c">Protected C</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>Required Assurance Level <span className="text-sm text-muted-foreground">(optional)</span></Label>
        <RadioGroup
          value={data.assuranceLevel}
          onValueChange={(value) => onUpdate({ assuranceLevel: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="anonymous" id="anonymous" />
            <Label htmlFor="anonymous">Anonymous Access</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="basic" id="basic" />
            <Label htmlFor="basic">Basic Verification</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="verified" id="verified" />
            <Label htmlFor="verified">Verified Identity</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>Special Requirements <span className="text-sm text-muted-foreground">(optional)</span></Label>
        <div className="space-y-2">
          {specialRequirements.map((req) => (
            <div key={req} className="flex items-center space-x-2">
              <Checkbox
                id={req}
                checked={data.specialRequirements.includes(req)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onUpdate({ specialRequirements: [...data.specialRequirements, req] });
                  } else {
                    onUpdate({ specialRequirements: data.specialRequirements.filter(r => r !== req) });
                  }
                }}
              />
              <Label htmlFor={req}>{req}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequirementsStep;
