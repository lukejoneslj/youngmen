import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Fetch all rewards
export async function GET() {
  try {
    const { data: rewards, error } = await supabase
      .from('rewards')
      .select('*')
      .order('points', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(rewards || []);
  } catch (error) {
    console.error('Error fetching rewards:', error);
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

    if (action === 'add_points') {
      // Check if person already exists
      const { data: existingPerson } = await supabase
        .from('rewards')
        .select('*')
        .eq('name', name)
        .single();

      if (existingPerson) {
        // Update existing person's points
        const { data, error } = await supabase
          .from('rewards')
          .update({ points: existingPerson.points + points })
          .eq('name', name)
          .select()
          .single();

        if (error) {
          throw error;
        }

        return NextResponse.json(data);
      } else {
        // Create new person
        const newPerson = {
          name,
          points,
          description: 'Young men member',
          emoji: '👤'
        };

        const { data, error } = await supabase
          .from('rewards')
          .insert([newPerson])
          .select()
          .single();

        if (error) {
          throw error;
        }

        return NextResponse.json(data);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating rewards:', error);
    return NextResponse.json({ error: 'Failed to update rewards' }, { status: 500 });
  }
} 