import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import {PieChart} from 'react-native-svg-charts';

// Define the types for the selected slice
interface SelectedSlice {
  label: string;
  value: number;
}

// Define the component's state type
interface State {
  selectedSlice: SelectedSlice;
  labelWidth: number;
}

class PieChartWithDynamicSlices extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
    // Initialize state with the correct types
    this.state = {
      selectedSlice: {
        label: '',
        value: 0,
      },
      labelWidth: 0,
    };
  }

  render() {
    const {labelWidth, selectedSlice} = this.state;
    const {label, value} = selectedSlice;
    const keys = ['google', 'facebook', 'linkedin', 'youtube', 'Twitter'];
    const values = [15, 25, 35, 45, 55];
    const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff'];

    const data = keys.map((key, index) => {
      return {
        key,
        value: values[index],
        svg: {fill: colors[index]},
        arc: {
          outerRadius: 90 + values[index] + '%', // Increased outer radius for a bigger circle
          padAngle: label === key ? 0.1 : 0,
        },
        onPress: () =>
          this.setState({selectedSlice: {label: key, value: values[index]}}),
      };
    });

    const deviceWidth = Dimensions.get('window').width;

    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <PieChart
          style={{height: 500}} // You can increase this if you want more height
          outerRadius={'90%'} // Adjusted to make the chart larger
          innerRadius={'45%'}
          data={data}
        />
        <Text
          onLayout={({
            nativeEvent: {
              layout: {width},
            },
          }) => {
            this.setState({labelWidth: width});
          }}
          style={{
            left: deviceWidth / 2 - labelWidth / 2,
            textAlign: 'center',
          }}>
          {`${label} \n ${value}`}
        </Text>
      </View>
    );
  }
}

export default PieChartWithDynamicSlices;
