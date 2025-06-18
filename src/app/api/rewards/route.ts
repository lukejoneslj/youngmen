import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'rewards.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read rewards from file
async function readRewards() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    // If file doesn't exist, return default rewards data
    return [
      {
        id: '1',
        name: 'Early Bird Champion',
        points: 250,
        description: 'Most on-time arrivals',
        emoji: '🥇'
      },
      {
        id: '2', 
        name: 'Activity Organizer',
        points: 200,
        description: 'Event planning help',
        emoji: '🥈'
      },
      {
        id: '3',
        name: 'Perfect Attendance',
        points: 180,
        description: 'Never missed an activity',
        emoji: '🥉'
      }
    ];
  }
}

// Write rewards to file
async function writeRewards(rewards: Reward[]) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(rewards, null, 2));
}

interface Reward {
  id: string;
  name: string;
  points: number;
  description: string;
  emoji: string;
}

// GET - Fetch all rewards
export async function GET() {
  try {
    const rewards = await readRewards();
    return NextResponse.json(rewards);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch rewards' }, { status: 500 });
  }
}

// POST - Add points or update reward
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, points, action } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const rewards = await readRewards();
    
    if (action === 'add_points') {
      // Find existing person or create new entry
      const person = rewards.find((r: Reward) => r.name === name);
      if (person) {
        person.points += points;
      } else {
        const newPerson: Reward = {
          id: Date.now().toString(),
          name,
          points,
          description: 'Young men member',
          emoji: '👤'
        };
        rewards.push(newPerson);
      }
    }

    await writeRewards(rewards);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update rewards' }, { status: 500 });
  }
} 