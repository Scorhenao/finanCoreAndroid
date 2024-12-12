import {StyleSheet} from 'react-native';

export const AppNavigatorStyles = StyleSheet.create({
  logoContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  logoImage: {
    width: 70,
    height: 100,
  },
  headerLeft: {
    marginLeft: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  gradientStyle: {
    flex: 1,
    height: '100%',
  },
  headerStyle: {
    backgroundColor: 'transparent',
    height: 100,
  },
});
