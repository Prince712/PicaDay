import React from 'react';
import {View, Text} from 'react-native';

export default function PostItem({item}) {
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
}
