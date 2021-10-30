import React from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToList} from '../actions';

export default function AddPost() {
  const dispatch = useDispatch();
  const AddPost = item => dispatch(addToList(item));
  return (
    <View>
      <Text> i am camera !! click pic</Text>
      <Button title={'Add items'} onPress={() => AddPost({name: 'Thor'})} />
    </View>
  );
}
