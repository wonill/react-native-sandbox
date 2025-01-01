import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import RootNavigator from './src/navigations/root/RootNavigator';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import {setCustomText} from 'react-native-global-props';

function App(): React.JSX.Element {
  useEffect(() => {
    const customTextProps = {
      style: {
        // fontFamily: 'SUIT-Regular',
        fontSize: 14,
      },
    };
    setCustomText(customTextProps);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
