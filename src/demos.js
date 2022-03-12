import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class ChatDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      Data: [],
    };
  }

  renderItem({item}) {
    console.log(item);

    let chatItem = item.user == 1 ? styles.leftText : styles.rightText;

    return (
     item.user == 1 ? <View style={{flexDirection:'row',alignItems:'flex-end'}}>
           <Icon name='ios-person-circle' size={18} color={'#fff'} />
        <View style={chatItem}>
          
                <Text       
                style={{
                    color: item.user == 1 ? '#fff' : '#000',
                    fontWeight: '500',           
                    justifyContent:'flex-start',
                    flexShrink: 1
                }}>
                {item.text}
        </Text>
      </View>

     </View>
      :
      <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
          <View style={{flexDirection: 'row',}}>          
            <View style={chatItem}>        
                <Text       
                style={{
                    color: item.user == 1 ? '#fff' : '#000',
                    fontWeight: '500',           
                    justifyContent:'flex-start',
                    flexShrink: 1
                }}>
                {item.text}
                </Text>           
            
            </View>
            <View style={{justifyContent:'flex-end'}}>
             <Icon name='ios-person-circle' size={18} color={'#fff'}   />
           </View> 
    </View>
      </View>
    );
  }

  handleButtonPress(user) {
    let {Data,text} = this.state;
    if(text == ''){
        return;
    }
    if (user == 'user1') {
      let item = {user: 1, text: this.state.text};
      Data.push(item);
      this.setState({Data});
    } else {
      let item = {user: 0, text: this.state.text};
      Data.push(item);
      this.setState({Data});
    }

    this.setState({text: ''});
  }

  render() {
    const {text, Data} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <FlatList
            ref={ref => this.flatList = ref}
            style={{backgroundColor: '#000', padding: 5}}
            data={Data}
            renderItem={this.renderItem}
            keyExtractor={item => `key${Math.random()}`}
            onContentSizeChange={()=>{
                this.flatList.scrollToEnd();
            }}
            
          />

          {/* //bottom menu */}
          <View style={styles.bottomContainer}>
            <Button
              title="User 1"
              onPress={() => this.handleButtonPress('user1')}
            />

            <TextInput
              style={{
                borderWidth: 1,
                borderBottomColor: '#000',
                flex: 1,
                borderRadius: 10,
                padding: 2,
                marginVertical: 5,
                backgroundColor: '#fff',
              }}
              value={text}
              onChangeText={v => this.setState({text: v})}
            />
            <Button
              title="User 2"
              onPress={() => this.handleButtonPress('user2')}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  bottomContainer: {
    flexDirection: 'row',
    // backgroundColor:'grey',
    justifyContent: 'space-between',
  },
  rightText: {
    // textAlign: 'right',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    borderBottomRightRadius: 0,
    marginRight: 5,
    marginBottom: 3,
    marginLeft: 40,
    marginTop: 5,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems:'center'
  },
  leftText: {   
    alignSelf: 'flex-start',
    backgroundColor: 'blue',
    marginRight: 40,
    padding: 15,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    marginLeft: 5,
    marginBottom: 3,
    marginTop: 5,
    flexDirection: 'row',
    alignItems:'center'
  },
});

export default ChatDemo;
