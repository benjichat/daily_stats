import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "../utils/api";
import { FaBeer } from 'react-icons/fa';


interface MetricsInputFormProps {
  searchDate: Date
}

type IndividualStat = {
  id?: number;
  date?: Date;
  metricId?: number;
  value?: number;
}

interface StatsDict {
  [key: number]: IndividualStat;
}


export const MetricsInputForm: React.FC<MetricsInputFormProps> = ({ searchDate }) => {

  const { data: sessionData } = useSession();

  const [updateStats, setUpdateStats] = useState<StatsDict>({});

  const { refetch: refetchStats } = api.stats.getDay.useQuery(
    { date: searchDate }, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        console.log(data, "data");
        const d = data.reduce<StatsDict>((acc, item) => {
          acc[item.metricId] = item; // <-- Use 'acc' instead of 'data'
          return acc;
        }, {});
        console.log(d, "data refined");
        setUpdateStats(d ?? {});
      },
    }
  );

  console.log(updateStats[2]?.value, "updateStats");


  const { data: metrics } = api.metrics.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      // onSuccess: (data) => {
      //   setSelectedTopic(selectedTopic ?? data[0] ?? null);
      // },
    }
  );

  const createStat = api.stats.create.useMutation({
    onSuccess: () => {
      void refetchStats();
    },
  });

  return (
    <table className="w-full">
      {/* Table header */}
      <thead>
        <tr>
          {/* Add table headers as needed */}
          <th className="w-1/4 px-4 py-3 text-left">#</th>
          <th className="w-2/4 px-4 py-3">Name</th>
          <th className="w-1/4 px-4 py-3">?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {metrics?.map((metric, index) => (
          <tr key={metric.id}>
            <td className="w-1/4 px-4 py-3 text-left">{index}</td>
            <td className="w-2/4 px-4 py-3 text-center">{metric.name}</td>
            <td className="w-1/4 px-4 py-3">
              <input
                type="number"
                className="input-bordered input input-sm w-full"
                value={updateStats[metric.id]?.value || 0}
                onChange={(e) => {
                  setUpdateStats({
                    ...updateStats,
                    [metric.id]: {
                      ...(updateStats[metric.id]),
                      value: parseInt(e.currentTarget.value, 10),
                    },
                  });
                }}
              />
            </td>
            <td className="p-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  createStat.mutate({
                    date: searchDate,
                    metricId: metric.id,
                    value: updateStats[metric.id]?.value || 0,
                  });
                }}
              >
                <FaBeer />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
