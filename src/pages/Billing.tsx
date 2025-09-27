import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Download, Eye, Search, Calendar, DollarSign, FileText, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Billing = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [newBillData, setNewBillData] = useState({
    patientId: "",
    therapy: "",
    amount: "",
    notes: ""
  });

  // Mock billing data for patients
  const patientBills = [
    {
      id: "INV-2024-001",
      date: "2024-12-20",
      therapy: "Panchakarma Detox Package",
      doctor: "Dr. Priya Sharma",
      amount: 8500,
      paid: 8500,
      status: "paid",
      dueDate: "2024-12-20",
      description: "Complete 16-session Panchakarma detoxification package including consultation"
    },
    {
      id: "INV-2024-002", 
      date: "2024-12-22",
      therapy: "Abhyanga Massage Series",
      doctor: "Dr. Amit Verma",
      amount: 3500,
      paid: 1000,
      status: "partial",
      dueDate: "2024-12-27",
      description: "7-session Abhyanga massage therapy package"
    },
    {
      id: "INV-2024-003",
      date: "2024-12-23",
      therapy: "Shirodhara Treatment",
      doctor: "Dr. Priya Sharma", 
      amount: 2500,
      paid: 0,
      status: "pending",
      dueDate: "2024-12-28",
      description: "Single Shirodhara session with consultation"
    }
  ];

  // Mock patient data for doctors
  const patients = [
    { id: "1", name: "Rajesh Kumar", phone: "+91 9876543211" },
    { id: "2", name: "Sunita Devi", phone: "+91 9876543213" },
    { id: "3", name: "Amit Patel", phone: "+91 9876543214" },
    { id: "4", name: "Priya Singh", phone: "+91 9876543215" }
  ];

  const therapyTypes = [
    "Panchakarma Detox Package - ₹8,500",
    "Abhyanga Massage Series - ₹3,500",
    "Shirodhara Treatment - ₹2,500",
    "Swedana (Steam Bath) - ₹1,500",
    "Nasya Therapy - ₹2,000",
    "Consultation Only - ₹500",
    "Follow-up Visit - ₹300"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-success text-success-foreground';
      case 'partial':
        return 'bg-warning text-warning-foreground';
      case 'pending':
        return 'bg-destructive text-destructive-foreground';
      case 'overdue':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleDownloadBill = (billId: string) => {
    toast({
      title: "Download Started",
      description: `Invoice ${billId} is being downloaded as PDF.`,
    });
  };

  const handleViewBill = (billId: string) => {
    toast({
      title: "Invoice Details",
      description: `Viewing detailed invoice ${billId}`,
    });
  };

  const handleCreateBill = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newBillData.patientId || !newBillData.therapy || !newBillData.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bill Created",
      description: `New bill has been created successfully for ${patients.find(p => p.id === newBillData.patientId)?.name}.`,
    });

    setNewBillData({
      patientId: "",
      therapy: "",
      amount: "",
      notes: ""
    });
  };

  const totalAmount = patientBills.reduce((sum, bill) => sum + bill.amount, 0);
  const totalPaid = patientBills.reduce((sum, bill) => sum + bill.paid, 0);
  const totalPending = totalAmount - totalPaid;

  const PatientView = () => (
    <div className="space-y-6">
      {/* Billing Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All invoices</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">₹{totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Successfully paid</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payment</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">₹{totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Amount due</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice List */}
      <Card className="gradient-card shadow-ayurvedic">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            My Invoices
          </CardTitle>
          <CardDescription>
            View and download your treatment bills and payment history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patientBills.map((bill) => (
              <div key={bill.id} className="p-4 border rounded-lg bg-muted/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{bill.therapy}</h4>
                      <Badge className={getStatusColor(bill.status)}>
                        {bill.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Invoice: {bill.id} • Dr. {bill.doctor}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {bill.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">₹{bill.amount.toLocaleString()}</div>
                    {bill.status === 'partial' && (
                      <div className="text-sm text-muted-foreground">
                        Paid: ₹{bill.paid.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span>Date: {new Date(bill.date).toLocaleDateString()}</span>
                    {bill.status !== 'paid' && (
                      <span>Due: {new Date(bill.dueDate).toLocaleDateString()}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewBill(bill.id)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDownloadBill(bill.id)}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    {bill.status !== 'paid' && (
                      <Button size="sm" className="gradient-primary">
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const DoctorView = () => (
    <div className="space-y-6">
      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₹18,500</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">₹2,45,000</div>
            <p className="text-xs text-muted-foreground">186 treatments</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Bills</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">₹45,000</div>
            <p className="text-xs text-muted-foreground">12 unpaid invoices</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">94%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Create New Bill */}
      <Card className="gradient-card shadow-ayurvedic">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Create New Bill
          </CardTitle>
          <CardDescription>
            Generate invoices for patient treatments and consultations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateBill} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patient">Select Patient</Label>
                <Select value={newBillData.patientId} onValueChange={(value) => setNewBillData(prev => ({...prev, patientId: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="therapy">Therapy/Service</Label>
                <Select value={newBillData.therapy} onValueChange={(value) => setNewBillData(prev => ({...prev, therapy: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select therapy type" />
                  </SelectTrigger>
                  <SelectContent>
                    {therapyTypes.map((therapy) => (
                      <SelectItem key={therapy} value={therapy}>
                        {therapy}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={newBillData.amount}
                  onChange={(e) => setNewBillData(prev => ({...prev, amount: e.target.value}))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input
                  id="notes"
                  placeholder="Additional notes"
                  value={newBillData.notes}
                  onChange={(e) => setNewBillData(prev => ({...prev, notes: e.target.value}))}
                />
              </div>
            </div>

            <Button type="submit" className="w-full gradient-primary hover:shadow-glow transition-ayurvedic">
              Create Bill
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Patient Search and Bills */}
      <Card className="gradient-card shadow-ayurvedic">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Patient Billing Management
              </CardTitle>
              <CardDescription>
                Search and manage patient bills and payment status
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="p-4 border rounded-lg bg-muted/30">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{patient.name}</h4>
                      <p className="text-sm text-muted-foreground">{patient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">₹12,000 Total</Badge>
                    <Badge className="bg-warning text-warning-foreground">₹2,500 Pending</Badge>
                    <Button size="sm" variant="outline">View Bills</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">
          {user?.role === 'patient' ? 'My Billing' : 'Billing Management'}
        </h1>
      </div>
      
      {user?.role === 'patient' ? <PatientView /> : <DoctorView />}
    </div>
  );
};

export default Billing;