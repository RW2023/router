// src/components/Runs.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { Database } from '@/lib/database.types'; // Adjust the import path to your generated types
import Loading from './ui/Loading';

// Define the types for the 'runs', 'stops', and 'runstops' tables using the generated Database type
type RunType = Database['public']['Tables']['runs']['Row'];
type StopType = Database['public']['Tables']['stops']['Row'];
type RunStopType = Database['public']['Tables']['runstops']['Row'];

const RunsComponent: React.FC = () => {
  const [runs, setRuns] = useState<RunType[]>([]);
  const [runStops, setRunStops] = useState<RunStopType[]>([]);
  const [stops, setStops] = useState<StopType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchRunsAndStops = async () => {
        setIsLoading(true);

        // Fetch runs without a type parameter
        const runsResponse = await supabase.from('runs').select('*');
        if (runsResponse.error) {
          console.error('Error fetching runs:', runsResponse.error);
        } else {
          setRuns(runsResponse.data as RunType[]);
        }

        // Fetch run-stops without a type parameter
        const runStopsResponse = await supabase.from('runstops').select('*');
        if (runStopsResponse.error) {
          console.error('Error fetching run-stops:', runStopsResponse.error);
        } else {
          setRunStops(runStopsResponse.data as RunStopType[]);
        }

        // Fetch stops without a type parameter
        const stopsResponse = await supabase.from('stops').select('*');
        if (stopsResponse.error) {
          console.error('Error fetching stops:', stopsResponse.error);
        } else {
          setStops(stopsResponse.data as StopType[]);
        }

        setIsLoading(false);
      };

      fetchRunsAndStops();
    }, []);

  if (isLoading) {
    return <Loading />;
  }

  // Helper function to find stops for a given run
  const findStopsForRun = (runId: number): StopType[] => {
    // Find run_stop entries for the run
    const relatedRunStops = runStops.filter((rs) => rs.run_id === runId);
    // Find stops related to those run_stop entries
    return relatedRunStops
      .map((rs) => stops.find((stop) => stop.stop_id === rs.stop_id))
      .filter((stop): stop is StopType => !!stop); // Type-guard to filter out undefined
  };

  return (
    <div>
      {runs.map((run) => (
        <div key={run.run_id}>
          <h2>{run.run_label}</h2>
          <p>{run.description}</p>
          <h3>Stops:</h3>
          <ul>
            {findStopsForRun(run.run_id).map((stop) => (
              <li key={stop.stop_id}>
                {stop.stop_name} - {stop.hospital_address}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RunsComponent;
