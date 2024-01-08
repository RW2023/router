// pages/api/test.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { data, error } = await supabase
    .from('drivers') // Replace with your table name
    .select('*')
    .limit(1);

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json(data);
}
