import {
  CardChannelGrid,
  CardSlide,
  CategoryList,
  CardReport06,
  News43,
  Price2Col,
  Icon,
  NewsList,
  SafeAreaView,
  Text,
  Transaction2Col,
} from '@components';
import {BaseColor, BaseStyle} from '@config';
import {
  HomeChannelData,
  HomeListData,
  HomePopularData,
  HomeTopicData,
  PostListData,
} from '@data';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ScrollView, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import HeaderCard from './HeaderCard';
import HeaderHome from './HeaderHome';
import styles from './styles';
import Categories from './Categories';

const Home = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const [topics, setTopics] = useState(HomeTopicData);
  const [channels, setChannels] = useState(HomeChannelData);
  const [popular, setPopular] = useState(HomePopularData);
  const [list, setList] = useState(HomeListData);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => getUser(state));

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log('datauser', user);
  });

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
        {/* <View style={{paddingHorizontal: 20, paddingBottom: 10}}>
          <Text header bold>
            {t('today')}
          </Text>
          <Text subhead grayColor style={{marginTop: 5}}>
            {t('discover_last_news_today')}
          </Text>
        </View> */}
        <HeaderHome />
        <ScrollView contentContainerStyle={styles.paddingSrollView}>
          <News43
            loading={loading}
            onPress={goPostDetail(mainNews)}
            style={{marginTop: 5}}
            title={mainNews.title}
          />
          <View style={{flexDirection: 'row', marginVertical: 15}}>
            <View style={{flex: 1, paddingRight: 7}}>
              <CardReport06
                icon="arrow-up"
                title="Invoice Due"
                // price="$0.68"
                percent="0.00"
                // onPress={() => navigation.navigate('FCryptol02')}
              />
            </View>
            <View style={{flex: 1, paddingLeft: 7}}>
              <CardReport06
                style={{backgroundColor: BaseColor.kashmir}}
                icon="arrow-up"
                title="Total"
                // price="$0.68"
                percent="0.00"
                // onPress={() => navigation.navigate('FCryptol02')}
              />
            </View>
          </View>
          <View style={styles.paddingContent}>
            <Categories style={{marginTop: 10}} />
          </View>
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

export default Home;
