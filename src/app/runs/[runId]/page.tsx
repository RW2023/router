import { useServerAction } from 'next/navigation';
import { getRunDetails } from './getRunDetails';

export default function RunPage({ params }) {
  const { runId } = params;
  const runDetails = useServerAction(() => getRunDetails({ params }), [runId]);

  if (!runDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="run-details p-4">
      <h1 className="text-2xl font-bold">
        {runDetails.run_label}: {runDetails.description}
      </h1>
      <p>
        <strong>Day:</strong> {runDetails.day_of_week}
      </p>
      <p>
        <strong>Route:</strong> {runDetails.route_description}
      </p>
      <p>
        <strong>Items to Remember:</strong> {runDetails.items_to_remember}
      </p>
      <p>
        <strong>Building Access:</strong> {runDetails.building_access}
      </p>
      <div className="stops mt-4">
        <h2 className="text-xl font-semibold">Stops:</h2>
        <ul className="list-disc ml-5">
          {runDetails.stops.map((stop) => (
            <li key={stop.stop_id} className="mt-2">
              <h3 className="text-lg font-semibold">{stop.stop_name}</h3>
              <p>
                <strong>Address:</strong> {stop.hospital_address}
              </p>
              <p>
                <strong>Delivery Instructions:</strong>{' '}
                {stop.delivery_instructions}
              </p>
              <p>
                <strong>Pickup Instructions:</strong> {stop.pickup_instructions}
              </p>
              {stop.image_url && (
                <img
                  src={stop.image_url}
                  alt={stop.stop_name}
                  className="max-w-xs mt-2"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
