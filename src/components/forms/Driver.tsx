import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { Run } from '@/utils/types'; // Ensure the path is correct

const DriverForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    run_assignment: '',
  });
  const [runs, setRuns] = useState<Run[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRuns = async () => {
      const { data, error } = await supabase
        .from('runs')
        .select('run_id, run_label');
      if (error) {
        console.error('Error fetching runs:', error);
      } else {
        setRuns(data);
      }
    };

    fetchRuns();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const { error } = await supabase.from('drivers').insert([formData]);
      if (error) throw error;
      setMessage('Driver added successfully');
      setFormData({ name: '', email: '', run_assignment: '' });
    } catch (error) {
      setMessage(error.message);
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
      {message && <p className="mb-4 text-green-500">{message}</p>}
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
          required
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
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Run Assignment</span>
        </label>
        <select
          name="run_assignment"
          value={formData.run_assignment}
          onChange={handleChange}
          className="select select-bordered"
          required
        >
          <option value="">Select a Run</option>
          {runs.map((run) => (
            <option key={run.run_id} value={run.run_id}>
              {run.run_label}
            </option>
          ))}
        </select>
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
