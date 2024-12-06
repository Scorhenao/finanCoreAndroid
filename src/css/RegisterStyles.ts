import {StyleSheet} from 'react-native';

export const RegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  formUpContainer: {
    flexDirection: 'column',
    width: 160,
  },
  nameNumberContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
  },
  inputGroup: {
    marginBottom: 15,
    flex: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    height: 40,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    height: 40,
    fontSize: 14,
  },
  recoveryPasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  recoveryPasswordText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
