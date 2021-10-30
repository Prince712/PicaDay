import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FabButton({...props}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={props.onPress}
        activeOpacity={1}>
        <Icon name="add" style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 75,
    alignItems: 'center',
  },
  button: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 27,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 3,
  },
  buttonIcon: {
    fontSize: 25,
    color: '#2FE3BA',
    fontWeight: 'bold',
  },
});
