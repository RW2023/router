// src/utils/supabaseClient.tsx
import { createClient } from '@supabase/supabase-js';

// Interfaces for your data models
interface Run {
  run_id: number;
  run_label: string;
  description: string;
  day_of_week: string;
  hospital_name: string;
  hospital_address: string;
  contact_number: string;
  route_description: string;
  items_to_remember: string;
  building_access: string;
  // Add any other fields as per your database structure
}

interface Stop {
  stop_id: number;
  stop_order: number;
  delivery_instructions: string;
  pickup_instructions: string;
  image_url: string;
  stop_name: string;
  // Add any other fields as needed
}

interface RunStop {
  run_stop_id: number;
  run_id: number;
  stop_id: number;
  stop_order: number;
  // Add any other fields as needed
}

interface Driver {
  id: number;
  name: string;
  email: string;
  run_assignment: string;
  run_label: string;
  // Add other driver properties as needed
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getRuns = async () => {
  const { data, error } = await supabase.from('runs').select('*');
  if (error) throw error;
  return data || [];
};

export const getStops = async () => {
  const { data, error } = await supabase.from('stops').select('*');
  if (error) throw error;
  return data || [];
};

export const getRunStops = async () => {
  const { data, error } = await supabase.from('runstops').select('*');
  if (error) throw error;
  return data || [];
};

export const getDrivers = async () => {
  const { data, error } = await supabase.from('drivers').select('*');
  if (error) throw error;
  return data || [];
};