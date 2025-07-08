
import React from 'react';
import { Download, Calendar, FileText } from 'lucide-react';

export const Invoices: React.FC = () => {
  const invoices = [
    {
      id: 'INV-2024-001',
      date: '2024-01-15',
      amount: 199.00,
      status: 'paid',
      description: 'Premium Plan - Annual'
    },
    {
      id: 'INV-2023-012',
      date: '2023-01-15',
      amount: 199.00,
      status: 'paid',
      description: 'Premium Plan - Annual'
    },
    {
      id: 'INV-2022-024',
      date: '2022-12-15',
      amount: 19.99,
      status: 'paid',
      description: 'Premium Plan - Monthly'
    },
    {
      id: 'INV-2022-023',
      date: '2022-11-15',
      amount: 19.99,
      status: 'paid',
      description: 'Premium Plan - Monthly'
    },
    {
      id: 'INV-2022-022',
      date: '2022-10-15',
      amount: 19.99,
      status: 'paid',
      description: 'Premium Plan - Monthly'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownload = (invoiceId: string) => {
    // Simulate PDF download
    console.log(`Downloading invoice ${invoiceId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
          Invoices
        </h1>
        <p className="text-gray-600">
          View and download your billing history
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#078147]/10 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#078147]" />
            </div>
          </div>
          <h3 className="font-semibold text-black mb-1">Total Invoices</h3>
          <p className="text-2xl font-bold text-[#078147]">{invoices.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#078147]/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#078147]" />
            </div>
          </div>
          <h3 className="font-semibold text-black mb-1">This Year</h3>
          <p className="text-2xl font-bold text-[#078147]">€199.00</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <h3 className="font-semibold text-black mb-1">Status</h3>
          <p className="text-2xl font-bold text-green-600">All Paid</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-black">Invoice History</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-black">{invoice.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{formatDate(invoice.date)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{invoice.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-black">€{invoice.amount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDownload(invoice.id)}
                      className="flex items-center space-x-1 text-[#078147] hover:text-[#066139] font-medium"
                    >
                      <Download className="w-4 h-4" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Download All */}
      <div className="flex justify-end">
        <button className="bg-[#078147] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#066139] transition-colors flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Download All Invoices</span>
        </button>
      </div>
    </div>
  );
};
