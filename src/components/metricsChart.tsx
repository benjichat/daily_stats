// utils
import { ResponsiveRadar } from '@nivo/radar'

interface MetricsChartProps {
  mydata: {
    metric: string;
    dailystat: number;
  }[] | [];
}

export const MetricsChart: React.FC<MetricsChartProps> = ({ mydata }) => {

  if (mydata.length === 0) {
    return <p>Loading chart...</p>;
  }

  return (

    <ResponsiveRadar
      data={mydata}
      keys={['dailystat']}
      indexBy="metric"
      valueFormat=".0f"
      margin={{
        top: 40,
        right: 80,
        bottom: 40,
        left: 80,
      }}
      borderColor={{ from: 'color' }}
      gridLabelOffset={36}
      dotSize={10}
      dotColor={{ theme: 'background' }}
      dotBorderWidth={2}
      colors={{ scheme: 'nivo' }}
      blendMode="multiply"
      motionConfig="wobbly"
    />
  )
}