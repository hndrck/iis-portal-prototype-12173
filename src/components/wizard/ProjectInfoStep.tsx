
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface ProjectInfoData {
  serviceName: string;
  description: string;
  sponsor: string;
  technicalContact: string;
  timeline: string;
  environments: string[];
}

interface ProjectInfoStepProps {
  data: ProjectInfoData;
  onUpdate: (data: Partial<ProjectInfoData>) => void;
}

const ProjectInfoStep = ({ data, onUpdate }: ProjectInfoStepProps) => {
  const environments = ["Development", "Test", "Production"];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="serviceName">Service Name</Label>
        <Input
          id="serviceName"
          value={data.serviceName}
          onChange={(e) => onUpdate({ serviceName: e.target.value })}
          placeholder="Enter your service name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Service Description</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe what your service does"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sponsor">Product Sponsor <span className="text-sm text-muted-foreground">(optional)</span></Label>
          <Input
            id="sponsor"
            value={data.sponsor}
            onChange={(e) => onUpdate({ sponsor: e.target.value })}
            placeholder="Name of project sponsor"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="technicalContact">Technical Contact <span className="text-sm text-muted-foreground">(optional)</span></Label>
          <Input
            id="technicalContact"
            value={data.technicalContact}
            onChange={(e) => onUpdate({ technicalContact: e.target.value })}
            placeholder="Technical lead email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeline">Expected Timeline <span className="text-sm text-muted-foreground">(optional)</span></Label>
        <Input
          id="timeline"
          value={data.timeline}
          onChange={(e) => onUpdate({ timeline: e.target.value })}
          placeholder="e.g., 3 months, Q2 2024"
        />
      </div>

      <div className="space-y-3">
        <Label>Required Environments <span className="text-sm text-muted-foreground">(optional)</span></Label>
        <div className="space-y-2">
          {environments.map((env) => (
            <div key={env} className="flex items-center space-x-2">
              <Checkbox
                id={env}
                checked={data.environments.includes(env)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onUpdate({ environments: [...data.environments, env] });
                  } else {
                    onUpdate({ environments: data.environments.filter(e => e !== env) });
                  }
                }}
              />
              <Label htmlFor={env}>{env}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoStep;
