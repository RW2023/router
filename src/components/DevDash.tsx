// src/components/DevDash.tsx
import React, { useState, useEffect } from 'react';
import { getRuns, getStops, getDrivers } from '@/utils/supabaseClient';
import { motion } from 'framer-motion';
import SubHeading from './ui/SubHeading';

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
  email: string;
  run_assignment: string;
  run_label: string;
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
  }, []);

  // Animation variants for framer-motion
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const placeholderImagePath = '/img/placeholder.png'; // Place the image in the public directory and use the path as a string

  return (
    <div className="dev-dash p-4 space-y-4 glass">
      <motion.div
        className="runs mb-4"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <SubHeading title="Runs" />

        <div className="card bg-base-300 shadow-2xl">
            <SubHeading title="Run List" />
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
        <SubHeading title="Stops" />

        <div className="card bg-base-300 shadow-xl">
          <div className="card-body">
            <ul className="list-disc pl-5">
              {stops.map((stop) => (
                <li key={stop.stop_id} className="py-1">
                  <p className="font-semibold">Stop # {stop.stop_order}:</p>
                  <div className="card">
                    <SubHeading title="Delivery Instructions" />
                    <p>{stop.delivery_instructions}</p>
                  </div>
                  <div className="card-image">
                    {stop.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={stop.image_url || placeholderImagePath}
                        alt="Stop"
                        className="mt-2 max-w-xs rounded-lg shadow-md"
                      />
                    )}
                  </div>
                  <div className="card">
                    <SubHeading title="Pickup Instructions" />
                    <p>{stop.pickup_instructions}</p>
                  </div>
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
        <SubHeading title="Drivers" />
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body">
            <ul className="list-disc pl-5">
              {drivers.map((driver) => (
                <li key={driver.id} className="py-1">
                  {driver.name}
                  {/* Uncomment if you have more information to display */}
                  <p>Email: {driver.email}</p>
                  <p>Run: {driver.run_label}</p>
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
