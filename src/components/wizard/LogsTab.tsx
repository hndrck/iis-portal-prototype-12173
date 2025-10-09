import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface LogEntry {
  id: string;
  timestamp: string;
  environment: string;
  eventType: string;
  userId: string;
  status: "success" | "warning" | "error";
  details: string;
  fullDetails?: string;
}

const LogsTab = () => {
  const [environment, setEnvironment] = useState("all");
  const [logLevel, setLogLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock log data
  const logs: LogEntry[] = [
    {
      id: "1",
      timestamp: "2025-10-09 15:34:22",
      environment: "Production",
      eventType: "User Login",
      userId: "john.doe@gov.bc.ca",
      status: "success",
      details: "Successful authentication via IDIR - MFA",
      fullDetails: "IP: 192.168.1.100\nUser Agent: Mozilla/5.0\nSession ID: sess_abc123\nDuration: 234ms"
    },
    {
      id: "2",
      timestamp: "2025-10-09 15:32:18",
      environment: "Test",
      eventType: "Role Assignment",
      userId: "admin@gov.bc.ca",
      status: "success",
      details: "User assigned to Admin role",
      fullDetails: "Target User: jane.smith@gov.bc.ca\nRole: Administrator\nAssigned By: admin@gov.bc.ca"
    },
    {
      id: "3",
      timestamp: "2025-10-09 15:28:45",
      environment: "Production",
      eventType: "Authentication Failed",
      userId: "test.user@gov.bc.ca",
      status: "error",
      details: "Invalid credentials provided",
      fullDetails: "IP: 192.168.1.105\nAttempts: 3\nLocked: No\nReason: Password mismatch"
    },
    {
      id: "4",
      timestamp: "2025-10-09 15:25:12",
      environment: "Development",
      eventType: "Configuration Update",
      userId: "developer@gov.bc.ca",
      status: "warning",
      details: "Redirect URI updated",
      fullDetails: "Old URI: https://dev.old.example.com/callback\nNew URI: https://dev.example.com/callback\nUpdated By: developer@gov.bc.ca"
    },
    {
      id: "5",
      timestamp: "2025-10-09 15:20:33",
      environment: "Production",
      eventType: "User Logout",
      userId: "john.doe@gov.bc.ca",
      status: "success",
      details: "Session terminated successfully",
      fullDetails: "Session ID: sess_xyz789\nDuration: 3h 24m\nReason: User initiated"
    },
  ];

  const getStatusBadgeVariant = (status: LogEntry["status"]): "outline" => {
    return "outline";
  };

  const getStatusColor = (status: LogEntry["status"]) => {
    switch (status) {
      case "success":
        return "bg-green-50 text-green-700 border-green-200";
      case "warning":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "error":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "";
    }
  };

  const handleExport = () => {
    const csv = [
      ["Timestamp", "Environment", "Event Type", "User ID", "Status", "Details"].join(","),
      ...logs.map(log => 
        [log.timestamp, log.environment, log.eventType, log.userId, log.status, `"${log.details}"`].join(",")
      )
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `integration-logs-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Integration Logs</h2>
        <Button onClick={handleExport} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filter Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Environment</label>
              <Select value={environment} onValueChange={setEnvironment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Environments</SelectItem>
                  <SelectItem value="dev">Development</SelectItem>
                  <SelectItem value="test">Test</SelectItem>
                  <SelectItem value="prod">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Log Level</label>
              <Select value={logLevel} onValueChange={setLogLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 lg:col-span-2">
              <label className="text-sm font-medium">Search</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Search by event type or user..."
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

      {/* Logs Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <Collapsible
                  key={log.id}
                  open={expandedLog === log.id}
                  onOpenChange={(open) => setExpandedLog(open ? log.id : null)}
                  asChild
                >
                  <>
                    <TableRow className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>{log.environment}</TableCell>
                      <TableCell>{log.eventType}</TableCell>
                      <TableCell className="font-mono text-sm">{log.userId}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(log.status)} className={getStatusColor(log.status)}>
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.details}</TableCell>
                      <TableCell>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            {expandedLog === log.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </TableCell>
                    </TableRow>
                    <CollapsibleContent asChild>
                      <TableRow>
                        <TableCell colSpan={7} className="bg-muted/30">
                          <div className="p-4 space-y-2">
                            <h4 className="font-semibold text-sm">Full Details</h4>
                            <pre className="text-sm font-mono bg-background p-3 rounded border whitespace-pre-wrap">
                              {log.fullDetails}
                            </pre>
                          </div>
                        </TableCell>
                      </TableRow>
                    </CollapsibleContent>
                  </>
                </Collapsible>
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

export default LogsTab;
