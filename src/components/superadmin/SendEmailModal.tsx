import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Bold,
  Italic,
  Underline,
  List,
  Upload,
  X,
  FileText,
  Image,
  Loader2,
  Mail,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface SendEmailModalProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
}

export const SendEmailModal: React.FC<SendEmailModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const [emailData, setEmailData] = useState({
    to: user.email,
    subject: "",
    message: "",
    template: "",
  });

  //extracting name from user object
  const busniesName = user.businessName;
  // console.log("name is", user);

  const [attachments, setAttachments] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const emailTemplates = [
    { value: "custom", label: "Custom Message" },
    { value: "welcome", label: "Welcome Message" },
    { value: "payment_reminder", label: "Payment Reminder" },
    { value: "account_update", label: "Account Update" },
    { value: "maintenance", label: "Maintenance Notice" },
  ];

  const triggerFields = [
    { value: "{{business_name}}", label: "Business Name" },
    { value: "{{email}}", label: "Email Address" },
    { value: "{{plan}}", label: "Subscription Plan" },
    { value: "{{next_billing}}", label: "Next Billing Date" },
    { value: "{{location}}", label: "Location" },
  ];

  const handleTemplateChange = (template: string) => {
    setEmailData((prev) => ({ ...prev, template }));

    switch (template) {
      case "welcome":
        setEmailData((prev) => ({
          ...prev,
          subject: "Welcome to NovaFarm!",
          message: `Hi ${busniesName},\n\nWelcome to NovaFarm! We're excited to have you on board with your {{plan}} subscription.\n\nIf you have any questions, please don't hesitate to reach out.\n\nBest regards,\nNovaFarm Team`,
        }));
        break;
      case "payment_reminder":
        setEmailData((prev) => ({
          ...prev,
          subject: "Payment Reminder - NovaFarm",
          message: `Hi {{business_name}},\n\nThis is a friendly reminder about your upcoming payment due on {{next_billing}}.\n\nPlease ensure your payment method is up to date.\n\nBest regards,\nNovaFarm Team`,
        }));
        break;
      case "account_update":
        setEmailData((prev) => ({
          ...prev,
          subject: "Account Update - NovaFarm",
          message: `Hi ${user.busniesName},\n\nWe wanted to inform you about recent updates to your account.\n\nIf you have any questions, please contact our support team.\n\nBest regards,\nNovaFarm Team`,
        }));
        break;
      case "maintenance":
        setEmailData((prev) => ({
          ...prev,
          subject: "Scheduled Maintenance - NovaFarm",
          message: `Hi {{business_name}},\n\nWe will be performing scheduled maintenance on our platform.\n\nDuring this time, you may experience brief service interruptions.\n\nThank you for your understanding.\n\nBest regards,\nNovaFarm Team`,
        }));
        break;
      default:
        setEmailData((prev) => ({
          ...prev,
          subject: "",
          message: "",
        }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Only JPEG, PNG, GIF images and PDF files are allowed.",
          variant: "destructive",
        });
        return false;
      }
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: "Files must be smaller than 5MB.",
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (attachments.length + validFiles.length > 3) {
      toast({
        title: "Too many attachments",
        description: "Maximum 3 attachments allowed.",
        variant: "destructive",
      });
      return;
    }

    setAttachments((prev) => [...prev, ...validFiles]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const insertTriggerField = (field: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = emailData.message;
      const before = text.substring(0, start);
      const after = text.substring(end);

      setEmailData((prev) => ({
        ...prev,
        message: before + field + after,
      }));

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + field.length, start + field.length);
      }, 0);
    }
  };

  const formatText = (format: "bold" | "italic" | "underline" | "list") => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = emailData.message.substring(start, end);

      if (selectedText) {
        let formattedText = "";
        switch (format) {
          case "bold":
            formattedText = `**${selectedText}**`;
            break;
          case "italic":
            formattedText = `*${selectedText}*`;
            break;
          case "underline":
            formattedText = `_${selectedText}_`;
            break;
          case "list":
            formattedText = selectedText
              .split("\n")
              .map((line) => `• ${line}`)
              .join("\n");
            break;
        }

        const text = emailData.message;
        const before = text.substring(0, start);
        const after = text.substring(end);

        setEmailData((prev) => ({
          ...prev,
          message: before + formattedText + after,
        }));
      }
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();

    setIsSending(true);

    console.log("Sending email:", emailData);

    try {
      const res = await fetch(
        "https://ajbxscredobhqfksaqrk.supabase.co/functions/v1/smooth-task",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // to: "fakharali054@gmail.com",
            to: emailData.to,
            subject: emailData.subject,
            html: `<p>${emailData.message}</p>`,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Email sent successfully!");
        toast({
          title: "Email Sent Successfully",
          description: `Email has been sent to ${user.businessName} at ${user.email}.`,
        });
      } else {
        console.error(` Failed to send email: ${data.error}`);
      }
    } catch (error) {
      console.error(" Error while sending email:", error);
    } finally {
      setIsSending(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <Mail className="w-5 h-5 text-[#1C9B7A]" />
            📨 Send Email to {user.businessName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Email Template Selection */}
          <div>
            <Label htmlFor="template" className="text-sm font-medium">
              Email Template
            </Label>
            <Select
              value={emailData.template}
              onValueChange={handleTemplateChange}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a template or create custom message" />
              </SelectTrigger>
              <SelectContent>
                {emailTemplates.map((template) => (
                  <SelectItem key={template.value} value={template.value}>
                    {template.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* To Field (Read-only) */}
          <div>
            <Label htmlFor="to" className="text-sm font-medium">
              To
            </Label>
            <Input
              id="to"
              // value="fakharali054@gmail.com"
              value={emailData.to}
              // readOnly
              className="mt-2 bg-gray-50 text-gray-600 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              Pre-filled with selected user's email
            </p>
          </div>

          {/* Subject Field */}
          <div>
            <Label htmlFor="subject" className="text-sm font-medium">
              Subject
            </Label>
            <Input
              id="subject"
              value={emailData.subject}
              onChange={(e) =>
                setEmailData((prev) => ({ ...prev, subject: e.target.value }))
              }
              placeholder="Enter email subject line"
              className="mt-2"
            />
          </div>

          {/* Trigger Fields */}
          <div>
            <Label className="text-sm font-medium">Insert Trigger Fields</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {triggerFields.map((field) => (
                <Button
                  key={field.value}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertTriggerField(field.value)}
                  className="text-xs hover:bg-[#1C9B7A] hover:text-white transition-colors"
                >
                  {field.label}
                </Button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Click to insert dynamic fields into your message
            </p>
          </div>

          {/* Message Field with Rich Text Toolbar */}
          <div>
            <Label htmlFor="message" className="text-sm font-medium">
              Message
            </Label>

            {/* Rich Text Formatting Toolbar */}
            <Card className="mt-2 p-2 border border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1 border-r pr-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText("bold")}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText("italic")}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText("underline")}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                    title="Underline"
                  >
                    <Underline className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText("list")}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                    title="Bullet List"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-600">
                  Select text and click formatting buttons
                </p>
              </div>
            </Card>

            <Textarea
              ref={textareaRef}
              id="message"
              value={emailData.message}
              onChange={(e) =>
                setEmailData((prev) => ({ ...prev, message: e.target.value }))
              }
              placeholder="Enter your email message here... Use the formatting toolbar above for styling."
              rows={10}
              className="mt-2 resize-none focus:ring-2 focus:ring-[#1C9B7A] focus:border-[#1C9B7A]"
            />
          </div>

          {/* File Attachments */}
          <div>
            <Label className="text-sm font-medium">Attachments</Label>
            <div className="mt-2 space-y-3">
              {/* Upload Button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-dashed border-2 border-gray-300 h-16 hover:border-[#1C9B7A] hover:bg-[#1C9B7A]/5 transition-all"
                disabled={attachments.length >= 3}
              >
                <Upload className="w-5 h-5 mr-2" />
                {attachments.length >= 3
                  ? "Maximum 3 files allowed"
                  : "Upload Images or PDF files (Max 5MB each)"}
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,application/pdf"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Attachment Preview */}
              {attachments.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Attached files ({attachments.length}/3):
                  </p>
                  {attachments.map((file, index) => (
                    <Card
                      key={index}
                      className="p-3 bg-gray-50 border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {file.type.startsWith("image/") ? (
                            <Image className="w-5 h-5 text-blue-600" />
                          ) : (
                            <FileText className="w-5 h-5 text-red-600" />
                          )}
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                          className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="border-t pt-4 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="hover:bg-gray-100 transition-colors"
            disabled={isSending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={!emailData.subject || !emailData.message || isSending}
            className="bg-[#1C9B7A] hover:bg-[#158a69] text-white px-6 transition-all hover:scale-105 active:scale-95"
          >
            {isSending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
