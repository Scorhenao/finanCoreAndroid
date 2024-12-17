import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

interface WalletProps {
  data: {
    month: string;
    budgeted: number;
    available: number;
    amountAvailable: number;
  }[];
}

const Wallet: React.FC<WalletProps> = ({data}) => {
  const {theme} = useTheme();

  const totalAvailable = data.reduce(
    (acc, item) => acc + item.amountAvailable,
    0,
  );

  // No need to call `replace()` on budgeted values since they are numbers now
  const totalBudgeted = data.reduce((acc, item) => acc + item.budgeted, 0);

  const [isOpen, setIsOpen] = useState(false);

  const toggleWallet = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <View style={styles.walletContainer}>
      <TouchableOpacity onPress={toggleWallet}>
        <View
          style={[
            styles.wallet,
            {backgroundColor: theme.colors.buttons},
            isOpen ? styles.walletOpen : styles.walletClosed,
          ]}>
          <View
            style={[
              styles.walletOpening,
              {backgroundColor: theme.colors.backgrounds},
            ]}>
            <Icon
              name={isOpen ? 'wallet' : 'wallet-outline'}
              size={100}
              color={theme.colors.texts}
            />
            <Text style={[styles.walletText, {color: theme.colors.texts}]}>
              {isOpen
                ? 'Total available: ' + totalAvailable.toLocaleString()
                : 'Tap to open wallet'}
            </Text>
            {isOpen && (
              <>
                <Text style={[styles.walletText, {color: theme.colors.texts}]}>
                  Total budgeted: ${totalBudgeted.toLocaleString()}
                </Text>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  walletContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  wallet: {
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  walletClosed: {
    height: 150,
    width: '100%',
    borderRadius: 15,
  },
  walletOpen: {
    height: 200,
    width: '100%',
    borderRadius: 20,
  },
  walletOpening: {
    width: '100%',
    height: '80%',
    borderRadius: 25,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  walletText: {
    fontSize: 18,
    fontWeight: 'bold',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },
});

export default Wallet;
