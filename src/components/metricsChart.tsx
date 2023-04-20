import { ResponsiveRadar } from '@nivo/radar'


export const MetricsChart = () => {

  const mydata = [
    {
      "taste": "Health",
      "chardonay": 36,
    },
    {
      "taste": "Family",
      "chardonay": 45,
    },
    {
      "taste": "Sleep",
      "chardonay": 95,
    }
  ]

  return (

    <ResponsiveRadar
      data={mydata}
      keys={['chardonay']}
      indexBy="taste"
      valueFormat=">-.2f"
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
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