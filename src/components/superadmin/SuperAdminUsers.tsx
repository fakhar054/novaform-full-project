import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Ban,
  CreditCard,
  RefreshCw,
  Mail,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserDetailView } from "./UserDetailView";
import { ChangePlanModal } from "./ChangePlanModal";
import { ResetPasswordModal } from "./ResetPasswordModal";
import { SendEmailModal } from "./SendEmailModal";
import { ConfirmActionModal } from "./ConfirmActionModal";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const usersData = [
  {
    id: 1,
    businessName: "Farmacia Centrale Milano",
    email: "admin@farmaciacentrale.it",
    status: "active",
    plan: "Premium",
    lastLogin: "2024-01-15 14:30",
    createdAt: "2023-06-15",
    location: "Milano, IT",
    phone: "+39 02 1234567",
    address: "Via Roma 123, Milano, IT",
    language: "Italian",
    vatNumber: "IT12345678901",
    billingEmail: "billing@farmaciacentrale.it",
    subscriptionStart: "2023-06-15",
    nextBilling: "2024-02-15",
  },
  {
    id: 2,
    businessName: "Parafarmacia Benessere",
    email: "info@parafarmaciabenessere.it",
    status: "active",
    plan: "Standard",
    lastLogin: "2024-01-14 09:15",
    createdAt: "2023-08-22",
    location: "Roma, IT",
    phone: "+39 06 9876543",
    address: "Via del Corso 456, Roma, IT",
    language: "Italian",
    vatNumber: "IT98765432109",
    billingEmail: "accounts@parafarmaciabenessere.it",
    subscriptionStart: "2023-08-22",
    nextBilling: "2024-02-22",
  },
  {
    id: 3,
    businessName: "Farmacia San Marco",
    email: "contact@sanmarco.it",
    status: "suspended",
    plan: "Premium",
    lastLogin: "2024-01-10 16:45",
    createdAt: "2023-03-12",
    location: "Venezia, IT",
    phone: "+39 041 5551234",
    address: "Piazza San Marco 789, Venezia, IT",
    language: "Italian",
    vatNumber: "IT11223344556",
    billingEmail: "billing@sanmarco.it",
    subscriptionStart: "2023-03-12",
    nextBilling: "2024-02-12",
  },
  {
    id: 4,
    businessName: "Pharmacy Plus",
    email: "hello@pharmacyplus.com",
    status: "active",
    plan: "Basic",
    lastLogin: "2024-01-15 11:20",
    createdAt: "2023-11-05",
    location: "London, UK",
    phone: "+44 20 7123 4567",
    address: "123 High Street, London, UK",
    language: "English",
    vatNumber: "GB123456789",
    billingEmail: "billing@pharmacyplus.com",
    subscriptionStart: "2023-11-05",
    nextBilling: "2024-02-05",
  },
];

