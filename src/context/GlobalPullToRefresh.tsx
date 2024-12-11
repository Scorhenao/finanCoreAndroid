import React, {useState, createContext, useContext} from 'react';
import {ScrollView, RefreshControl, StyleSheet} from 'react-native';

const RefreshContext = createContext({
  refreshing: false,
  onRefresh: () => {},
});

export const RefreshProvider = ({children, onGlobalRefresh}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    if (onGlobalRefresh) {
      await onGlobalRefresh();
    }

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <RefreshContext.Provider value={{refreshing, onRefresh}}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {children}
      </ScrollView>
    </RefreshContext.Provider>
  );
};

export const useGlobalRefresh = () => useContext(RefreshContext);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
