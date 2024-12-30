import {createDrawerNavigator} from '@react-navigation/drawer';
import MapHomeScreen from '~/screens/map/MapHomeScreen';
import FeedHomeScreeen from '~/screens/feed/FeedHomeScreen';
import CalendarHomeScreen from '~/screens/calendar/CalendarHomeScreen';
import MapStackNavigator from '../stack/MapStackNavigator';

const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="MapHome"
        component={MapStackNavigator}
        options={{
          title: '홈',
        }}
      />
      <Drawer.Screen
        name="FeedHome"
        component={FeedHomeScreeen}
        options={{
          title: '피드',
        }}
      />
      <Drawer.Screen
        name="CalendarHome"
        component={CalendarHomeScreen}
        options={{
          title: '캘린더',
        }}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
