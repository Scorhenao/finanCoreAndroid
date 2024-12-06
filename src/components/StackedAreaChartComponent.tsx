import React from 'react';
import {View} from 'react-native';
import {StackedAreaChart, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

interface StackedAreaChartProps {
  data: {month: number; apples: number; bananas: number}[];
  keys: readonly string[];
  colors: string[];
}

const StackedAreaChartComponent: React.FC<StackedAreaChartProps> = ({
  data,
  keys,
  colors,
}) => {
  return (
    <View style={{width: '90%'}}>
      <StackedAreaChart
        style={{height: 200}}
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
