import {
  Button,
  ProductColorPicker,
  ProductList,
  ProductSize,
  FormCounterSelect,
  Text,
  CheckBox,
  ProfileGridSmall,
  Image,
} from '@components';
import {useTheme, Images} from '@config';
import {EFilterColors, EFilterSizes, FRecentTransactions} from '@data';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LabelUpper2Row from '@components/Label/Upper2Row';
import {useNavigation} from '@react-navigation/native';

const ModalProduct = props => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const cardColor = colors.card;
  const {onApply, item, colorChoosedInit, sizeChoosedInit, ...attrs} = props;
  const [eColors, setEcolors] = useState(EFilterColors);
  const [eSizes, setESizes] = useState(EFilterSizes);
  const [colorChoosed, setColorChoosed] = useState(colorChoosedInit);
  const [sizeChoosed, setSizeChoosed] = useState(sizeChoosedInit);
  const [total, setTotal] = useState(0);
  const countries = ['Lot-01', 'Lot-02'];
  const ballboy = ['riki', 'doni'];
  const [isSelected, setSelection] = useState(false);
  const goToScreen = name => name && navigation.navigate(name);

  // useEffect(() => {
  //   setColorChoosed(colorChoosedInit);
  // }, [colorChoosedInit]);

  // useEffect(() => {
  //   setSizeChoosed(sizeChoosedInit);
  // }, [sizeChoosedInit]);

  // useEffect(() => {
  //   setTotal(item.price);
  // }, [item]);

  // const {image, title, category, salePrice, costPrice, price} = item;

  return (
    <Modal swipeDirection={['down']} style={styles.bottomModal} {...attrs}>
      <View style={[styles.contentFilterBottom, {backgroundColor: cardColor}]}>
        <View style={styles.contentSwipeDown}>
          <View style={styles.lineSwipeDown} />
        </View>
        <View style={{paddingVertical: 20}}>
          <Text>Choose Unit</Text>
        </View>
        <View style={{paddingVertical: 5}}>
          <SelectDropdown
            data={countries}
            // defaultValueByIndex={1}
            // defaultValue={'Egypt'}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            defaultButtonText={'Select Unit'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={() => {
              return (
                <FontAwesome name="chevron-down" color={'#444'} size={18} />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
        </View>
        {/* <View style={{paddingVertical: 20}}>
          <Text>Choose Partners</Text>
        </View>
        <View style={{paddingVertical: 20}}>
          <SelectDropdown
            data={ballboy}
            // defaultValueByIndex={1}
            // defaultValue={'Egypt'}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            defaultButtonText={'Select Ball Boy'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={() => {
              return (
                <FontAwesome name="chevron-down" color={'#444'} size={18} />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
        </View> */}
        {/* <View style={{paddingVertical: 20}}>
          <Text>Choose Partners</Text>
        </View>

        <View>
          <Image
            source={Images.profile2}
            style={{width: 60, height: 60, borderRadius: 50}}
          />

          <Text> Nama :Riki </Text>
          <Text> Profile :Ball Bay </Text>

          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
        </View> */}
        <View style={{paddingVertical: 20}}>
          <Text>Choose Partners</Text>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 10}}>
          {FRecentTransactions.map((item, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ProfileGridSmall
                image={item.image}
                name={item.name}
                desc={item.desc}
                onPress={() => goToScreen('FSendMoney')}
              />
            </View>
          ))}
        </View>

        <Button
          full
          style={{marginTop: 10, marginBottom: 20}}
          onPress={onApply}>
          {t('Booking')}
        </Button>
      </View>
    </Modal>
  );
};

ModalProduct.defaultProps = {
  onApply: () => {},
};

ModalProduct.propTypes = {
  onApply: PropTypes.func,
};

export default ModalProduct;
