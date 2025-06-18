"use client";

import { useState, useEffect } from "react";
import { Calendar, Plus, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  type: string;
}

export default function Home() {
  const [currentView, setCurrentView] = useState("home");
  const [events, setEvents] = useState<Event[]>([]);

  // Load data on component mount
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch {
      console.error('Failed to load events');
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case "calendar":
        return <CalendarView events={events} />;
      case "events":
        return <EventsView events={events} onEventCreated={loadEvents} />;
      default:
        return <HomeView setCurrentView={setCurrentView} />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Quiet Valley 2 Young Men
            </h1>
            <div className="flex space-x-2">
              <Button
                variant={currentView === "home" ? "default" : "outline"}
                onClick={() => setCurrentView("home")}
              >
                <Users className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button
                variant={currentView === "calendar" ? "default" : "outline"}
                onClick={() => setCurrentView("calendar")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Calendar
              </Button>
              <Button
                variant={currentView === "events" ? "default" : "outline"}
                onClick={() => setCurrentView("events")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Events
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </main>
  );
}

function HomeView({ setCurrentView }: { setCurrentView: (view: string) => void }) {
  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Official Site
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Better communication, better participation, better brotherhood
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView("calendar")}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Calendar
            </CardTitle>
            <CardDescription>
              View upcoming activities and sacrament meeting times
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView("events")}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-green-600" />
              Add Events
            </CardTitle>
            <CardDescription>
              Plan and schedule new activities with location and time
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Our Goals</CardTitle>
          </CardHeader>
          <CardContent className="text-left space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p><strong>Get to sacrament early</strong> - No more scrambling to find people to pass the sacrament</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <p><strong>Better communication</strong> - Everyone knows about activities and can plan ahead</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CalendarView({ events }: { events: Event[] }) {
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 10);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Calendar & Events</h2>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div key={event.id} className={`border-l-4 pl-4 ${
                      event.type === 'sacrament' ? 'border-blue-600' : 'border-green-600'
                    }`}>
                      <h3 className="font-semibold">{event.name}</h3>
                      <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
                      {event.location && (
                        <p className="text-sm text-gray-500">📍 {event.location}</p>
                      )}
                      {event.description && (
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No upcoming events. Add some in the Events section!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{events.length}</div>
                <div className="text-sm text-gray-600">Total Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{upcomingEvents.length}</div>
                <div className="text-sm text-gray-600">Upcoming Events</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>⏰ Sacrament Reminder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Remember:</strong> Arrive by 8:45 AM to help pass the sacrament!
              </p>
              <p className="text-xs text-gray-500">
                This helps avoid scrambling to find people last minute.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function EventsView({ events, onEventCreated }: { events: Event[], onEventCreated: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', date: '', location: '', description: '' });
        onEventCreated();
        alert('Event created successfully!');
      } else {
        alert('Failed to create event');
      }
    } catch {
      alert('Error creating event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const recentEvents = events
    .filter(event => new Date(event.date) < new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Event Management</h2>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Event</CardTitle>
            <CardDescription>Schedule activities and meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Event Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Young Men Activity"
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Date & Time</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g. Cultural Hall"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Additional details about the event..."
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Event...
                  </>
                ) : (
                  'Create Event'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentEvents.length > 0 ? (
                recentEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-gray-50 rounded-md">
                    <h4 className="font-medium">{event.name}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    {event.location && (
                      <p className="text-sm text-gray-500">📍 {event.location}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No past events yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
