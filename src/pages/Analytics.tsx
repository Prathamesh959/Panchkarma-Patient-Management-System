import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Users, Calendar, DollarSign, Target, Clock, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const Analytics = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("month");

  const monthlyStats = {
    totalPatients: 156,
    newPatients: 28,
    completedSessions: 387,
    revenue: 245000,
    averageRating: 4.8,
    completionRate: 94,
    popularTreatments: [
      { name: "Panchakarma Detox", count: 45, percentage: 29 },
      { name: "Abhyanga Massage", count: 38, percentage: 25 },
      { name: "Shirodhara", count: 32, percentage: 21 },
      { name: "Consultation", count: 25, percentage: 16 },
      { name: "Swedana", count: 15, percentage: 9 }
    ],
    weeklyTrends: [
      { week: "Week 1", patients: 35, revenue: 58000, sessions: 89 },
      { week: "Week 2", patients: 42, revenue: 67000, sessions: 102 },
      { week: "Week 3", patients: 38, revenue: 61000, sessions: 96 },
      { week: "Week 4", patients: 41, revenue: 59000, sessions: 100 }
    ],
    patientDemographics: {
      ageGroups: [
        { range: "20-30", count: 32, percentage: 21 },
        { range: "31-40", count: 48, percentage: 31 },
        { range: "41-50", count: 42, percentage: 27 },
        { range: "51-60", count: 25, percentage: 16 },
        { range: "60+", count: 9, percentage: 6 }
      ],
      constitution: [
        { type: "Vata", count: 52, percentage: 33 },
        { type: "Pitta", count: 47, percentage: 30 },
        { type: "Kapha", count: 35, percentage: 22 },
        { type: "Mixed", count: 22, percentage: 14 }
      ]
    }
  };

  const performanceMetrics = {
    treatmentSuccess: 96,
    patientSatisfaction: 4.8,
    retentionRate: 87,
    averageSessionDuration: 75, // minutes
    bookingConversion: 84,
    monthlyGrowth: 12.5,
    completionRate: 94
  };

  if (user?.role !== 'doctor') {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Analytics Dashboard</h2>
          <p className="text-muted-foreground">This feature is available for doctors and practitioners only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{monthlyStats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+{monthlyStats.newPatients}</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions Completed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{monthlyStats.completedSessions}</div>
            <p className="text-xs text-muted-foreground">
              {performanceMetrics.completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">₹{monthlyStats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+{performanceMetrics.monthlyGrowth}%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patient Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{monthlyStats.averageRating}</div>
            <p className="text-xs text-muted-foreground">
              {performanceMetrics.patientSatisfaction}/5.0 satisfaction
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription>
              Key performance indicators for your practice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Treatment Success Rate</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full" 
                      style={{ width: `${performanceMetrics.treatmentSuccess}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold">{performanceMetrics.treatmentSuccess}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Patient Retention Rate</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className="bg-info h-2 rounded-full" 
                      style={{ width: `${performanceMetrics.retentionRate}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold">{performanceMetrics.retentionRate}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Booking Conversion</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className="bg-warning h-2 rounded-full" 
                      style={{ width: `${performanceMetrics.bookingConversion}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold">{performanceMetrics.bookingConversion}%</span>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Avg. Session Duration</span>
                  <span className="text-sm font-bold">{performanceMetrics.averageSessionDuration} min</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Popular Treatments
            </CardTitle>
            <CardDescription>
              Most requested therapies this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyStats.popularTreatments.map((treatment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{treatment.name}</h4>
                    <p className="text-xs text-muted-foreground">{treatment.count} sessions</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${treatment.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium w-8">{treatment.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Age Distribution
            </CardTitle>
            <CardDescription>
              Patient demographics by age group
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyStats.patientDemographics.ageGroups.map((group, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{group.range} years</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full" 
                        style={{ width: `${group.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm w-8">{group.count}</span>
                    <Badge variant="outline" className="text-xs w-10">
                      {group.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Constitution Analysis
            </CardTitle>
            <CardDescription>
              Ayurvedic constitution distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyStats.patientDemographics.constitution.map((const_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{const_.type} Dosha</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${const_.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm w-8">{const_.count}</span>
                    <Badge variant="outline" className="text-xs w-10">
                      {const_.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends */}
      <Card className="gradient-card shadow-ayurvedic">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Weekly Performance Trends
          </CardTitle>
          <CardDescription>
            Track weekly progress across key metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-sm">Week</th>
                  <th className="text-right p-2 font-medium text-sm">Patients</th>
                  <th className="text-right p-2 font-medium text-sm">Sessions</th>
                  <th className="text-right p-2 font-medium text-sm">Revenue</th>
                  <th className="text-center p-2 font-medium text-sm">Trend</th>
                </tr>
              </thead>
              <tbody>
                {monthlyStats.weeklyTrends.map((week, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 text-sm">{week.week}</td>
                    <td className="p-2 text-sm text-right">{week.patients}</td>
                    <td className="p-2 text-sm text-right">{week.sessions}</td>
                    <td className="p-2 text-sm text-right">₹{week.revenue.toLocaleString()}</td>
                    <td className="p-2 text-center">
                      <TrendingUp className={`h-4 w-4 mx-auto ${
                        index > 0 && week.revenue > monthlyStats.weeklyTrends[index-1].revenue 
                          ? 'text-success' : 'text-muted-foreground'
                      }`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="gradient-card shadow-ayurvedic">
        <CardHeader>
          <CardTitle>Recommendations & Insights</CardTitle>
          <CardDescription>
            AI-powered suggestions to improve your practice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-success/10 rounded-lg border border-success/20">
              <h4 className="font-medium text-success mb-1">Excellent Performance</h4>
              <p className="text-sm text-muted-foreground">
                Your patient satisfaction rating is above 4.5! Consider showcasing testimonials to attract new patients.
              </p>
            </div>
            
            <div className="p-3 bg-info/10 rounded-lg border border-info/20">
              <h4 className="font-medium text-info mb-1">Growth Opportunity</h4>
              <p className="text-sm text-muted-foreground">
                Panchakarma treatments are your most popular service. Consider offering specialized packages or group sessions.
              </p>
            </div>
            
            <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
              <h4 className="font-medium text-warning mb-1">Optimization Tip</h4>
              <p className="text-sm text-muted-foreground">
                Weekend slots show lower booking rates. Consider offering promotional rates or different services during these times.
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button className="gradient-primary">Generate Detailed Report</Button>
            <Button variant="outline">Export Analytics</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;