import React, { useState } from 'react';
import { Shield, Globe, Palette, Bell, Database, Lock, CreditCard, Mail, Webhook, Key, Eye, EyeOff, Copy, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export const SuperAdminSettings: React.FC = () => {
  const { toast } = useToast();
  
  // Existing settings state
  const [settings, setSettings] = useState({
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    autoBackups: true,
    platformName: 'NovaFarm',
    supportEmail: 'support@novafarm.com',
    maxUsers: '1000',
    sessionTimeout: '30',
    apiRateLimit: '1000',
    defaultLanguage: 'it',
    allowRegistration: true,
    requireEmailVerification: true
  });

  // New advanced settings state
  const [stripeSettings, setStripeSettings] = useState({
    publishableKey: '',
    secretKey: '',
    webhookSecret: '',
    liveMode: false,
    connected: false
  });

  const [emailSettings, setEmailSettings] = useState({
    provider: 'resend',
    apiKey: '',
    fromName: 'NovaFarm',
    fromEmail: 'noreply@novafarm.com',
    replyTo: 'support@novafarm.com',
    transactionalEnabled: true
  });

  const [webhookSettings, setWebhookSettings] = useState({
    events: {
      userRegistered: true,
      paymentCompleted: true,
      subscriptionCancelled: false,
      ticketCreated: true
    },
    secret: 'wh_sec_••••••••••••••••'
  });

  const [apiSettings, setApiSettings] = useState({
    adminApiKey: 'sk_••••••••••••••••',
    ipWhitelist: '',
    enableApiAccess: true,
    requestsPerHour: 1000,
    enableRateLimit: true
  });

  // Modal states
  const [testEmailModal, setTestEmailModal] = useState(false);
  const [regenerateWebhookModal, setRegenerateWebhookModal] = useState(false);
  const [regenerateApiKeyModal, setRegenerateApiKeyModal] = useState(false);
  const [testEmailData, setTestEmailData] = useState({ to: '', subject: '', message: '' });
  const [showSecrets, setShowSecrets] = useState({
    stripeSecret: false,
    webhookSecret: false,
    apiKey: false
  });
  const [loading, setLoading] = useState({
    stripeTest: false,
    emailTest: false
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleStripeTest = async () => {
    setLoading(prev => ({ ...prev, stripeTest: true }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, stripeTest: false }));
      setStripeSettings(prev => ({ ...prev, connected: true }));
      toast({
        title: "Stripe Connection Test",
        description: "Connection test successful (simulation only)",
      });
    }, 2000);
  };

  const handleSendTestEmail = async () => {
    setLoading(prev => ({ ...prev, emailTest: true }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, emailTest: false }));
      setTestEmailModal(false);
      setTestEmailData({ to: '', subject: '', message: '' });
      toast({
        title: "Test Email Sent",
        description: "Email sent successfully (simulated)",
      });
    }, 1500);
  };

  const handleRegenerateWebhook = () => {
    setWebhookSettings(prev => ({ 
      ...prev, 
      secret: 'wh_sec_' + Math.random().toString(36).substring(2, 18) 
    }));
    setRegenerateWebhookModal(false);
    toast({
      title: "Webhook Secret Regenerated",
      description: "New webhook secret has been generated successfully",
    });
  };

  const handleRegenerateApiKey = () => {
    setApiSettings(prev => ({ 
      ...prev, 
      adminApiKey: 'sk_' + Math.random().toString(36).substring(2, 18) 
    }));
    setRegenerateApiKeyModal(false);
    toast({
      title: "API Key Regenerated",
      description: "New admin API key has been generated successfully",
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: `${label} has been copied to your clipboard`,
    });
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    toast({
      title: "Settings Saved",
      description: "Platform settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-gray-600 mt-1">Configure system-wide settings and preferences</p>
        </div>
        <Button onClick={handleSaveSettings} className="bg-[#1C9B7A] hover:bg-[#158a69] mt-4 sm:mt-0">
          Save All Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Settings */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#1C9B7A]" />
              <CardTitle className="text-lg font-semibold text-gray-900">Security Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-gray-900">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Enable 2FA for admin account</p>
              </div>
              <Switch
                checked={settings.twoFactorEnabled}
                onCheckedChange={(checked) => handleSettingChange('twoFactorEnabled', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                type="number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiRateLimit">API Rate Limit (requests/hour)</Label>
              <Input
                id="apiRateLimit"
                value={settings.apiRateLimit}
                onChange={(e) => handleSettingChange('apiRateLimit', e.target.value)}
                type="number"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-gray-900">Require Email Verification</Label>
                <p className="text-sm text-gray-600">New users must verify email</p>
              </div>
              <Switch
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) => handleSettingChange('requireEmailVerification', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Platform Configuration */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#1C9B7A]" />
              <CardTitle className="text-lg font-semibold text-gray-900">Platform Configuration</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={settings.platformName}
                onChange={(e) => handleSettingChange('platformName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultLanguage">Default Language</Label>
              <Select value={settings.defaultLanguage} onValueChange={(value) => handleSettingChange('defaultLanguage', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">Italian</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxUsers">Maximum Users</Label>
              <Input
                id="maxUsers"
                type="number"
                value={settings.maxUsers}
                onChange={(e) => handleSettingChange('maxUsers', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Stripe Integration */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#1C9B7A]" />
              <CardTitle className="text-lg font-semibold text-gray-900">Stripe Integration</CardTitle>
              <div className={`ml-auto px-2 py-1 rounded-full text-xs ${stripeSettings.connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {stripeSettings.connected ? 'Connected' : 'Not Connected'}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stripePublishable">Stripe Publishable Key</Label>
              <Input
                id="stripePublishable"
                value={stripeSettings.publishableKey}
                onChange={(e) => setStripeSettings(prev => ({ ...prev, publishableKey: e.target.value }))}
                placeholder="pk_test_..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stripeSecret">Stripe Secret Key</Label>
              <div className="relative">
                <Input
                  id="stripeSecret"
                  type={showSecrets.stripeSecret ? "text" : "password"}
                  value={stripeSettings.secretKey}
                  onChange={(e) => setStripeSettings(prev => ({ ...prev, secretKey: e.target.value }))}
                  placeholder="sk_test_..."
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => setShowSecrets(prev => ({ ...prev, stripeSecret: !prev.stripeSecret }))}
                >
                  {showSecrets.stripeSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhookSecret">Webhook Secret Key</Label>
              <div className="relative">
                <Input
                  id="webhookSecret"
                  type={showSecrets.webhookSecret ? "text" : "password"}
                  value={stripeSettings.webhookSecret}
                  onChange={(e) => setStripeSettings(prev => ({ ...prev, webhookSecret: e.target.value }))}
                  placeholder="whsec_..."
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => setShowSecrets(prev => ({ ...prev, webhookSecret: !prev.webhookSecret }))}
                >
                  {showSecrets.webhookSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhookEndpoint">Webhook Endpoint</Label>
              <div className="flex gap-2">
                <Input
                  id="webhookEndpoint"
                  value="https://api.novafarm.com/webhooks/stripe"
                  readOnly
                  className="bg-gray-50"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard('https://api.novafarm.com/webhooks/stripe', 'Webhook endpoint')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-gray-900">Live Mode</Label>
                <p className="text-sm text-gray-600">Use production Stripe keys</p>
              </div>
              <Switch
                checked={stripeSettings.liveMode}
                onCheckedChange={(checked) => setStripeSettings(prev => ({ ...prev, liveMode: checked }))}
              />
            </div>

            <Button 
              onClick={handleStripeTest}
              disabled={loading.stripeTest}
              className="w-full"
            >
              {loading.stripeTest && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
              Test Connection
            </Button>
          </CardContent>
        </Card>

        {/* Email Provider Setup */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#1C9B7A]" />
              <CardTitle className="text-lg font-semibold text-gray-900">Email Provider Integration</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emailProvider">Email Service</Label>
              <Select value={emailSettings.provider} onValueChange={(value) => setEmailSettings(prev => ({ ...prev, provider: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resend">Resend</SelectItem>
                  <SelectItem value="mailgun">Mailgun</SelectItem>
                  <SelectItem value="sendgrid">SendGrid</SelectItem>
                  <SelectItem value="smtp">SMTP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailApiKey">API Key</Label>
              <Input
                id="emailApiKey"
                type="password"
                value={emailSettings.apiKey}
                onChange={(e) => setEmailSettings(prev => ({ ...prev, apiKey: e.target.value }))}
                placeholder="Enter API key or SMTP password"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromName">From Name</Label>
                <Input
                  id="fromName"
                  value={emailSettings.fromName}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromEmail">From Email</Label>
                <Input
                  id="fromEmail"
                  type="email"
                  value={emailSettings.fromEmail}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="replyTo">Reply-To Email</Label>
              <Input
                id="replyTo"
                type="email"
                value={emailSettings.replyTo}
                onChange={(e) => setEmailSettings(prev => ({ ...prev, replyTo: e.target.value }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-gray-900">Enable Transactional Emails</Label>
                <p className="text-sm text-gray-600">Allow system to send automated emails</p>
              </div>
              <Switch
                checked={emailSettings.transactionalEnabled}
                onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, transactionalEnabled: checked }))}
              />
            </div>

            <Button 
              onClick={() => setTestEmailModal(true)}
              variant="outline"
              className="w-full"
              disabled={!emailSettings.transactionalEnabled}
            >
              Send Test Email
            </Button>
          </CardContent>
        </Card>

        {/* Webhook Configuration */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Webhook className="w-5 h-5 text-[#1C9B7A]" />
              <CardTitle className="text-lg font-semibold text-gray-900">Webhook Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-900">System Events</Label>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium text-gray-900">New User Registered</Label>
                  <p className="text-sm text-gray-600">Trigger when a new user signs up</p>
                </div>
                <Switch
                  checked={webhookSettings.events.userRegistered}
                  onCheckedChange={(checked) => setWebhookSettings(prev => ({ 
                    ...prev, 
                    events: { ...prev.events, userRegistered: checked } 
                  }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium text-gray-900">Payment Completed</Label>
                  <p className="text-sm text-gray-600">Trigger when payment is successful</p>
                </div>
                <Switch
                  checked={webhookSettings.events.paymentCompleted}
                  onCheckedChange={(checked) => setWebhookSettings(prev => ({ 
                    ...prev, 
                    events: { ...prev.events, paymentCompleted: checked } 
                  }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium text-gray-900">Subscription Cancelled</Label>
                  <p className="text-sm text-gray-600">Trigger when subscription is cancelled</p>
                </div>
                <Switch
                  checked={webhookSettings.events.subscriptionCancelled}
                  onCheckedChange={(checked) => setWebhookSettings(prev => ({ 
                    ...prev, 
                    events: { ...prev.events, subscriptionCancelled: checked } 
                  }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium text-gray-900">Ticket Created</Label>
                  <p className="text-sm text-gray-600">Trigger when support ticket is created</p>
                </div>
                <Switch
                  checked={webhookSettings.events.ticketCreated}
                  onCheckedChange={(checked) => setWebhookSettings(prev => ({ 
                    ...prev, 
                    events: { ...prev.events, ticketCreated: checked } 
                  }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhookEndpointDisplay">Current Webhook Endpoint</Label>
              <div className="flex gap-2">
                <Input
                  id="webhookEndpointDisplay"
                  value="https://api.novafarm.com/webhooks/system"
                  readOnly
                  className="bg-gray-50"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard('https://api.novafarm.com/webhooks/system', 'Webhook endpoint')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhookSecretDisplay">Webhook Secret</Label>
              <div className="flex gap-2">
                <Input
                  id="webhookSecretDisplay"
                  value={webhookSettings.secret}
                  readOnly
                  className="bg-gray-50"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(webhookSettings.secret, 'Webhook secret')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button 
              onClick={() => setRegenerateWebhookModal(true)}
              variant="outline"
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate Webhook Secret
            </Button>
          </CardContent>
        </Card>

        {/* API Access & Keys */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-[#1C9B7A]" />
              <CardTitle className="text-lg font-semibold text-gray-900">API Keys & Access</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminApiKeyDisplay">Admin API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="adminApiKeyDisplay"
                  type={showSecrets.apiKey ? "text" : "password"}
                  value={apiSettings.adminApiKey}
                  readOnly
                  className="bg-gray-50"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSecrets(prev => ({ ...prev, apiKey: !prev.apiKey }))}
                >
                  {showSecrets.apiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(apiSettings.adminApiKey, 'Admin API key')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button 
              onClick={() => setRegenerateApiKeyModal(true)}
              variant="outline"
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate API Key
            </Button>

            <div className="space-y-2">
              <Label htmlFor="ipWhitelist">IP Whitelist (optional)</Label>
              <Input
                id="ipWhitelist"
                value={apiSettings.ipWhitelist}
                onChange={(e) => setApiSettings(prev => ({ ...prev, ipWhitelist: e.target.value }))}
                placeholder="192.168.1.1, 10.0.0.1"
              />
              <p className="text-xs text-gray-500">Comma-separated IP addresses. Leave empty to allow all IPs.</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-gray-900">Enable API Access</Label>
                <p className="text-sm text-gray-600">Allow external tools to access API</p>
              </div>
              <Switch
                checked={apiSettings.enableApiAccess}
                onCheckedChange={(checked) => setApiSettings(prev => ({ ...prev, enableApiAccess: checked }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requestsPerHour">Requests per Hour</Label>
              <Input
                id="requestsPerHour"
                type="number"
                value={apiSettings.requestsPerHour}
                onChange={(e) => setApiSettings(prev => ({ ...prev, requestsPerHour: parseInt(e.target.value) || 1000 }))}
                disabled={!apiSettings.enableRateLimit}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-gray-900">Enable Rate Limit</Label>
                <p className="text-sm text-gray-600">Limit API requests per hour</p>
              </div>
              <Switch
                checked={apiSettings.enableRateLimit}
                onCheckedChange={(checked) => setApiSettings(prev => ({ ...prev, enableRateLimit: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#1C9B7A]" />
              <CardTitle className="text-lg font-semibold text-gray-900">Notification Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-gray-900">Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive admin notifications via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-gray-900">SMS Notifications</Label>
                <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-gray-900">Allow User Registration</Label>
                <p className="text-sm text-gray-600">Enable public registration</p>
              </div>
              <Switch
                checked={settings.allowRegistration}
                onCheckedChange={(checked) => handleSettingChange('allowRegistration', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#1C9B7A]" />
              <CardTitle className="text-lg font-semibold text-gray-900">System Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-gray-900">Maintenance Mode</Label>
                <p className="text-sm text-gray-600">Put platform in maintenance mode</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-gray-900">Automatic Backups</Label>
                <p className="text-sm text-gray-600">Enable daily database backups</p>
              </div>
              <Switch
                checked={settings.autoBackups}
                onCheckedChange={(checked) => handleSettingChange('autoBackups', checked)}
              />
            </div>

            <div className="pt-4">
              <Button variant="outline" className="w-full">
                <Database className="w-4 h-4 mr-2" />
                Create Manual Backup
              </Button>
            </div>

            <div className="pt-2">
              <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                <Lock className="w-4 h-4 mr-2" />
                Clear All Caches
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branding Settings */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#1C9B7A]" />
            <CardTitle className="text-lg font-semibold text-gray-900">Platform Branding</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                placeholder="https://example.com/logo.png"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="faviconUrl">Favicon URL</Label>
              <Input
                id="faviconUrl"
                placeholder="https://example.com/favicon.ico"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="welcomeMessage">Welcome Message</Label>
            <Textarea
              id="welcomeMessage"
              placeholder="Welcome to NovaFarm - Your complete pharmacy management solution"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <Input
                id="primaryColor"
                type="color"
                defaultValue="#1C9B7A"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <Input
                id="secondaryColor"
                type="color"
                defaultValue="#F3EEE9"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accentColor">Accent Color</Label>
              <Input
                id="accentColor"
                type="color"
                defaultValue="#8E8E93"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Email Modal */}
      <Dialog open={testEmailModal} onOpenChange={setTestEmailModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Test Email</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="testEmailTo">To</Label>
              <Input
                id="testEmailTo"
                type="email"
                value={testEmailData.to}
                onChange={(e) => setTestEmailData(prev => ({ ...prev, to: e.target.value }))}
                placeholder="test@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testEmailSubject">Subject</Label>
              <Input
                id="testEmailSubject"
                value={testEmailData.subject}
                onChange={(e) => setTestEmailData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Test Email from NovaFarm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testEmailMessage">Message</Label>
              <Textarea
                id="testEmailMessage"
                value={testEmailData.message}
                onChange={(e) => setTestEmailData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="This is a test email to verify the email configuration."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTestEmailModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSendTestEmail}
              disabled={loading.emailTest || !testEmailData.to}
              className="bg-[#1C9B7A] hover:bg-[#158a69]"
            >
              {loading.emailTest && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
              Send Test Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Regenerate Webhook Secret Modal */}
      <Dialog open={regenerateWebhookModal} onOpenChange={setRegenerateWebhookModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Regenerate Webhook Secret</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to regenerate the webhook secret? This will invalidate the current secret and you'll need to update your webhook configuration.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRegenerateWebhookModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleRegenerateWebhook} className="bg-[#1C9B7A] hover:bg-[#158a69]">
              Regenerate Secret
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Regenerate API Key Modal */}
      <Dialog open={regenerateApiKeyModal} onOpenChange={setRegenerateApiKeyModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Regenerate API Key</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to regenerate the admin API key? This will invalidate the current key and any applications using it will need to be updated.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRegenerateApiKeyModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleRegenerateApiKey} className="bg-[#1C9B7A] hover:bg-[#158a69]">
              Regenerate Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
