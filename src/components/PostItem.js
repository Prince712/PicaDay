import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
export default function PostItem({item}, {navigation}) {
  let date = new Date(item.post_date);
  let month = moment(date, 'M').format('MMM');
  let day = moment(date, 'D').format('DD');
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Details', {item})}
      disabled={!navigation ? true : false}>
      <ImageBackground
        style={styles.imageStyle}
        source={{uri: item.image_path}}>
        <View style={{flex: 1}}>
          <View style={{padding: 10, alignItems: 'center', flexWrap: 'wrap'}}>
            <Text style={styles.month}>{month}</Text>
            <Text style={styles.day}>{day}</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
              }}>
              <View style={styles.textContainer}>
                <Icon name={'ios-pin-outline'} size={15} color={'#ffffff'} />
                <Text style={styles.fontStyle}>{item.location}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.fontStyle,
                    {fontWeight: 'bold', paddingRight: 5},
                  ]}>
                  {item.temperature}&#176;
                </Text>
                <Icon
                  name={'ios-sunny-outline'}
                  size={25}
                  color={'#ffffff'}
                  fontWeight={'bold'}
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageStyle: {
    resizeMode: 'contain',
    width: '100%',
    height: 280,
  },
  textContainer: {flexDirection: 'row', alignItems: 'center'},
  fontStyle: {
    color: '#fff',
  },
  day: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  month: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
