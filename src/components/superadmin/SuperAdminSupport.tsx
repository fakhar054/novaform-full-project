
import React, { useState } from 'react';
import { Search, MessageCircle, Clock, CheckCircle, AlertCircle, Send, Paperclip, Image, X, Download, ArrowLeft, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

const ticketsData = [
  {
    id: 'TICKET-001',
    customer: 'Farmacia Centrale Milano',
    email: 'admin@farmaciacentrale.it',
    subject: 'Unable to process payments',
    status: 'open',
    priority: 'high',
    created: '2024-01-15 10:30',
    lastReply: '2024-01-15 14:20',
    category: 'Technical',
    description: 'Payment gateway not working, customers cannot complete transactions.',
    replies: [
      {
        id: 1,
        author: 'admin@farmaciacentrale.it',
        content: 'Payment gateway not working, customers cannot complete transactions. This started happening this morning.',
        timestamp: '2024-01-15 10:30',
        isAdmin: false
      },
      {
        id: 2,
        author: 'Support Team',
        content: 'Hi, thank you for reporting this issue. We are investigating the payment gateway issue. Can you please provide more details about the error messages you are seeing?',
        timestamp: '2024-01-15 11:45',
        isAdmin: true
      },
      {
        id: 3,
        author: 'admin@farmaciacentrale.it',
        content: 'The error shows "Payment processing failed - please try again" but it happens with all payment methods.',
        timestamp: '2024-01-15 14:20',
        isAdmin: false,
        attachments: [
          { name: 'error-screenshot.png', type: 'image', url: 'https://via.placeholder.com/300x200' }
        ]
      }
    ]
  },
  {
    id: 'TICKET-002',
    customer: 'Parafarmacia Benessere',
    email: 'info@parafarmaciabenessere.it',
    subject: 'How to export customer data?',
    status: 'in-progress',
    priority: 'medium',
    created: '2024-01-14 16:45',
    lastReply: '2024-01-14 17:30',
    category: 'General',
    description: 'Need help with exporting customer database for GDPR compliance.',
    replies: [
      {
        id: 1,
        author: 'info@parafarmaciabenessere.it',
        content: 'Need help with exporting customer database for GDPR compliance. Where can I find this option?',
        timestamp: '2024-01-14 16:45',
        isAdmin: false
      },
      {
        id: 2,
        author: 'Support Team',
        content: 'You can export customer data from Settings > Data Export. I\'ll send you a detailed guide.',
        timestamp: '2024-01-14 17:30',
        isAdmin: true
      }
    ]
  },
  {
    id: 'TICKET-003',
    customer: 'Farmacia San Marco',
    email: 'contact@sanmarco.it',
    subject: 'Billing discrepancy',
    status: 'resolved',
    priority: 'low',
    created: '2024-01-13 09:15',
    lastReply: '2024-01-13 15:45',
    category: 'Billing',
    description: 'Invoice amount does not match the agreed subscription fee.',
    replies: [
      {
        id: 1,
        author: 'contact@sanmarco.it',
        content: 'Invoice amount does not match the agreed subscription fee. Please check.',
        timestamp: '2024-01-13 09:15',
        isAdmin: false
      },
      {
        id: 2,
        author: 'Support Team',
        content: 'Issue has been resolved. The billing has been corrected and a new invoice will be sent.',
        timestamp: '2024-01-13 15:45',
        isAdmin: true
      }
    ]
  },
  {
    id: 'TICKET-004',
    customer: 'Pharmacy Plus',
    email: 'hello@pharmacyplus.com',
    subject: 'Feature request: Multi-language support',
    status: 'closed',
    priority: 'low',
    created: '2024-01-12 11:20',
    lastReply: '2024-01-12 11:20',
    category: 'Feature Request',
    description: 'Would like to have German translation for the platform.',
    replies: [
      {
        id: 1,
        author: 'hello@pharmacyplus.com',
        content: 'Would like to have German translation for the platform.',
        timestamp: '2024-01-12 11:20',
        isAdmin: false
      }
    ]
  }
];

export const SuperAdminSupport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [replyText, setReplyText] = useState('');
  const [tickets, setTickets] = useState(ticketsData);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const { toast } = useToast();

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">🟢 Open</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">🟡 In Progress</Badge>;
      case 'on-hold':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">🟠 On Hold</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✅ Resolved</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">🔒 Closed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">🔴 High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">🟡 Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">🟢 Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    ));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(prev => ({ ...prev, status: newStatus }));
    }
    toast({
      title: "Status Updated",
      description: `Ticket status updated to ${newStatus}`,
    });
  };

  const handlePriorityChange = (ticketId: string, newPriority: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId ? { ...ticket, priority: newPriority } : ticket
    ));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(prev => ({ ...prev, priority: newPriority }));
    }
    toast({
      title: "Priority Updated",
      description: `Ticket priority updated to ${newPriority}`,
    });
  };

  const handleSendReply = () => {
    if (replyText.trim() && selectedTicket) {
      const newReply = {
        id: selectedTicket.replies.length + 1,
        author: 'Support Team',
        content: replyText,
        timestamp: new Date().toLocaleString(),
        isAdmin: true
      };
      
      setSelectedTicket(prev => ({
        ...prev,
        replies: [...prev.replies, newReply]
      }));
      
      setReplyText('');
      toast({
        title: "Reply Sent",
        description: "Your reply has been sent successfully",
      });
    }
  };

  const handleFileUpload = (type: 'image' | 'file') => {
    const uploadId = Date.now().toString();
    setUploadProgress(prev => ({ ...prev, [uploadId]: 0 }));
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const current = prev[uploadId] || 0;
        if (current >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(prev => {
              const { [uploadId]: removed, ...rest } = prev;
              return rest;
            });
            toast({
              title: "Upload Complete",
              description: `${type === 'image' ? 'Image' : 'File'} uploaded successfully`,
            });
          }, 500);
          return prev;
        }
        return { ...prev, [uploadId]: current + 10 };
      });
    }, 100);
  };

  const viewTicketDetail = (ticket: any) => {
    setSelectedTicket(ticket);
    setShowTicketDetail(true);
  };

  if (showTicketDetail && selectedTicket) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTicketDetail(false)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tickets</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedTicket.id}</h1>
              <p className="text-gray-600">{selectedTicket.subject}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(selectedTicket.status)}
            {getPriorityBadge(selectedTicket.priority)}
          </div>
        </div>

        {/* Ticket Info Card */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Customer</p>
                <p className="font-medium">{selectedTicket.customer}</p>
                <p className="text-sm text-gray-500">{selectedTicket.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Select
                  value={selectedTicket.status}
                  onValueChange={(value) => handleStatusChange(selectedTicket.id, value)}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">🟢 Open</SelectItem>
                    <SelectItem value="in-progress">🟡 In Progress</SelectItem>
                    <SelectItem value="on-hold">🟠 On Hold</SelectItem>
                    <SelectItem value="resolved">✅ Resolved</SelectItem>
                    <SelectItem value="closed">🔒 Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-sm text-gray-600">Priority</p>
                <Select
                  value={selectedTicket.priority}
                  onValueChange={(value) => handlePriorityChange(selectedTicket.id, value)}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">🔴 High</SelectItem>
                    <SelectItem value="medium">🟡 Medium</SelectItem>
                    <SelectItem value="low">🟢 Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat Thread */}
        <Card className="bg-white">
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto p-6 space-y-4">
              {selectedTicket.replies?.map((reply) => (
                <div
                  key={reply.id}
                  className={`flex ${reply.isAdmin ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      reply.isAdmin
                        ? 'bg-[#1C9B7A] text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">{reply.author}</span>
                      <span className="text-xs opacity-75">{reply.timestamp}</span>
                    </div>
                    <p className="text-sm">{reply.content}</p>
                    {reply.attachments && (
                      <div className="mt-2 space-y-2">
                        {reply.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            {attachment.type === 'image' ? (
                              <img
                                src={attachment.url}
                                alt={attachment.name}
                                className="w-32 h-20 object-cover rounded"
                              />
                            ) : (
                              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded px-2 py-1">
                                <Paperclip className="w-4 h-4" />
                                <span className="text-xs">{attachment.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Input */}
            {selectedTicket.status !== 'closed' && (
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleFileUpload('image')}>
                          <Image className="w-4 h-4 mr-2" />
                          Upload Image
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFileUpload('file')}>
                          <Paperclip className="w-4 h-4 mr-2" />
                          Upload File
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button onClick={handleSendReply} className="bg-[#1C9B7A] hover:bg-[#158a69]">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Upload Progress */}
                {Object.entries(uploadProgress).map(([id, progress]) => (
                  <div key={id} className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>Uploading...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-[#1C9B7A] h-1 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {selectedTicket.status === 'closed' && (
              <div className="border-t p-4 text-center">
                <p className="text-gray-500 text-sm">This ticket is closed. No further replies can be added.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-gray-600 mt-1">Manage customer support requests and inquiries</p>
        </div>
      </div>

      {/* Support Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open Tickets</p>
                <p className="text-2xl font-bold text-blue-600">
                  {tickets.filter(t => t.status === 'open').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {tickets.filter(t => t.status === 'in-progress').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">
                  {tickets.filter(t => t.status === 'resolved').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">
                  {tickets.filter(t => t.priority === 'high').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-red-600" />
              </div>
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
                placeholder="Search tickets by customer, subject, or ticket ID..."
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
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Support Tickets ({filteredTickets.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="font-semibold text-gray-900">Ticket</TableHead>
                  <TableHead className="font-semibold text-gray-900">Customer</TableHead>
                  <TableHead className="font-semibold text-gray-900">Subject</TableHead>
                  <TableHead className="font-semibold text-gray-900">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900">Priority</TableHead>
                  <TableHead className="font-semibold text-gray-900">Last Reply</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow 
                    key={ticket.id} 
                    className={`border-gray-200 hover:bg-gray-50 cursor-pointer ${
                      ticket.status === 'closed' ? 'opacity-75' : ''
                    }`}
                    onClick={() => viewTicketDetail(ticket)}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{ticket.id}</div>
                        <div className="text-sm text-gray-500">{ticket.category}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{ticket.customer}</div>
                        <div className="text-sm text-gray-500">{ticket.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="font-medium text-gray-900 truncate">{ticket.subject}</div>
                        <div className="text-sm text-gray-500">{ticket.replies?.length || 0} replies</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(ticket.status)}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(ticket.priority)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {ticket.lastReply}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          viewTicketDetail(ticket);
                        }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
