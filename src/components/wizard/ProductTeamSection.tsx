import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import ContactCard from "./ContactCard";

interface ProductTeamData {
  productOwnerName: string;
  productOwnerEmail: string;
  technicalLeadName: string;
  technicalLeadEmail: string;
}

interface ProductTeamSectionProps {
  data: ProductTeamData;
  onUpdate: (updates: Partial<ProductTeamData>) => void;
}

const ProductTeamSection = ({ data, onUpdate }: ProductTeamSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-4">
          All specified contacts will receive updates about this integration request
        </p>
        
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> These contacts must be the individuals accountable for this product. 
            Both roles are required for the integration process.
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-6">
        {/* Product Owner */}
        <div className="space-y-3">
          <ContactCard
            title="Product Owner"
            description="The person responsible for product strategy, requirements, and business decisions"
            nameValue={data.productOwnerName}
            emailValue={data.productOwnerEmail}
            onNameChange={(value) => onUpdate({ productOwnerName: value })}
            onEmailChange={(value) => onUpdate({ productOwnerEmail: value })}
            nameFieldId="productOwnerName"
            emailFieldId="productOwnerEmail"
          />
        </div>

        {/* Technical Lead */}
        <div className="space-y-3">
          <ContactCard
            title="Technical Lead"
            description="The person responsible for technical implementation, integration, and development oversight"
            nameValue={data.technicalLeadName}
            emailValue={data.technicalLeadEmail}
            onNameChange={(value) => onUpdate({ technicalLeadName: value })}
            onEmailChange={(value) => onUpdate({ technicalLeadEmail: value })}
            nameFieldId="technicalLeadName"
            emailFieldId="technicalLeadEmail"
          />
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Your Information:</strong> You are submitting this request on behalf of the product team above
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ProductTeamSection;