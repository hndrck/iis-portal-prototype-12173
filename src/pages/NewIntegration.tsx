
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BCHeader from "@/components/BCHeader";
import ProjectInfoIntakeForm from "@/components/wizard/ProjectInfoIntakeForm";

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

const NewIntegration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectInfoIntakeData>({
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
    ministry: ""
  });

  const handleUpdate = (updates: Partial<ProjectInfoIntakeData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    // TODO: Navigate to technical requirements page (Page 2)
    console.log("Moving to technical requirements with data:", formData);
    // For now, just log the data
  };

  const handleSaveAndClose = () => {
    // Save draft and return to dashboard
    console.log("Saving draft:", formData);
    navigate('/client');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BCHeader />
      <main className="container mx-auto px-4 py-8">
        <ProjectInfoIntakeForm
          data={formData}
          onUpdate={handleUpdate}
          onNext={handleNext}
          onSaveAndClose={handleSaveAndClose}
        />
      </main>
    </div>
  );
};

export default NewIntegration;
