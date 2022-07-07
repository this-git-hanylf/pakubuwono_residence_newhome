import {
  CardSlide,
  CategoryList,
  News43,
  ListFacility,
  SafeAreaView,
  Text,
  Header,
  Icon,
  colors,
} from '@components';
import {BaseStyle, useTheme} from '@config';
import {
  HomeChannelData,
  HomeListData,
  HomePopularData,
  HomeTopicData,
  PostListData,
} from '@data';
import axios from 'axios';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ScrollView, View, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NewsList, NotFound, CategoryGrid} from '../../components';
import List from '../../components/Product/List';
import styles from './styles';
import {CardReport01, CardReport08} from '../../components';

const NewsAnnounce = props => {
  const {navigation} = props;
  const {route} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [dataItems, setdataItems] = useState(route.params.items);
  console.log('dataItems', dataItems);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const goPost = item => () => {
    navigation.navigate('Post', {item: item});
  };

  //   const goPostDetail = item => () => {
  //     navigation.navigate('PostDetail', {item: item});
  //   };

  const goPostDetail = item => {
    console.log('for news', item);

    item.category == 'N' ? getNewsDetail(item) : getAnnounceDetail(item);
  };

  const getNewsDetail = async item => {
    console.log('rowid for detail', item.rowID);
    await axios
      .get(`http://103.111.204.131/apiwebpbi/api/news/id/${item.rowID}`)
      .then(res => {
        console.log('res news detail', res.data.data);

        navigation.navigate('PostDetail', {item: res.data.data});
      })
      .catch(error => {
        console.log('error get news announce detail', error);
        // alert('error get');
      });
  };

  const getAnnounceDetail = async item => {
    console.log('rowid for detail', item.rowID);
    await axios
      .get(`http://103.111.204.131/apiwebpbi/api/announce/id/${item.rowID}`)
      .then(res => {
        console.log('res announce detail', res.data.data);

        navigation.navigate('AnnounceDetailHome', {item: res.data.data});
      })
      .catch(error => {
        console.log('error get news announce detail', error);
        // alert('error get');
      });
  };

  const goToCategory = () => {
    navigation.navigate('Category');
  };

  const renderContent = () => {
    const mainNews = PostListData[0];
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView, {flex: 1}]}
        edges={['right', 'top', 'left']}>
        <Header
          title={t('News & Announcement')}
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
        {/* <ScrollView contentContainerStyle={styles.paddingSrollView}> */}
        {dataItems.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={styles.paddingFlatList}
            data={dataItems}
            numColumns={2}
            key={2}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={
              ({item, index}) => (
                <CategoryGrid
                  onPress={() => goPostDetail(item)}
                  // style={{paddingHorizontal: 5}}
                  image={{uri: `${item.url_image}`}}
                  title={item.news_title}></CategoryGrid>
                //   <NewsList
                //     loading={loading}
                //     image={{uri: `${item.url_image}`}}
                //     subtitle={item.news_descs}
                //     title={item.news_title}
                //     source={item.source}
                //     date={moment(item.date_created).startOf('hour').fromNow()}
                //     style={{
                //       marginBottom: index == data.length - 1 ? 0 : 15,
                //     }}
                //     onPress={
                //       item.category == 'N'
                //         ? goPostDetail(item)
                //         : goAnnouceDetail(item)
                //     }
                //   />
              )

              // item.status == 'Active' ? (
              //   <NewsList
              //     loading={loading}
              //     image={{uri: `${item.url_image}`}}
              //     subtitle={item.news_descs}
              //     title={item.news_title}
              //     source={item.source}
              //     date={moment(item.date_created).startOf('hour').fromNow()}
              //     style={{
              //       marginBottom: index == data.length - 1 ? 0 : 15,
              //     }}
              //     onPress={goPostDetail(item)}
              //   />
              // ) : null
            }
          />
        ) : loading ? (
          <View>
            <ActivityIndicator size="large" color="#37BEB7" />
          </View>
        ) : (
          <NotFound />
        )}
        {/* </ScrollView> */}
      </SafeAreaView>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}>
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default NewsAnnounce;
