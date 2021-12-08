import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  ScrollView,
  View,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  Picker,
} from 'react-native';
import styles from './styles';
import {
  CardChannelGrid,
  CardSlide,
  CategoryList,
  News43,
  ListFacility,
  SafeAreaView,
  ProductSpecGrid,
  Text,
  Header,
  Image,
  Icon,
  colors,
} from '@components';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import {BaseColor, BaseStyle, Images, useTheme} from '@config';
import * as Utils from '@utils';
import RNPickerSelect from '@react-native-picker/picker';
import {Button} from '../../components';

const DetailFacility = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const scrollY = useRef(new Animated.Value(0)).current;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    const getData = async () => {
      const response = await axios('http://10.0.2.2:3000/detail');
      console.log('response: ', response);
      setData(response.data);
    };
    getData();
  }, []);

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [BaseColor.whiteColor, colors.text],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  //For header image opacity
  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader - 20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  //artist profile image position from top
  const heightViewImg = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader],
    outputRange: [250, heightHeader],
    useNativeDriver: true,
  });
  const detail = data.map(post => {
    return (
      <View>
        <Text headline style={{marginTop: 20}}>
          {post.title}
        </Text>

        <View style={styles.specifications}>
          <ProductSpecGrid
            style={{flex: 1}}
            description={'OPEN'}
            title={post.openjam}
          />
          <ProductSpecGrid
            style={{flex: 1}}
            description={'Location'}
            title={post.location}
          />
        </View>
        <View style={styles.specifications}>
          <ProductSpecGrid
            style={{flex: 1}}
            description={'Phone'}
            title={post.phone}
          />
        </View>
        <View style={styles.specifications}>
          <ProductSpecGrid
            style={{flex: 1}}
            description={'Description'}
            title={post.description}
          />
        </View>
      </View>
    );
  });
  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {flex: 1}]}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('Detail Facility')}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView contentContainerStyle={styles.paddingSrollView}>
        <Animated.View
          style={[
            styles.headerImageStyle,
            {
              opacity: headerImageOpacity,
              height: heightViewImg,
            },
          ]}>
          <Swiper
            dotStyle={{
              backgroundColor: BaseColor.dividerColor,
              marginBottom: 8,
            }}
            activeDotStyle={{
              marginBottom: 8,
            }}
            paginationStyle={{bottom: 0}}
            loop={false}
            activeDotColor={colors.primary}
            removeClippedSubviews={false}
            onIndexChanged={index => onSelect(index)}>
            {data.map((item, key) => {
              return (
                <TouchableOpacity
                  key={key}
                  style={{flex: 1}}
                  activeOpacity={1}
                  onPress={() =>
                    navigation.navigate('PreviewImage', {images: images})
                  }>
                  <Image
                    key={key}
                    style={{
                      width: '100%',
                      height: Utils.scaleWithPixel(150),
                    }}
                    source={{uri: `${item.images[0].pict}`}}
                  />
                </TouchableOpacity>
              );
            })}
          </Swiper>
        </Animated.View>
        <View>{data && detail}</View>
      </ScrollView>
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always', bottom: 'always'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            backgroundColor: colors.primary,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('BookingFacility')}>
            <Text headline>View Schedule</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default DetailFacility;
