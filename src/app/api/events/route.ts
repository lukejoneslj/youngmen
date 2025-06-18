import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'events.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read events from file
async function readEvents() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    // If file doesn't exist, return default events
    return [
      {
        id: '1',
        name: 'Sacrament Meeting',
        date: new Date().toISOString().split('T')[0] + 'T09:00',
        location: 'Chapel',
        description: 'Please arrive by 8:45 AM to help pass the sacrament',
        type: 'sacrament'
      },
      {
        id: '2',
        name: 'Young Men Activity',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T19:00',
        location: 'Cultural Hall',
        description: 'Weekly young men activity',
        type: 'activity'
      }
    ];
  }
}

// Write events to file
async function writeEvents(events: Event[]) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(events, null, 2));
}

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  type: string;
  createdAt?: string;
}

// GET - Fetch all events
export async function GET() {
  try {
    const events = await readEvents();
    return NextResponse.json(events);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST - Create new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, date, location, description } = body;

    if (!name || !date) {
      return NextResponse.json({ error: 'Name and date are required' }, { status: 400 });
    }

    const events = await readEvents();
    const newEvent = {
      id: Date.now().toString(),
      name,
      date,
      location: location || '',
      description: description || '',
      type: 'activity',
      createdAt: new Date().toISOString()
    };

    events.push(newEvent);
    await writeEvents(events);

    return NextResponse.json(newEvent, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
} 