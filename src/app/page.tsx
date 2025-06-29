"use client";

import { useState, useEffect } from "react";
import { Calendar, Plus, Users, Loader2, Edit, Trash2, Megaphone, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Event {
  id: string;
  name: string;
  date: string;
  end_date?: string;
  location: string;
  description: string;
  type: string;
  activity_types: string[];
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}

interface ActivityIdea {
  id: string;
  name: string;
  description: string;
  activity_types: string[];
  created_at: string;
}

export default function Home() {
  const [currentView, setCurrentView] = useState("home");
  const [events, setEvents] = useState<Event[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [activityIdeas, setActivityIdeas] = useState<ActivityIdea[]>([]);

  // Load data on component mount
  useEffect(() => {
    loadEvents();
    loadAnnouncements();
    loadActivityIdeas();
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

  const loadAnnouncements = async () => {
    try {
      const response = await fetch('/api/announcements');
      const data = await response.json();
      setAnnouncements(data);
    } catch {
      console.error('Failed to load announcements');
    }
  };

  const loadActivityIdeas = async () => {
    try {
      const response = await fetch('/api/activity-ideas');
      const data = await response.json();
      setActivityIdeas(data);
    } catch {
      console.error('Failed to load activity ideas');
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case "calendar":
        return <CalendarView events={events} onEventUpdated={loadEvents} onEventDeleted={loadEvents} />;
      case "events":
        return <EventsView events={events} onEventCreated={loadEvents} />;
      case "announcements":
        return <AnnouncementsView announcements={announcements} onAnnouncementUpdated={loadAnnouncements} />;
      case "activity-ideas":
        return <ActivityIdeasView activityIdeas={activityIdeas} onActivityIdeaUpdated={loadActivityIdeas} />;
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
              <Button
                variant={currentView === "announcements" ? "default" : "outline"}
                onClick={() => setCurrentView("announcements")}
              >
                <Megaphone className="w-4 h-4 mr-2" />
                Announcements
              </Button>
              <Button
                variant={currentView === "activity-ideas" ? "default" : "outline"}
                onClick={() => setCurrentView("activity-ideas")}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Activity Ideas
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

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView("announcements")}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Megaphone className="w-5 h-5 mr-2 text-orange-600" />
              Announcements
            </CardTitle>
            <CardDescription>
              Important updates and information for the young men
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView("activity-ideas")}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
              Activity Ideas
            </CardTitle>
            <CardDescription>
              Browse and add activity ideas for future planning
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

function AnnouncementsView({ announcements, onAnnouncementUpdated }: { 
  announcements: Announcement[], 
  onAnnouncementUpdated: () => void 
}) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴 High Priority';
      case 'medium': return '🟡 Medium Priority';
      default: return '🔵 Low Priority';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Announcements</h2>
        <CreateAnnouncementDialog onAnnouncementCreated={onAnnouncementUpdated} />
      </div>
      
      <div className="space-y-4">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <Card key={announcement.id} className={`border-l-4 ${getPriorityColor(announcement.priority)}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm font-medium">{getPriorityLabel(announcement.priority)}</span>
                      <span className="text-sm text-gray-500">{formatDate(announcement.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <EditAnnouncementDialog announcement={announcement} onAnnouncementUpdated={onAnnouncementUpdated} />
                    <DeleteAnnouncementDialog announcement={announcement} onAnnouncementDeleted={onAnnouncementUpdated} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{announcement.content}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Megaphone className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No announcements yet. Create one to get started!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function CreateAnnouncementDialog({ onAnnouncementCreated }: { onAnnouncementCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'low' as 'low' | 'medium' | 'high'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ title: '', content: '', priority: 'low' });
        onAnnouncementCreated();
        setOpen(false);
      } else {
        alert('Failed to create announcement');
      }
    } catch {
      alert('Error creating announcement');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create Announcement</DialogTitle>
          <DialogDescription>
            Share important information with the young men.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. Important Activity Update"
              required
            />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <select 
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value as 'low' | 'medium' | 'high'})}
              className="w-full p-2 border rounded-md"
            >
              <option value="low">🔵 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Enter the announcement details..."
              rows={5}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Announcement'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditAnnouncementDialog({ announcement, onAnnouncementUpdated }: { 
  announcement: Announcement, 
  onAnnouncementUpdated: () => void 
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: announcement.title,
    content: announcement.content,
    priority: announcement.priority
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/announcements', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: announcement.id,
          ...formData,
        }),
      });

      if (response.ok) {
        onAnnouncementUpdated();
        setOpen(false);
      } else {
        alert('Failed to update announcement');
      }
    } catch {
      alert('Error updating announcement');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="w-3 h-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Announcement</DialogTitle>
          <DialogDescription>
            Update the announcement details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-priority">Priority</Label>
            <select 
              id="edit-priority"
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value as 'low' | 'medium' | 'high'})}
              className="w-full p-2 border rounded-md"
            >
              <option value="low">🔵 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
          </div>
          <div>
            <Label htmlFor="edit-content">Content</Label>
            <Textarea
              id="edit-content"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows={5}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Announcement'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteAnnouncementDialog({ announcement, onAnnouncementDeleted }: { 
  announcement: Announcement, 
  onAnnouncementDeleted: () => void 
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/announcements?id=${announcement.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onAnnouncementDeleted();
      } else {
        alert('Failed to delete announcement');
      }
    } catch {
      alert('Error deleting announcement');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
          <Trash2 className="w-3 h-3" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &ldquo;<strong>{announcement.title}</strong>&rdquo;? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ActivityIdeasView({ activityIdeas, onActivityIdeaUpdated }: { 
  activityIdeas: ActivityIdea[], 
  onActivityIdeaUpdated: () => void 
}) {
  const getActivityTypeInfo = (typeId: string) => {
    const types = {
      'physical': { label: '💪 Physical', color: 'bg-green-100 text-green-800' },
      'social': { label: '👥 Social', color: 'bg-blue-100 text-blue-800' },
      'intellectual': { label: '🧠 Intellectual', color: 'bg-purple-100 text-purple-800' },
      'spiritual': { label: '🙏 Spiritual', color: 'bg-yellow-100 text-yellow-800' }
    };
    return types[typeId as keyof typeof types] || { label: typeId, color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Activity Ideas</h2>
        <CreateActivityIdeaDialog onActivityIdeaCreated={onActivityIdeaUpdated} />
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activityIdeas.length > 0 ? (
          activityIdeas.map((idea) => (
            <Card key={idea.id} className="h-fit">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{idea.name}</CardTitle>
                    {idea.activity_types && idea.activity_types.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {idea.activity_types.map((typeId) => {
                          const typeInfo = getActivityTypeInfo(typeId);
                          return (
                            <span key={typeId} className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                              {typeInfo.label}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <EditActivityIdeaDialog activityIdea={idea} onActivityIdeaUpdated={onActivityIdeaUpdated} />
                    <DeleteActivityIdeaDialog activityIdea={idea} onActivityIdeaDeleted={onActivityIdeaUpdated} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">{idea.description}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Card>
              <CardContent className="text-center py-12">
                <Lightbulb className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No activity ideas yet. Add some to get started!</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function CreateActivityIdeaDialog({ onActivityIdeaCreated }: { onActivityIdeaCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    activity_types: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activityTypes = [
    { id: 'physical', label: '💪 Physical', color: 'bg-green-100 text-green-800' },
    { id: 'social', label: '👥 Social', color: 'bg-blue-100 text-blue-800' },
    { id: 'intellectual', label: '🧠 Intellectual', color: 'bg-purple-100 text-purple-800' },
    { id: 'spiritual', label: '🙏 Spiritual', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const handleActivityTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        activity_types: [...prev.activity_types, typeId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        activity_types: prev.activity_types.filter(t => t !== typeId)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/activity-ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', description: '', activity_types: [] });
        onActivityIdeaCreated();
        setOpen(false);
      } else {
        alert('Failed to create activity idea');
      }
    } catch {
      alert('Error creating activity idea');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Activity Idea
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Activity Idea</DialogTitle>
          <DialogDescription>
            Save an activity idea for future planning.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="idea-name">Activity Name</Label>
            <Input
              id="idea-name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Basketball Tournament"
              required
            />
          </div>
          <div>
            <Label>Activity Types</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {activityTypes.map((type) => (
                <label key={type.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.activity_types.includes(type.id)}
                    onChange={(e) => handleActivityTypeChange(type.id, e.target.checked)}
                    className="rounded"
                  />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${type.color}`}>
                    {type.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="idea-description">Description</Label>
            <Textarea
              id="idea-description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the activity, materials needed, setup instructions, etc..."
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Activity Idea'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditActivityIdeaDialog({ activityIdea, onActivityIdeaUpdated }: { 
  activityIdea: ActivityIdea, 
  onActivityIdeaUpdated: () => void 
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: activityIdea.name,
    description: activityIdea.description,
    activity_types: activityIdea.activity_types || []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activityTypes = [
    { id: 'physical', label: '💪 Physical', color: 'bg-green-100 text-green-800' },
    { id: 'social', label: '👥 Social', color: 'bg-blue-100 text-blue-800' },
    { id: 'intellectual', label: '🧠 Intellectual', color: 'bg-purple-100 text-purple-800' },
    { id: 'spiritual', label: '🙏 Spiritual', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const handleActivityTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        activity_types: [...prev.activity_types, typeId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        activity_types: prev.activity_types.filter(t => t !== typeId)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/activity-ideas', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: activityIdea.id,
          ...formData,
        }),
      });

      if (response.ok) {
        onActivityIdeaUpdated();
        setOpen(false);
      } else {
        alert('Failed to update activity idea');
      }
    } catch {
      alert('Error updating activity idea');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="w-3 h-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Activity Idea</DialogTitle>
          <DialogDescription>
            Update the activity idea details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-idea-name">Activity Name</Label>
            <Input
              id="edit-idea-name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <Label>Activity Types</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {activityTypes.map((type) => (
                <label key={type.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.activity_types.includes(type.id)}
                    onChange={(e) => handleActivityTypeChange(type.id, e.target.checked)}
                    className="rounded"
                  />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${type.color}`}>
                    {type.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="edit-idea-description">Description</Label>
            <Textarea
              id="edit-idea-description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Activity Idea'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteActivityIdeaDialog({ activityIdea, onActivityIdeaDeleted }: { 
  activityIdea: ActivityIdea, 
  onActivityIdeaDeleted: () => void 
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/activity-ideas?id=${activityIdea.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onActivityIdeaDeleted();
      } else {
        alert('Failed to delete activity idea');
      }
    } catch {
      alert('Error deleting activity idea');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
          <Trash2 className="w-3 h-3" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Activity Idea</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &ldquo;<strong>{activityIdea.name}</strong>&rdquo;? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function CalendarView({ events, onEventUpdated, onEventDeleted }: { 
  events: Event[], 
  onEventUpdated: () => void,
  onEventDeleted: () => void 
}) {
  const upcomingEvents = events
    .filter(event => {
      const now = new Date();
      const eventDate = new Date(event.date);
      const eventEndDate = event.end_date ? new Date(event.end_date) : eventDate;
      
      // Show if event starts in the future OR is currently ongoing (multi-day)
      return eventDate >= now || (eventDate < now && eventEndDate >= now);
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 10);

  const formatDate = (dateString: string, endDateString?: string) => {
    const startDate = new Date(dateString);
    
    if (!endDateString || endDateString === dateString) {
      // Single day event
      return startDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    }
    
    // Multi-day event
    const endDate = new Date(endDateString);
    const startDateOnly = startDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    const endDateOnly = endDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    const startTime = startDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
    
    return `${startDateOnly} - ${endDateOnly} (starts ${startTime})`;
  };

  const getActivityTypeInfo = (typeId: string) => {
    const types = {
      'physical': { label: '💪 Physical', color: 'bg-green-100 text-green-800' },
      'social': { label: '👥 Social', color: 'bg-blue-100 text-blue-800' },
      'intellectual': { label: '🧠 Intellectual', color: 'bg-purple-100 text-purple-800' },
      'spiritual': { label: '🙏 Spiritual', color: 'bg-yellow-100 text-yellow-800' }
    };
    return types[typeId as keyof typeof types] || { label: typeId, color: 'bg-gray-100 text-gray-800' };
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
                    <div key={event.id} className={`border-l-4 pl-4 pr-4 py-3 rounded-r-md bg-white shadow-sm ${
                      event.type === 'sacrament' ? 'border-blue-600' : 'border-green-600'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">
                            {event.name}
                            {event.end_date && event.end_date !== event.date && (
                              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                Multi-day
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600">{formatDate(event.date, event.end_date)}</p>
                          {event.location && (
                            <p className="text-sm text-gray-500">📍 {event.location}</p>
                          )}
                          {event.description && (
                            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          )}
                          {event.activity_types && event.activity_types.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {event.activity_types.map((typeId) => {
                                const typeInfo = getActivityTypeInfo(typeId);
                                return (
                                  <span key={typeId} className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                                    {typeInfo.label}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <EditEventDialog event={event} onEventUpdated={onEventUpdated} />
                          <DeleteEventDialog event={event} onEventDeleted={onEventDeleted} />
                        </div>
                      </div>
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
                <strong>Remember:</strong> Arrive by 1:10 PM, 20 minutes before for sacrament!
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

function EditEventDialog({ event, onEventUpdated }: { event: Event, onEventUpdated: () => void }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: event.name,
    date: event.date,
    end_date: event.end_date || '',
    location: event.location,
    description: event.description,
    activity_types: event.activity_types || []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activityTypes = [
    { id: 'physical', label: '💪 Physical', color: 'bg-green-100 text-green-800' },
    { id: 'social', label: '👥 Social', color: 'bg-blue-100 text-blue-800' },
    { id: 'intellectual', label: '🧠 Intellectual', color: 'bg-purple-100 text-purple-800' },
    { id: 'spiritual', label: '🙏 Spiritual', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const handleActivityTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        activity_types: [...prev.activity_types, typeId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        activity_types: prev.activity_types.filter(t => t !== typeId)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/events', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: event.id,
          ...formData,
        }),
      });

      if (response.ok) {
        onEventUpdated();
        setOpen(false);
      } else {
        alert('Failed to update event');
      }
    } catch {
      alert('Error updating event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="w-3 h-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Update the event details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Event Name</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-date">Start Date & Time</Label>
            <Input
              id="edit-date"
              type="datetime-local"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-end-date">End Date & Time (Optional)</Label>
            <Input
              id="edit-end-date"
              type="datetime-local"
              value={formData.end_date}
              onChange={(e) => setFormData({...formData, end_date: e.target.value})}
              placeholder="Leave blank for single-day event"
            />
            <p className="text-xs text-gray-500 mt-1">
              For multi-day activities like camps or conferences
            </p>
          </div>
          <div>
            <Label htmlFor="edit-location">Location</Label>
            <Input
              id="edit-location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="e.g. Cultural Hall"
            />
          </div>
          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Additional details..."
              rows={3}
            />
          </div>
          <div>
            <Label>Activity Types</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {activityTypes.map((type) => (
                <label key={type.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.activity_types.includes(type.id)}
                    onChange={(e) => handleActivityTypeChange(type.id, e.target.checked)}
                    className="rounded"
                  />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${type.color}`}>
                    {type.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Event'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteEventDialog({ event, onEventDeleted }: { event: Event, onEventDeleted: () => void }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/events?id=${event.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onEventDeleted();
      } else {
        alert('Failed to delete event');
      }
    } catch {
      alert('Error deleting event');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
          <Trash2 className="w-3 h-3" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Event</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &ldquo;<strong>{event.name}</strong>&rdquo;? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function EventsView({ events, onEventCreated }: { events: Event[], onEventCreated: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    end_date: '',
    location: '',
    description: '',
    activity_types: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activityTypes = [
    { id: 'physical', label: '💪 Physical', color: 'bg-green-100 text-green-800' },
    { id: 'social', label: '👥 Social', color: 'bg-blue-100 text-blue-800' },
    { id: 'intellectual', label: '🧠 Intellectual', color: 'bg-purple-100 text-purple-800' },
    { id: 'spiritual', label: '🙏 Spiritual', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const handleActivityTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        activity_types: [...prev.activity_types, typeId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        activity_types: prev.activity_types.filter(t => t !== typeId)
      }));
    }
  };

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
        setFormData({ name: '', date: '', end_date: '', location: '', description: '', activity_types: [] });
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
                <Label htmlFor="date">Start Date & Time</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="end_date">End Date & Time (Optional)</Label>
                <Input
                  id="end_date"
                  type="datetime-local"
                  value={formData.end_date}
                  onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                  placeholder="Leave blank for single-day event"
                />
                <p className="text-xs text-gray-500 mt-1">
                  For multi-day activities like camps or conferences
                </p>
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
              <div>
                <Label>Activity Types</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {activityTypes.map((type) => (
                    <label key={type.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.activity_types.includes(type.id)}
                        onChange={(e) => handleActivityTypeChange(type.id, e.target.checked)}
                        className="rounded"
                      />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${type.color}`}>
                        {type.label}
                      </span>
                    </label>
                  ))}
                </div>
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
