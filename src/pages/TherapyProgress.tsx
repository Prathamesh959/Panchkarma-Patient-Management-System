import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Search, User, Calendar, FileText, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const TherapyProgress = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [progressNotes, setProgressNotes] = useState("");

  // Mock patient data for doctors
  const patients = [
    { id: "1", name: "Rajesh Kumar", age: 45, currentTherapy: "Panchakarma Detox", progress: 75 },
    { id: "2", name: "Sunita Devi", age: 38, currentTherapy: "Abhyanga Package", progress: 60 },
    { id: "3", name: "Amit Patel", age: 52, currentTherapy: "Shirodhara Treatment", progress: 90 },
    { id: "4", name: "Priya Singh", age: 29, currentTherapy: "Stress Relief Package", progress: 40 },
  ];

  // Mock therapy data for patients
  const patientTherapies = [
    {
      id: "1",
      name: "Panchakarma Detox Package",
      startDate: "2024-11-15",
      endDate: "2024-12-30",
      progress: 75,
      status: "ongoing",
      sessionsCompleted: 12,
      totalSessions: 16,
      nextSession: "2024-12-25"
    },
    {
      id: "2",
      name: "Abhyanga Massage Series",
      startDate: "2024-12-01",
      endDate: "2024-12-20",
      progress: 85,
      status: "ongoing",
      sessionsCompleted: 6,
      totalSessions: 7,
      nextSession: "2024-12-24"
    },
    {
      id: "3",
      name: "Stress Relief Package",
      startDate: "2024-10-01",
      endDate: "2024-11-30",
      progress: 100,
      status: "completed",
      sessionsCompleted: 8,
      totalSessions: 8,
      nextSession: null
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.currentTherapy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateProgress = () => {
    if (!selectedPatient || !progressNotes.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a patient and enter progress notes.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Progress Updated",
      description: `Progress notes for ${patients.find(p => p.id === selectedPatient)?.name} have been updated successfully.`,
    });

    setSelectedPatient("");
    setProgressNotes("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'ongoing':
        return 'bg-info text-info-foreground';
      case 'not-started':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted';
    }
  };

  const PatientView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">My Therapy Progress</h1>
      </div>

      <div className="grid gap-6">
        {patientTherapies.map((therapy) => (
          <Card key={therapy.id} className="gradient-card shadow-ayurvedic">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{therapy.name}</CardTitle>
                  <CardDescription>
                    {therapy.startDate} to {therapy.endDate}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(therapy.status)}>
                  {therapy.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-medium">{therapy.progress}%</span>
                </div>
                <Progress value={therapy.progress} className="h-3" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="font-medium mb-1">Sessions Progress</p>
                  <p>{therapy.sessionsCompleted} of {therapy.totalSessions} completed</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="font-medium mb-1">Status</p>
                  <p className="capitalize">{therapy.status}</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="font-medium mb-1">Next Session</p>
                  <p>{therapy.nextSession ? new Date(therapy.nextSession).toLocaleDateString() : 'Completed'}</p>
                </div>
              </div>

              {therapy.status === 'completed' && (
                <div className="bg-success/10 p-3 rounded-lg border border-success/20">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-success" />
                    <span className="font-medium text-success">Treatment Completed Successfully!</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Congratulations on completing your therapy program. Please schedule a follow-up consultation.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Session Notes */}
      <Card className="gradient-card shadow-ayurvedic">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Session Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                date: "2024-12-20",
                session: "Panchakarma Session 12",
                doctor: "Dr. Priya Sharma",
                notes: "Excellent progress with detoxification. Patient reports improved energy levels and better sleep quality. Continue with current protocol."
              },
              {
                date: "2024-12-18",
                session: "Abhyanga Session 6",
                doctor: "Dr. Amit Verma", 
                notes: "Muscle tension significantly reduced. Patient shows good response to herbal oil treatment. Recommend continued therapy."
              },
              {
                date: "2024-12-15",
                session: "Panchakarma Session 11",
                doctor: "Dr. Priya Sharma",
                notes: "Digestive improvements noted. Patient following dietary recommendations well. Blood pressure normalized."
              }
            ].map((note, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{note.session}</h4>
                  <span className="text-sm text-muted-foreground">{new Date(note.date).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Dr. {note.doctor}</p>
                <p className="text-sm">{note.notes}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const DoctorView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Patient Progress Management</h1>
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

      {/* Patient Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="gradient-card shadow-ayurvedic">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <CardDescription>Age: {patient.age}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Current Therapy: {patient.currentTherapy}</p>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium">{patient.progress}%</span>
                  </div>
                  <Progress value={patient.progress} className="h-2" />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setSelectedPatient(patient.id)}
                  >
                    Update Progress
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Update Progress Form */}
      <Card className="gradient-card shadow-ayurvedic">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Update Patient Progress
          </CardTitle>
          <CardDescription>
            Add progress notes and update therapy status for your patients
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Select Patient</Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name} - {patient.currentTherapy}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Session Date</Label>
              <Input
                id="date"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Progress Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter detailed progress notes, observations, and recommendations..."
              value={progressNotes}
              onChange={(e) => setProgressNotes(e.target.value)}
              rows={4}
            />
          </div>

          <Button 
            onClick={handleUpdateProgress}
            className="w-full gradient-primary hover:shadow-glow transition-ayurvedic"
          >
            Update Progress
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6">
      {user?.role === 'patient' ? <PatientView /> : <DoctorView />}
    </div>
  );
};

export default TherapyProgress;