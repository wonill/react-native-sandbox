import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  Permission,
  RESULTS,
} from 'react-native-permissions';

// type PermissionType = 'LOCATION' | 'PHOTO';

// type PermissionOSType = {
//   [key in PermissionType]: Permission;
// };

const androidPermission = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //   PHOTO: PERMISSIONS.ANDROID
};

const iosPermission = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
};

function usePermission() {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid
        ? androidPermission.LOCATION
        : iosPermission.LOCATION;

      const checked = await check(permissionOS);
      console.log('checked : ', checked);

      const showPermissionAlert = () => {
        Alert.alert(
          '위치 권한 허용이 필요합니다.',
          '설정 화면에서 위치 권한을 허용해주세요.',
          [
            {
              text: '설정하기',
              onPress: () => Linking.openSettings(),
            },
            {
              text: '취소',
              style: 'cancel',
            },
          ],
        );
      };

      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionAlert();
            return;
          }

          await request(permissionOS);
          break;
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAlert();
          break;
        default:
          break;
      }
    })();
  }, []);
}

export default usePermission;
