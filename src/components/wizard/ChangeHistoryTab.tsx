import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Calendar } from "lucide-react";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface ChangeEntry {
  id: string;
  timestamp: string;
  changedBy: string;
  changeType: "Created" | "Updated" | "Deleted" | "Role Added" | "User Assigned";
  description: string;
  previousValue?: string;
  newValue?: string;
}

const ChangeHistoryTab = () => {
  const [changeType, setChangeType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock change history data
  const changes: ChangeEntry[] = [
    {
      id: "1",
      timestamp: "2025-10-09 15:34:22",
      changedBy: "admin@gov.bc.ca",
      changeType: "User Assigned",
      description: "Assigned user john.doe@gov.bc.ca to Admin role",
      previousValue: "No role",
      newValue: "Admin"
    },
    {
      id: "2",
      timestamp: "2025-10-09 14:22:10",
      changedBy: "developer@gov.bc.ca",
      changeType: "Updated",
      description: "Updated production redirect URI",
      previousValue: "https://old.example.com/callback",
      newValue: "https://example.com/callback"
    },
    {
      id: "3",
      timestamp: "2025-10-09 13:15:45",
      changedBy: "admin@gov.bc.ca",
      changeType: "Role Added",
      description: "Created new custom role 'Report Viewer'",
      previousValue: undefined,
      newValue: "Role created with read-only permissions"
    },
    {
      id: "4",
      timestamp: "2025-10-08 16:42:33",
      changedBy: "developer@gov.bc.ca",
      changeType: "Created",
      description: "Added Test environment configuration",
      previousValue: undefined,
      newValue: "Test environment with IDIR - MFA, Basic BCeID"
    },
    {
      id: "5",
      timestamp: "2025-10-08 11:28:15",
      changedBy: "admin@gov.bc.ca",
      changeType: "Updated",
      description: "Modified client secret for Development environment",
      previousValue: "***hidden***",
      newValue: "***hidden***"
    },
    {
      id: "6",
      timestamp: "2025-10-07 09:10:00",
      changedBy: "system@gov.bc.ca",
      changeType: "Created",
      description: "Integration request approved and initialized",
      previousValue: undefined,
      newValue: "Request ID: 00006128"
    },
  ];

  const getChangeTypeBadgeColor = (type: ChangeEntry["changeType"]) => {
    switch (type) {
      case "Created":
        return "bg-green-50 text-green-700 border-green-200";
      case "Updated":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Deleted":
        return "bg-red-50 text-red-700 border-red-200";
      case "Role Added":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "User Assigned":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "";
    }
  };

  const handleExport = () => {
    const csv = [
      ["Timestamp", "Changed By", "Change Type", "Description", "Previous Value", "New Value"].join(","),
      ...changes.map(change => 
        [
          change.timestamp, 
          change.changedBy, 
          change.changeType, 
          `"${change.description}"`,
          `"${change.previousValue || 'N/A'}"`,
          `"${change.newValue || 'N/A'}"`
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `change-history-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Change History</h2>
        <Button onClick={handleExport} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export History
        </Button>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filter Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <div className="flex gap-2">
                <Input type="date" className="flex-1" />
                <span className="flex items-center text-muted-foreground">to</span>
                <Input type="date" className="flex-1" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Change Type</label>
              <Select value={changeType} onValueChange={setChangeType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="updated">Updated</SelectItem>
                  <SelectItem value="deleted">Deleted</SelectItem>
                  <SelectItem value="role_added">Role Added</SelectItem>
                  <SelectItem value="user_assigned">User Assigned</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Search changes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline/Table View */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Date/Time</TableHead>
                <TableHead>Changed By</TableHead>
                <TableHead>Change Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Previous Value</TableHead>
                <TableHead>New Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {changes.map((change) => (
                <TableRow key={change.id}>
                  <TableCell className="font-mono text-sm">{change.timestamp}</TableCell>
                  <TableCell>{change.changedBy}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getChangeTypeBadgeColor(change.changeType)}>
                      {change.changeType}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-md">{change.description}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {change.previousValue || "—"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {change.newValue || "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(Math.max(1, currentPage - 1));
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(2); }} className="cursor-pointer">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(3); }} className="cursor-pointer">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(currentPage + 1);
                }}
                className="cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ChangeHistoryTab;
