import React, { useEffect, useState } from "react";
import { Search, Filter, Eye, Calendar, MapPin, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const activityData = [
  {
    id: 1,
    user: "admin@farmaciacentrale.it",
    business: "Farmacia Centrale Milano",
    action: "Login",
    description: "User logged in successfully",
    ipAddress: "192.168.1.100",
    location: "Milano, IT",
    timestamp: "2024-01-15 14:30:25",
    userAgent: "Chrome 120.0.0.0 on Windows",
    risk: "low",
  },
  {
    id: 2,
    user: "info@parafarmaciabenessere.it",
    business: "Parafarmacia Benessere",
    action: "Payment",
    description: "Subscription payment processed",
    ipAddress: "85.18.173.45",
    location: "Roma, IT",
    timestamp: "2024-01-15 12:15:30",
    userAgent: "Safari 17.0 on macOS",
    risk: "low",
  },
  {
    id: 3,
    user: "contact@sanmarco.it",
    business: "Farmacia San Marco",
    action: "Failed Login",
    description: "Multiple failed login attempts detected",
    ipAddress: "45.123.78.90",
    location: "Unknown",
    timestamp: "2024-01-15 10:45:12",
    userAgent: "Chrome 119.0.0.0 on Linux",
    risk: "high",
  },
  {
    id: 4,
    user: "hello@pharmacyplus.com",
    business: "Pharmacy Plus",
    action: "Settings Change",
    description: "Updated profile information",
    ipAddress: "93.184.216.34",
    location: "London, UK",
    timestamp: "2024-01-15 09:20:45",
    userAgent: "Firefox 121.0 on Windows",
    risk: "medium",
  },
  {
    id: 5,
    user: "admin@farmaciacentrale.it",
    business: "Farmacia Centrale Milano",
    action: "Data Export",
    description: "Downloaded customer data export",
    ipAddress: "192.168.1.100",
    location: "Milano, IT",
    timestamp: "2024-01-14 16:30:00",
    userAgent: "Chrome 120.0.0.0 on Windows",
    risk: "medium",
  },
];

export const SuperAdminActivityLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLoginData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching login data:", error.message);
    } else {
      setLogins(data);
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchLoginData();
  }, []);

  useEffect(() => {
    console.log("Data from Realtionship table", logins);
  });

  const filteredLogs = logins.filter((log) => {
    const matchesSearch =
      (log.username?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (log.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (log.location?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (log.action_type?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesAction =
      actionFilter === "all" ||
      (log?.action_type?.toLowerCase() || "").includes(
        actionFilter.toLowerCase()
      );

    const matchesRisk = riskFilter === "all" || log.risk === riskFilter;

    return matchesSearch && matchesAction && matchesRisk;
  });
  // const filteredLogs = logins.filter((log) => {
  //   const user = log.users;
  //   const matchesSearch =
  //     user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user?.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     log?.description?.toLowerCase().includes(searchTerm.toLowerCase());

  //   const matchesAction =
  //     actionFilter === "all" ||
  //     log?.action_type?.toLowerCase().includes(actionFilter.toLowerCase());

  //   const matchesRisk = riskFilter === "all" || log.risk === riskFilter;

  //   return matchesSearch && matchesAction && matchesRisk;
  // });

  const fmtDateOnly = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Karachi",
  });

  const formatCreatedAt = (iso?: string) =>
    iso ? fmtDateOnly.format(new Date(iso)).replaceAll("/", "-") : "";

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Low Risk
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Medium Risk
          </Badge>
        );
      case "high":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            High Risk
          </Badge>
        );
      default:
        return <Badge variant="secondary">{risk}</Badge>;
    }
  };

  const getActionBadge = (action: string) => {
    const colors = {
      Login: "bg-blue-100 text-blue-800",
      Payment: "bg-green-100 text-green-800",
      "Failed Login": "bg-red-100 text-red-800",
      "Settings Change": "bg-purple-100 text-purple-800",
      "Data Export": "bg-orange-100 text-orange-800",
    };

    return (
      <Badge
        className={`${
          colors[action as keyof typeof colors] || "bg-gray-100 text-gray-800"
        } hover:${
          colors[action as keyof typeof colors] || "bg-gray-100 text-gray-800"
        }`}
      >
        {action}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-left">
            Activity Logs
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor user activity, logins, and system changes
          </p>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">
                  {logins.length}
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-red-600">
                  {activityData.filter((log) => log.risk === "high").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed Logins</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {
                    activityData.filter((log) => log.action === "Failed Login")
                      .length
                  }
                </p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-2xl font-bold text-[#1C9B7A]">
                  {
                    activityData.filter((log) =>
                      log.timestamp.startsWith("2024-01-15")
                    ).length
                  }
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-[#1C9B7A]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search logs by user, business, action, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="failed">Failed Login</SelectItem>
                <SelectItem value="settings">Settings</SelectItem>
                <SelectItem value="export">Data Export</SelectItem>
              </SelectContent>
            </Select>

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activity Logs Table */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Activity Log ({logins.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="font-semibold text-gray-900">
                    User
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Action
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Description
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Location
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Risk
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Timestamp
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* {logins.map((log, index) => ( */}
                {filteredLogs.map((log, index) => (
                  <TableRow
                    key={index}
                    className="border-gray-200 hover:bg-gray-50"
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">
                          {log.username}
                        </div>
                        <div className="text-sm text-gray-500">{log.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getActionBadge(log.action_type)}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {/* You can use a description field if you have one, or a static message */}
                      User LoggedIn successfully
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        <div>
                          <div>{log.location}</div>
                          {/* If you want to show IP address, add it to your logs and use log.ipAddress */}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRiskBadge(log.risk)}</TableCell>
                    <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                      {formatCreatedAt(log.created_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
