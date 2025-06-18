-- Create events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT DEFAULT '',
  description TEXT DEFAULT '',
  type TEXT DEFAULT 'activity',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rewards table
CREATE TABLE rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  points INTEGER DEFAULT 0,
  description TEXT DEFAULT '',
  emoji TEXT DEFAULT '👤',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert some default data
INSERT INTO events (name, date, location, description, type) VALUES
  ('Sacrament Meeting', CURRENT_DATE + INTERVAL '7 days' + TIME '09:00:00', 'Chapel', 'Please arrive by 8:45 AM to help pass the sacrament', 'sacrament'),
  ('Young Men Activity', CURRENT_DATE + INTERVAL '10 days' + TIME '19:00:00', 'Cultural Hall', 'Weekly young men activity', 'activity');

INSERT INTO rewards (name, points, description, emoji) VALUES
  ('Early Bird Champion', 250, 'Most on-time arrivals', '🥇'),
  ('Activity Organizer', 200, 'Event planning help', '🥈'),
  ('Perfect Attendance', 180, 'Never missed an activity', '🥉');

-- Enable Row Level Security (RLS) - optional but recommended
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (adjust as needed for your security requirements)
CREATE POLICY "Enable read access for all users" ON events FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON events FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON events FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON events FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON rewards FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON rewards FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON rewards FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON rewards FOR DELETE USING (true); 