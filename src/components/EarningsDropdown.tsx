import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useEarnings} from '../hooks/useEarnings';
import {useAuthContext} from '../context/AuthContext';
import Loading from './loading';

interface Earning {
  id: string;
  name: string;
  amountBudgeted: string;
  generalAmount: string;
}

const EarningsDropdown = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const {token} = useAuthContext();
  const {earnings, loading, error, fetchEarnings} = useEarnings();

  useEffect(() => {
    if (token) {
      fetchEarnings();
    }
  }, [token, fetchEarnings]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  console.log('Los earnings cargados son: ', earnings);

  if (!Array.isArray(earnings?.data) || earnings.data.length === 0) {
    return <Text style={styles.errorText}>No earnings available</Text>;
  }

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleAddBudget = () => {
    console.log('Adding budget...');
  };

  return (
    <View style={styles.container}>
      {earnings.data.map((earning: Earning, index) => {
        // Asegúrate de convertir a números los valores
        const amountBudgeted = parseFloat(
          earning.amountBudgeted.replace(/[^0-9.-]+/g, ''),
        );
        const generalAmount = parseFloat(
          earning.generalAmount.replace(/[^0-9.-]+/g, ''),
        );

        // Calcular el salario libre
        const freeSalary = generalAmount - amountBudgeted;

        return (
          <View key={earning.id} style={styles.earningItem}>
            <TouchableOpacity
              style={styles.header}
              onPress={() => toggleDropdown(index)}>
              <Text style={styles.headerText}>{earning.name}</Text>
              <Icon
                name={openIndex === index ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#000"
              />
            </TouchableOpacity>

            {openIndex === index && (
              <View style={styles.menu}>
                <View style={styles.menuItem}>
                  <Text style={styles.menuText}>
                    Free Salary:{' '}
                    {freeSalary.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'COP',
                    })}
                  </Text>
                </View>

                {token && (
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={handleAddBudget}>
                    <Icon name="add-circle-outline" size={20} color="#000" />
                    <Text style={styles.menuText}>Add Budget</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.menuItemSeeMore}>
                  <Text style={styles.menuText}>See More</Text>
                  <Icon name="ellipsis-horizontal" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  earningItem: {
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 16,
    color: '#000',
  },
  menu: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuItemSeeMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  menuText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  infoText: {
    color: '#666',
    textAlign: 'center',
  },
});

export default EarningsDropdown;
