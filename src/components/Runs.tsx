//src/components/Runs.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { Database } from '@/lib/database.types'; // Adjust the import path to your generated types

// Define the types for the 'runs' and 'stops' table using the generated Database type
type RunType = Database['public']['Tables']['runs']['Row'];
type StopType = Database['public']['Tables']['stops']['Row'];

const RunsComponent: React.FC = () => {
  const [runs, setRuns] = useState<RunType[]>([]);
  const [stops, setStops] = useState<StopType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRuns = async () => {
      const { data: runsData, error: runsError } = await supabase
        .from('runs')
        .select('*');
      if (runsError) {
        console.error('Error fetching runs:', runsError);
        return;
      }
      setRuns(runsData || []);
    };

    const fetchStops = async () => {
      const { data: stopsData, error: stopsError } = await supabase
        .from('stops')
        .select('*');
      if (stopsError) {
        console.error('Error fetching stops:', stopsError);
        return;
      }
      setStops(stopsData || []);
    };

    const fetchData = async () => {
      await fetchRuns();
      await fetchStops();
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {runs.map((run) => (
        <div key={run.run_id}>
          <h2>{run.run_label}</h2>
          <p>{run.description}</p>
          <h3>Stops:</h3>
          <ul>
            {stops
              .filter((stop) => stop.run_id === run.run_id)
              .map((filteredStop) => (
                <li key={filteredStop.stop_id}>
                  {filteredStop.stop_name} - {filteredStop.hospital_address}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RunsComponent;
