//types
import { type Metric } from '@prisma/client';

// utils
import { FaBeer } from 'react-icons/fa';


interface MetricsInputFormProps {
  metricsData: Metric[] | [];
  statsData: StatsDict;
  searchDate: Date;
  onCreateStat: (data: { date: Date; metricId: number; value: number }) => void;
  setUpdateStats: (stats: StatsDict) => void;
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


export const MetricsInputForm: React.FC<MetricsInputFormProps> = ({ metricsData, statsData, searchDate, onCreateStat, setUpdateStats }) => {

  return (
    <table className="w-full">
      <tbody>
        {metricsData?.map((metric) => (
          <tr key={metric.id}>
            <td className="w-2/4 px-4 py-3 text-center">{metric.name}</td>
            <td className="w-2/4 px-4 py-3">
              <input
                type="number"
                className="input-bordered input input-sm w-full"
                value={statsData[metric.id]?.value || 0}
                onChange={(e) => {
                  setUpdateStats({
                    ...statsData,
                    [metric.id]: {
                      ...(statsData[metric.id]),
                      value: parseInt(e.currentTarget.value, 10),
                    },
                  });
                  onCreateStat({
                    date: searchDate,
                    metricId: metric.id,
                    value: parseInt(e.currentTarget.value, 10),
                  });
                }}
              />
            </td>
            <td className="p-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  onCreateStat({
                    date: searchDate,
                    metricId: metric.id,
                    value: statsData[metric.id]?.value || 0,
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
