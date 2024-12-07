import {StyleSheet} from 'react-native';

export const LoadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  animatedContainer: {
    transform: [{rotate: '0deg'}],
  },
  icon: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#45725c',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#555',
  },
});
