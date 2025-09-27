import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Clock, Calendar, AlertTriangle, Info, CheckCircle, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Pre-procedure Instructions",
      message: "Please follow fasting guidelines 12 hours before your Panchakarma session tomorrow. Avoid heavy meals and dairy products.",
      type: "warning",
      category: "Pre-procedure",
      time: "2 hours ago",
      read: false,
      appointment: "Panchakarma Session - Dec 25, 10:00 AM"
    },
    {
      id: "2",
      title: "Appointment Reminder",
      message: "Your Abhyanga massage is scheduled for tomorrow at 10:00 AM with Dr. Priya Sharma. Please arrive 15 minutes early.",
      type: "info",
      category: "Reminder",
      time: "4 hours ago",
      read: false,
      appointment: "Abhyanga Massage - Dec 25, 10:00 AM"
    },
    {
      id: "3",
      title: "Post-treatment Care",
      message: "After your Shirodhara session, please rest for at least 30 minutes and avoid cold water for 2 hours. Drink warm water regularly.",
      type: "success",
      category: "Post-procedure",
      time: "1 day ago",
      read: true,
      appointment: "Shirodhara - Dec 23, 2:00 PM"
    },
    {
      id: "4",
      title: "Dietary Recommendations",
      message: "Based on your constitution assessment, we recommend following a Vata-pacifying diet. Avoid raw foods, cold beverages, and processed foods.",
      type: "info",
      category: "Wellness Tips",
      time: "2 days ago",
      read: true,
      appointment: "Initial Consultation - Dec 22"
    },
    {
      id: "5",
      title: "Session Completed",
      message: "Your Abhyanga session has been completed successfully. Please share your feedback and follow the post-treatment guidelines provided.",
      type: "success",
      category: "Treatment Update",
      time: "3 days ago",
      read: true,
      appointment: "Abhyanga Massage - Dec 21, 11:00 AM"
    },
    {
      id: "6",
      title: "Important: Medication Reminder",
      message: "Please continue taking your prescribed herbal medicines twice daily. Next consultation scheduled in 1 week.",
      type: "warning",
      category: "Medication",
      time: "1 week ago",
      read: true,
      appointment: "Follow-up required"
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-info" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-warning/20 bg-warning/5';
      case 'success':
        return 'border-success/20 bg-success/5';
      case 'info':
      default:
        return 'border-info/20 bg-info/5';
    }
  };

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'Pre-procedure':
        return 'bg-warning text-warning-foreground';
      case 'Post-procedure':
        return 'bg-success text-success-foreground';
      case 'Reminder':
        return 'bg-info text-info-foreground';
      case 'Medication':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            Mark all as read
          </Button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{notifications.length}</div>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{unreadCount}</div>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="gradient-card shadow-ayurvedic">
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>
            Important updates, reminders, and care instructions for your treatments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-ayurvedic ${
                  getNotificationColor(notification.type)
                } ${!notification.read ? 'shadow-ayurvedic' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-medium ${!notification.read ? 'font-bold' : ''}`}>
                          {notification.title}
                        </h4>
                        <Badge className={getBadgeColor(notification.category)}>
                          {notification.category}
                        </Badge>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      {notification.appointment && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <Calendar className="h-3 w-3" />
                          <span>{notification.appointment}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark read
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pre/Post Procedure Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Pre-Procedure Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
              <h4 className="font-medium mb-2">General Preparation</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Fast for 12 hours before Panchakarma treatments</li>
                <li>• Avoid alcohol and tobacco 24 hours prior</li>
                <li>• Wear comfortable, loose clothing</li>
                <li>• Arrive 15 minutes early for preparation</li>
              </ul>
            </div>
            <div className="p-3 bg-info/10 rounded-lg border border-info/20">
              <h4 className="font-medium mb-2">Dietary Restrictions</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• No dairy products on treatment day</li>
                <li>• Avoid cold or iced beverages</li>
                <li>• Light, warm meals only if eating is permitted</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Post-Procedure Care
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-success/10 rounded-lg border border-success/20">
              <h4 className="font-medium mb-2">Immediate Care (0-2 hours)</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Rest in a quiet, warm environment</li>
                <li>• Avoid cold water and air conditioning</li>
                <li>• Drink warm water or herbal tea</li>
                <li>• No strenuous physical activity</li>
              </ul>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Extended Care (24-48 hours)</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Follow prescribed dietary recommendations</li>
                <li>• Take prescribed herbal medicines on time</li>
                <li>• Gentle yoga or meditation is beneficial</li>
                <li>• Maintain regular sleep schedule</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;