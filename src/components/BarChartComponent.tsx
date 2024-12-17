import React from 'react';
import {View} from 'react-native';
import {BarChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';

interface BarChartData {
  month: string;
  [key: string]: number | string; // Permitir strings solo para la clave `month`
}

interface BarChartProps {
  data: BarChartData[];
  keys: readonly string[];
  colors: string[];
}

const BarChartComponent: React.FC<BarChartProps> = ({data, keys, colors}) => {
  // Reformatear datos en una estructura plana
  const formattedData = data
    .map(item =>
      keys.map((key, index) => ({
        value: item[key] as number,
        svg: {fill: colors[index]},
        key: `${item.month}-${key}`, // Clave única para cada barra
      })),
    )
    .flat(); // Aplanar el array para pasarlo correctamente al BarChart

  const xAxisLabels = data.map(item => item.month);

  return (
    <View style={{height: 300, flexDirection: 'row', marginVertical: 20}}>
      <YAxis
        data={formattedData.map(d => d.value)}
        contentInset={{top: 20, bottom: 20}}
        svg={{fontSize: 12, fill: 'gray'}}
      />
      <View style={{flex: 1, marginLeft: 10}}>
        <BarChart
          style={{flex: 1}}
          data={formattedData}
          yAccessor={({item}) => item.value}
          contentInset={{top: 20, bottom: 20}}
          spacingInner={0.2}>
          <Grid />
        </BarChart>
        <XAxis
          style={{marginTop: 10}}
          data={xAxisLabels}
          formatLabel={(value, index) => xAxisLabels[index]}
          contentInset={{left: 10, right: 10}}
          svg={{fontSize: 12, fill: 'gray'}}
        />
      </View>
    </View>
  );
};

export default BarChartComponent;
