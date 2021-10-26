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
  Price3Col,
  ListTransactionExpand,
} from '@components';
import {BaseStyle, useTheme} from '@config';
import {FRecentTransactions, FHotNews} from '@data';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

import {
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import HeaderHome from './HeaderHome';
import styles from './styles';
import HeaderCard from './HeaderCard';
import getUser from '../../selectors/UserSelectors';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import numFormat from '../../components/numFormat';
import CurrencyFormatter from '../../components/CurrencyFormatter';

const Billing = ({
  isCenter = false,
  isPrimary = false,
  style = {},
  onPress = () => {},
  disabled = false,
}) => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => getUser(state));
  const [hasError, setErrors] = useState(false);
  const [bill, setBill] = useState([]);
  const [data, setData] = useState([]);
  const [userBilling, setUserBilling] = useState({});

  // Make function to call the api
  async function fetchData() {
    try {
      const res = await axios.get(
        `http://34.87.121.155:2121/apiwebpbi/api/getDataDue/IFCAPB/${user.user}`,
      );
      setData(res.data.Data);
      setUserBilling(res.data.Data[0].mbal_amt);
      console.log('data', data);
      console.log('billins', userBilling);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  }

  const totalIncome = () => {
    Object.entries(userBilling).map(([key, value]) => {
      let total = 0;
      console.log(value);
      for (let i = 0; i < value.length; i++) {
        total += value[i];
      }
      return total;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {flex: 1}]}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('Billing')}
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
        <View style={styles.paddingContent}>
          <TouchableOpacity
            disabled={disabled}
            style={StyleSheet.flatten([
              styles.headerCard,
              {backgroundColor: colors.card},
              isPrimary && styles.headerCardPrimary,
              isPrimary && {backgroundColor: colors.primaryLight},
              isCenter && styles.headerCardCenter,
              style,
            ])}
            onPress={onPress}>
            <Text subhead light={!isPrimary} whiteColor={isPrimary}>
              {t('total_balance')}
            </Text>
            <Text title1 whiteColor={isPrimary} style={{marginTop: 5}}>
              {totalIncome()}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, paddingHorizontal: 20}}>
          {data.map(item => (
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Billing;
