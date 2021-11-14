import React from 'react';
import {View, Text,StyleSheet} from 'react-native';
import PostItem from '../components/PostItem';

export default function Details({ route, navigation }) {
    
  let {item}  = route.params;
  return (
    <View>
      <PostItem item={item} />
      {/* caption  view*/}
      <View style={styles.captionContainer}>
              <Text style={{fontSize:18,color:'#6C6C6C'}}>{item.caption}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  captionContainer :{
    paddingHorizontal:18,
    paddingTop:20
  }
})