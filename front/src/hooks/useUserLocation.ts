import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';

export default function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.63294,
    longitude: 127.121086,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, []);

  return {userLocation, isUserLocationError};
}
