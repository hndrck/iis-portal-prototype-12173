import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail } from "lucide-react";

interface ContactCardProps {
  title: string;
  description: string;
  nameValue: string;
  emailValue: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  nameFieldId: string;
  emailFieldId: string;
  icon?: React.ReactNode;
}

const ContactCard = ({
  title,
  description,
  nameValue,
  emailValue,
  onNameChange,
  onEmailChange,
  nameFieldId,
  emailFieldId,
  icon
}: ContactCardProps) => {
  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-base font-medium">
          {icon || <User className="h-4 w-4 text-primary" />}
          <span>{title}</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={nameFieldId} className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Full Name</span>
          </Label>
          <Input
            id={nameFieldId}
            value={nameValue}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter full name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={emailFieldId} className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Email Address</span>
          </Label>
          <Input
            id={emailFieldId}
            type="email"
            value={emailValue}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="email@gov.bc.ca"
            required
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;