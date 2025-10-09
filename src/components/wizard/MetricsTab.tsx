import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUp, ArrowDown, Activity, Users, CheckCircle, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const MetricsTab = () => {
  const [timeRange, setTimeRange] = useState("24h");

  // Mock data for the line chart
  const chartData = [
    { time: "00:00", authentications: 45 },
    { time: "04:00", authentications: 32 },
    { time: "08:00", authentications: 89 },
    { time: "12:00", authentications: 156 },
    { time: "16:00", authentications: 178 },
    { time: "20:00", authentications: 134 },
    { time: "23:59", authentications: 67 },
  ];

  // Mock metrics data
  const metrics = [
    { 
      title: "Total Authentications", 
      value: "12,453", 
      trend: "+12.5%", 
      isPositive: true,
      icon: Activity 
    },
    { 
      title: "Unique Users", 
      value: "3,284", 
      trend: "+8.2%", 
      isPositive: true,
      icon: Users 
    },
    { 
      title: "Success Rate", 
      value: "98.7%", 
      trend: "+0.3%", 
      isPositive: true,
      icon: CheckCircle 
    },
    { 
      title: "Avg Response Time", 
      value: "124ms", 
      trend: "-5.1%", 
      isPositive: true,
      icon: Clock 
    },
  ];

  // Mock error data
  const topErrors = [
    { error: "Invalid redirect URI", count: 23, percentage: "1.2%" },
    { error: "Session timeout", count: 8, percentage: "0.4%" },
    { error: "Invalid credentials", count: 5, percentage: "0.3%" },
  ];

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Integration Metrics</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center mt-1">
                {metric.isPositive ? (
                  <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={`text-sm ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.trend}
                </span>
                <span className="text-sm text-muted-foreground ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Authentication Volume Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Authentication Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="authentications" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Errors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Errors/Issues</CardTitle>
        </CardHeader>
        <CardContent>
          {topErrors.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Error Type</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                  <TableHead className="text-right">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topErrors.map((error) => (
                  <TableRow key={error.error}>
                    <TableCell className="font-medium">{error.error}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        {error.count}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{error.percentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No errors recorded
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsTab;
