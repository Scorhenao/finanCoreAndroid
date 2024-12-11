import React, {useState} from 'react';
import {ScrollView, RefreshControl, StyleSheet} from 'react-native';

const withPullToRefresh = WrappedComponent => {
  return props => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
      setRefreshing(true);

      if (props.onRefresh) {
        props.onRefresh();
      }

      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    };

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <WrappedComponent {...props} />
      </ScrollView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withPullToRefresh;
