import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
export default function Info() {
  const Posts = useSelector(state => state.posts.data);
  const installedOn = useSelector(state => state.posts.installDate);
  const maxTemp = useSelector(state => state.posts.maxTemp);
  const minTemp = useSelector(state => state.posts.minTemp);

  let recodedDays = Posts.length;
  let today = moment(new Date());
  let installDate = moment(new Date(installedOn));
  let totalDays = today.diff(installDate, 'days');
  totalDays = totalDays + 1;
  let mx_dateString = maxTemp
    ? moment(new Date(maxTemp.post_date)).format('ddd MMM D, YYYY')
    : '';
  let min_dateString = minTemp
    ? moment(new Date(minTemp.post_date)).format('ddd MMM D, YYYY')
    : '';

   


  const Devider = () => {
    return (
      <View
        style={{width: '95%', height: 1, margin: 10, backgroundColor: '#ccc'}}
      />
    );
  };

  if(Posts.length == 0){
    return(
     <View  style={[styles.container,{justifyContent:'center'}]}>
       <Text style ={styles.emptyText}>You haven't clicked any picture yet! {"\n"} Try capturing your moment of the day :-)</Text>
     </View>
    )
   }

  return (
    <View style={styles.container}>
      <View style={styles.daysContainer}>
        <Text style={styles.titleText}>Days</Text>
        <Text style={styles.centerText}>
          {recodedDays}/{totalDays}
        </Text>
        <Text>You have recorded {recodedDays} days since the first day</Text>
      </View>

      <Devider />

      <View style={styles.daysContainer}>
        <Text style={styles.titleText}>Hottest day</Text>
        <Text style={styles.centerText}>
          {maxTemp.temperature ? maxTemp.temperature : 0}&#176;
        </Text>
        <Text>{mx_dateString}</Text>
      </View>

      <Devider />

      <View style={styles.daysContainer}>
        <Text style={styles.titleText}>Coldest day</Text>
        <Text style={styles.centerText}>
          {minTemp.temperature ? minTemp.temperature : 0}&#176;
        </Text>
        <Text>{min_dateString}</Text>
      </View>
      <Devider />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  daysContainer: {
    alignItems: 'center',
    paddingTop: 15,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6C6C6C',
  },
  centerText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#314743',
  },
  emptyText:{
    textAlign:'center',
    color:'#6C6C6C'
  }
});
