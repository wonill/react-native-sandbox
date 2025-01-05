import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Image, TextInput} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddPostHeaderRight from '~/components/AddPostHeaderRight';
import CustomButton from '~/components/CustomButton';
import InputField from '~/components/InputField';
import {mapNavigations} from '~/constants';
import useForm from '~/hooks/useForm';
import {MapStackParamList} from '~/navigations/stack/MapStackNavigator';
import {validateAddPost} from '~/utils';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route, navigation}: AddPostScreenProps) {
  const {location} = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const addPost = useForm({
    initialValue: {title: '', description: ''},
    validate: validateAddPost,
  });

  const handleSubmit = () => {};

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value=""
            disabled
            icon={
              <Image
                source={require('~/assets/my-location.png')}
                style={styles.imageCon}
              />
            }
          />
          <InputField
            placeholder="제목을 입력하세요"
            error={addPost.errors.title}
            touched={addPost.touched.title}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요 (선택)"
            error={addPost.errors.description}
            touched={addPost.touched.description}
            multiline
            secureTextEntry
            returnKeyType="next"
            {...addPost.getTextInputProps('description')}
          />
        </View>
        <CustomButton variant="outlined" size="large" label="날짜 선택" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  imageCon: {
    width: 16,
    height: 16,
  },
});

export default AddPostScreen;
