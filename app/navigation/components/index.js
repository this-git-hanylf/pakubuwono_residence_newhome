/** @format */

import React from 'react';
import {Icon, Text} from '@components';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import {BaseColor, BaseStyle, useTheme} from '@config';
import getNotifRed from '../../selectors/NotifSelectors';
import {useSelector} from 'react-redux';

export const tabBarIcon = ({color, name}) => (
  <Icon name={name} size={20} solid color={color} />
);

export const tabBarIconHaveNoty = ({color, name}) => {
  const data = useSelector(state => state.apiReducer.data);
  console.log('total badge di tabbar', data.length);
  const counter = useSelector(state => state.counter);
  console.log('counter badge di tabbar', counter);
  const total = data.length + counter;

  return (
    <View>
      {tabBarIcon({color, name})}
      <View
        style={{
          borderWidth: 1,
          borderColor: BaseColor.whiteColor,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          width: 20,
          height: 20,
          backgroundColor: 'red',
          top: -5,
          right: -12,
          borderRadius: 10,
        }}>
        <Text whiteColor caption2>
          {/* 5 */}
          {total < 0 ? 0 : total}
        </Text>
      </View>
    </View>
  );
};

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigatorMazi = ({tabScreens = {}}) => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showIcon: true,
        // showLabel: false, //untuk menghide title pada navigasi bottom bar
        showLabel: true,
        // activeTintColor: BaseColor.whiteColor,
        activeTintColor: '#CDB04A',
        inactiveTintColor: BaseColor.grayColor,
        // style: BaseStyle.tabBar,
        style: {backgroundColor: colors.primary},
        labelStyle: {
          fontSize: 12,
        },
      }}>
      {Object.keys(tabScreens).map((name, index) => {
        const {options, component} = tabScreens[name];
        return (
          <BottomTab.Screen
            key={index}
            name={name}
            component={component}
            options={{
              ...options,
              title: t(options.title),
            }}
          />
        );
      })}
    </BottomTab.Navigator>
  );
};
