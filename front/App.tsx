import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';

function App(): React.JSX.Element {
  const [name, setName] = useState('');

  const handleChangeInput = (text: string) => {
    setName(text);
  };
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text>이름</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={handleChangeInput}
          />
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    height: 50,
    width: 100,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
});

export default App;
