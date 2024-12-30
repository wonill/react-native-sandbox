import React from 'react';
import {StyleSheet} from 'react-native';
import useAuth from '~/hooks/queries/useAuth';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

// type Navigation = CompositeNavgationProp<
//   StackNavigationProp<MapStackParamList>,
//   DrawerNavigationProp<MainDrawerParamList>
// >

function MapHomeScreen({}) {
  const inset = useSafeAreaInsets();
  const {logoutMutation} = useAuth();
  const navigation = useNavigation<Navigation>();

  const handleLogout = () => {
    logoutMutation.mutate(null);
  };
  return (
    <MapView
      style={styles.container}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      followsUserLocation
      showsMyLocationButton
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapHomeScreen;
