
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Plus, X } from "lucide-react";

interface ConfigurationData {
  redirectUrls: string[];
  scopes: string[];
  clientId: string;
  environment: string;
}

interface ConfigurationStepProps {
  data: ConfigurationData;
  onUpdate: (data: Partial<ConfigurationData>) => void;
}

const ConfigurationStep = ({ data, onUpdate }: ConfigurationStepProps) => {
  const [newRedirectUrl, setNewRedirectUrl] = useState("");
  const [newScope, setNewScope] = useState("");

  const addRedirectUrl = () => {
    if (newRedirectUrl && !data.redirectUrls.includes(newRedirectUrl)) {
      onUpdate({ redirectUrls: [...data.redirectUrls, newRedirectUrl] });
      setNewRedirectUrl("");
    }
  };

  const removeRedirectUrl = (url: string) => {
    onUpdate({ redirectUrls: data.redirectUrls.filter(u => u !== url) });
  };

  const addScope = () => {
    if (newScope && !data.scopes.includes(newScope)) {
      onUpdate({ scopes: [...data.scopes, newScope] });
      setNewScope("");
    }
  };

  const removeScope = (scope: string) => {
    onUpdate({ scopes: data.scopes.filter(s => s !== scope) });
  };

  const generateClientId = () => {
    const clientId = `iis-${Math.random().toString(36).substr(2, 9)}`;
    onUpdate({ clientId });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Redirect URLs *</Label>
        <div className="flex space-x-2">
          <Input
            value={newRedirectUrl}
            onChange={(e) => setNewRedirectUrl(e.target.value)}
            placeholder="https://your-app.com/auth/callback"
          />
          <Button type="button" onClick={addRedirectUrl}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {data.redirectUrls.map((url) => (
            <div key={url} className="flex items-center justify-between bg-muted p-2 rounded">
              <span className="text-sm">{url}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeRedirectUrl(url)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>OAuth Scopes</Label>
        <div className="flex space-x-2">
          <Input
            value={newScope}
            onChange={(e) => setNewScope(e.target.value)}
            placeholder="openid, profile, email"
          />
          <Button type="button" onClick={addScope}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.scopes.map((scope) => (
            <Badge key={scope} variant="secondary" className="flex items-center space-x-1">
              <span>{scope}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeScope(scope)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Client ID</Label>
        <div className="flex space-x-2">
          <Input
            value={data.clientId}
            onChange={(e) => onUpdate({ clientId: e.target.value })}
            placeholder="Your client identifier"
            readOnly
          />
          <Button type="button" onClick={generateClientId}>
            Generate
          </Button>
          <Button type="button" variant="outline">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Environment</Label>
        <Input
          value={data.environment}
          onChange={(e) => onUpdate({ environment: e.target.value })}
          placeholder="development, test, production"
        />
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium mb-2">Sample Implementation Code</h4>
        <Textarea
          readOnly
          value={`// React/JavaScript Example
const authConfig = {
  clientId: '${data.clientId || 'your-client-id'}',
  redirectUri: '${data.redirectUrls[0] || 'your-redirect-url'}',
  scopes: [${data.scopes.map(s => `'${s}'`).join(', ')}],
  authority: 'https://iis-broker.gov.bc.ca'
};

// Initialize authentication
const auth = new IISAuth(authConfig);
auth.login();`}
          rows={8}
          className="font-mono text-sm"
        />
      </div>
    </div>
  );
};

export default ConfigurationStep;
