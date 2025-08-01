import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Download,
  RefreshCw,
  ExternalLink,
  Copy,
  Mail,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const paymentsData = [
  {
    id: "pay_1234567890",
    customer: "Farmacia Centrale Milano",
    email: "admin@farmaciacentrale.it",
    amount: 199.0,
    status: "paid",
    method: "Credit Card (****4242)",
    date: "2024-01-15",
    plan: "Premium Monthly",
    stripeId: "pi_1234567890",
  },
  {
    id: "pay_1234567891",
    customer: "Parafarmacia Benessere",
    email: "info@parafarmaciabenessere.it",
    amount: 99.0,
    status: "paid",
    method: "Credit Card (****1234)",
    date: "2024-01-14",
    plan: "Standard Monthly",
    stripeId: "pi_1234567891",
  },
  {
    id: "pay_1234567892",
    customer: "Farmacia San Marco",
    email: "contact@sanmarco.it",
    amount: 199.0,
    status: "failed",
    method: "Credit Card (****5678)",
    date: "2024-01-13",
    plan: "Premium Monthly",
    stripeId: "pi_1234567892",
  },
  {
    id: "pay_1234567893",
    customer: "Pharmacy Plus",
    email: "hello@pharmacyplus.com",
    amount: 49.0,
    status: "pending",
    method: "Bank Transfer",
    date: "2024-01-12",
    plan: "Basic Monthly",
    stripeId: "pi_1234567893",
  },
];

