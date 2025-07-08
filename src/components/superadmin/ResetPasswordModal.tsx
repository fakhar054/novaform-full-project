
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ResetPasswordModalProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ user, isOpen, onClose }) => {
  const [method, setMethod] = useState<'email' | 'manual'>('email');
  const [newPassword, setNewPassword] = useState('');
  const [emailMessage, setEmailMessage] = useState(`Hi ${user.businessName.split(' ')[0]},\n\nYour password has been reset by the administrator. Please check your email for the reset link.\n\nBest regards,\nNovaFarm Team`);
  const { toast } = useToast();

  const handleSend = () => {
    if (method === 'email') {
      toast({
        title: "Password Reset Email Sent",
        description: `Password reset email has been sent to ${user.email}.`,
      });
    } else {
      toast({
        title: "Password Reset",
        description: `Password has been manually reset for ${user.businessName}.`,
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reset Password for {user.businessName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex space-x-4">
            <Button
              variant={method === 'email' ? 'default' : 'outline'}
              onClick={() => setMethod('email')}
              className="flex-1"
            >
              Send Reset Email
            </Button>
            <Button
              variant={method === 'manual' ? 'default' : 'outline'}
              onClick={() => setMethod('manual')}
              className="flex-1"
            >
              Set Manual Password
            </Button>
          </div>

          {method === 'email' ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="recipient">Email will be sent to:</Label>
                <Input
                  id="recipient"
                  value={user.email}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="message">Email Message:</Label>
                <Textarea
                  id="message"
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  rows={6}
                  className="mt-2"
                />
              </div>
            </div>
          ) : (
            <div>
              <Label htmlFor="newPassword">New Password:</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-2">
                Password should be at least 8 characters long and contain letters and numbers.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSend}
            disabled={method === 'manual' && newPassword.length < 8}
            className="bg-[#1C9B7A] hover:bg-[#158a69]"
          >
            {method === 'email' ? 'Send Reset Email' : 'Set New Password'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
