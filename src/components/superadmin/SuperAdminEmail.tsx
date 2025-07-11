import React, { useState } from "react";
import {
  Mail,
  Plus,
  Search,
  Filter,
  Edit3,
  Eye,
  Copy,
  Trash2,
  Settings,
  Send,
  ChevronDown,
  X,
  Check,
  AlertCircle,
  Smartphone,
  Monitor,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  status: "Active" | "Inactive";
  lastModified: string;
  subject: string;
  fromName: string;
  fromEmail: string;
  replyTo: string;
  language: string;
  trigger: string;
  body: string;
  footer?: string;
}

export const SuperAdminEmail: React.FC = () => {
  const { toast } = useToast();
  const [view, setView] = useState<"list" | "editor" | "preview">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop"
  );
  const [showTestModal, setShowTestModal] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);

  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: "1",
      name: "Welcome Email",
      description: "Welcome new users to the platform",
      type: "New Subscription",
      status: "Active",
      lastModified: "2024-01-15 14:30",
      subject: "Welcome to NovaFarm!",
      fromName: "NovaFarm Team",
      fromEmail: "welcome@novafarm.com",
      replyTo: "support@novafarm.com",
      language: "English",
      trigger: "on_registration",
      body: "<h1>Welcome {{client_name}}!</h1><p>Thank you for joining NovaFarm. We are excited to have you on board.</p>",
      footer:
        "<p>© 2024 NovaFarm. All rights reserved.</p><p>If you have any questions, please contact our support team at support@novafarm.com</p>",
    },
    {
      id: "2",
      name: "Payment Failed",
      description: "Notify users when payment fails",
      type: "Payment Failed",
      status: "Active",
      lastModified: "2024-01-10 09:15",
      subject: "Payment Issue - Action Required",
      fromName: "NovaFarm Billing",
      fromEmail: "billing@novafarm.com",
      replyTo: "support@novafarm.com",
      language: "English",
      trigger: "on_payment_failed",
      body: "<h1>Payment Issue</h1><p>Hi {{client_name}}, we encountered an issue processing your payment of {{invoice_total}}.</p>",
      footer:
        "<p>For billing questions, contact us at billing@novafarm.com</p><p>© 2024 NovaFarm. All rights reserved.</p>",
    },
    {
      id: "3",
      name: "Invoice Generated",
      description: "Send invoice to customers",
      type: "Invoice",
      status: "Inactive",
      lastModified: "2023-12-28 16:45",
      subject: "New Invoice #{{invoice_number}}",
      fromName: "NovaFarm Billing",
      fromEmail: "billing@novafarm.com",
      replyTo: "support@novafarm.com",
      language: "English",
      trigger: "on_invoice_generated",
      body: "<h1>New Invoice</h1><p>Your invoice #{{invoice_number}} for {{invoice_total}} is ready.</p>",
      footer:
        "<p>Thank you for choosing NovaFarm!</p><p>© 2024 NovaFarm. All rights reserved.</p>",
    },
  ]);

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || template.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleEditTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setView("editor");
  };

  const handleNewTemplate = () => {
    const newTemplate: EmailTemplate = {
      id: Date.now().toString(),
      name: "New Template",
      description: "",
      type: "Manual",
      status: "Inactive",
      lastModified: new Date().toLocaleString(),
      subject: "",
      fromName: "NovaFarm Team",
      fromEmail: "noreply@novafarm.com",
      replyTo: "support@novafarm.com",
      language: "English",
      trigger: "manual",
      body: "<p>Start writing your email content here...</p>",
      footer:
        "<p>© 2024 NovaFarm. All rights reserved.</p><p>If you have any questions, please contact our support team.</p>",
    };
    setSelectedTemplate(newTemplate);
    setView("editor");
  };

  const handleSaveTemplate = () => {
    if (!selectedTemplate) return;

    setIsLoading(true);
    setTimeout(() => {
      const updatedTemplate = {
        ...selectedTemplate,
        lastModified: new Date().toLocaleString(),
      };

      setTemplates((prev) => {
        const existing = prev.find((t) => t.id === selectedTemplate.id);
        if (existing) {
          return prev.map((t) =>
            t.id === selectedTemplate.id ? updatedTemplate : t
          );
        } else {
          return [...prev, updatedTemplate];
        }
      });

      setIsLoading(false);
      setAutoSaved(true);
      setTimeout(() => setAutoSaved(false), 2000);

      toast({
        title: "Template Saved",
        description: "Email template has been saved successfully.",
      });
    }, 1000);
  };

  const handleSendTest = () => {
    if (!testEmail) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowTestModal(false);
      setTestEmail("");
      toast({
        title: "Test Email Sent",
        description: `Test email sent successfully to ${testEmail}`,
      });
    }, 2000);
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      setTemplates((prev) => prev.filter((t) => t.id !== templateId));
      toast({
        title: "Template Deleted",
        description: "Email template has been deleted successfully.",
      });
    }
  };

  const handleDuplicateTemplate = (template: EmailTemplate) => {
    const duplicated = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      status: "Inactive" as const,
      lastModified: new Date().toLocaleString(),
    };
    setTemplates((prev) => [...prev, duplicated]);
    toast({
      title: "Template Duplicated",
      description: "Template has been duplicated successfully.",
    });
  };

  const renderTemplateList = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Mail className="w-7 h-7 text-[#1C9B7A]" />
            Email Templates
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and customize email templates for automated communications
          </p>
        </div>
        <Button
          onClick={handleNewTemplate}
          className="bg-[#27AE60] hover:bg-[#219A52]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Template
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#1C9B7A]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {template.description}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    template.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {template.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <strong>Type:</strong> {template.type}
                </div>
                <div>
                  <strong>Last Modified:</strong> {template.lastModified}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditTemplate(template)}
                  >
                    <Edit3 className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedTemplate(template);
                      setView("preview");
                    }}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>

                <div className="flex items-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDuplicateTemplate(template)}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Duplicate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No templates found
          </h3>
          <p className="text-gray-600 mb-4">
            Get started by creating your first email template.
          </p>
          <Button
            onClick={handleNewTemplate}
            className="bg-[#27AE60] hover:bg-[#219A52]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Template
          </Button>
        </div>
      )}
    </div>
  );

  const renderEditor = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setView("list")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedTemplate?.id === Date.now().toString()
                ? "New Template"
                : "Edit Template"}
            </h1>
            {autoSaved && (
              <div className="flex items-center gap-2 text-sm text-green-600 mt-1">
                <Check className="w-4 h-4" />
                Auto-saved
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowTestModal(true)}>
            <Send className="w-4 h-4 mr-2" />
            Send Test
          </Button>
          <Button
            onClick={() => {
              setSelectedTemplate(selectedTemplate);
              setView("preview");
            }}
            variant="outline"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={handleSaveTemplate}
            disabled={isLoading}
            className="bg-[#27AE60] hover:bg-[#219A52]"
          >
            {isLoading ? "Saving..." : "Save Template"}
          </Button>
        </div>
      </div>

      {/* Editor Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Template Name
                </label>
                <Input
                  value={selectedTemplate?.name || ""}
                  onChange={(e) =>
                    setSelectedTemplate((prev) =>
                      prev ? { ...prev, name: e.target.value } : null
                    )
                  }
                  placeholder="Enter template name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <Input
                  value={selectedTemplate?.description || ""}
                  onChange={(e) =>
                    setSelectedTemplate((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                  placeholder="Brief description of this template"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status
                  </label>
                  <select
                    value={selectedTemplate?.status || "Inactive"}
                    onChange={(e) =>
                      setSelectedTemplate((prev) =>
                        prev
                          ? {
                              ...prev,
                              status: e.target.value as "Active" | "Inactive",
                            }
                          : null
                      )
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C9B7A]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Trigger
                  </label>
                  <select
                    value={selectedTemplate?.trigger || "manual"}
                    onChange={(e) =>
                      setSelectedTemplate((prev) =>
                        prev ? { ...prev, trigger: e.target.value } : null
                      )
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C9B7A]"
                  >
                    <option value="manual">Manual</option>
                    <option value="on_registration">On Registration</option>
                    <option value="on_payment_failed">On Payment Failed</option>
                    <option value="on_invoice_generated">
                      On Invoice Generated
                    </option>
                    <option value="on_subscription_expired">
                      On Subscription Expired
                    </option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject Line
                </label>
                <Input
                  value={selectedTemplate?.subject || ""}
                  onChange={(e) =>
                    setSelectedTemplate((prev) =>
                      prev ? { ...prev, subject: e.target.value } : null
                    )
                  }
                  placeholder="Email subject line"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    From Name
                  </label>
                  <Input
                    value={selectedTemplate?.fromName || ""}
                    onChange={(e) =>
                      setSelectedTemplate((prev) =>
                        prev ? { ...prev, fromName: e.target.value } : null
                      )
                    }
                    placeholder="NovaFarm Team"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    From Email
                  </label>
                  <Input
                    value={selectedTemplate?.fromEmail || ""}
                    onChange={(e) =>
                      setSelectedTemplate((prev) =>
                        prev ? { ...prev, fromEmail: e.target.value } : null
                      )
                    }
                    placeholder="noreply@novafarm.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Reply-To Email
                </label>
                <Input
                  value={selectedTemplate?.replyTo || ""}
                  onChange={(e) =>
                    setSelectedTemplate((prev) =>
                      prev ? { ...prev, replyTo: e.target.value } : null
                    )
                  }
                  placeholder="support@novafarm.com"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Content</CardTitle>
              <p className="text-sm text-gray-600">
                Use variables like {`{{client_name}}`}, {`{{invoice_total}}`},{" "}
                {`{{invoice_number}}`}
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={selectedTemplate?.body || ""}
                onChange={(e) =>
                  setSelectedTemplate((prev) =>
                    prev ? { ...prev, body: e.target.value } : null
                  )
                }
                placeholder="Write your email content here..."
                className="min-h-[300px] font-mono text-sm"
              />
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">
                  Available Variables:
                </h4>
                <div className="flex flex-wrap gap-2 text-sm">
                  {[
                    "{{\u200Bclient_name}}",
                    "{{\u200Binvoice_total}}",
                    "{{\u200Binvoice_number}}",
                    "{{\u200Bcompany_name}}",
                    "{{\u200Bdate}}",
                  ].map((variable) => (
                    <span
                      key={variable}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded cursor-pointer hover:bg-blue-200"
                      onClick={() => {
                        const textarea = document.querySelector("textarea");
                        if (textarea && selectedTemplate) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const newBody =
                            selectedTemplate.body.substring(0, start) +
                            variable +
                            selectedTemplate.body.substring(end);
                          setSelectedTemplate({
                            ...selectedTemplate,
                            body: newBody,
                          });
                        }
                      }}
                    >
                      {variable}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Footer</CardTitle>
              <p className="text-sm text-gray-600">
                Add legal disclaimers, contact info, or unsubscribe instructions
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={selectedTemplate?.footer || ""}
                onChange={(e) =>
                  setSelectedTemplate((prev) =>
                    prev ? { ...prev, footer: e.target.value } : null
                  )
                }
                placeholder="© 2024 NovaFarm. All rights reserved.&#10;If you have any questions, please contact our support team."
                className="min-h-[120px] font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                Footer is optional and will appear at the bottom of your email
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderPreview = () => {
    // Create preview content by replacing template variables with sample data
    const getPreviewContent = (content: string) => {
      if (!content) return "";

      return content
        .replace(/\{\{client_name\}\}/g, "John Doe")
        .replace(/\{\{invoice_total\}\}/g, "$99.00")
        .replace(/\{\{invoice_number\}\}/g, "INV-2024-001")
        .replace(/\{\{company_name\}\}/g, "NovaFarm")
        .replace(/\{\{date\}\}/g, new Date().toLocaleDateString());
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() =>
                setView(
                  selectedTemplate?.id === Date.now().toString()
                    ? "editor"
                    : "list"
                )
              }
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              Preview: {selectedTemplate?.name}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={previewMode === "desktop" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewMode("desktop")}
            >
              <Monitor className="w-4 h-4 mr-2" />
              Desktop
            </Button>
            <Button
              variant={previewMode === "mobile" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewMode("mobile")}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex justify-center">
          <div
            className={`bg-white border border-gray-300 rounded-lg shadow-lg ${
              previewMode === "mobile" ? "max-w-sm" : "max-w-2xl w-full"
            }`}
          >
            {/* Email Header */}
            <div className="border-b border-gray-200 p-4 bg-gray-50">
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  <strong>From:</strong> {selectedTemplate?.fromName} &lt;
                  {selectedTemplate?.fromEmail}&gt;
                </div>
                <div>
                  <strong>Subject:</strong>{" "}
                  {getPreviewContent(selectedTemplate?.subject || "")}
                </div>
                <div>
                  <strong>Reply-To:</strong> {selectedTemplate?.replyTo}
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-6">
              <div
                dangerouslySetInnerHTML={{
                  __html: getPreviewContent(selectedTemplate?.body || ""),
                }}
                className="prose prose-sm max-w-none"
              />

              {/* Footer */}
              {selectedTemplate?.footer && (
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: getPreviewContent(selectedTemplate.footer),
                    }}
                    className="text-xs text-gray-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {view === "list" && renderTemplateList()}
      {view === "editor" && renderEditor()}
      {view === "preview" && renderPreview()}

      {/* Test Email Modal */}
      {showTestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Send Test Email</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTestModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Test Email Address
                </label>
                <Input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="test@example.com"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSendTest}
                  disabled={!testEmail || isLoading}
                  className="flex-1 bg-[#27AE60] hover:bg-[#219A52]"
                >
                  {isLoading ? "Sending..." : "Send Test Email"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowTestModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