export const SuperAdminPayments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showPaymentLinkModal, setShowPaymentLinkModal] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [showGeneratedLink, setShowGeneratedLink] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const { toast } = useToast();

  const fetchPaymentTable = async () => {
    const { data, error } = await supabase.from("subscription").select("*");
    if (error) {
      console.error("Error fetching subscriptions:", error.message);
      return;
    }
    console.log("Fetched subscriptions:", data);
    setFetchedData(data);
  };

  useEffect(() => {
    fetchPaymentTable();
  }, []);

  // 24‑hour "DD‑MM‑YYYY HH:MM" in Asia/Karachi
  const fmtDateOnly = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Karachi",
  });

  const formatCreatedAt = (iso?: string) =>
    iso ? fmtDateOnly.format(new Date(iso)).replaceAll("/", "-") : "";

  // Payment link form state
  const [linkForm, setLinkForm] = useState({
    amount: "",
    description: "",
    planType: "",
    recipientEmail: "",
    expiration: "7 days",
  });

  const filteredPayments = paymentsData.filter((payment) => {
    const matchesSearch =
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Paid
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Failed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case "refunded":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Refunded
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalRevenue = paymentsData
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const handleGeneratePaymentLink = () => {
    // Validate required fields
    if (!linkForm.amount || !linkForm.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Generate simulated payment link
    const simulatedLink = `https://novafarm.app/payments/simulated/${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    setGeneratedLink(simulatedLink);
    setShowGeneratedLink(true);

    toast({
      title: "Payment Link Generated",
      description: "Payment link generated successfully (simulation only)",
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Link Copied",
      description: "Payment link copied to clipboard",
      className: "bg-blue-50 border-blue-200 text-blue-800",
    });
  };

  const closeModal = () => {
    setShowPaymentLinkModal(false);
    setShowGeneratedLink(false);
    setGeneratedLink("");
    setLinkForm({
      amount: "",
      description: "",
      planType: "",
      recipientEmail: "",
      expiration: "7 days",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Payments & Subscriptions
          </h1>
          <p className="text-gray-600 mt-1 text-left">
            Monitor all payment transactions and billing
          </p>
        </div>
        <Button
          className="bg-[#1C9B7A] hover:bg-[#158a69] mt-4 sm:mt-0"
          onClick={() => setShowPaymentLinkModal(true)}
        >
          Generate Payment Link
        </Button>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-[#1C9B7A]">
                €{totalRevenue.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Successful Payments</p>
              <p className="text-2xl font-bold text-green-600">
                {paymentsData.filter((p) => p.status === "paid").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Failed Payments</p>
              <p className="text-2xl font-bold text-red-600">
                {paymentsData.filter((p) => p.status === "failed").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {paymentsData.filter((p) => p.status === "pending").length}
              </p>
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
                placeholder="Search payments by customer or email..."
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
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 text-left">
            Payment Transactions ({filteredPayments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="w-full ">
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="font-semibold text-gray-900">
                    Customer
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Amount
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Method
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Plan
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Date
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {fetchedData.map((payment) => (
                  <TableRow
                    key={payment.id}
                    className="border-gray-200 hover:bg-gray-50 text-left"
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">
                          {payment?.customer_name?.trim() || ""}
                        </div>
                        <div className="text-sm text-gray-500">
                          {payment.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">
                        ${payment.amount_paid}
                        {/* €{payment.amount.toFixed(2)} */}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(payment.subscription_status)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {payment.method}Credit Card (****4242)
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {payment.plan_name}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatCreatedAt(payment.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>
                            <a
                              href="https://stripe.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View in Stripe
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Resend Invoice
                          </DropdownMenuItem>
                          {payment.status === "failed" && (
                            <DropdownMenuItem>
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Retry Payment
                            </DropdownMenuItem>
                          )}
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

      {/* Generate Payment Link Modal */}
      <Dialog
        open={showPaymentLinkModal}
        onOpenChange={setShowPaymentLinkModal}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Generate Payment Link
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Create a secure payment link for your customer
            </DialogDescription>
          </DialogHeader>

          {!showGeneratedLink ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="amount"
                  className="text-sm font-medium text-gray-700"
                >
                  Amount (€) *
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={linkForm.amount}
                  onChange={(e) =>
                    setLinkForm({ ...linkForm, amount: e.target.value })
                  }
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Payment Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="e.g., Premium subscription renewal"
                  value={linkForm.description}
                  onChange={(e) =>
                    setLinkForm({ ...linkForm, description: e.target.value })
                  }
                  className="border-gray-300 resize-none"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="planType"
                  className="text-sm font-medium text-gray-700"
                >
                  Plan Type
                </Label>
                <Select
                  value={linkForm.planType}
                  onValueChange={(value) =>
                    setLinkForm({ ...linkForm, planType: value })
                  }
                >
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select plan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="base">Base Plan</SelectItem>
                    <SelectItem value="premium">Premium Plan</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Recipient Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="customer@example.com"
                  value={linkForm.recipientEmail}
                  onChange={(e) =>
                    setLinkForm({ ...linkForm, recipientEmail: e.target.value })
                  }
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="expiration"
                  className="text-sm font-medium text-gray-700"
                >
                  Link Expiration
                </Label>
                <Select
                  value={linkForm.expiration}
                  onValueChange={(value) =>
                    setLinkForm({ ...linkForm, expiration: value })
                  }
                >
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24 hours">24 hours</SelectItem>
                    <SelectItem value="3 days">3 days</SelectItem>
                    <SelectItem value="7 days">7 days</SelectItem>
                    <SelectItem value="30 days">30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">
                  Payment Link Generated
                </h4>
                <p className="text-sm text-green-700 mb-3">
                  Your payment link has been created successfully.
                </p>
                <div className="flex items-center space-x-2">
                  <Input
                    value={generatedLink}
                    readOnly
                    className="text-sm bg-white border-green-300"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(generatedLink)}
                    className="border-green-300 text-green-700 hover:bg-green-50"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send via Email
                </Button>
                <Button
                  onClick={() => copyToClipboard(generatedLink)}
                  className="flex-1 bg-[#1C9B7A] hover:bg-[#158a69]"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={closeModal}
              className="border-gray-300"
            >
              {showGeneratedLink ? "Close" : "Cancel"}
            </Button>
            {!showGeneratedLink && (
              <Button
                onClick={handleGeneratePaymentLink}
                className="bg-[#1C9B7A] hover:bg-[#158a69]"
              >
                Generate Link
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
