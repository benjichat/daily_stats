import { useSession } from "next-auth/react";
import { useState } from "react";
import { api, type RouterOutputs } from "../utils/api";

type Metric = RouterOutputs["metrics"]["getAll"][0];

export const MetricsForm = () => {

  const { data: sessionData } = useSession();

  // const [selectedTopic, setSelectedTopic] = useState<Metric | null>(null);

  const [newMetric, setNewMetric] = useState<Metric | null>(null);

  const { data: metrics, refetch: refetchMetrics } = api.metrics.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      // onSuccess: (data) => {
      //   setSelectedTopic(selectedTopic ?? data[0] ?? null);
      // },
    }
  );

  const createMetric = api.metrics.create.useMutation({
    onSuccess: () => {
      void refetchMetrics();
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-xs bg-white shadow-md p-6 rounded-lg">
        <table className="w-full">
          {/* Table header */}
          <thead>
            <tr>
              {/* Add table headers as needed */}
              <th className="w-1/4 px-4 py-3 text-left">#</th>
              <th className="w-3/4 px-4 py-3">Name</th>
            </tr>
          </thead>
          <tbody>
            {metrics?.map((metric, index) => (
              <tr key={metric.id}>
                <td className="w-1/4 px-4 py-3 text-left">{index}</td>
                <td className="w-3/4 px-4 py-3 text-center">{metric.name}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="p-4">
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="New Metric"
                    className="input-bordered input input-sm w-full"
                    onChange={(e) => {
                      setNewMetric(e.currentTarget.value);
                    }}
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded"
                    onClick={(e) => {
                      e.preventDefault();
                      createMetric.mutate({
                        name: newMetric,
                      });
                    }}
                  >
                    Add Metric
                  </button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
