import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  ImageBackground,
  Platform,
  PermissionsAndroid,
  Alert,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
// import {useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import {addToList, updateImagePath, updateCaption} from '../actions';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {API_KEY_WEATHER} from '../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import PostItem from '../components/PostItem';

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      imagepath: null,
      temperature: 0,
      cityName: '',
      countryName: '',
      post_id: null,
      caption: '',
      typing: false,
      typingTimeout: 0,
    };

    this.checkPermission = this.checkPermission.bind(this);
    this.takeImageFromCamera = this.takeImageFromCamera.bind(this);
    this.moveImageToLocation = this.moveImageToLocation.bind(this);
    this.AddImagetoFolder = this.AddImagetoFolder.bind(this);
    this.AddPostToList = this.AddPostToList.bind(this);
    this.getGeolocation = this.getGeolocation.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.setTemp = this.setTemp.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.UpdateImage = this.UpdateImage.bind(this);
    this.changeCaption = this.changeCaption.bind(this);
    this.updateCaption = this.updateCaption.bind(this);
  }

  componentDidMount() {
    this.checkPermission();
  }

  takeImageFromCamera = () => {
    ImagePicker.openCamera({
      // width: 500,
      // height: 500,
      // compressImageMaxWidth: 500,
      // compressImageMaxHeight: 400,
      cropping: true,
      freeStyleCropEnabled: true,
      includeBase64: true,
    })
      .then(image => {
        console.log(image);

        try {
          this.moveImageToLocation(image);
        } catch (e) {
          console.log('erro moving', e);
        }
      })
      .catch(e => {
        console.log('error camera', e);
        this.props.navigation.goBack();
      });
  };
  moveImageToLocation = image => {
    let PictureDir = RNFetchBlob.fs.dirs.PictureDir;
    // const fileName = moment(new Date()).format('YYYY-MM-DD');
    let img = this.randomString();
    const fileName = `img_${img}`;
    // const folderPath ='/storage/emulated/0/picaday';
    const extension = image.path.split('.').pop();
    const folderPath = `${PictureDir}/picaday`;
    const filePath = `${folderPath}/${fileName}.${extension}`;

    RNFetchBlob.fs.isDir(folderPath).then(isDir => {
      if (isDir) {
        this.AddImagetoFolder(image, filePath);
      } else {
        RNFetchBlob.fs
          .mkdir(folderPath)
          .then(() => {
            this.AddImagetoFolder(image, filePath);
          })
          .catch(e => {
            // console.log("error creating dir",e);
          });
      }
    });
  };

  AddImagetoFolder = (image, filePath) => {
    RNFetchBlob.fs
      .cp(image.path.toString(), filePath)
      .then(() => {
        let finalPath = `file:///${filePath}`;
        console.log('finalPath', finalPath);
        // setimagepath(path => finalPath);
        // set image path to state
        this.setState({imagepath: finalPath});

        console.log(
          'dasda',
          this.state.imagepath,
          finalPath,
          this.state.post_id,
        );
        if (this.state.post_id != null) {
          this.UpdateImage();
          console.log('innasdasdasdasd', this.props);
          // if photo is retaked then update new image path..
        } else {
          this.AddPostToList();
        }
      })
      .catch(e => {
        // console.log("error moving",e);
      });
  };

  UpdateImage = () => {
    let params = {
      post_id: this.state.post_id,
      image_path: this.state.imagepath,
    };
    try {
      this.props
        .updateImagePath(params)
        .then(res => {
          console.log('done', res);
          // this.setState({loading: false});
        })
        .catch(e => {
          // console.log('error updating image', e);
        });
    } catch (e) {
      // console.log('error image ', e);
    }
  };

  AddPostToList = () => {
    // console.log('adding ,', this.state.imagepath, this.state.temperature);
    const {imagepath, temperature, caption, cityName, countryName} = this.state;
    if (imagepath != null && temperature != 0) {
      try {
        let uniqueNumber = this.randomString();
        this.setState({post_id: `post_${uniqueNumber}`});

        let params = {
          post_id: `post_${uniqueNumber}`,
          image_path: imagepath,
          caption: caption,
          temperature: temperature,
          location: `${cityName},${countryName}`,
          post_date: moment(new Date()).format('YYYY-MM-DD'),
        };
  //call action
        this.props
          .addToList(params)
          .then(res => {
            console.log('done', res);
            this.setState({loading: false});
          })
          .catch(e => {
            console.log('error adding to reducere', e);
          });
      } catch (e) {
        console.log('error adding ', e);
      }
    }
  };

  randomString() {
    const length = 19;
    const chars = '0123456789';
    var result = '';
    for (var i = length; i > 0; --i) {
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
  }

  checkPermission = async () => {
    if (Platform.OS === 'ios') {
      this.takeImageFromCamera();
      this.getGeolocation();
    } else {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]).then(result => {
          if (
            result['android.permission.WRITE_EXTERNAL_STORAGE'] &&
            result['android.permission.READ_EXTERNAL_STORAGE'] &&
            result['android.permission.CAMERA'] &&
            result['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
          ) {
            // setisGrantedPermissions(true);
            this.takeImageFromCamera();
            this.getGeolocation();
          } else if (
            result['android.permission.CAMERA'] ||
            result['android.permission.READ_EXTERNAL_STORAGE'] ||
            result['android.permission.WRITE_EXTERNAL_STORAGE'] ||
            result['android.permission.ACCESS_FINE_LOCATION'] ===
              'never_ask_again'
          ) {
            alert(
              'Please Go into Settings -> Applications -> picaday -> Permissions and Allow permissions to continue',
            );
            this.props.navigation.goBack();
          }
        });
      } catch (err) {
        // To handle permission related exception
        // console.warn(err);
      }
    }
  };
  getGeolocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        let lat = position.coords.latitude ? position.coords.latitude : null;
        let long = position.coords.longitude ? position.coords.longitude : null;
        this.getWeather(lat, long);
        /// call the city name.....
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
        this.props.navigation.goBack();
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  getWeather = async (lat, long) => {
    console.log('call weather');
    if (lat != null && long != null) {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY_WEATHER}`,
        )
        .then(res => {
          console.log('weather', res);
          let temp = res.data.main.temp - 272.15;
          this.setTemp(temp);

          this.getAddress(lat, long);
        })
        .catch(e => {
          console.log(' Weather fetching error', e);
        });
    }
  };

  setTemp = t => {
    let temp = Math.trunc(t * 100 + 0.5);
    let finalTemp = parseInt(temp / 100);
    //set temprature to state
    this.setState({temperature: finalTemp});
    // console.log('temperature', finalTemp);
  };

  getAddress = async (lat, long) => {
    await axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&zoom=18&addressdetails=1`,
      )
      .then(res => {
        console.log('address', res);
        let displayName = res.data.address.county;
        let array = displayName.split(' ');
        let City = array[0];
        let country = res.data.address.country;
        console.log('city', City);

        //set city and country name
        this.setState({cityName: City, countryName: country});
        // setcityName(City);
        // setcountryName(country);
      })
      .catch(e => {
        console.log(' City fetching error', e);
      });
  };

  changeCaption = text => {
    const self = this;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    this.setState({
      caption: text,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.updateCaption(self.state.caption);
      }, 2000),
    });
  };

  updateCaption = text => {
    //calling  text update...
    // console.log('updating text', text);
    let params = {
      post_id: this.state.post_id,
      caption: text,
    };

    try {
      this.props
        .updateCaption(params)
        .then(res => {
          console.log('done', res);
        })
        .catch(e => {
          // console.log('error adding to reducere', e);
        });
    } catch (e) {
      // console.log('error re-adding ', e);
    }
  };

  render() {
    let {loading, imagepath, temperature, caption, cityName, countryName} =
      this.state;
    if (loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <ScrollView style={{flex: 1}}>
        {/* <Button title={'Add items'} onPress={() => AddPost({name: 'Thor'})} /> */}
        {imagepath != null && (
          <ImageBackground style={styles.imageStyle} source={{uri: imagepath}}>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <View style={styles.textAlignView}>
                <View style={styles.textContainer}>
                  <Icon name={'ios-pin-outline'} size={15} color={'#ffffff'} />
                  <Text
                    style={
                      styles.fontStyle
                    }>{`${cityName},${countryName}`}</Text>
                </View>

                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.fontStyle,
                      {fontWeight: 'bold', paddingRight: 5},
                    ]}>
                    {temperature} &#176;
                  </Text>
                  <Icon
                    name={'ios-sunny-outline'}
                    size={25}
                    color={'#ffffff'}
                    fontWeight={'bold'}
                  />
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginBottom: -38,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.takeImageFromCamera()}
                  style={styles.retakeButton}
                  activeOpacity={0.9}>
                  <MaterialIcons
                    name={'camera'}
                    size={50}
                    color={'#2FE3BA'}
                    fontWeight={'bold'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        )}

        {/* caption section */}

        <View style={styles.inputContainer}>
          <TextInput
            style={{}}
            numberOfLines={5}
            multiline={true}
            placeholder="Type your thoughts..."
            value={caption}
            onChangeText={this.changeCaption}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
  };
};

const styles = StyleSheet.create({
  container: {},
  imageStyle: {
    resizeMode: 'contain',
    width: '100%',
    height: 280,
  },
  textContainer: {flexDirection: 'row', alignItems: 'center'},
  fontStyle: {
    // fontSize: 14,
    color: '#fff',
  },
  retakeButton: {
    backgroundColor: '#fff',
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  textAlignView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
    marginBottom: -40,
  },
  inputContainer: {
    marginTop: 28,
  },
});

export default connect(mapStateToProps, {
  addToList,
  updateImagePath,
  updateCaption,
})(AddPost);
