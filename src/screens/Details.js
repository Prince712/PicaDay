import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import PostItem from '../components/PostItem';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {updateCaption} from '../actions';

export default function Details({route, navigation}) {
  let todaysPost = false;
  let {item} = route.params;
  let cap = item ? item.caption : '';
  const [caption, setcaption] = useState(cap);
  let currentDate = moment(new Date()).format('YYYY-MM-DD');

  const dispatch = useDispatch();

  const UpdateCaption = params => dispatch(updateCaption(params));

  if (item && item.post_date == currentDate) {
    todaysPost = true;
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(caption);
      // update caption..
      let params = {
        post_id: item.post_id,
        caption: caption,
      };
      UpdateCaption(params);
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [caption]);

  return (
    <View>
      <PostItem item={item} />
      {/* caption  view*/}
      <View style={styles.captionContainer}>
        {todaysPost ? (
          <TextInput
            style={{}}
            numberOfLines={5}
            multiline={true}
            placeholder="Type your thoughts..."
            value={caption}
            onChangeText={e => setcaption(e)}
          />
        ) : (
          <Text style={{fontSize: 18, color: '#6C6C6C'}}>{item.caption}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  captionContainer: {
    paddingHorizontal: 18,
    paddingTop: 20,
  },
});
