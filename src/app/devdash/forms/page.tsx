//src/app/devdash/forms/page.tsx
'use client';

import React, { useState, useEffect, FC } from 'react';
import Heading from '@/components/ui/Heading';
import DriverForm from '@/components/forms/Driver'; // Verify path
import SubHeading from '@/components/ui/SubHeading';
import { supabase } from '@/utils/supabaseClient'; // Verify path

// Define a type for Run
interface Run {
  run_id: number;
  run_label: string;
  // Add other properties of Run if needed
}

interface Driver {
  id: number;
  name: string;
  email: string;
  run_assignment: string;
  run_label?: string;
}

const Page: FC = (): JSX.Element => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [runs, setRuns] = useState<Run[]>([]);

  useEffect(() => {
    const fetchDriversAndRuns = async () => {
      try {
        const { data: driversData, error: driversError } = await supabase
          .from('drivers')
          .select('*');
        if (driversError) throw driversError;
        setDrivers(driversData || []);

        const { data: runsData, error: runsError } = await supabase
          .from('runs')
          .select('*');
        if (runsError) throw runsError;
        setRuns(runsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDriversAndRuns();
  }, []);

  return (
    <div>
      <Heading title="Forms" iconClass="fas fa-file-signature" />
      <SubHeading title="Driver Form" />
      <DriverForm />

      <SubHeading title="Drivers" />
      <div className="card-compact bg-base-300 shadow-xl m-4 w-3/4 mx-auto rounded-box p-1 border border-1">
        <SubHeading title="all drivers" />
        <div className="card-body grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 drop-shadow-md">
          {drivers.map((driver) => {
            const runAssigned = runs.find(
              (run) => run.run_id === Number(driver.run_assignment),
            );
            return (
              <div
                key={driver.id}
                className="border p-4 rounded-lg bg-base-100"
              >
                <h3 className="font-bold">{driver.name}</h3>
                <p>Email: {driver.email}</p>
                <p>
                  {runAssigned ? runAssigned.run_label : 'No assigned run'}: Run
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
