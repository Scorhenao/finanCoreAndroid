import {StyleSheet} from 'react-native';

export const BudgetsStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    elevation: 2,
    marginHorizontal: 5,
    transition: 'background-color 0.2s',
  },
  iconButtonPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  detailsContainer: {
    marginTop: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: '#ddd',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
  },
  categoryContainer: {
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 8,
    padding: 8,
  },
  transactionButtonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  transactionButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  transactionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
