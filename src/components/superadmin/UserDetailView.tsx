import React, { useState } from "react";
import {
  ArrowLeft,
  Edit2,
  Save,
  X,
  Download,
  Send,
  Ban,
  Trash2,
  RefreshCw,
  CreditCard,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { ConfirmActionModal } from "./ConfirmActionModal";
import { ResetPasswordModal } from "./ResetPasswordModal";
import { ChangePlanModal } from "./ChangePlanModal";

interface UserDetailViewProps {
  user: any;
  onBack: () => void;
}

export const UserDetailView: React.FC<UserDetailViewProps> = ({
  user,
  onBack,
}) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    legalOwnerFirstName: user.legalOwnerFirstName || "",
    legalOwnerLastName: user.legalOwnerLastName || "",
    street: user.street || "",
    city: user.city || "",
    zipCode: user.zipCode || "",
    province: user.province || "",
    country: user.country || "",
    billingEmail: user.billingEmail || "",
    vatNumber: user.vatNumber || "",
    businessName: user.businessName || "",
    email: user.email || "",
    phone: user.phone || "",
    language: user.language || "",
    address: user.address || "",
  });

  console.log("User detail ", formData);
  const [showConfirmModal, setShowConfirmModal] = useState<{
    isOpen: boolean;
    type:
      | "suspend"
      | "delete"
      | "cancel-subscription"
      | "resume-subscription"
      | "";
    title: string;
    message: string;
    confirmText: string;
    isDestructive: boolean;
  }>({
    isOpen: false,
    type: "",
    title: "",
    message: "",
    confirmText: "",
    isDestructive: false,
  });
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const { toast } = useToast();

  const handleSave = (section: string) => {
    toast({
      title: "Changes Saved",
      description: `${section} information has been updated successfully.`,
    });
    setEditingSection(null);
  };

  const handleCancel = () => {
    setFormData({
      ...user,
      legalOwnerFirstName: "",
      legalOwnerLastName: "",
      street: "",
      city: "",
      zipCode: "",
      province: "",
      country: "",
    });
    setEditingSection(null);
  };

  const handleConfirmAction = () => {
    const { type } = showConfirmModal;

    switch (type) {
      case "suspend":
        toast({
          title: "Account Suspended",
          description: "User has been suspended — simulation only",
        });
        break;
      case "delete":
        toast({
          title: "Account Deleted",
          description: "Account deleted (simulation only)",
          variant: "destructive",
        });
        break;
      case "cancel-subscription":
        toast({
          title: "Subscription Cancelled",
          description: "Subscription has been cancelled — simulation only",
        });
        break;
      case "resume-subscription":
        toast({
          title: "Subscription Resumed",
          description: "Subscription has been resumed — simulation only",
        });
        break;
    }

    setShowConfirmModal({ ...showConfirmModal, isOpen: false });
  };

  const openConfirmModal = (
    type: "suspend" | "delete" | "cancel-subscription" | "resume-subscription"
  ) => {
    const configs = {
      suspend: {
        title: "Suspend Account",
        message:
          "Are you sure you want to suspend this user? This will temporarily disable their access.",
        confirmText: "Suspend Account",
        isDestructive: true,
      },
      delete: {
        title: "Delete Account",
        message:
          "This action is permanent. Are you sure you want to delete this user?",
        confirmText: "Delete Account",
        isDestructive: true,
      },
      "cancel-subscription": {
        title: "Cancel Subscription",
        message:
          "Are you sure you want to cancel this subscription? The user will lose access at the end of the current billing period.",
        confirmText: "Cancel Subscription",
        isDestructive: true,
      },
      "resume-subscription": {
        title: "Resume Subscription",
        message:
          "Are you sure you want to resume this subscription? The user will be charged immediately.",
        confirmText: "Resume Subscription",
        isDestructive: false,
      },
    };

    const config = configs[type];
    setShowConfirmModal({
      isOpen: true,
      type,
      ...config,
    });
  };

  const mockInvoices = [
    { id: "INV-001", date: "2024-01-15", amount: "€89.00", status: "paid" },
    { id: "INV-002", date: "2023-12-15", amount: "€89.00", status: "paid" },
    { id: "INV-003", date: "2023-11-15", amount: "€89.00", status: "paid" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
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
      <Badge className={colors[plan as keyof typeof colors]}>{plan}</Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {user.businessName}
            </h1>
            <p className="text-gray-600 mt-1">
              User ID: {user.id} • Created: {user.createdAt}
            </p>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          {getStatusBadge(user.status)}
          {getPlanBadge(user.plan)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>General Information</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editingSection === "general"
                    ? null
                    : setEditingSection("general")
                }
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingSection === "general" ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            businessName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={formData.language}
                        onValueChange={(value) =>
                          setFormData({ ...formData, language: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Italian">Italian</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleSave("General")} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel} size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Business Name</Label>
                    <p className="font-medium">{user.businessName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Email</Label>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Phone</Label>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Language</Label>
                    <p className="font-medium">{user.language}</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-gray-600">Address</Label>
                    <p className="font-medium">{user.address}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Billing Information - Enhanced */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Billing Information</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editingSection === "billing"
                    ? null
                    : setEditingSection("billing")
                }
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingSection === "billing" ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessNameBilling">Business Name</Label>
                      <Input
                        id="businessNameBilling"
                        value={formData.businessName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            businessName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="billingEmail">Billing Email</Label>
                      <Input
                        id="billingEmail"
                        type="email"
                        value={formData.billingEmail}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            billingEmail: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="legalOwnerFirstName">
                        Legal Owner First Name
                      </Label>
                      <Input
                        id="legalOwnerFirstName"
                        value={formData.legalOwnerFirstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            legalOwnerFirstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="legalOwnerLastName">
                        Legal Owner Last Name
                      </Label>
                      <Input
                        id="legalOwnerLastName"
                        value={formData.legalOwnerLastName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            legalOwnerLastName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="vatNumber">VAT Number / Tax Code</Label>
                      <Input
                        id="vatNumber"
                        value={formData.vatNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            vatNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Legal Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="street">Street and Number</Label>
                        <Input
                          id="street"
                          value={formData.street}
                          onChange={(e) =>
                            setFormData({ ...formData, street: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              zipCode: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="province">Province / Region</Label>
                        <Input
                          id="province"
                          value={formData.province}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              province: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) =>
                            setFormData({ ...formData, country: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Italy">Italy</SelectItem>
                            <SelectItem value="Spain">Spain</SelectItem>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={() => handleSave("Billing")} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel} size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-600">Business Name</Label>
                      <p className="font-medium">{user.businessName}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Billing Email</Label>
                      <p className="font-medium">{user.billingEmail}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Legal Owner</Label>
                      <p className="font-medium">
                        {formData.legalOwnerFirstName}{" "}
                        {formData.legalOwnerLastName}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600">VAT Number</Label>
                      <p className="font-medium">{user.vatNumber}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <Label className="text-gray-600">Legal Address</Label>
                    <p className="font-medium">
                      {formData.street}
                      <br />
                      {formData.city}, {formData.province} {formData.zipCode}
                      <br />
                      {formData.country}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Subscription Section - NEW */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Active Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600">Current Plan</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    {getPlanBadge(user.plan)}
                    {/* <span className="text-sm text-gray-500">€89/month</span> */}
                  </div>
                </div>
                <div>
                  <Label className="text-gray-600">Status</Label>
                  <div className="mt-1">
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-600">Next Billing Date</Label>
                  <p className="font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {user.nextBilling}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-600">Payment Method</Label>
                  <p className="font-medium">**** **** **** 4242</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowChangePlanModal(true)}
                  >
                    Change Plan
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-orange-600 hover:text-orange-700"
                    onClick={() => openConfirmModal("cancel-subscription")}
                  >
                    Cancel Subscription
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openConfirmModal("resume-subscription")}
                  >
                    Resume Subscription
                  </Button>
                  <Button variant="outline" size="sm">
                    Generate Payment Link
                  </Button>
                  <Button variant="outline" size="sm">
                    Resend Last Invoice
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment & Invoice History */}
          <Card>
            <CardHeader>
              <CardTitle>Payment & Invoice History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-600">Status</Label>
                <div className="mt-1">{getStatusBadge(user.accountStatus)}</div>
              </div>
              <div>
                <Label className="text-gray-600">Plan</Label>
                <div className="mt-1">{getPlanBadge(user.plan)}</div>
              </div>
              <div>
                <Label className="text-gray-600">Subscription Start</Label>
                <p className="font-medium">{user.subscriptionStart}</p>
              </div>
              <div>
                <Label className="text-gray-600">Next Billing</Label>
                <p className="font-medium">{user.nextBilling}</p>
              </div>
            </CardContent>
          </Card>

          {/* Access History */}
          <Card>
            <CardHeader>
              <CardTitle>Access History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-600">Last Login</Label>
                <p className="font-medium">{user.lastLogin}</p>
              </div>
              <div>
                <Label className="text-gray-600">Account Created</Label>
                <p className="font-medium">{user.created_at}</p>
              </div>
              <div>
                <Label className="text-gray-600">Location</Label>
                <p className="font-medium">{user.location}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowResetPasswordModal(true)}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Send className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-orange-600 hover:text-orange-700"
                onClick={() => openConfirmModal("suspend")}
              >
                <Ban className="w-4 h-4 mr-2" />
                {user.status === "suspended" ? "Activate" : "Suspend"} Account
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700"
                onClick={() => openConfirmModal("delete")}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <ConfirmActionModal
        isOpen={showConfirmModal.isOpen}
        title={showConfirmModal.title}
        message={showConfirmModal.message}
        confirmButtonText={showConfirmModal.confirmText}
        isDestructive={showConfirmModal.isDestructive}
        onConfirm={handleConfirmAction}
        onCancel={() =>
          setShowConfirmModal({ ...showConfirmModal, isOpen: false })
        }
      />

      <ResetPasswordModal
        user={user}
        isOpen={showResetPasswordModal}
        onClose={() => setShowResetPasswordModal(false)}
      />

      <ChangePlanModal
        user={user}
        isOpen={showChangePlanModal}
        onClose={() => setShowChangePlanModal(false)}
      />
    </div>
  );
};
