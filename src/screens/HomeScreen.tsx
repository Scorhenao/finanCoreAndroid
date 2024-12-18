import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EarningsDropdown from '../components/EarningsDropdown';
import {useTheme} from '../context/ThemeContext';
import Wallet from '../components/Wallet';
import Loading from '../components/loading';
import {useEarnings} from '../hooks/useEarnings';
import BarChartComponent from '../components/BarChartComponent';
import {useUser} from '../hooks/useUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decryptToken} from '../common/utils/tokenUtils';

const HomeScreen = ({navigation}: any) => {
  const {theme} = useTheme();
  const {earnings, fetchEarnings, loading, error} = useEarnings();
  const {user, getUserById, loading: userLoading, error: userError} = useUser();
  const [userImage, setUserImage] = useState<string | null>(null);
  const getUserIdFromToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token && token !== null) {
        const decoded = decryptToken(token);
        const userId = decoded?.userId;

        if (userId) {
          getUserById(userId);
        } else {
          console.error('User ID not found in token');
        }
      } else {
        console.error('Token is invalid or not found');
      }
    } catch (err: any) {
      console.error('Error getting user ID from token:', err.message);
    }
  };

  useEffect(() => {
    fetchEarnings();
    setUserImage(null);
    getUserIdFromToken();
  }, [fetchEarnings]);

  useEffect(() => {
    if (user) {
      setUserImage(user?.profilePicture || null);
    }
  }, [user]);

  useEffect(() => {
    if (userError) {
      console.error(userError);
    }
  }, [userError]);

  if (loading || userLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={[{backgroundColor: theme.colors.backgrounds}]}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (userError) {
    return (
      <View style={[{backgroundColor: theme.colors.backgrounds}]}>
        <Text>Error fetching user data: {userError}</Text>
      </View>
    );
  }

  const earningsData = Array.isArray(earnings) ? earnings : earnings?.data;

  const formattedData = Array.isArray(earningsData)
    ? earningsData.map(item => {
        const budgeted =
          parseFloat(item.amountBudgeted.replace(/[^0-9.]/g, '')) || 0;
        const available =
          parseFloat(item.generalAmount.replace(/[^0-9.]/g, '')) || 0;
        const amountAvailable = available - budgeted;

        return {
          month: item.name,
          budgeted,
          available,
          amountAvailable,
        };
      })
    : [];

  const totalBudgeted = formattedData.reduce(
    (acc, item) => acc + item.budgeted,
    0,
  );
  const totalAvailable = formattedData.reduce(
    (acc, item) => acc + item.available,
    0,
  );

  const totalData = [
    {
      month: 'Total',
      budgeted: totalBudgeted,
      available: totalAvailable,
      amountAvailable: totalAvailable - totalBudgeted,
    },
  ];

  const keys = ['budgeted', 'available'];
  const colors = [theme.colors.hovers, theme.colors.buttons];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        {backgroundColor: theme.colors.backgrounds},
      ]}>
      <View style={styles.profileContainer}>
        {userImage ? (
          <Image
            source={{uri: userImage}}
            style={[styles.profileImage, {borderColor: theme.colors.texts}]}
          />
        ) : (
          <Icon
            name="person-circle-outline"
            size={150}
            color={theme.colors.texts}
          />
        )}
      </View>

      {Array.isArray(earningsData) && earningsData.length > 0 ? (
        <>
          <Wallet data={formattedData} />
          <BarChartComponent data={totalData} keys={keys} colors={colors} />
        </>
      ) : (
        <Text>No earnings available</Text>
      )}

      <View style={{marginBottom: 20}}>
        <EarningsDropdown earnings={earningsData} />
      </View>

      <TouchableOpacity
        style={[styles.addButton, {backgroundColor: theme.colors.buttons}]}
        onPress={() => navigation.navigate('AddEarningScreen')}>
        <Icon name="add-circle-outline" size={32} color={theme.colors.texts} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
  },
});

export default HomeScreen;
