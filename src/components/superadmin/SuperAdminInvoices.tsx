import React, { useState } from "react";
import {
  Search,
  Download,
  Filter,
  MoreVertical,
  Eye,
  Send,
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
import InvoiceGenerationModal from "./InvoiceGenerationModal";

const invoicesData = [
  {
    id: "INV-2024-001",
    customer: "Farmacia Centrale Milano",
    email: "admin@farmaciacentrale.it",
    amount: 243.78,
    netAmount: 199.0,
    vatAmount: 44.78,
    status: "paid",
    dueDate: "2024-01-15",
    issueDate: "2024-01-01",
    plan: "Premium Monthly",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV-2024-002",
    customer: "Parafarmacia Benessere",
    email: "info@parafarmaciabenessere.it",
    amount: 120.78,
    netAmount: 99.0,
    vatAmount: 21.78,
    status: "paid",
    dueDate: "2024-01-14",
    issueDate: "2024-01-01",
    plan: "Standard Monthly",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV-2024-003",
    customer: "Farmacia San Marco",
    email: "contact@sanmarco.it",
    amount: 243.78,
    netAmount: 199.0,
    vatAmount: 44.78,
    status: "overdue",
    dueDate: "2024-01-13",
    issueDate: "2024-01-01",
    plan: "Premium Monthly",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV-2024-004",
    customer: "Pharmacy Plus",
    email: "hello@pharmacyplus.com",
    amount: 59.78,
    netAmount: 49.0,
    vatAmount: 10.78,
    status: "unpaid",
    dueDate: "2024-01-20",
    issueDate: "2024-01-05",
    plan: "Basic Monthly",
    paymentMethod: "Credit Card",
  },
];

export const SuperAdminInvoices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const filteredInvoices = invoicesData.filter((invoice) => {
    const matchesSearch =
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;

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
      case "unpaid":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Unpaid
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Overdue
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Draft
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalInvoiced = invoicesData.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoicesData
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-left">
            Invoice Management
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage all EU-compliant invoices
          </p>
        </div>
        <Button
          className="bg-[#1C9B7A] hover:bg-[#158a69] mt-4 sm:mt-0"
          onClick={() => setShowInvoiceModal(true)}
        >
          Generate Invoice
        </Button>
      </div>

      {/* Invoice Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Invoiced</p>
              <p className="text-2xl font-bold text-[#1C9B7A]">
                €{totalInvoiced.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Paid</p>
              <p className="text-2xl font-bold text-green-600">
                €{totalPaid.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">
                {invoicesData.filter((inv) => inv.status === "overdue").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-blue-600">
                {invoicesData.length}
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
                placeholder="Search invoices by customer, ID, or email..."
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
                <SelectItem value="all">All Invoices</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Invoices ({filteredInvoices.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="font-semibold text-gray-900">
                    Invoice
                  </TableHead>
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
                    Due Date
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Plan
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow
                    key={invoice.id}
                    className="border-gray-200 hover:bg-gray-50"
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">
                          {invoice.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          Issued: {invoice.issueDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">
                          {invoice.customer}
                        </div>
                        <div className="text-sm text-gray-500">
                          {invoice.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">
                          €{invoice.amount.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Net: €{invoice.netAmount.toFixed(2)} + VAT: €
                          {invoice.vatAmount.toFixed(2)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {invoice.dueDate}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {invoice.plan}
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
                            <Eye className="w-4 h-4 mr-2" />
                            View Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="w-4 h-4 mr-2" />
                            Send to Customer
                          </DropdownMenuItem>
                          {invoice.status === "overdue" && (
                            <DropdownMenuItem className="text-red-600">
                              <Send className="w-4 h-4 mr-2" />
                              Send Reminder
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

      {/* EU Compliance Notice */}
      <Card className="bg-blue-50 border border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            EU Invoice Compliance
          </h3>
          <p className="text-sm text-blue-800">
            All invoices are generated in compliance with EU regulations and
            include: VAT breakdown (22%), sequential numbering, company details,
            and proper causale notation. Invoices are stored securely and
            available for audit purposes.
          </p>
        </CardContent>
      </Card>

      {/* Invoice Generation Modal */}
      <InvoiceGenerationModal
        isOpen={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
      />
    </div>
  );
};
