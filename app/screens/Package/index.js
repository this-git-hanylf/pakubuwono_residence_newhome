import {
  CardChannelGrid,
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
import {NewsList, NotFound} from '../../components';
import List from '../../components/Product/List';
import styles from './styles';

const Package = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);

  useEffect(() => {
    axios
      .get('http://34.87.121.155:8000/ifcaprop-api/api/news/')
      .then(({data}) => {
        console.log('defaultApp -> data', data.data[0].status);
        setData(data.data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const goPost = item => () => {
    navigation.navigate('Post', {item: item});
  };

  const goPostDetail = item => () => {
    navigation.navigate('PostDetail', {item: item});
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
          title={t('Package')}
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
          {data.length == 0 ? (
            <FlatList
              scrollEnabled={false}
              contentContainerStyle={styles.paddingFlatList}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <NewsList
                  loading={loading}
                  image={{uri: `${item.url_image}`}}
                  subtitle={item.news_descs}
                  title={item.news_title}
                  source={item.source}
                  date={moment(item.date_created).startOf('hour').fromNow()}
                  style={{
                    marginBottom: index == data.length - 1 ? 0 : 15,
                  }}
                  onPress={goPostDetail(item)}
                />
              )}
            />
          ) : loading ? (
            <View>
              <ActivityIndicator size="large" color="#37BEB7" />
            </View>
          ) : (
            <NotFound />
          )}
        </ScrollView>
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

export default Package;