export const SuperAdminUsers: React.FC = () => {
  const [allusers, setallUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [showChangePlan, setShowChangePlan] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [showConfirmAction, setShowConfirmAction] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: string;
    message: string;
  } | null>(null);
  // const { toast } = useToast();

  const fetchUser = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Error fetching users:", error.message);
    } else {
      const filteredData = data.filter(
        (user) => user.role !== "admin" && user.role !== "super-admin"
      );
      setallUsers(filteredData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log("All users", allusers);

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesPlan =
      planFilter === "all" || user.plan.toLowerCase() === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Suspended
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    const colors = {
      Basic: "bg-gray-100 text-gray-800",
      Standard: "bg-blue-100 text-blue-800",
      Premium: "bg-purple-100 text-purple-800",
    };

    return (
      <Badge
        className={`${colors[plan as keyof typeof colors]} hover:${
          colors[plan as keyof typeof colors]
        }`}
      >
        {plan}
      </Badge>
    );
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setShowUserDetail(true);
  };

  const handleChangePlan = (user: any) => {
    setSelectedUser(user);
    setShowChangePlan(true);
  };

  const handleResetPassword = (user: any) => {
    setSelectedUser(user);
    setShowResetPassword(true);
  };

  const handleSendEmail = (user: any) => {
    setSelectedUser(user);
    setShowSendEmail(true);
  };

  const handleSuspendActivate = (user: any) => {
    console.log("Suspending user:", user);

    setSelectedUser(user);
    const action = user.status === "active" ? "suspend" : "activate";
    setConfirmAction({
      type: action,
      message: `Are you sure you want to ${action} ${user.businessName}?`,
    });

    setShowConfirmAction(true);
  };

  const handleConfirmAction = async () => {
    console.log("Confirming action for user:", selectedUser);

    if (!selectedUser || !selectedUser.uuid) {
      console.log("User UUID is required to update account status.");
      return;
    }

    const newStatus =
      selectedUser.accountStatus === "suspended" ? "active" : "suspended";

    const { error } = await supabase
      .from("users")
      .update({ accountStatus: newStatus })
      .eq("uuid", selectedUser.uuid);

    if (error) {
      console.log("error Update Failed");
      return;
    }
    console.log("Account Updated ");

    // toast({
    //   title: "Account Updated",
    //   description: `${selectedUser.businessName} has been ${newStatus}.`,
    // });

    await fetchUser(); // 🔁 refresh list

    setShowConfirmAction(false);
    setConfirmAction(null);
    setSelectedUser(null);
  };

  // const handleConfirmAction = () => {
  //   if (selectedUser && confirmAction) {
  //     const action =
  //       confirmAction.type === "suspend" ? "suspended" : "activated";
  //     toast({
  //       title: "Account Updated",
  //       description: `${selectedUser.businessName} has been ${action}.`,
  //     });
  //     setShowConfirmAction(false);
  //     setConfirmAction(null);
  //     setSelectedUser(null);
  //   }
  // };

  if (showUserDetail && selectedUser) {
    return (
      <UserDetailView
        user={selectedUser}
        onBack={() => {
          setShowUserDetail(false);
          setSelectedUser(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Users Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all registered pharmacy accounts
          </p>
        </div>
        <Button className="bg-[#1C9B7A] hover:bg-[#158a69] mt-4 sm:mt-0">
          Create New User
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="font-semibold text-gray-900">
                    Business
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Plan
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Last Login
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Location
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allusers.map((user) => (
                  <TableRow
                    key={user.uuid}
                    className="border-gray-200 hover:bg-gray-50"
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.businessName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.accountStatus)}</TableCell>
                    <TableCell>{getPlanBadge(user.plan)}</TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {user.lastLogin}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {user.city},{user.country}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => handleViewUser(user)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View User Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleChangePlan(user)}
                          >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Change Plan
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleResetPassword(user)}
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleSendEmail(user)}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleSuspendActivate(user)}
                          >
                            <Ban className="w-4 h-4 mr-2" />
                            {user.status === "suspended"
                              ? "Activate"
                              : "Suspend"}{" "}
                            Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {usersData.length}
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {usersData.filter((u) => u.status === "active").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-red-600">
                  {usersData.filter((u) => u.status === "suspended").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Ban className="w-4 h-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Premium Users</p>
                <p className="text-2xl font-bold text-purple-600">
                  {usersData.filter((u) => u.plan === "Premium").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {showChangePlan && selectedUser && (
        <ChangePlanModal
          user={selectedUser}
          isOpen={showChangePlan}
          onClose={() => {
            setShowChangePlan(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showResetPassword && selectedUser && (
        <ResetPasswordModal
          user={selectedUser}
          isOpen={showResetPassword}
          onClose={() => {
            setShowResetPassword(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showSendEmail && selectedUser && (
        <SendEmailModal
          user={selectedUser}
          isOpen={showSendEmail}
          onClose={() => {
            setShowSendEmail(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showConfirmAction && selectedUser && confirmAction && (
        <ConfirmActionModal
          isOpen={showConfirmAction}
          title={`${
            confirmAction.type === "suspend" ? "Suspend" : "Activate"
          } Account`}
          message={confirmAction.message}
          onConfirm={handleConfirmAction}
          onCancel={() => {
            setShowConfirmAction(false);
            setConfirmAction(null);
            setSelectedUser(null);
          }}
          confirmButtonText={
            confirmAction.type === "suspend" ? "Suspend" : "Activate"
          }
          isDestructive={confirmAction.type === "suspend"}
        />
      )}
    </div>
  );
};
