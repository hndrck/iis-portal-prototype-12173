import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  currentRoles: string[];
}

const AssignUsersTab = () => {
  const [environment, setEnvironment] = useState("");
  const [identityProvider, setIdentityProvider] = useState("");
  const [attributeFilter, setAttributeFilter] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const identityProviders = ["IDIR - MFA", "Basic BCeID", "Business BCeID", "GitHub BC Gov"];
  const attributeFilters = ["First Name", "Last Name", "Email", "GUID"];

  const handleSearch = () => {
    setHasSearched(true);
    // Mock search results - in a real app this would call an API
    const mockUsers: User[] = [
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@gov.bc.ca",
        currentRoles: ["Admin", "Editor"]
      },
      {
        id: "2",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@gov.bc.ca",
        currentRoles: ["Viewer"]
      },
      {
        id: "3",
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob.johnson@gov.bc.ca",
        currentRoles: []
      }
    ];
    setUsers(mockUsers);
  };

  const handleToggleUser = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleToggleAll = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map(u => u.id)));
    }
  };

  const handleAssignRole = (userId: string, role: string) => {
    toast({
      title: "Role assigned",
      description: `Successfully assigned role to user.`,
    });
  };

  const handleAssignSelected = () => {
    if (selectedUsers.size === 0) {
      toast({
        title: "No users selected",
        description: "Please select at least one user to assign roles.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Roles assigned",
      description: `Successfully assigned roles to ${selectedUsers.size} user(s).`,
    });
    setSelectedUsers(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Search Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold">1. Search for a user based on the selection criteria below</h3>
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Environment Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Environment</label>
                <Select value={environment} onValueChange={setEnvironment}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="dev">Dev</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="prod">Prod</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Identity Provider Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Identity Provider</label>
                <Select value={identityProvider} onValueChange={setIdentityProvider}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select IDP" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    {identityProviders.map((idp) => (
                      <SelectItem key={idp} value={idp}>
                        {idp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Attribute Filter Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Attribute Filter</label>
                <Select value={attributeFilter} onValueChange={setAttributeFilter}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select attribute" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    {attributeFilters.map((attr) => (
                      <SelectItem key={attr} value={attr}>
                        {attr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Criteria</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter search criteria"
                      value={searchCriteria}
                      onChange={(e) => setSearchCriteria(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button 
                onClick={handleSearch}
                className="bg-primary hover:bg-primary/90"
              >
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Step 2: Results Section */}
      <div>
        {hasSearched && users.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">2. Select users and assign roles</h3>
            <Button 
              onClick={handleAssignSelected}
              disabled={selectedUsers.size === 0}
              className="bg-primary hover:bg-primary/90"
            >
              Assign Selected ({selectedUsers.size})
            </Button>
          </div>
        )}

        <Card>
          <CardContent className="p-0">
            {!hasSearched ? (
              <div className="p-12 text-center">
                <p className="text-muted-foreground">You have not searched for any users yet.</p>
              </div>
            ) : users.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-muted-foreground">No users found matching your criteria.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedUsers.size === users.length && users.length > 0}
                        onCheckedChange={handleToggleAll}
                        aria-label="Select all users"
                      />
                    </TableHead>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Current Roles</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.has(user.id)}
                          onCheckedChange={() => handleToggleUser(user.id)}
                          aria-label={`Select ${user.firstName} ${user.lastName}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <div className="flex gap-2 flex-wrap">
                          {user.currentRoles.length > 0 ? (
                            user.currentRoles.map((role) => (
                              <Badge key={role} variant="outline">
                                {role}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted-foreground text-sm">No roles</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select onValueChange={(value) => handleAssignRole(user.id, value)}>
                          <SelectTrigger className="w-[180px] bg-background">
                            <SelectValue placeholder="Assign to Role" />
                          </SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                            <SelectItem value="contributor">Contributor</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssignUsersTab;
