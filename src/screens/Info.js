import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
export default function Info() {
  return (
    <View style={styles.container}>
      <Text>I am Info screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
