import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  Permission,
  RESULTS,
} from 'react-native-permissions';

type PermissionType = 'LOCATION' | 'PHOTO';

type PermissionOSType = {
  [key in PermissionType]: Permission;
};

const androidPermission: PermissionOSType = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermission: PermissionOSType = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

const alerts = {
  LOCATION_PERMISSION: {
    TITLE: '위치 권한 허용이 필요합니다.',
    DESCRIPTION: '설정 화면에서 위치 권한을 허용해주세요.',
  },
  PHOTO_PERMISSION: {
    TITLE: '사진 권한 허용이 필요합니다.',
    DESCRIPTION: '설정 화면에서 사진 권한을 허용해주세요.',
  },
};

function usePermission(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid
        ? androidPermission[type]
        : iosPermission[type];

      const checked = await check(permissionOS);
      console.log('checked : ', checked);

      const showPermissionAlert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
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
