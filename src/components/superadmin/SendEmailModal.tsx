import React, { useState, useRef, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";

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

  const [selected_template, set_selected_template] = useState();
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Fetch email templates from Supabase
  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("email_template_table")
        .select("*");
      if (error) {
        console.error("Failed to fetch templates:", error.message);
      } else {
        setEmailTemplates(data);
      }
    };

    if (isOpen) fetchTemplates();
  }, [isOpen]);

  console.log("data coming from email template", emailTemplates);

  // const handleTemplateChange = (selectedTemplateName) => {
  //   const selectedTemplate = emailTemplates.find(
  //     (template) => template.template_name === selectedTemplateName
  //   );

  //   if (selectedTemplate) {
  //     setEmailData((prev) => ({
  //       ...prev,
  //       template: selectedTemplateName,
  //       subject: selectedTemplate.subject_Line || "",
  //     }));
  //   }
  // };

  const handleTemplateChange = (selectedTemplateName) => {
    const selectedTemplate = emailTemplates.find(
      (template) => template.template_name === selectedTemplateName
    );

    if (selectedTemplate) {
      setEmailData((prev) => ({
        ...prev,
        template: selectedTemplateName,
        subject: selectedTemplate.subject_Line || "",
        message: selectedTemplate.content || "", // <- Add this line
      }));
    }
  };

  const insertTriggerField = (field: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const before = emailData.message.substring(0, start);
      const after = emailData.message.substring(end);
      setEmailData((prev) => ({
        ...prev,
        message: before + field + after,
      }));
    }
  };

  const formatText = (format: "bold" | "italic" | "underline" | "list") => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = emailData.message.substring(start, end);

      let formatted = selected;
      if (format === "bold") formatted = `**${selected}**`;
      if (format === "italic") formatted = `*${selected}*`;
      if (format === "underline") formatted = `_${selected}_`;
      if (format === "list")
        formatted = selected
          .split("\n")
          .map((l) => `• ${l}`)
          .join("\n");

      setEmailData((prev) => ({
        ...prev,
        message:
          emailData.message.substring(0, start) +
          formatted +
          emailData.message.substring(end),
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter((file) => {
      if (
        !["image/jpeg", "image/png", "image/gif", "application/pdf"].includes(
          file.type
        )
      ) {
        toast({
          title: "Invalid file",
          description: "Only JPEG, PNG, GIF, or PDF allowed.",
          variant: "destructive",
        });
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Max size 5MB.",
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (attachments.length + valid.length > 3) {
      toast({
        title: "Max 3 files allowed",
        variant: "destructive",
      });
      return;
    }

    setAttachments((prev) => [...prev, ...valid]);
  };

  const handleSend = async () => {
    setIsSending(true);

    try {
      const res = await fetch(
        "https://ajbxscredobhqfksaqrk.supabase.co/functions/v1/smooth-task",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // to: emailData.to,
            to: "fakharali054@gmail.com",
            subject: emailData.subject,
            html: `<p>${emailData.message}</p>`,
          }),
        }
      );

      if (res.ok) {
        // toast("Email sent!");
        console.log("Email send successfully");
      } else {
        toast({
          title: "Failed to send email",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      toast({ title: "Error sending email", variant: "destructive" });
    } finally {
      setIsSending(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Mail className="w-5 h-5 text-[#1C9B7A]" />
            Send Email to {user.businessName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Dropdown */}
          <div>
            <Label>Email Template</Label>

            <Select
              value={emailData.template}
              onValueChange={handleTemplateChange}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {emailTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.template_name}>
                    {template.template_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Subject</Label>
            <Input
              value={emailData.subject}
              onChange={(e) =>
                setEmailData((prev) => ({
                  ...prev,
                  subject: e.target.value,
                }))
              }
            />
          </div>

          {/* Message */}
          <div>
            <Label>Message</Label>
            <Card className="mt-2 p-2 bg-gray-50 border">
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => formatText("bold")}
                >
                  <Bold className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => formatText("italic")}
                >
                  <Italic className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => formatText("underline")}
                >
                  <Underline className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => formatText("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            <Textarea
              ref={textareaRef}
              rows={10}
              value={emailData.message}
              onChange={(e) =>
                setEmailData((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={!emailData.subject || !emailData.message || isSending}
          >
            {isSending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Send
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
