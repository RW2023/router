/* eslint-disable @next/next/no-img-element */
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
    <div className="dev-dash p-4 space-y-4 lg:w-3/4 mx-auto rounded-box card">
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
            <div className="container mx-auto p-1">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {runs.map((run) => {
                  const correspondingStop = stops.find(
                    (stop) => stop.run_id === run.run_id,
                  );
                  const imageUrl = correspondingStop
                    ? correspondingStop.image_url
                    : placeholderImagePath;

                  return (
                    <li
                      key={run.run_id}
                      className="card-compact bg-base-300 shadow-xl p-3 md:p-2 lg:p-4"
                    >
                      <SubHeading title={`${run.run_label} Run`} />
                      <img
                        src={imageUrl}
                        alt="Site"
                        className="mx-auto p-1 border border-secondary bg-base-100 rounded-md m-1"
                      />
                      <p className="p-1 border border-secondary bg-base-100">
                        <strong>Hospital:</strong> {run.hospital_name}
                      </p>
                      <p>
                        <strong>Day of the Week:</strong> {run.day_of_week}
                      </p>
                      <p>
                        <strong>Description:</strong> {run.description}
                      </p>
                      <p>
                        <strong>Address:</strong> {run.hospital_address}
                      </p>
                      <p>
                        <strong>Contact Number:</strong> {run.contact_number}
                      </p>
                      <p>
                        <strong>Route Description:</strong>{' '}
                        {run.route_description}
                      </p>
                      <p>
                        <strong>Items to Remember:</strong>{' '}
                        {run.items_to_remember}
                      </p>
                      <p>
                        <strong>Building Access:</strong> {run.building_access}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
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
                      {runAssigned ? runAssigned.run_label : 'No assigned run'}:
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
