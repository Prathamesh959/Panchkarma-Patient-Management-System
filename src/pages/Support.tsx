import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, MessageCircle, Phone, Mail, Clock, User, FileText, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Support = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [ticketData, setTicketData] = useState({
    category: "",
    priority: "",
    subject: "",
    description: "",
    attachments: ""
  });

  const supportCategories = [
    "Appointment Booking",
    "Treatment Information", 
    "Billing & Payment",
    "Technical Issues",
    "Feedback & Complaints",
    "General Inquiry",
    "Emergency Support"
  ];

  const faqData = [
    {
      category: "Appointments",
      questions: [
        {
          q: "How do I book an appointment?",
          a: "You can book appointments through the 'Appointment' section in your dashboard. Select your preferred therapy, date, and time slot. Our team will confirm within 24 hours."
        },
        {
          q: "Can I reschedule my appointment?",
          a: "Yes, you can reschedule up to 4 hours before your appointment time. Go to your upcoming appointments and select 'Reschedule'."
        },
        {
          q: "What should I bring to my appointment?",
          a: "Please bring a valid ID, comfortable loose clothing, and any previous medical reports. Arrive 15 minutes early for preparation."
        }
      ]
    },
    {
      category: "Treatments",
      questions: [
        {
          q: "What is Panchakarma and how long does it take?",
          a: "Panchakarma is a detoxification and rejuvenation program. A complete package typically takes 14-21 days with daily sessions, depending on your constitution and health goals."
        },
        {
          q: "Are there any side effects of Ayurvedic treatments?",
          a: "Ayurvedic treatments are generally safe when performed by qualified practitioners. You may experience mild detox symptoms initially, which is normal and indicates the treatment is working."
        },
        {
          q: "How should I prepare for treatments?",
          a: "Follow pre-procedure guidelines including fasting requirements, avoiding certain foods, and wearing appropriate clothing. Specific instructions are provided for each treatment type."
        }
      ]
    },
    {
      category: "Billing",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept cash, credit/debit cards, UPI payments, and bank transfers. Payment can be made before or after treatment sessions."
        },
        {
          q: "Can I get a refund if I cancel my treatment?",
          a: "Refunds are available based on our cancellation policy. Cancellations made 48+ hours in advance are eligible for full refund."
        },
        {
          q: "Do you provide invoices for insurance claims?",
          a: "Yes, we provide detailed invoices with all necessary information for insurance claims. You can download invoices from the billing section."
        }
      ]
    }
  ];

  const supportTickets = [
    {
      id: "TKT-2024-001",
      subject: "Unable to book appointment for next week",
      category: "Appointment Booking",
      priority: "Medium",
      status: "Open",
      created: "2024-12-23",
      lastUpdate: "2024-12-23",
      response: "We're looking into the booking system issue. Will update you within 24 hours."
    },
    {
      id: "TKT-2024-002", 
      subject: "Question about post-Panchakarma diet",
      category: "Treatment Information",
      priority: "Low",
      status: "Resolved",
      created: "2024-12-20",
      lastUpdate: "2024-12-21",
      response: "Detailed diet plan has been sent to your registered email address."
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setTicketData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ticketData.category || !ticketData.subject || !ticketData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Support Ticket Created",
      description: "Your support request has been submitted. We'll respond within 24 hours.",
    });

    // Reset form
    setTicketData({
      category: "",
      priority: "",
      subject: "",
      description: "",
      attachments: ""
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-success text-success-foreground';
      case 'Open':
        return 'bg-info text-info-foreground';
      case 'In Progress':
        return 'bg-warning text-warning-foreground';
      case 'Closed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-destructive text-destructive-foreground';
      case 'Medium':
        return 'bg-warning text-warning-foreground';
      case 'Low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="text-center pb-4">
            <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">Call Support</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-3">Speak with our support team</p>
            <p className="font-medium text-lg">+91 98765 43210</p>
            <p className="text-sm text-muted-foreground">Mon-Sat: 9 AM - 8 PM</p>
            <Button className="mt-3 w-full">Call Now</Button>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="text-center pb-4">
            <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">Email Support</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-3">Send us your questions</p>
            <p className="font-medium">support@panchkarma.com</p>
            <p className="text-sm text-muted-foreground">Response within 24 hours</p>
            <Button className="mt-3 w-full" variant="outline">Send Email</Button>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="text-center pb-4">
            <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">Live Chat</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-3">Chat with our experts</p>
            <div className="flex items-center justify-center gap-1 mb-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <p className="font-medium text-success">Online</p>
            </div>
            <p className="text-sm text-muted-foreground">Average wait: 2 minutes</p>
            <Button className="mt-3 w-full gradient-primary">Start Chat</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create Support Ticket */}
        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Create Support Ticket
            </CardTitle>
            <CardDescription>
              Submit a detailed support request for personalized assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={ticketData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={ticketData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={ticketData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about your issue or question..."
                  value={ticketData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments (Optional)</Label>
                <Input
                  id="attachments"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                  onChange={(e) => handleInputChange('attachments', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: JPG, PNG, PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>

              <Button type="submit" className="w-full gradient-primary hover:shadow-glow transition-ayurvedic">
                Submit Ticket
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Support Tickets History */}
        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Your Support Tickets
            </CardTitle>
            <CardDescription>
              Track the status of your support requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="p-4 border rounded-lg bg-muted/30">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{ticket.subject}</h4>
                      <p className="text-sm text-muted-foreground">Ticket: {ticket.id}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                      {ticket.priority && (
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    Category: {ticket.category}
                  </p>
                  
                  {ticket.response && (
                    <div className="p-2 bg-info/10 rounded border border-info/20 mb-2">
                      <p className="text-sm">{ticket.response}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Created: {new Date(ticket.created).toLocaleDateString()}</span>
                    <span>Updated: {new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
              
              {supportTickets.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No support tickets found</p>
                  <p className="text-sm text-muted-foreground">Create your first ticket above to get help</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="gradient-card shadow-ayurvedic">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>
            Find quick answers to common questions about our Ayurvedic treatments and services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-lg font-medium mb-4 text-primary">{category.category}</h3>
                <div className="space-y-3">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium mb-2">{faq.q}</h4>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="gradient-card shadow-ayurvedic border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Phone className="h-5 w-5" />
            Emergency Contact
          </CardTitle>
          <CardDescription>
            For medical emergencies or urgent health concerns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <h4 className="font-medium mb-2">Medical Emergency</h4>
              <p className="text-2xl font-bold text-destructive">+91 98765 43211</p>
              <p className="text-sm text-muted-foreground">24/7 Emergency Helpline</p>
            </div>
            <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
              <h4 className="font-medium mb-2">After Hours Support</h4>
              <p className="text-2xl font-bold text-warning">+91 98765 43212</p>
              <p className="text-sm text-muted-foreground">8 PM - 8 AM</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-info/10 rounded-lg border border-info/20">
            <p className="text-sm">
              <strong>Note:</strong> For non-emergency issues, please use regular support channels above. 
              Emergency lines are reserved for urgent medical situations requiring immediate attention.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;