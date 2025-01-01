import React, {useEffect, useRef, useState} from 'react';
import {Alert, Image, Pressable, StyleSheet, View} from 'react-native';
import MapView, {
  Callout,
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {alerts, colors, mapNavigations} from '~/constants';
import {MapStackParamList} from '~/navigations/stack/MapStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainDrawerParamList} from '~/navigations/drawer/MainDrawerNavigator';
import useUserLocation from '~/hooks/useUserLocation';
import usePermission from '~/hooks/usePermission';
import mapStyle from '~/style/mapStyle';
import CustomMarker from '~/components/CustomMarker';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const mapRef = useRef<MapView | null>(null);
  const {userLocation, isUserLocationError} = useUserLocation();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();
  usePermission('LOCATION');

  useEffect(() => {
    if (selectLocation) {
      console.log(selectLocation);
    } else {
      console.log('없음');
    }
  }, [selectLocation]);

  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
  };

  const handlePressAddPost = () => {
    if (!selectLocation) {
      return Alert.alert(
        alerts.NOT_SELETED_LOCATION.TITLE,
        alerts.NOT_SELETED_LOCATION.DESCRIPTION,
      );
    }

    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectLocation,
    });
    setSelectLocation(null);
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      console.log('권한 없어서 안돼');
      // usePermission('LOCATION');
      return;
    }

    mapRef.current?.animateToRegion({
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        onLongPress={handleLongPressMapView}>
        <CustomMarker
          color="BLUE"
          score={1}
          coordinate={{
            latitude: 37.63294,
            longitude: 127.121086,
          }}
        />
        {selectLocation && (
          <Callout>
            <Marker tracksViewChanges={false} coordinate={selectLocation} />
          </Callout>
        )}
      </MapView>
      <Pressable
        style={[styles.drawerButton, {top: inset.top || 20}]}
        onPress={() => navigation.openDrawer()}>
        <Image source={require('~/assets/menu.png')} />
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressAddPost}>
          <Image source={require('~/assets/add.png')} resizeMode="contain" />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <Image
            source={require('~/assets/my-location.png')}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    top: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    elevation: 4,
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
  },
});

export default MapHomeScreen;
