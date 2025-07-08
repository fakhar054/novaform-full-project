import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, Plus, Trash2, FileText, Send, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InvoiceGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  total: number;
}

interface ClientInfo {
  businessName: string;
  vatNumber: string;
  billingEmail: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
    province: string;
    country: string;
  };
}

const InvoiceGenerationModal: React.FC<InvoiceGenerationModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    businessName: '',
    vatNumber: '',
    billingEmail: '',
    address: {
      street: '',
      city: '',
      zipCode: '',
      province: '',
      country: 'Italy'
    }
  });

  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    reference: '',
    currency: 'EUR'
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: '1',
      description: '',
      quantity: 1,
      unitPrice: 0,
      vatRate: 22,
      total: 0
    }
  ]);

  const [summary, setSummary] = useState({
    subtotal: 0,
    totalVat: 0,
    totalDue: 0,
    amountPaid: 0,
    balanceDue: 0
  });

  const [sendEmail, setSendEmail] = useState(false);

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      vatRate: 22,
      total: 0
    };
    setLineItems([...lineItems, newItem]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice' || field === 'vatRate') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateSummary = () => {
    const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
    const totalVat = lineItems.reduce((sum, item) => sum + (item.total * item.vatRate / 100), 0);
    const totalDue = subtotal + totalVat;
    const balanceDue = totalDue - summary.amountPaid;

    setSummary({
      subtotal,
      totalVat,
      totalDue,
      amountPaid: summary.amountPaid,
      balanceDue
    });
  };

  React.useEffect(() => {
    calculateSummary();
  }, [lineItems, summary.amountPaid]);

  const handlePreviewPDF = () => {
    toast({
      title: "PDF Preview",
      description: "Opening invoice preview...",
    });
  };

  const handleGenerateInvoice = () => {
    toast({
      title: "Invoice Generated",
      description: `Invoice ${invoiceDetails.invoiceNumber} has been saved successfully.`,
    });
    if (sendEmail) {
      toast({
        title: "Email Sent",
        description: `Invoice sent to ${clientInfo.billingEmail}`,
      });
    }
    onClose();
  };

  const handleSendEmailChange = (checked: boolean) => {
    setSendEmail(checked);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Generate Invoice</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={clientInfo.businessName}
                    onChange={(e) => setClientInfo({...clientInfo, businessName: e.target.value})}
                    placeholder="Enter business name"
                  />
                </div>
                <div>
                  <Label htmlFor="vatNumber">VAT Number / Tax Code</Label>
                  <Input
                    id="vatNumber"
                    value={clientInfo.vatNumber}
                    onChange={(e) => setClientInfo({...clientInfo, vatNumber: e.target.value})}
                    placeholder="Enter VAT number"
                  />
                </div>
                <div>
                  <Label htmlFor="billingEmail">Billing Email *</Label>
                  <Input
                    id="billingEmail"
                    type="email"
                    value={clientInfo.billingEmail}
                    onChange={(e) => setClientInfo({...clientInfo, billingEmail: e.target.value})}
                    placeholder="Enter billing email"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Legal Address</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="street">Street and Number</Label>
                    <Input
                      id="street"
                      value={clientInfo.address.street}
                      onChange={(e) => setClientInfo({
                        ...clientInfo,
                        address: {...clientInfo.address, street: e.target.value}
                      })}
                      placeholder="Enter street address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={clientInfo.address.city}
                      onChange={(e) => setClientInfo({
                        ...clientInfo,
                        address: {...clientInfo.address, city: e.target.value}
                      })}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                    <Input
                      id="zipCode"
                      value={clientInfo.address.zipCode}
                      onChange={(e) => setClientInfo({
                        ...clientInfo,
                        address: {...clientInfo.address, zipCode: e.target.value}
                      })}
                      placeholder="Enter ZIP code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="province">Province / Region</Label>
                    <Input
                      id="province"
                      value={clientInfo.address.province}
                      onChange={(e) => setClientInfo({
                        ...clientInfo,
                        address: {...clientInfo.address, province: e.target.value}
                      })}
                      placeholder="Enter province"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    value={invoiceDetails.invoiceNumber}
                    onChange={(e) => setInvoiceDetails({...invoiceDetails, invoiceNumber: e.target.value})}
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="invoiceDate">Invoice Date</Label>
                  <Input
                    id="invoiceDate"
                    type="date"
                    value={invoiceDetails.invoiceDate}
                    onChange={(e) => setInvoiceDetails({...invoiceDetails, invoiceDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={invoiceDetails.dueDate}
                    onChange={(e) => setInvoiceDetails({...invoiceDetails, dueDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reference">Causale / Reference</Label>
                  <Input
                    id="reference"
                    value={invoiceDetails.reference}
                    onChange={(e) => setInvoiceDetails({...invoiceDetails, reference: e.target.value})}
                    placeholder="Enter reference or description"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={invoiceDetails.currency} onValueChange={(value) => setInvoiceDetails({...invoiceDetails, currency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">Line Items</CardTitle>
              <Button onClick={addLineItem} size="sm" className="bg-[#078147] hover:bg-[#066139]">
                <Plus className="w-4 h-4 mr-1" />
                Add Item
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lineItems.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
                    <div className="md:col-span-2">
                      <Label htmlFor={`description-${item.id}`}>Description</Label>
                      <Input
                        id={`description-${item.id}`}
                        value={item.description}
                        onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                        placeholder="Item description"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                      <Input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`unitPrice-${item.id}`}>Unit Price</Label>
                      <Input
                        id={`unitPrice-${item.id}`}
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.unitPrice}
                        onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`vatRate-${item.id}`}>VAT (%)</Label>
                      <Select 
                        value={item.vatRate.toString()} 
                        onValueChange={(value) => updateLineItem(item.id, 'vatRate', parseFloat(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0%</SelectItem>
                          <SelectItem value="4">4%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="22">22%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <Label>Total</Label>
                        <div className="text-lg font-medium">€{item.total.toFixed(2)}</div>
                      </div>
                      {lineItems.length > 1 && (
                        <Button
                          onClick={() => removeLineItem(item.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-w-md ml-auto">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>€{summary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total VAT:</span>
                  <span>€{summary.totalVat.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Due:</span>
                  <span>€{summary.totalDue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="amountPaid">Amount Paid:</Label>
                  <Input
                    id="amountPaid"
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-32"
                    value={summary.amountPaid}
                    onChange={(e) => setSummary({...summary, amountPaid: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="flex justify-between font-medium text-lg">
                  <span>Balance Due:</span>
                  <span className={summary.balanceDue > 0 ? "text-red-600" : "text-green-600"}>
                    €{summary.balanceDue.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sendEmail"
                    checked={sendEmail}
                    onCheckedChange={handleSendEmailChange}
                  />
                  <Label htmlFor="sendEmail">Send invoice via email to client</Label>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handlePreviewPDF}
                    variant="outline"
                    className="flex items-center"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Preview PDF
                  </Button>
                  
                  <Button
                    onClick={handleGenerateInvoice}
                    className="bg-[#078147] hover:bg-[#066139] flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Generate & Save Invoice
                  </Button>
                  
                  <Button
                    onClick={onClose}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceGenerationModal;
