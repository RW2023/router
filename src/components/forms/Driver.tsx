'use client';
import React, { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

const DriverForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    run_assignment: '', // Changed from runAssignment to run_assignment
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedValue =
      name === 'run_assignment' ? parseInt(value, 10) || 0 : value;
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data, error } = await supabase.from('drivers').insert([formData]);
      if (error) throw error;
      alert('Driver added successfully');
      setFormData({ name: '', email: '', run_assignment: '' }); // Adjusted here as well
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
        console.error(error);
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-300 shadow-xl p-10 md:w-3/4 mx-auto mt-4"
    >
      <h2 className="text-2xl font-bold mb-6">Add New Driver</h2>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Run Assignment</span>
        </label>
        <input
          type="number"
          name="run_assignment"
          value={formData.run_assignment}
          onChange={handleChange}
          placeholder="Run Assignment"
          className="input input-bordered"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-4"
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default DriverForm;
