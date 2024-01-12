export interface Run {
  run_id: number;
  run_label: string;
  // Add other fields as necessary
}

export interface Stop {
  stop_id: number;
  hospital_name: string;
  hospital_address: string;
  delivery_instructions: string;
  pickup_instructions: string;
  image_url: string;
  stop_name: string;
  // Add other fields as necessary
}

export interface Driver {
  driver_id: number;
  name: string;
  email: string;
  run_assignment: number;
  // Add other fields as necessary
}

export interface RunStop {
  run_stop_id: number;
  run_id: number;
  stop_id: number;
  stop_order: number;
  // Add other fields as necessary
}
