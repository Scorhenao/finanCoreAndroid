import React from 'react';
import {View, Text} from 'react-native';
import {BarChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';

interface BarChartData {
  month: string;
  [key: string]: number | string;
}

interface BarChartProps {
  data: BarChartData[];
  keys: readonly string[];
  colors: string[];
}

const BarChartComponent: React.FC<BarChartProps> = ({data, keys, colors}) => {
  const formattedData = data
    .map(item =>
      keys.map((key, index) => {
        const total = keys.reduce((sum, k) => sum + (item[k] as number), 0);
        const percentage = total ? ((item[key] as number) / total) * 100 : 0;

        return {
          value: percentage,
          svg: {fill: colors[index]},
          key: `${item.month}-${key}`,
        };
      }),
    )
    .flat();

  const xAxisLabels = data.map(item => item.month);

  return (
    <View style={{flex: 1, marginVertical: 20, backgroundColor: 'transparent'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        {keys.map((key, index) => (
          <View
            key={key}
            style={{
              flexDirection: 'row',
              marginRight: 15,
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: colors[index],
                marginRight: 5,
              }}
            />
            <Text style={{color: 'gray', fontSize: 12}}>{key}</Text>
          </View>
        ))}
      </View>

      <View style={{height: 300, flexDirection: 'row'}}>
        <YAxis
          data={formattedData.map(d => d.value)}
          contentInset={{top: 20, bottom: 20}}
          svg={{fontSize: 12, fill: 'gray'}}
          formatLabel={value => `${Math.round(value)}%`}
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
            contentInset={{left: 50, right: 50}}
            svg={{fontSize: 12, fill: 'gray'}}
          />
        </View>
      </View>
    </View>
  );
};

export default BarChartComponent;
