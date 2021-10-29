import {
  CardSlide,
  Header,
  Icon,
  Image,
  NewsList,
  SafeAreaView,
  StarRating,
  Tag,
  Text,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {Images} from '@config';
import {HomeListData, HomePopularData} from '@data';
import * as Utils from '@utils';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Animated,
  FlatList,
  I18nManager,
  ScrollView,
  Share,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {PlaceholderLine, Placeholder} from '@components';

const AnnouceDetail = props => {
  const {navigation, route} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {item} = route.params;
  const [loading, setLoading] = useState(true);
  const [popular, setPopular] = useState(HomePopularData);
  const [list, setList] = useState(HomeListData);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const scrollY = useRef(new Animated.Value(0)).current;
  const {
    style,
    onPress,
    image,
    news_descs,
    facility_descs,
    title,
    subtitle,
    url_image,
    announce_descs,
    announce_file,
    date,
  } = item;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const goPostDetail = item => () => {
    navigation.push('PostDetail', {item: item});
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'http://pakubuwonoview.com/',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //For header background color from transparent to header color
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [BaseColor.whiteColor, colors.primary],
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
    // extrapolate: "clamp",
    useNativeDriver: true,
  });

  const renderPlaceholder = () => {
    let holders = Array.from(Array(5));

    return (
      <Placeholder>
        <View style={{padding: 20}}>
          {holders.map((item, index) => (
            <PlaceholderLine key={index} width={100} />
          ))}
        </View>
      </Placeholder>
    );
  };

  const renderContent = () => {
    return (
      <Fragment>
        <View style={styles.contentDescription}>
          <Text
            body2
            style={{
              lineHeight: 20,
              paddingTop: 10,
              paddingBottom: 20,
            }}
            numberOfLines={100}>
            {announce_descs}
          </Text>
        </View>
      </Fragment>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always', bottom: 'always'}}>
        <Header title={subtitle} />
        <ScrollView
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          style={{zIndex: 10}}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {y: scrollY},
                },
              },
            ],
            {
              useNativeDriver: false,
            },
          )}>
          <View style={{height: 230 - heightHeader}} />
          <View
            style={{
              marginVertical: 10,
              paddingHorizontal: 20,
            }}>
            <Text medium caption1 grayColor>
              {date}
            </Text>
            <Text title1 semibold style={{marginVertical: 10}}>
              {item.announce_descs}
            </Text>
          </View>

          {loading ? renderPlaceholder() : renderContent()}
        </ScrollView>
      </SafeAreaView>
      <Animated.View
        style={[
          styles.headerImageStyle,
          {
            opacity: headerImageOpacity,
            height: heightViewImg,
          },
        ]}>
        <Image
          source={{uri: `${announce_file}`}}
          style={{height: '100%', width: '100%'}}
        />
      </Animated.View>
      <Animated.View style={[styles.headerStyle, {position: 'absolute'}]}>
        <SafeAreaView
          style={{width: '100%'}}
          forceInset={{top: 'always', bottom: 'never'}}>
          <Header
            title=""
            renderLeft={() => {
              return (
                <Animated.Image
                  resizeMode="contain"
                  style={[
                    styles.icon,
                    {
                      transform: [
                        {
                          scaleX: I18nManager.isRTL ? -1 : 1,
                        },
                      ],
                      tintColor: headerBackgroundColor,
                    },
                  ]}
                  source={Images.angleLeft}
                />
              );
            }}
            renderRight={() => {
              return (
                <Animated.Image
                  resizeMode="contain"
                  style={[
                    styles.icon,
                    {
                      tintColor: headerBackgroundColor,
                    },
                  ]}
                  source={Images.shareAltSolid}
                />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            onPressRight={onShare}
          />
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

export default AnnouceDetail;
