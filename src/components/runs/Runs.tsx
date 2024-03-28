/* eslint-disable @next/next/no-img-element */
//src/components/DevDash.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { getRuns, getStops, getRunStops } from '@/utils/supabaseClient';
import { motion } from 'framer-motion';
import SubHeading from '@/components/ui/SubHeading';
import Loading from '@/components/ui/Loading';

// Interfaces for your data types
interface Run {
  run_id: number;
  run_label: string;
  description: string;
  day_of_week: string;
  route_description: string;
  items_to_remember: string;
  building_access: string;
}

interface Stop {
  stop_id: number;
  hospital_name: string;
  hospital_address: string;
  delivery_instructions: string;
  pickup_instructions: string;
  image_url: string;
  stop_name: string;
}

interface RunStop {
  run_stop_id: number;
  run_id: number;
  stop_id: number;
  stop_order: number;
}

interface CombinedRunData {
  run_id: number;
  run_label: string;
  description: string;
  day_of_week: string;
  route_description: string;
  items_to_remember: string;
  building_access: string;
  stops: Stop[];
}

const Runs = () => {
  const [combinedRunData, setCombinedRunData] = useState<CombinedRunData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRunId, setSelectedRunId] = useState<number | ''>('');

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getRuns(), getStops(), getRunStops()])
      .then(([runsData, stopsData, runStopsData]) => {
        const combinedData = runsData.map((run) => {
          const stopsForRun = runStopsData
            .filter((rs) => rs.run_id === run.run_id)
            .map((rs) => {
              const stop = stopsData.find(
                (stop) => stop.stop_id === rs.stop_id,
              );
              return stop ? { ...stop, stop_order: rs.stop_order } : null;
            })
            .filter((stop): stop is Stop => stop !== null);
          return { ...run, stops: stopsForRun };
        });
        setCombinedRunData(combinedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRunId(
      event.target.value !== '' ? Number(event.target.value) : '',
    );
  };

  const selectedRunDetails = combinedRunData.find(
    (run) => run.run_id === selectedRunId,
  );

  return (
    <div className="dev-dash p-4 space-y-4 lg:w-3/4 mx-auto rounded-box card">
      <div className="select-run mb-4">
        <select
          value={selectedRunId}
          onChange={handleSelectChange}
          className="select select-bordered w-full max-w-xs"
          title="Select a run"
        >
          <option value="">Select a run</option>
          {combinedRunData.map((run) => (
            <option key={run.run_id} value={run.run_id}>
              {run.run_label}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <Loading />
      ) : selectedRunDetails ? (
        <motion.div
          key={selectedRunDetails.run_id}
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.5 }}
          className="run-item mb-4"
        >
          <SubHeading
            title={`${selectedRunDetails.run_label} Run: ${selectedRunDetails.description}`}
          />
          <div className="card border border-1 bg-base-300 shadow-2xl">
            <div className="card-body">
              <h3 className="text-lg font-semibold">Stops for this Run:</h3>
              <ul className="space-y-2 mt-2">
                {selectedRunDetails.stops.map((stop, index) => (
                  <li key={index} className="stop-item bg-base-200 p-2 rounded">
                    <h4 className="text-md font-semibold">{stop.stop_name}</h4>
                    {stop.image_url ? (
                      <a
                        href={stop.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={stop.image_url}
                          alt={stop.stop_name}
                          className="w-full max-w-xs object-cover bg-base-200 p-1 rounded-box border border-black"
                        />
                      </a>
                    ) : (
                      <a
                        href="/img/placeholder.png"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="/img/placeholder.png"
                          alt="Placeholder"
                          className="w-full max-w-xs object-cover bg-base-200 p-1 rounded-box border border-black"
                        />
                      </a>
                    )}
                    <p>
                      <strong>Address:</strong> {stop.hospital_address}
                    </p>
                    <p>
                      <strong>Delivery Instructions:</strong>{' '}
                      {stop.delivery_instructions}
                    </p>
                    <p>
                      <strong>Pickup Instructions:</strong>{' '}
                      {stop.pickup_instructions}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ) : (
        <p>Please select a run to see its details.</p>
      )}
    </div>
  );
};

export default Runs;
