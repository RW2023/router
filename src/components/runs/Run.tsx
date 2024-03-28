// Assuming the file is still src/components/Runs.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Loading from '../ui/Loading'; // Ensure this path is correct

// Interfaces for run and stop might already exist in your project
interface Run {
  run_id: number;
  run_label: string;
  description: string;
  // Add other run properties as needed
}

interface Stop {
  stop_id: number;
  stop_name: string;
  hospital_address: string;
  // Add other stop properties as needed
}

// Props interface for the component
interface RunProps {
  run_label: string;
}

const RunDetails: React.FC<RunProps> = ({ run_label }) => {
  const [runDetails, setRunDetails] = useState<Run | null>(null);
  const [stops, setStops] = useState<Stop[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRunDetails = async () => {
      setIsLoading(true);

      // Fetch the specific run's details
      const { data: runData, error: runError } = await supabase
        .from('runs')
        .select('*')
        .eq('run_label', run_label)
        .single();

      if (runError) {
        console.error('Error fetching run details:', runError);
        setIsLoading(false);
        return;
      }

      setRunDetails(runData);

      // Fetch stops associated with the run
      const { data: stopsData, error: stopsError } = await supabase
        .from('stops')
        .select('*')
        .in(
          'stop_id',
          (
            await supabase
              .from('runstops')
              .select('stop_id')
              .eq('run_label', run_label)
          ).data?.map((rs) => rs.stop_id) || [],
        );

      if (stopsError) {
        console.error('Error fetching stops:', stopsError);
        setIsLoading(false);
        return;
      }

      setStops(stopsData || []);
      setIsLoading(false);
    };

    fetchRunDetails();
  }, [run_label]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {runDetails ? (
        <>
          <h2>{runDetails.run_label}</h2>
          <p>{runDetails.description}</p>
          <h3>Stops:</h3>
          <ul>
            {stops.map((stop) => (
              <li key={stop.stop_id}>
                {stop.stop_name} - {stop.hospital_address}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Run details not found.</p>
      )}
    </div>
  );
};

export default RunDetails;
