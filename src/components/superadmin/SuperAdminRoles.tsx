import React, { useEffect, useState } from "react";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Shield,
  Eye,
  Settings,
  UserPlus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ConfirmActionModal } from "./ConfirmActionModal";
import { supabase } from "@/integrations/supabase/client";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: "Active" | "Suspended";
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

const mockUsers: AdminUser[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@novafarm.com",
    role: "Super Admin",
    lastLogin: "2024-06-30 14:30",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@novafarm.com",
    role: "Support Staff",
    lastLogin: "2024-06-29 16:45",
    status: "Active",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@novafarm.com",
    role: "Billing",
    lastLogin: "2024-06-28 09:15",
    status: "Suspended",
  },
];

const mockRoles: Role[] = [
  // {
  //   id: '1',
  //   name: 'Super Admin',
  //   description: 'Full system access',
  //   permissions: ['users', 'payments', 'settings', 'analytics', 'billing']
  // },
  {
    id: "2",
    name: "Support Staff",
    description: "View clients, no payment actions",
    permissions: ["users", "analytics"],
  },
  {
    id: "3",
    name: "Billing",
    description: "Manage invoices only",
    permissions: ["payments", "billing"],
  },
];

const allPermissions = [
  { id: "users", label: "User Management", icon: Users },
  { id: "payments", label: "Payment Processing", icon: Shield },
  { id: "settings", label: "System Settings", icon: Settings },
  { id: "analytics", label: "Analytics & Reports", icon: Eye },
  { id: "billing", label: "Billing & Invoices", icon: UserPlus },
];

