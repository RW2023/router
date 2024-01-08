// src/components/DevDash.tsx
import React, { useState, useEffect } from 'react';
import { getRuns, getStops, getDrivers } from '@/utils/supabaseClient';
import { motion } from 'framer-motion';

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
  // email: string;
  // Add other driver properties as needed
}

const DevDash = () => {
  const [runs, setRuns] = useState<Run[]>([]);
  const [stops, setStops] = useState<Stop[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    // Fetch runs, stops, and drivers data
    getRuns().then(data => setRuns(data || []));
    getStops().then(data => setStops(data || []));
    getDrivers().then(data => setDrivers(data || []));
  }, []);

  // Animation variants for framer-motion
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="dev-dash p-4 space-y-4">
      <motion.div
        className="runs mb-4"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-bold mb-2">Runs</h2>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <ul className="list-disc pl-5">
              {runs.map((run) => (
                <li key={run.id} className="py-1">
                  {run.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="stops mb-4"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-lg font-bold mb-2">Stops</h2>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <ul className="list-disc pl-5">
              {stops.map((stop) => (
                <li key={stop.stop_id} className="py-1">
                  <span className="font-semibold">Order {stop.stop_order}:</span> {stop.delivery_instructions} - {stop.pickup_instructions}
                  {stop.image_url && (
                    <img src={stop.image_url} alt="Stop" className="mt-2 max-w-xs rounded-lg shadow-md" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="drivers mb-4"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-lg font-bold mb-2">Drivers</h2>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <ul className="list-disc pl-5">
              {drivers.map((driver) => (
                <li key={driver.id} className="py-1">
                  {driver.name}
                  {/* Uncomment if you have more information to display */}
                  {/* <p>Email: {driver.email}</p> */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DevDash;
