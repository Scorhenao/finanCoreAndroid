import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const EarningsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Header */}
      <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
        <Text style={styles.headerText}>Salary of Globant</Text>
        <Icon
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#000"
        />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {isOpen && (
        <View style={styles.menu}>
          {/* Free Salary */}
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Free Salary: 10000</Text>
          </View>

          {/* Add Budget */}
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="add-circle-outline" size={20} color="#000" />
            <Text style={styles.menuText}>Add Budget</Text>
          </TouchableOpacity>

          {/* See More */}
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="ellipsis-horizontal" size={20} color="#000" />
            <Text style={styles.menuText}>See More</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
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
  menuText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 10,
  },
});

export default EarningsDropdown;
