import React from 'react';
import { CheckCircle, CreditCard, Calendar, Unlock, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ThankYou = () => {
  // This would typically come from URL params or state
  const contactFirstName = "John"; // Placeholder - would be dynamic
  const planDetails = {
    name: "NovaFarm Monthly",
    type: "Monthly",
    amount: "€97",
    billingCycle: "Renews every month",
    nextBilling: "February 15, 2024"
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          
          {/* Confirmation Block */}
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Thank you, {contactFirstName}!
            </h1>
            <p className="text-xl text-muted-foreground">
              Your subscription was successful.
            </p>
          </div>

          {/* Plan Summary Block */}
          <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Subscription Details
              </h2>
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Plan Name:</span>
                  <span className="font-medium text-foreground">{planDetails.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Plan Type:</span>
                  <span className="font-medium text-foreground">{planDetails.type}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Amount Paid:</span>
                  <span className="font-medium text-foreground text-primary">{planDetails.amount}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Billing Cycle:</span>
                  <span className="font-medium text-foreground">{planDetails.billingCycle}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Next Billing Date:</span>
                  <span className="font-medium text-foreground">{planDetails.nextBilling}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next Block */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-semibold text-foreground">
              What's Next?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You'll receive a confirmation email with your login details. You can now access your dashboard 
              and start using all the features included in your plan.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3 text-left">
              <div className="flex items-start space-x-3">
                <Unlock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground">Access your dashboard</h3>
                  <p className="text-sm text-muted-foreground">Start using all premium features</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground">Check your inbox</h3>
                  <p className="text-sm text-muted-foreground">Confirmation email on its way</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MessageCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground">Contact us if you need help</h3>
                  <p className="text-sm text-muted-foreground">We're here to assist you</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Go to Dashboard
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Need help? Contact us
              </Button>
            </div>
          </div>

          {/* Footer Logo */}
          <div className="pt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-sm text-muted-foreground">
              © 2024 NovaFarm. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;