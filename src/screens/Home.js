import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import PostItem from '../components/PostItem';
export default function Home({navigation}) {
  // const [Posts, setPosts] = useState([]);
  const Posts = useSelector(state => state.posts.data);
  console.log(Posts);
  return (
    <View style={styles.container}>
      <FlatList
        style={{}}
        data={Posts}
        renderItem={item => PostItem(item,{navigation})}
        keyExtractor={item => item.post_id}
      />
      {/* <Text>I am home screen</Text>
      <Button title='Go to details'
       onPress={()=>navigation.navigate('Details')}
        /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
