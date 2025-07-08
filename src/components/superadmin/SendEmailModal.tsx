
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface SendEmailModalProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
}

export const SendEmailModal: React.FC<SendEmailModalProps> = ({ user, isOpen, onClose }) => {
  const [emailData, setEmailData] = useState({
    to: user.email,
    subject: '',
    message: '',
    template: ''
  });
  const { toast } = useToast();

  const emailTemplates = [
    { value: '', label: 'Custom Message' },
    { value: 'welcome', label: 'Welcome Message' },
    { value: 'payment_reminder', label: 'Payment Reminder' },
    { value: 'account_update', label: 'Account Update' },
    { value: 'maintenance', label: 'Maintenance Notice' }
  ];

  const handleTemplateChange = (template: string) => {
    setEmailData(prev => ({ ...prev, template }));
    
    switch (template) {
      case 'welcome':
        setEmailData(prev => ({
          ...prev,
          subject: 'Welcome to NovaFarm!',
          message: `Hi ${user.businessName},\n\nWelcome to NovaFarm! We're excited to have you on board.\n\nIf you have any questions, please don't hesitate to reach out.\n\nBest regards,\nNovaFarm Team`
        }));
        break;
      case 'payment_reminder':
        setEmailData(prev => ({
          ...prev,
          subject: 'Payment Reminder - NovaFarm',
          message: `Hi ${user.businessName},\n\nThis is a friendly reminder about your upcoming payment due on ${user.nextBilling}.\n\nPlease ensure your payment method is up to date.\n\nBest regards,\nNovaFarm Team`
        }));
        break;
      case 'account_update':
        setEmailData(prev => ({
          ...prev,
          subject: 'Account Update - NovaFarm',
          message: `Hi ${user.businessName},\n\nWe wanted to inform you about recent updates to your account.\n\nIf you have any questions, please contact our support team.\n\nBest regards,\nNovaFarm Team`
        }));
        break;
      case 'maintenance':
        setEmailData(prev => ({
          ...prev,
          subject: 'Scheduled Maintenance - NovaFarm',
          message: `Hi ${user.businessName},\n\nWe will be performing scheduled maintenance on our platform.\n\nDuring this time, you may experience brief service interruptions.\n\nThank you for your understanding.\n\nBest regards,\nNovaFarm Team`
        }));
        break;
      default:
        setEmailData(prev => ({
          ...prev,
          subject: '',
          message: ''
        }));
    }
  };

  const handleSend = () => {
    toast({
      title: "Email Sent",
      description: `Email has been sent to ${user.businessName} at ${user.email}.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Send Email to {user.businessName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="template">Email Template:</Label>
            <Select value={emailData.template} onValueChange={handleTemplateChange}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a template" />
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

          <div>
            <Label htmlFor="to">To:</Label>
            <Input
              id="to"
              value={emailData.to}
              onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="subject">Subject:</Label>
            <Input
              id="subject"
              value={emailData.subject}
              onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="Enter email subject"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="message">Message:</Label>
            <Textarea
              id="message"
              value={emailData.message}
              onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Enter your message"
              rows={8}
              className="mt-2"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSend}
            disabled={!emailData.subject || !emailData.message}
            className="bg-[#1C9B7A] hover:bg-[#158a69]"
          >
            Send Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
