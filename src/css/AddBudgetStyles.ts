import {StyleSheet} from 'react-native';

export const AddBudgetstyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  inputGroup: {
    marginBottom: 20,
    alignItems: 'center',
  },
  inputGroupDates: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  dateText: {
    fontSize: 16,
    marginLeft: 10,
  },
  modifyCategory: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 10,
    marginVertical: 20,
  },
  modifyText: {
    fontSize: 18,
    textAlign: 'center',
  },
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 30,
  },
  budgetText: {
    alignItems: 'center',
    marginTop: 10,
  },
});
