import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qxvrefsxdepxaesoljww.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4dnJlZnN4ZGVweGFlc29sand3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMTM3MDUsImV4cCI6MjA2NTc4OTcwNX0.EOHsO6loZlOFc1CChP8tejVWAH1H2FJMt1mCoFgLrus'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database Types
export interface Event {
  id: string
  name: string
  date: string
  location: string
  description: string
  type: string
  created_at?: string
} 