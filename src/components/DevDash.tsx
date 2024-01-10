// src/components/DevDash.tsx
import React, { useState, useEffect } from 'react';
import { getRuns, getStops, getDrivers } from '@/utils/supabaseClient';
import { motion } from 'framer-motion';
import SubHeading from './ui/SubHeading';
import Loading from './ui/Loading';

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
  // Add any other fields that your run objects might have
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

   const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      setIsLoading(true);
      getRuns().then((data) => {
        setRuns(data || []);
        setIsLoading(false); // Set loading to false after data is fetched
      });
      // ... fetch other data
    }, []);

    if (isLoading) {
      return <Loading />;
    }

  return (
    <div className="dev-dash p-4 space-y-4 glass lg:w-3/4 mx-auto rounded-box">
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
                <li key={run.run_id} className="py-1">
                  <p>{run.run_label} {' '}: Run</p>
                  <p>Hospital: {run.hospital_name}</p>
                  <p>Day of the Week: {run.day_of_week}</p>
                  <p>Description: {run.description}</p>
                  <p>Address: {run.hospital_address}</p>
                  <p>Contact Number: {run.contact_number}</p>
                  <p>Route Description: {run.route_description}</p>
                  <p>Items to Remember: {run.items_to_remember}</p>
                  <p>Building Access: {run.building_access}</p>
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
                  <div className="card-image img">
                    {stop.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={stop.image_url || placeholderImagePath}
                        alt="Stop"
                        className="mt-2 h-auto rounded-lg shadow-md bg-base-100 p-2 border-1 border-secondary"
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
              {drivers.map((driver) => {
                // Find the run that matches the driver's run assignment
                const runAssigned = runs.find(
                  (run) => run.run_id === Number(driver.run_assignment),
                );

                return (
                  <li key={driver.id} className="py-1">
                    {driver.name}
                    <p>Email: {driver.email}</p>
                    <p>
                      {runAssigned ? runAssigned.run_label : 'No assigned run'}:{' '}
                      Run
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DevDash;
