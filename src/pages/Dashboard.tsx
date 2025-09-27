import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Clock, TrendingUp, Users, Stethoscope, CreditCard, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  const PatientDashboard = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h2>
          <p className="text-muted-foreground">Here's your wellness journey overview</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Today's Date</p>
          <p className="font-medium">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3</div>
            <p className="text-xs text-muted-foreground">Next: Tomorrow 10:00 AM</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Treatment Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">75%</div>
            <p className="text-xs text-muted-foreground">Panchakarma Package</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payment</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">₹2,500</div>
            <p className="text-xs text-muted-foreground">Due in 5 days</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">2</div>
            <p className="text-xs text-muted-foreground">New messages</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card className="gradient-card shadow-ayurvedic">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
              <div>
                <p className="font-medium">Abhyanga Massage</p>
                <p className="text-sm text-muted-foreground">Dr. Priya Sharma</p>
              </div>
              <div className="text-right">
                <Badge variant="outline">10:00 AM</Badge>
                <p className="text-xs text-muted-foreground mt-1">Room 201</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Consultation</p>
                <p className="text-sm text-muted-foreground">Dr. Amit Verma</p>
              </div>
              <div className="text-right">
                <Badge variant="outline">2:00 PM</Badge>
                <p className="text-xs text-muted-foreground mt-1">Room 105</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="gradient-card shadow-ayurvedic">
        <CardHeader>
          <CardTitle>Recent Treatment History</CardTitle>
          <CardDescription>Your last few therapy sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">Shirodhara</p>
                <p className="text-sm text-muted-foreground">Dec 20, 2024</p>
              </div>
              <Badge className="bg-success text-success-foreground">Completed</Badge>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">Panchakarma Detox</p>
                <p className="text-sm text-muted-foreground">Dec 18, 2024</p>
              </div>
              <Badge className="bg-success text-success-foreground">Completed</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Herbal Steam Bath</p>
                <p className="text-sm text-muted-foreground">Dec 15, 2024</p>
              </div>
              <Badge className="bg-success text-success-foreground">Completed</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const DoctorDashboard = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome, {user?.name}!</h2>
          <p className="text-muted-foreground">Today's patient care overview</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Today's Date</p>
          <p className="font-medium">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Doctor Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground">8 completed, 4 remaining</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Treatments</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">28</div>
            <p className="text-xs text-muted-foreground">Ongoing therapies</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">₹18,500</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">94%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card className="gradient-card shadow-ayurvedic">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today's Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
              <div>
                <p className="font-medium">Rajesh Kumar - Consultation</p>
                <p className="text-sm text-muted-foreground">Initial Panchakarma Assessment</p>
              </div>
              <div className="text-right">
                <Badge variant="outline">10:00 AM</Badge>
                <Button size="sm" variant="outline" className="mt-1 ml-2">View Details</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Sunita Devi - Follow-up</p>
                <p className="text-sm text-muted-foreground">Abhyanga Progress Review</p>
              </div>
              <div className="text-right">
                <Badge variant="outline">2:00 PM</Badge>
                <Button size="sm" variant="outline" className="mt-1 ml-2">View Details</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Patients */}
      <Card className="gradient-card shadow-ayurvedic">
        <CardHeader>
          <CardTitle>Recent Patient Activities</CardTitle>
          <CardDescription>Latest updates from your patient treatments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">Rajesh Kumar completed Shirodhara</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
              <Badge className="bg-success text-success-foreground">Completed</Badge>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">Sunita Devi missed appointment</p>
                <p className="text-sm text-muted-foreground">1 day ago</p>
              </div>
              <Badge variant="destructive">Missed</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New patient registration</p>
                <p className="text-sm text-muted-foreground">2 days ago</p>
              </div>
              <Badge className="bg-info text-info-foreground">New</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return user?.role === 'patient' ? <PatientDashboard /> : <DoctorDashboard />;
};

export default Dashboard;