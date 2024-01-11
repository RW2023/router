//src/app/devdash/forms/page.tsx
'use client';
import React, { useState, useEffect, FC } from 'react';
import Heading from '@/components/ui/Heading';
import DriverForm from '@/components/forms/Driver'; // Assuming Driver is a form
import SubHeading from '@/components/ui/SubHeading';
import Layout from './layout';
import { supabase } from '@/utils/supabaseClient'; // Adjust the path as necessary

interface Props {}

interface Driver {
  id: number;
  name: string;
  email: string;
  run_assignment: string;
  run_label?: string; // Made optional in case it's not always present
}

const Page: FC<Props> = (): JSX.Element => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [runs, setRuns] = useState<any[]>([]); // Define a more specific type if possible

  useEffect(() => {
    const fetchDriversAndRuns = async () => {
      try {
        // Fetch drivers
        const { data: driversData, error: driversError } = await supabase
          .from('drivers')
          .select('*');
        if (driversError) throw driversError;
        setDrivers(driversData);

        // Fetch runs
        const { data: runsData, error: runsError } = await supabase
          .from('runs')
          .select('*');
        if (runsError) throw runsError;
        setRuns(runsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDriversAndRuns();
  }, []);

  return (
    <Layout>
      <div>
        <Heading title="Forms" iconClass="fas fa-file-signature" />
        <SubHeading title="Driver Form" />
        <DriverForm />

        <SubHeading title="Drivers" />
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body">
            <ul className="list-disc pl-5">
              {drivers.map((driver) => {
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
      </div>
    </Layout>
  );
};

export default Page;
