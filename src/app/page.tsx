"use client";

import { useState } from "react";
import { Calendar, Plus, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [currentView, setCurrentView] = useState("home");

  const renderContent = () => {
    switch (currentView) {
      case "calendar":
        return <CalendarView />;
      case "events":
        return <EventsView />;
      case "rewards":
        return <RewardsView />;
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
                Events
              </Button>
              <Button
                variant={currentView === "rewards" ? "default" : "outline"}
                onClick={() => setCurrentView("rewards")}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Rewards
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

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView("rewards")}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
              Rewards
            </CardTitle>
            <CardDescription>
              Track participation and earn rewards for being early
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
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
              <p><strong>Reward participation</strong> - Recognize those who show up and contribute</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CalendarView() {
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
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-semibold">Sacrament Meeting</h3>
                  <p className="text-sm text-gray-600">Sunday, 9:00 AM - Please arrive by 8:45 AM</p>
                  <p className="text-sm text-gray-500">Chapel</p>
                </div>
                <div className="border-l-4 border-green-600 pl-4">
                  <h3 className="font-semibold">Young Men Activity</h3>
                  <p className="text-sm text-gray-600">Wednesday, 7:00 PM</p>
                  <p className="text-sm text-gray-500">Cultural Hall</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">Add New Event</Button>
              <Button variant="outline" className="w-full">View All Events</Button>
              <Button variant="outline" className="w-full">Export Calendar</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function EventsView() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Event Management</h2>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Event</CardTitle>
            <CardDescription>Schedule activities and meetings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Event Name</label>
              <input 
                className="w-full p-2 border rounded-md" 
                placeholder="e.g. Young Men Activity"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date & Time</label>
              <input 
                type="datetime-local" 
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input 
                className="w-full p-2 border rounded-md" 
                placeholder="e.g. Cultural Hall"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea 
                className="w-full p-2 border rounded-md" 
                rows={3}
                placeholder="Additional details about the event..."
              />
            </div>
            <Button className="w-full">Create Event</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-md">
                <h4 className="font-medium">Basketball Activity</h4>
                <p className="text-sm text-gray-600">Last Wednesday, 7:00 PM</p>
                <p className="text-sm text-gray-500">12 attendees</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <h4 className="font-medium">Service Project</h4>
                <p className="text-sm text-gray-600">Last Saturday, 9:00 AM</p>
                <p className="text-sm text-gray-500">8 attendees</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function RewardsView() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Rewards & Recognition</h2>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>Top participants this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-md border-l-4 border-yellow-400">
                <div>
                  <h4 className="font-medium">🥇 Early Bird Champion</h4>
                  <p className="text-sm text-gray-600">Most on-time arrivals</p>
                </div>
                <span className="text-2xl font-bold text-yellow-600">250pts</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md border-l-4 border-blue-400">
                <div>
                  <h4 className="font-medium">🥈 Activity Organizer</h4>
                  <p className="text-sm text-gray-600">Event planning help</p>
                </div>
                <span className="text-xl font-bold text-blue-600">200pts</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-md border-l-4 border-green-400">
                <div>
                  <h4 className="font-medium">🥉 Perfect Attendance</h4>
                  <p className="text-sm text-gray-600">Never missed an activity</p>
                </div>
                <span className="text-xl font-bold text-green-600">180pts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reward System</CardTitle>
            <CardDescription>How to earn points</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 border-b">
                <span>Arrive early to sacrament (8:45 AM)</span>
                <span className="font-bold text-green-600">+50pts</span>
              </div>
              <div className="flex justify-between items-center p-2 border-b">
                <span>Attend Young Men activity</span>
                <span className="font-bold text-blue-600">+25pts</span>
              </div>
              <div className="flex justify-between items-center p-2 border-b">
                <span>Help organize an event</span>
                <span className="font-bold text-purple-600">+75pts</span>
              </div>
              <div className="flex justify-between items-center p-2 border-b">
                <span>Bring a friend</span>
                <span className="font-bold text-orange-600">+100pts</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Rewards Available:</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• 500pts: Pizza party vote</li>
                <li>• 300pts: Activity choice input</li>
                <li>• 200pts: Recognition in sacrament</li>
                <li>• 100pts: Special parking spot</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
