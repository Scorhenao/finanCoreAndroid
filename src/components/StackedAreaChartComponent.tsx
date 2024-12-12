import React from 'react';
import {View, Text} from 'react-native';
import {StackedAreaChart, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

interface StackedAreaChartProps {
  data: {month: string; [key: string]: number}[];
  keys: readonly string[];
  colors: string[];
}

const StackedAreaChartComponent: React.FC<StackedAreaChartProps> = ({
  data,
  keys,
  colors,
}) => {
  console.log('Chart Data:', data);

  const hasZeroBudgeted = data.some(item => item.budgeted === 0);

  return (
    <View style={{width: '100%', height: 250}}>
      {hasZeroBudgeted && (
        <Text style={{textAlign: 'center', color: 'gray', marginBottom: 10}}>
          Budgeted amount is zero
        </Text>
      )}
      <StackedAreaChart
        style={{flex: 1}}
        data={data}
        keys={keys}
        colors={colors}
        contentInset={{top: 30, bottom: 30}}
        curve={shape.curveNatural}>
        <Grid />
      </StackedAreaChart>
    </View>
  );
};

export default StackedAreaChartComponent;
