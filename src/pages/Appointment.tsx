import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Appointment = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientName: user?.name || "",
    age: user?.age?.toString() || "",
    therapyType: "",
    preferredDate: "",
    preferredTime: "",
    symptoms: "",
    notes: ""
  });

  const therapyTypes = [
    "Panchakarma Detox",
    "Abhyanga (Oil Massage)",
    "Shirodhara",
    "Swedana (Herbal Steam)",
    "Nasya (Nasal Therapy)",
    "Basti (Medicated Enema)",
    "Virechana (Purgation)",
    "Vamana (Therapeutic Vomiting)",
    "Consultation Only",
    "Follow-up Visit"
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
  ];

  const upcomingAppointments = [
    {
      id: 1,
      therapy: "Abhyanga Massage",
      doctor: "Dr. Priya Sharma",
      date: "2024-12-24",
      time: "10:00 AM",
      status: "confirmed"
    },
    {
      id: 2,
      therapy: "Shirodhara",
      doctor: "Dr. Amit Verma",
      date: "2024-12-26",
      time: "2:00 PM",
      status: "pending"
    },
    {
      id: 3,
      therapy: "Follow-up Consultation",
      doctor: "Dr. Priya Sharma",
      date: "2024-12-28",
      time: "11:00 AM",
      status: "confirmed"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.therapyType || !formData.preferredDate || !formData.preferredTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Mock appointment booking
    toast({
      title: "Appointment Requested",
      description: `Your appointment for ${formData.therapyType} on ${formData.preferredDate} at ${formData.preferredTime} has been requested. We'll confirm within 24 hours.`,
    });

    // Reset form
    setFormData({
      ...formData,
      therapyType: "",
      preferredDate: "",
      preferredTime: "",
      symptoms: "",
      notes: ""
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Book Appointment</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Form */}
        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              New Appointment Request
            </CardTitle>
            <CardDescription>
              Book your Ayurvedic therapy session with our experienced practitioners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange('patientName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="therapyType">Therapy Type *</Label>
                <Select value={formData.therapyType} onValueChange={(value) => handleInputChange('therapyType', value)}>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Date *</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred Time *</Label>
                  <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Current Symptoms/Issues</Label>
                <Textarea
                  id="symptoms"
                  placeholder="Describe your current health concerns or symptoms..."
                  value={formData.symptoms}
                  onChange={(e) => handleInputChange('symptoms', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requests or information for the practitioner..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={2}
                />
              </div>

              <Button type="submit" className="w-full gradient-primary hover:shadow-glow transition-ayurvedic">
                Request Appointment
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription>
              Your scheduled therapy sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 bg-muted/50 rounded-lg border">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-foreground">{appointment.therapy}</h3>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    <strong>Doctor:</strong> {appointment.doctor}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Date & Time:</strong> {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Reschedule</Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointment History */}
      <Card className="gradient-card shadow-ayurvedic">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Appointment History
          </CardTitle>
          <CardDescription>
            Your past therapy sessions and consultations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { therapy: "Panchakarma Detox", doctor: "Dr. Priya Sharma", date: "2024-12-15", status: "Completed" },
              { therapy: "Abhyanga Massage", doctor: "Dr. Amit Verma", date: "2024-12-10", status: "Completed" },
              { therapy: "Consultation", doctor: "Dr. Priya Sharma", date: "2024-12-05", status: "Completed" },
              { therapy: "Shirodhara", doctor: "Dr. Amit Verma", date: "2024-12-01", status: "Completed" },
              { therapy: "Initial Assessment", doctor: "Dr. Priya Sharma", date: "2024-11-28", status: "Completed" },
            ].map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                <div>
                  <p className="font-medium">{appointment.therapy}</p>
                  <p className="text-sm text-muted-foreground">{appointment.doctor} • {new Date(appointment.date).toLocaleDateString()}</p>
                </div>
                <Badge className="bg-success text-success-foreground">{appointment.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointment;