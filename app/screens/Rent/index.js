import {
  CardChannelGrid,
  CardSlide,
  CategoryList,
  News43,
  ListFacility,
  SafeAreaView,
  Text,
  NewsList,
  Header,
  Icon,
  colors,
  PlaceItem,
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
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ScrollView, View, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import List from '../../components/Product/List';
import styles from './styles';

const Rent = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);

  useEffect(() => {
    axios
      .get('http://34.87.121.155:2121/apiwebpbi/api/rsentryMobile/')
      .then(({data}) => {
        console.log('defaultApp -> data', data);
        setData(data);
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
          title={t('Rent or Sell')}
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
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={styles.paddingFlatList}
            data={data}
            renderItem={({item, index}) => (
              <NewsList
                loading={loading}
                title={item.title}
                subtitle={item.subject}
                date={item.date}
                style={{
                  marginBottom: index == data.length - 1 ? 0 : 15,
                }}
                onPress={goPostDetail(item)}
              />
            )}
          />
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

export default Rent;
