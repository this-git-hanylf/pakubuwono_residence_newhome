import {
  CardReport03,
  CardReport08,
  CardReport07,
  ProfileGridSmall,
  SafeAreaView,
  Text,
  Header,
  Transaction2Col,
  Icon,
  Tag,
  Price3Col,
  ListTransactionExpand,
} from '@components';
import {BaseStyle, useTheme} from '@config';
import {FRecentTransactions, FHotNews} from '@data';
import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {enableExperimental} from '@utils';

import moment from 'moment';

import {
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import styles from './styles';
import getUser from '../../selectors/UserSelectors';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import numFormat from '../../components/numFormat';
import CurrencyFormatter from '../../components/CurrencyFormatter';

const MeterInfo = ({
  isCenter = false,
  isPrimary = false,
  style = {},
  onPress = () => {},
  disabled = false,
}) => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => getUser(state));
  const [hasError, setErrors] = useState(false);
  const [bill, setBill] = useState([]);
  const [data, setData] = useState([]);
  const [dataCurrent, setDataCurrent] = useState([]);
  const TABS = [
    {
      id: 1,
      title: t('Due Date'),
    },
    {
      id: 2,
      title: t('Not Due'),
    },
  ];
  const [tab, setTab] = useState(TABS[0]);

  useEffect(() => {
    const id = route?.params?.id;
    if (id) {
      TABS.forEach(tab => {
        tab.id == id && setTab(tab);
      });
    }
  }, [route?.params?.id]);

  // Make function to call the api
  async function fetchData() {
    try {
      const res = await axios.get(
        `http://34.87.121.155:2121/apiwebpbi/api/getDataMeter/IFCAPB/01/01/${user.user}`,
      );
      setDataCurrent(res.data.Data);
      console.log('data', data);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  }

  async function fetchDataCurrent() {
    try {
      const res = await axios.get(
        `http://34.87.121.155:2121/apiwebpbi/api/getDataCurrent/IFCAPB/${user.user}`,
      );
      setData(res.data.Data);
      console.log('data', dataCurrent);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  }

  useEffect(() => {
    fetchData();
    fetchDataCurrent();
  }, []);

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {flex: 1}]}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('MeterInfo')}
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
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('FHistoryDetail')}>
            <Text>Search</Text>
          </TouchableOpacity>
          {dataCurrent.map(item => (
            <ListTransactionExpand
              onPress={() => navigation.navigate('FHistoryDetail')}
              key={item.id}
              tower={item.tower}
              name={item.name}
              trx_type={item.trx_type}
              doc_no={item.doc_no}
              doc_date={moment(item.doc_date).format('DD MMMM YYYY')}
              descs={item.descs}
              due_date={moment(item.due_date).format('DD MMMM YYYY')}
              mbal_amt={`${numFormat(`${item.mbal_amt}`)}`}
            />
          ))}
        </View>
        {/* <View style={{flex: 1, paddingHorizontal: 20}}>
          {tab.id == 2 &&
            data.map(item => (
              <ListTransactionExpand
                onPress={() => navigation.navigate('FHistoryDetail')}
                key={item.id}
                tower={item.tower}
                name={item.name}
                trx_type={item.trx_type}
                doc_no={item.doc_no}
                doc_date={moment(item.doc_date).format('DD MMMM YYYY')}
                descs={item.descs}
                due_date={moment(item.due_date).format('DD MMMM YYYY')}
                mbal_amt={`${numFormat(`${item.mbal_amt}`)}`}
              />
            ))}
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MeterInfo;