export const SuperAdminRoles: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [all_users, set_all_users] = useState([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isManagePermissionsOpen, setIsManagePermissionsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    isOpen: boolean;
    action: () => void;
    title: string;
    message: string;
  } | null>(null);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("team_mate").select("*");

    if (error) {
      console.error("Error fetching users:", error.message);
      return [];
    }
    set_all_users(data);

    return data;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log("Fetched users from state:", all_users);

  const handle_DeleteUser = async (id) => {
    const { data, error } = await supabase
      .from("team_mate")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error fetching users:", error.message);
      return [];
    }

    console.log("Fetched users:", data);
    return data;
  };

  // const handleAddUser = async (e) => {
  //   e.preventDefault();

  //   const { firstName, lastName, email, role, password } = newUser;
  //   const fullName = `${firstName.trim()} ${lastName.trim()}`;

  //   try {
  //     // Get current session (assumes super admin is logged in)
  //     const {
  //       data: { session },
  //       error: sessionError,
  //     } = await supabase.auth.getSession();

  //     if (sessionError || !session?.access_token) {
  //       console.error("No valid session found.");
  //       alert("Unauthorized: Please log in as Super Admin.");
  //       return;
  //     }

  //     const res = await fetch(
  //       "https://ajbxscredobhqfksaqrk.supabase.co/functions/v1/add-user-with-role",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${session.access_token}`,
  //         },
  //         body: JSON.stringify({
  //           email,
  //           password,
  //           name: fullName,
  //           role,
  //         }),
  //       }
  //     );

  //     const result = await res.json();

  //     if (res.ok) {
  //       alert("User created!");
  //       setUsers((prev) => [...prev, { name: fullName, email, role }]);
  //       setNewUser({
  //         firstName: "",
  //         lastName: "",
  //         email: "",
  //         role: "",
  //         password: "",
  //       });
  //       setIsAddUserOpen(false);
  //     } else {
  //       const errorMessage = result?.error?.message || "Unknown error occurred";
  //       console.error("Error:", errorMessage);
  //       alert("Failed to create user: " + errorMessage);
  //     }
  //   } catch (err) {
  //     console.error("Network or server error:", err);
  //     alert("Failed to create user: Network or server error.");
  //   }
  // };

  const handleAddUser = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, role, password } = newUser;
    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    try {
      // Get current session (assumes super admin is logged in)
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        console.error("No valid session found.");
        alert("Unauthorized: Please log in as Super Admin.");
        return;
      }

      const res = await fetch(
        "https://ajbxscredobhqfksaqrk.supabase.co/functions/v1/add-user-with-role",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            email,
            password,
            name: fullName,
            role,
            status: true,
          }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        alert("User created!");
        setUsers((prev) => [...prev, { name: fullName, email, role }]);
        setNewUser({
          firstName: "",
          lastName: "",
          email: "",
          role: "",
          password: "",
        });
        setIsAddUserOpen(false);
      } else {
        const errorMessage =
          typeof result?.error === "string"
            ? result.error
            : result?.error?.message || "Unknown error occurred";

        console.error("Error:", errorMessage);
        alert("Failed to create user: " + errorMessage);
      }
    } catch (err) {
      console.error("Network or server error:", err);
      alert("Failed to create user: Network or server error.");
    }
  };

  const handleAddUser_main = async () => {
    const res = await fetch(
      "https://your-project-id.supabase.co/functions/v1/add-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "support@example.com",
          password: "12345678",
          role: "support",
          active: true, // or false
          name: "Support Staff",
          phone: "1234567890", // example of another custom field
        }),
      }
    );

    const data = await res.json();
    console.log(data);
  };

  const handleSuspendUser = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Suspended"
                  : ("Active" as "Active" | "Suspended"),
            }
          : user
      )
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleManagePermissions = (role: Role) => {
    setSelectedRole(role);
    setIsManagePermissionsOpen(true);
  };

  const handlePermissionToggle = (permissionId: string) => {
    if (!selectedRole) return;

    const updatedPermissions = selectedRole.permissions.includes(permissionId)
      ? selectedRole.permissions.filter((p) => p !== permissionId)
      : [...selectedRole.permissions, permissionId];

    setSelectedRole({ ...selectedRole, permissions: updatedPermissions });
    setRoles(
      roles.map((role) =>
        role.id === selectedRole.id
          ? { ...role, permissions: updatedPermissions }
          : role
      )
    );
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Super Admin":
        return "bg-red-100 text-red-800";
      case "Support Staff":
        return "bg-blue-100 text-blue-800";
      case "Billing":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Team Members & Access Control
          </h1>
          <p className="text-gray-600 mt-1">
            Manage internal team access and permissions
          </p>
        </div>

        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#27AE60] hover:bg-[#1e8449] mt-4 sm:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Add New Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={newUser.firstName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, firstName: e.target.value })
                    }
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={newUser.lastName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, lastName: e.target.value })
                    }
                    placeholder="Smith"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="john@novafarm.com"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) =>
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  placeholder="Enter temporary password"
                />
              </div>
              <Button
                onClick={handleAddUser}
                className="w-full bg-[#27AE60] hover:bg-[#1e8449]"
                disabled={
                  !newUser.firstName ||
                  !newUser.lastName ||
                  !newUser.email ||
                  !newUser.role
                }
              >
                Send Access Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">Admin Users</TabsTrigger>
          <TabsTrigger value="roles">Role Manager</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-[#27AE60]" />
                Team Members ({all_users.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Email
                      </TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Last Login
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {all_users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{user.name}</div>
                            <div className="text-sm text-gray-500 sm:hidden">
                              {user.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-gray-600">
                          {user.last_login}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={user.status}
                              onCheckedChange={() => handleSuspendUser(user.id)}
                            />
                            <span className="text-sm">
                              {user.status ? "Active" : "Suspended"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setConfirmAction({
                                  isOpen: true,
                                  action: () => handleDeleteUser(user.id),
                                  title: "Delete Team Member",
                                  message: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
                                })
                              }
                            >
                              <Trash2
                                className="w-4 h-4 text-red-600"
                                onClick={() => handle_DeleteUser(user.id)}
                              />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <div className="grid gap-6">
            {roles.map((role) => (
              <Card key={role.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {role.description}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleManagePermissions(role)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Manage Permissions
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => {
                      const perm = allPermissions.find(
                        (p) => p.id === permission
                      );
                      return perm ? (
                        <Badge
                          key={permission}
                          variant="secondary"
                          className="bg-[#27AE60]/10 text-[#27AE60]"
                        >
                          <perm.icon className="w-3 h-3 mr-1" />
                          {perm.label}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Manage Permissions Modal */}
      <Dialog
        open={isManagePermissionsOpen}
        onOpenChange={setIsManagePermissionsOpen}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Manage Permissions - {selectedRole?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {allPermissions.map((permission) => (
              <div key={permission.id} className="flex items-center space-x-3">
                <Checkbox
                  id={permission.id}
                  checked={selectedRole?.permissions.includes(permission.id)}
                  onCheckedChange={() => handlePermissionToggle(permission.id)}
                />
                <div className="flex items-center space-x-2">
                  <permission.icon className="w-4 h-4 text-gray-600" />
                  <Label htmlFor={permission.id}>{permission.label}</Label>
                </div>
              </div>
            ))}
            <Button
              onClick={() => setIsManagePermissionsOpen(false)}
              className="w-full bg-[#27AE60] hover:bg-[#1e8449]"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      {confirmAction && (
        <ConfirmActionModal
          isOpen={confirmAction.isOpen}
          title={confirmAction.title}
          message={confirmAction.message}
          onConfirm={() => {
            confirmAction.action();
            setConfirmAction(null);
          }}
          onCancel={() => setConfirmAction(null)}
          isDestructive={true}
          confirmButtonText="Delete"
        />
      )}
    </div>
  );
};
