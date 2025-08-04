// import React, { useState, useEffect } from "react";
// import {
//   Edit,
//   UserCheck,
//   Shield,
//   Eye,
//   Settings,
//   FileText,
//   Users,
//   Trash2,
//   Key,
//   UserPlus,
// } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Separator } from "@/components/ui/separator";
// import { useToast } from "@/hooks/use-toast";

// interface AdminUser {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   lastLogin: string;
//   status: "Active" | "Suspended";
// }

// interface Permission {
//   id: string;
//   label: string;
//   description: string;
//   icon: React.ComponentType<{ className?: string }>;
// }

// interface EditUserModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   user: AdminUser | null;
//   onSave: (user: AdminUser) => void;
// }

// const availableRoles = [
//   "Admin",
//   "Support",
//   "Billing",
//   "admin",
// ];

// const availablePermissions: Permission[] = [
//   {
//     id: "users",
//     label: "User Management",
//     description: "Access to view all appointment data",
//     icon: Users,
//   },
//   {
//     id: "payments",
//     label: "Payment Processing",
//     description: "Access to view all appointment data",
//     icon: Shield,
//   },
//   {
//     id: "settings",
//     label: "System Settings",
//     description: "Access to view all appointment data",
//     icon: Settings,
//   },
//   {
//     id: "analytics",
//     label: "Analytics & Reports",
//     description: "Access to view all appointment data",
//     icon: Eye,
//   },
//   {
//     id: "billing",
//     label: "Billing & Invoices",
//     description: "Access to view all appointment data",
//     icon: UserPlus,
//   },
// ];

// // const availablePermissions: Permission[] = [
// //   {
// //     id: "view_appointments",
// //     label: "View Appointments",
// //     description: "Access to view all appointment data",
// //     icon: Eye,
// //   },
// //   {
// //     id: "edit_services",
// //     label: "Edit Services",
// //     description: "Modify pharmacy services and offerings",
// //     icon: Settings,
// //   },
// //   {
// //     id: "access_billing",
// //     label: "Access Billing",
// //     description: "View and manage billing information",
// //     icon: FileText,
// //   },
// //   {
// //     id: "view_reports",
// //     label: "View Reports",
// //     description: "Access analytics and reporting features",
// //     icon: FileText,
// //   },
// //   {
// //     id: "manage_users",
// //     label: "Manage Users",
// //     description: "Add, edit, and remove user accounts",
// //     icon: Users,
// //   },
// //   {
// //     id: "delete_data",
// //     label: "Delete Data",
// //     description: "Permission to delete sensitive data",
// //     icon: Trash2,
// //   },
// // ];

// export const EditUserModal: React.FC<EditUserModalProps> = ({
//   isOpen,
//   onClose,
//   user,
//   onSave,
// }) => {
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     role: "",
//   });
//   const [userPermissions, setUserPermissions] = useState<string[]>([]);

//   // useEffect(() => {
//   //   if (user) {
//   //     const [firstName, ...lastNameParts] = user.name.split(' ');
//   //     setFormData({
//   //       firstName: firstName || '',
//   //       lastName: lastNameParts.join(' ') || '',
//   //       email: user.email,
//   //       phone: '', // Mock data doesn't have phone
//   //       role: user.role,
//   //     });

//   //     // Set default permissions based on role
//   //     const defaultPermissions = getDefaultPermissionsForRole(user.role);
//   //     setUserPermissions(defaultPermissions);
//   //   }
//   // }, [user]);

//   useEffect(() => {
//     if (user) {
//       let firstName = "";
//       let lastName = "";

//       if (user.name) {
//         const [f, ...l] = user.name.split(" ");
//         firstName = f || "";
//         lastName = l.join(" ") || "";
//       } else {
//         firstName = user.firstName || "";
//         lastName = user.lastName || "";
//       }

//       setFormData({
//         firstName,
//         lastName,
//         email: user.email,
//         phone: user.phone || "",
//         role: user.role,
//       });

//       console.log("FormData from EditModal Box", formData);

//       // Set default permissions based on role
//       const defaultPermissions = getDefaultPermissionsForRole(user.role);
//       setUserPermissions(defaultPermissions);
//     }
//   }, [user]);

