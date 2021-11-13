import React from 'react';
import {View, Text, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default function PostItem({item},{navigation}) {
  return (
    <TouchableOpacity style={styles.container} onPress ={ ()=> navigation.navigate('Details')} disabled={!navigation ? true : false }>
      <ImageBackground
        style={styles.imageStyle}
        source={{uri: item.image_path}}>        
        <View style={{flex:1,justifyContent: 'flex-end',}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
            }}>
            <View style={styles.textContainer}>
              <Icon name={'ios-pin-outline'} size={15} color={"#ffffff"}/>
              <Text style={styles.fontStyle}>{item.location}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.fontStyle,{fontWeight:'bold',paddingRight:5}]}>{item.temperature} &#176;</Text>
              <Icon name={'ios-sunny-outline'} size={25} color={"#ffffff"}  fontWeight={'bold'}/>
            </View>
          </View>
        </View>

      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:{

  },
  imageStyle: {
    resizeMode: 'contain',
    width: '100%',
    height: 280,
  },
  textContainer:{flexDirection: 'row', alignItems: 'center'},
  fontStyle:{
    // fontSize:15,
    color:'#fff',
  }
})
