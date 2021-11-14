import React from 'react';
import {View, Text, StyleSheet, Button, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import PostItem from '../components/PostItem';
export default function Home({navigation}) {
  const Posts = useSelector(state => state.posts.data);

  if(Posts.length == 0){
    return(
     <View  style={styles.emptyContainer}>
       <Text style ={styles.emptyText}>You haven't clicked any picture yet! {"\n"} Try capturing your moment of the day :-)</Text>
     </View>
    )
   }
 
  return (
    <View style={styles.container}>
      <FlatList
        style={{}}
        data={Posts}
        renderItem={item => PostItem(item,{navigation})}
        keyExtractor={item => item.post_id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
emptyContainer:{
  flex: 1,
  justifyContent:'center', 
  alignItems: 'center',
},
emptyText:{
  textAlign:'center',
  color:'#6C6C6C'
}


});