//   const getDefaultPermissionsForRole = (role: string): string[] => {
//     switch (role) {
//       case "Super Admin":
//         return availablePermissions.map((p) => p.id);
//       case "Admin":
//         return [
//           "view_appointments",
//           "edit_services",
//           "access_billing",
//           "view_reports",
//           "manage_users",
//         ];
//       case "Editor":
//         return ["view_appointments", "edit_services", "view_reports"];
//       case "Viewer":
//         return ["view_appointments", "view_reports"];
//       case "Support":
//         return ["view_appointments", "view_reports"];
//       case "Billing":
//         return ["access_billing", "view_reports"];
//       default:
//         return [];
//     }
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleRoleChange = (newRole: string) => {
//     setFormData((prev) => ({ ...prev, role: newRole }));
//     // Update permissions based on new role
//     const defaultPermissions = getDefaultPermissionsForRole(newRole);
//     setUserPermissions(defaultPermissions);
//   };

//   const handlePermissionToggle = (permissionId: string) => {
//     setUserPermissions((prev) =>
//       prev.includes(permissionId)
//         ? prev.filter((p) => p !== permissionId)
//         : [...prev, permissionId]
//     );
//   };

//   const handleSave = () => {
//     if (!user) return;

//     const updatedUser: AdminUser = {
//       ...user,
//       name: `${formData.firstName} ${formData.lastName}`.trim(),
//       email: formData.email,
//       role: formData.role,
//     };

//     onSave(updatedUser);

//     toast({
//       title: "✅ Changes saved successfully",
//       description: `${updatedUser.name}'s profile has been updated.`,
//     });

//     onClose();
//   };

//   const handleResetPassword = () => {
//     toast({
//       title: "Password reset email sent",
//       description: `A password reset link has been sent to ${formData.email}`,
//     });
//   };

//   if (!user) return null;

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="flex items-center text-xl">
//             <Edit className="w-5 h-5 mr-2 text-primary" />
//             Edit User Profile & Permissions
//           </DialogTitle>
//         </DialogHeader>

//         <div className="space-y-6">
//           {/* Basic Info Section */}
//           <div className="space-y-4">
//             <div className="flex items-center space-x-2 mb-3">
//               <UserCheck className="w-4 h-4 text-primary" />
//               <h3 className="text-lg font-semibold">Basic Information</h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="firstName">First Name *</Label>
//                 <Input
//                   id="firstName"
//                   value={formData.firstName}
//                   onChange={(e) =>
//                     handleInputChange("firstName", e.target.value)
//                   }
//                   placeholder="Enter first name"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="lastName">Last Name *</Label>
//                 <Input
//                   id="lastName"
//                   value={formData.lastName}
//                   onChange={(e) =>
//                     handleInputChange("lastName", e.target.value)
//                   }
//                   placeholder="Enter last name"
//                 />
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="email">Email Address *</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//                 placeholder="Enter email address"
//               />
//             </div>

//             <div>
//               <Label htmlFor="phone">Phone Number</Label>
//               <Input
//                 id="phone"
//                 value={formData.phone}
//                 onChange={(e) => handleInputChange("phone", e.target.value)}
//                 placeholder="Enter phone number (optional)"
//               />
//             </div>
//           </div>

//           <Separator />

//           {/* Role Management Section */}
//           <div className="space-y-4">
//             <div className="flex items-center space-x-2 mb-3">
//               <Shield className="w-4 h-4 text-primary" />
//               <h3 className="text-lg font-semibold">Role Management</h3>
//             </div>

//             <div>
//               <Label htmlFor="role">User Role *</Label>
//               <Select value={formData.role} onValueChange={handleRoleChange}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {availableRoles.map((role) => (
//                     <SelectItem key={role} value={role}>
//                       {role}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <Separator />

//           {/* Permissions Section */}
//           <div className="space-y-4">
//             <div className="flex items-center space-x-2 mb-3">
//               <Settings className="w-4 h-4 text-primary" />
//               <h3 className="text-lg font-semibold">Permissions</h3>
//             </div>

//             <div className="grid grid-cols-1 gap-3">
//               {availablePermissions.map((permission) => (
//                 <div
//                   key={permission.id}
//                   className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <permission.icon className="w-4 h-4 text-muted-foreground" />
//                     <div>
//                       <div className="font-medium text-sm">
//                         {permission.label}
//                       </div>
//                       <div className="text-xs text-muted-foreground">
//                         {permission.description}
//                       </div>
//                     </div>
//                   </div>
//                   <Switch
//                     checked={userPermissions.includes(permission.id)}
//                     onCheckedChange={() =>
//                       handlePermissionToggle(permission.id)
//                     }
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <Separator />

//           {/* Additional Actions */}
//           <div className="space-y-4">
//             <div className="flex items-center space-x-2 mb-3">
//               <Key className="w-4 h-4 text-primary" />
//               <h3 className="text-lg font-semibold">Security Actions</h3>
//             </div>

//             <Button
//               variant="outline"
//               onClick={handleResetPassword}
//               className="w-full sm:w-auto"
//             >
//               <Key className="w-4 h-4 mr-2" />
//               Reset Password
//             </Button>
//           </div>
//         </div>

//         <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
//           <Button
//             variant="outline"
//             onClick={onClose}
//             className="order-2 sm:order-1"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSave}
//             className="bg-primary hover:bg-primary/90 order-1 sm:order-2"
//             disabled={
//               !formData.firstName ||
//               !formData.lastName ||
//               !formData.email ||
//               !formData.role
//             }
//           >
//             Save Changes
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

import React, { useState, useEffect } from "react";
import {
  Edit,
  UserCheck,
  Shield,
  Eye,
  Settings,
  Users,
  Trash2,
  Key,
  UserPlus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: "Active" | "Suspended";
}

interface Permission {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null;
  onSave: (user: AdminUser) => void;
}

// Use lowercase values for storage, capitalized labels for display
const availableRoles = [
  { value: "admin", label: "Admin" },
  { value: "support-staff", label: "Support" },
  { value: "billing", label: "Billing" },
  // Add more as needed
];

const availablePermissions: Permission[] = [
  {
    id: "users",
    label: "User Management",
    description: "Access to view all appointment data",
    icon: Users,
  },
  {
    id: "payments",
    label: "Payment Processing",
    description: "Access to view all appointment data",
    icon: Shield,
  },
  {
    id: "settings",
    label: "System Settings",
    description: "Access to view all appointment data",
    icon: Settings,
  },
  {
    id: "analytics",
    label: "Analytics & Reports",
    description: "Access to view all appointment data",
    icon: Eye,
  },
  {
    id: "billing",
    label: "Billing & Invoices",
    description: "Access to view all appointment data",
    icon: UserPlus,
  },
];

export const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
  });
  const [userPermissions, setUserPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      let firstName = "";
      let lastName = "";

      if (user.name) {
        const [f, ...l] = user.name.split(" ");
        firstName = f || "";
        lastName = l.join(" ") || "";
      } else {
        firstName = (user as any).firstName || "";
        lastName = (user as any).lastName || "";
      }

      // Always store role as lowercase
      setFormData({
        firstName,
        lastName,
        email: user.email,
        phone: (user as any).phone || "",
        role: user.role.toLowerCase(),
      });

      // Set default permissions based on role
      const defaultPermissions = getDefaultPermissionsForRole(
        user.role.toLowerCase()
      );
      setUserPermissions(defaultPermissions);
    }
  }, [user]);

  const getDefaultPermissionsForRole = (role: string): string[] => {
    switch (role) {
      case "admin":
        return ["users", "payments", "settings", "analytics", "billing"];
      case "support":
        return ["users", "analytics"];
      case "billing":
        return ["payments", "billing"];
      default:
        return [];
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (newRole: string) => {
    setFormData((prev) => ({ ...prev, role: newRole }));
    // Update permissions based on new role
    const defaultPermissions = getDefaultPermissionsForRole(newRole);
    setUserPermissions(defaultPermissions);
  };

  const handlePermissionToggle = (permissionId: string) => {
    setUserPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((p) => p !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSave = () => {
    if (!user) return;

    const updatedUser: AdminUser = {
      ...user,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      role: formData.role, // This will be the lowercase value
    };

    onSave(updatedUser);

    toast({
      title: "✅ Changes saved successfully",
      description: `${updatedUser.name}'s profile has been updated.`,
    });

    onClose();
  };

  const handleResetPassword = () => {
    toast({
      title: "Password reset email sent",
      description: `A password reset link has been sent to ${formData.email}`,
    });
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Edit className="w-5 h-5 mr-2 text-primary" />
            Edit User Profile & Permissions
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <UserCheck className="w-4 h-4 text-primary" />
              <h3 className="text-lg font-semibold">Basic Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email address"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter phone number (optional)"
              />
            </div>
          </div>

          <Separator />

          {/* Role Management Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="w-4 h-4 text-primary" />
              <h3 className="text-lg font-semibold">Role Management</h3>
            </div>

            <div>
              <Label htmlFor="role">User Role *</Label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Permissions Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Settings className="w-4 h-4 text-primary" />
              <h3 className="text-lg font-semibold">Permissions</h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {availablePermissions.map((permission) => (
                <div
                  key={permission.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <permission.icon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-sm">
                        {permission.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {permission.description}
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={userPermissions.includes(permission.id)}
                    onCheckedChange={() =>
                      handlePermissionToggle(permission.id)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Additional Actions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Key className="w-4 h-4 text-primary" />
              <h3 className="text-lg font-semibold">Security Actions</h3>
            </div>

            <Button
              variant="outline"
              onClick={handleResetPassword}
              className="w-full sm:w-auto"
            >
              <Key className="w-4 h-4 mr-2" />
              Reset Password
            </Button>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90 order-1 sm:order-2"
            disabled={
              !formData.firstName ||
              !formData.lastName ||
              !formData.email ||
              !formData.role
            }
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
