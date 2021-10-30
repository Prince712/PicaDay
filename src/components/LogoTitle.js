import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function LogoTitle({type = 'logo'}) {
  let containerStyle = type && type === 'splash' ? styles.splashScreen : {};
  return (
    <View style={containerStyle}>
      <Text style={[styles.mainText, styles.pic]}>
        pic<Text style={[styles.mainText, styles.a]}>a</Text>
        <Text style={[styles.mainText, styles.day]}>day</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontWeight: '700',
    fontSize: 20,
  },
  pic: {
    color: '#314743',
  },
  a: {
    color: '#6C6C6C',
    fontWeight: '600',
  },
  day: {
    color: '#2FE3BA',
  },
});
