import React from 'react';
import {StyleSheet} from 'react-native';
import useAuth from '~/hooks/queries/useAuth';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

function MapHomeScreen({}) {
  const {logoutMutation} = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate(null);
  };
  return <MapView style={styles.container} provider={PROVIDER_GOOGLE} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapHomeScreen;
