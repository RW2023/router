// src/utils/supabaseClient.tsx
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getRuns = async () => {
  let { data: runs, error } = await supabase
    .from('runs') // Make sure the table name is correct
    .select('*'); // Selects all columns

  if (error) throw error;
  return runs;
};

export const getStops = async () => {
  let { data: stops, error } = await supabase
    .from('stops') // Make sure the table name is correct
    .select('*'); // Selects all columns

  if (error) throw error;
  return stops;
};

export const getRunStops = async () => {
  let { data: runStops, error } = await supabase
    .from('runstops') // Make sure the table name is correct
    .select('*'); // Selects all columns

  if (error) throw error;
  return runStops;
};

export const getDrivers = async () => {
  let { data: drivers, error } = await supabase
    .from('drivers') // Make sure the table name is correct
    .select('*'); // Selects all columns

  if (error) throw error;
  return drivers;
};
