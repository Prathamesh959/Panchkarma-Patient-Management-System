import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Star, ThumbsUp, Calendar, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Feedback = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [feedbackData, setFeedbackData] = useState({
    session: "",
    doctor: "",
    rating: "",
    experience: "",
    recommendation: "",
    improvements: "",
    anonymous: false
  });

  const recentSessions = [
    {
      id: "1",
      therapy: "Panchakarma Detox - Session 12",
      doctor: "Dr. Priya Sharma",
      date: "2024-12-20",
      completed: true
    },
    {
      id: "2", 
      therapy: "Abhyanga Massage - Session 6",
      doctor: "Dr. Amit Verma",
      date: "2024-12-18",
      completed: true
    },
    {
      id: "3",
      therapy: "Shirodhara Treatment",
      doctor: "Dr. Priya Sharma", 
      date: "2024-12-15",
      completed: true
    }
  ];

  const previousFeedback = [
    {
      id: "1",
      session: "Panchakarma Detox - Session 10", 
      doctor: "Dr. Priya Sharma",
      date: "2024-12-15",
      rating: 5,
      experience: "Excellent experience! The treatment was very effective and I felt much more energized after the session. Dr. Sharma's guidance throughout was invaluable.",
      recommendation: "Highly recommended for anyone looking for authentic Ayurvedic treatment.",
      status: "published"
    },
    {
      id: "2",
      session: "Abhyanga Massage - Session 4",
      doctor: "Dr. Amit Verma", 
      date: "2024-12-10",
      rating: 4,
      experience: "Very relaxing session. The herbal oils used were of excellent quality and the massage technique was perfect for my body type.",
      recommendation: "Great for stress relief and muscle relaxation.",
      status: "published"
    },
    {
      id: "3",
      session: "Initial Consultation",
      doctor: "Dr. Priya Sharma",
      date: "2024-11-28", 
      rating: 5,
      experience: "Thorough consultation with detailed constitution analysis. Dr. Sharma took time to understand my health concerns and explained the treatment plan clearly.",
      recommendation: "Perfect starting point for anyone new to Ayurveda.",
      status: "published"
    }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFeedbackData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedbackData.session || !feedbackData.rating || !feedbackData.experience) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your valuable feedback! It helps us improve our services.",
    });

    // Reset form
    setFeedbackData({
      session: "",
      doctor: "",
      rating: "",
      experience: "",
      recommendation: "",
      improvements: "",
      anonymous: false
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-warning text-warning' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Feedback & Reviews</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feedback Form */}
        <Card className="gradient-card shadow-ayurvedic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Share Your Experience
            </CardTitle>
            <CardDescription>
              Your feedback helps us improve our Ayurvedic treatments and services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="session">Treatment Session *</Label>
                <Select value={feedbackData.session} onValueChange={(value) => handleInputChange('session', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select completed session" />
                  </SelectTrigger>
                  <SelectContent>
                    {recentSessions.filter(s => s.completed).map((session) => (
                      <SelectItem key={session.id} value={session.id}>
                        {session.therapy} - {session.doctor} ({new Date(session.date).toLocaleDateString()})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Overall Rating *</Label>
                <Select value={feedbackData.rating} onValueChange={(value) => handleInputChange('rating', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Rate your experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐☆ Very Good (4/5)</SelectItem>
                    <SelectItem value="3">⭐⭐⭐☆☆ Good (3/5)</SelectItem>
                    <SelectItem value="2">⭐⭐☆☆☆ Fair (2/5)</SelectItem>
                    <SelectItem value="1">⭐☆☆☆☆ Poor (1/5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Treatment Experience *</Label>
                <Textarea
                  id="experience"
                  placeholder="Describe your experience with the treatment, practitioner, and overall service..."
                  value={feedbackData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recommendation">Would you recommend this to others?</Label>
                <Textarea
                  id="recommendation"
                  placeholder="Share why you would or wouldn't recommend this treatment to others..."
                  value={feedbackData.recommendation}
                  onChange={(e) => handleInputChange('recommendation', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="improvements">Suggestions for Improvement</Label>
                <Textarea
                  id="improvements"
                  placeholder="Any suggestions on how we can improve our services?"
                  value={feedbackData.improvements}
                  onChange={(e) => handleInputChange('improvements', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={feedbackData.anonymous}
                  onChange={(e) => handleInputChange('anonymous', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Submit feedback anonymously
                </Label>
              </div>

              <Button type="submit" className="w-full gradient-primary hover:shadow-glow transition-ayurvedic">
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Feedback Statistics */}
        <div className="space-y-6">
          <Card className="gradient-card shadow-ayurvedic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5" />
                Your Feedback Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
                  <span className="text-sm font-medium">Feedback Submitted</span>
                  <Badge className="bg-success text-success-foreground">{previousFeedback.length}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-warning/10 rounded-lg">
                  <span className="text-sm font-medium">Average Rating Given</span>
                  <div className="flex items-center gap-1">
                    {renderStars(Math.round(previousFeedback.reduce((sum, f) => sum + f.rating, 0) / previousFeedback.length))}
                    <span className="text-sm ml-1">
                      {(previousFeedback.reduce((sum, f) => sum + f.rating, 0) / previousFeedback.length).toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-info/10 rounded-lg">
                  <span className="text-sm font-medium">Helpful Reviews</span>
                  <Badge className="bg-info text-info-foreground">Thank you!</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-ayurvedic">
            <CardHeader>
              <CardTitle className="text-lg">Pending Feedback</CardTitle>
              <CardDescription>
                Sessions waiting for your feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSessions.slice(0, 2).map((session) => (
                  <div key={session.id} className="p-3 bg-muted/50 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{session.therapy}</h4>
                        <p className="text-xs text-muted-foreground">{session.doctor}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {new Date(session.date).toLocaleDateString()}
                      </Badge>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => handleInputChange('session', session.id)}
                    >
                      Leave Feedback
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Previous Feedback */}
      <Card className="gradient-card shadow-ayurvedic">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Your Previous Feedback
          </CardTitle>
          <CardDescription>
            Review and track your submitted feedback and reviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {previousFeedback.map((feedback) => (
              <div key={feedback.id} className="p-4 border rounded-lg bg-muted/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{feedback.session}</h4>
                    <p className="text-sm text-muted-foreground">{feedback.doctor}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(feedback.rating)}
                    </div>
                    <Badge className="bg-success text-success-foreground text-xs">
                      {feedback.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Experience: </span>
                    <span className="text-muted-foreground">{feedback.experience}</span>
                  </div>
                  {feedback.recommendation && (
                    <div>
                      <span className="font-medium">Recommendation: </span>
                      <span className="text-muted-foreground">{feedback.recommendation}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                  <span>Submitted: {new Date(feedback.date).toLocaleDateString()}</span>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    <span>Helpful feedback</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Testimonial Section */}
      <Card className="gradient-card shadow-ayurvedic">
        <CardHeader>
          <CardTitle>Share Your Success Story</CardTitle>
          <CardDescription>
            Help others by sharing how Ayurvedic treatments have helped improve your health and well-being
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gradient-accent rounded-lg border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-medium">{user?.name}</h4>
                <p className="text-sm text-muted-foreground">Patient since November 2024</p>
              </div>
            </div>
            <Button className="w-full gradient-primary">
              Create Testimonial
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;