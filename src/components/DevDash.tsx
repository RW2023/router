// src/components/DevDash.tsx
import React, { useState, useEffect } from 'react';
import { getRuns, getStops, getDrivers } from '@/utils/supabaseClient';

interface Run {
  id: number;
  description: string;
  // Add other run properties as needed
}

interface Stop {
  stop_id: number;
  run_id: number;
  stop_order: number;
  delivery_instructions: string;
  pickup_instructions: string;
  image_url: string;
}

interface Driver {
  id: number;
  name: string;
//   email: string;
  // Add other driver properties as needed
}

const DevDash = () => {
  const [runs, setRuns] = useState<Run[]>([]);
  const [stops, setStops] = useState<Stop[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    // Fetch runs, stops, and drivers data
    getRuns().then((data) => setRuns(data || []));
    getStops().then((data) => setStops(data || []));
    getDrivers().then((data) => setDrivers(data || []));
    console.log(runs);
    console.log(stops);
    console.log(drivers);
  }, []);


  return (
    <div className="dev-dash">
      <div className="runs">
        <h2>Runs</h2>
        <ul>
          {runs.map((run) => (
            <li key={run.id}>{run.description}</li>
          ))}
        </ul>
      </div>

      <div className="stops">
        <h2>Stops</h2>
        <ul>
          {stops.map((stop) => (
            <li key={stop.stop_id}>
              {stop.delivery_instructions} - {stop.pickup_instructions}
            </li>
          ))}
        </ul>
      </div>

      <div className="drivers">
        <h2>Drivers</h2>
        <ul>
          {drivers.map((driver) => (
            <li key={driver.id}>{driver.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DevDash;
