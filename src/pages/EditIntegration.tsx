import BCHeader from "@/components/BCHeader";
import IntegrationWizard from "@/components/IntegrationWizard";
import { useParams } from "react-router-dom";

const EditIntegration = () => {
  const { id } = useParams();

  // Mock data - in a real app this would come from an API based on the id
  const existingData = {
    projectInfo: {
      productName: "Citizen Services Portal",
      productDescription: "A comprehensive portal for citizens to access government services",
      ministry: "Citizens' Services",
      userCategory: "public",
      userTypes: ["BC Services Card", "BCeID"],
      productOwnerName: "Jane Smith",
      productOwnerEmail: "jane.smith@gov.bc.ca",
      technicalLeadName: "John Doe",
      technicalLeadEmail: "john.doe@gov.bc.ca",
      description: "A comprehensive portal for citizens to access government services",
      sponsor: "Jane Smith",
      technicalContact: "John Doe",
      timeline: "Q2 2024",
      environments: ["Development", "Test", "Production"]
    },
    requirements: {
      clientProtocol: "OIDC",
      useCase: "browser-login",
      clientType: "public",
      dataClassification: "protected-b",
      requiredAttributes: ["email", "firstName", "lastName"],
      customAttributes: "",
      environments: ["Development", "Test", "Production"],
      additionalRequirements: "",
      primaryPurpose: "Public service access",
      userBase: ["Citizens"],
      dataSensitivity: "Protected B",
      specialRequirements: [],
      assuranceLevel: "2"
    },
    solution: {
      recommended: "CSS Gold Service",
      components: ["BC Services Card", "BCeID", "IDIR"],
      reasoning: "Based on your requirements for public access and Protected B data"
    },
    configuration: {
      development: true,
      test: true,
      production: true,
      developmentConfig: {
        applicationName: "Citizen Services Portal - Dev",
        redirectUris: "https://dev.example.com/callback",
        additionalNotes: ""
      },
      testConfig: {
        applicationName: "Citizen Services Portal - Test",
        redirectUris: "https://test.example.com/callback",
        additionalNotes: ""
      },
      productionConfig: {
        applicationName: "Citizen Services Portal - Prod",
        redirectUris: "https://example.com/callback",
        additionalNotes: "",
        goLiveDate: new Date("2024-06-15"),
        businessApprovalContact: "jane.smith@gov.bc.ca"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BCHeader />
      <main className="container mx-auto px-4 py-8">
        <IntegrationWizard isEditMode={true} initialData={existingData} integrationId={id} initialStep={4} />
      </main>
    </div>
  );
};

export default EditIntegration;
