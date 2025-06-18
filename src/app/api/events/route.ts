import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Fetch all events
export async function GET() {
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      throw error;
    }

    return NextResponse.json(events || []);
  } catch (error) {
    console.error('Error fetching events:', error);
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

    const newEvent = {
      name,
      date,
      location: location || '',
      description: description || '',
      type: 'activity',
    };

    const { data, error } = await supabase
      .from('events')
      .insert([newEvent])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
} 