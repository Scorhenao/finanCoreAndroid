import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useEarnings} from '../hooks/useEarnings';
import {useAuthContext} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import Loading from './loading';
import BarChartComponent from './BarChartComponent';
import {Earning} from '../common/interfaces/earning.interface';
import {useTheme} from '../context/ThemeContext';

const EarningsDropdown = () => {
  const {theme} = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const {token} = useAuthContext();
  const {earnings, loading, error, fetchEarnings} = useEarnings();
  const navigation = useNavigation();

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

  if (!Array.isArray(earnings?.data) || earnings.data.length === 0) {
    return <Text style={styles.errorText}>No earnings available</Text>;
  }

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSeeMore = (earning: Earning) => {
    navigation.navigate('SeeMoreEarningScreen', {earning});
  };

  return (
    <View style={styles.container}>
      {earnings.data.map((earning: Earning, index: number) => {
        const amountBudgeted = parseFloat(
          earning.amountBudgeted.replace(/[^0-9.-]+/g, ''),
        );
        const generalAmount = parseFloat(
          earning.generalAmount.replace(/[^0-9.-]+/g, ''),
        );

        const freeSalary = generalAmount - amountBudgeted;

        const chartData = [
          {
            month: earning.name,
            budgeted: amountBudgeted,
            available: generalAmount,
            amountAvailable: freeSalary,
          },
        ];

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
                  <Text
                    style={[styles.menuText, freeSalary < 0 && styles.debtText]}>
                    Free Salary:{' '}
                    {freeSalary.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'COP',
                    })}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.menuItemSeeMore}
                  onPress={() => handleSeeMore(earning)}>
                  <Text style={styles.menuText}>See More</Text>
                  <Icon name="ellipsis-horizontal" size={20} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItemAddBudget}
                  onPress={() =>
                    navigation.navigate('AddBudgetScreen', {
                      earningId: earning.id,
                      amountAvailable: freeSalary,
                      earningName: earning.name,
                    })
                  }>
                  <Icon name="add" size={24} color="#000" />
                  <Text style={styles.menuText}>Add Budget</Text>
                </TouchableOpacity>

                <BarChartComponent
                  data={chartData}
                  keys={['budgeted', 'available']}
                  colors={[theme.colors.hovers, theme.colors.buttons]}
                />
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
  menuItemAddBudget: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemSeeMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },
  menuText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 10,
  },
  debtText: {
    color: 'red',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default EarningsDropdown;
