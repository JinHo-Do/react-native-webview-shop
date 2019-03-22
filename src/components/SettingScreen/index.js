import React, { Component } from 'react';
import { View } from 'react-native';
import SettingsList from 'react-native-settings-list';
import Icon from 'react-native-vector-icons/AntDesign';
import { INSTA1, INSTA2 } from 'react-native-dotenv';

class index extends Component {
  render() {
    const {
      onCallPress,
      onValueChange,
      switchValue,
      onPressBrand,
      onOpenInstagram,
      onCacheClear,
    } = this.props;

    return (
      <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
        <View style={{ flex: 1, marginTop: 20 }}>
          <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
            <SettingsList.Header
              // headerText="First Grouping"
              headerStyle={{ marginTop: 15 }}
            />
            {/* <SettingsList.Item
              title="공지사항"
              onPress={() => Alert.alert('공지사항')}
            /> */}
            <SettingsList.Item
              title="고객센터"
              titleInfo="02-533-6148"
              hasNavArrow={false}
              onPress={onCallPress}
            />
            <SettingsList.Item
              title="캐시 초기화"
              titleInfo="다른 계정으로 로그인 시 사용하세요."
              hasNavArrow
              onPress={onCacheClear}
            />
            <SettingsList.Item
              hasNavArrow={false}
              switchState={switchValue}
              switchOnValueChange={onValueChange}
              hasSwitch
              title="알림 수신"
            />

            <SettingsList.Header
              // headerText="About GURM BY H"
              headerStyle={{ marginTop: 15 }}
            />
            <SettingsList.Item
              icon={
                <View
                  style={{ height: 30, marginLeft: 10, alignSelf: 'center' }}
                >
                  <Icon name="instagram" size={30} color="#222222" />
                </View>
              }
              itemWidth={50}
              title="GBH"
              hasNavArrow
              onPress={() => onOpenInstagram(INSTA1)}
            />
            <SettingsList.Item
              icon={
                <View
                  style={{ height: 30, marginLeft: 10, alignSelf: 'center' }}
                >
                  <Icon name="instagram" size={30} color="#222222" />
                </View>
              }
              itemWidth={50}
              title="GURM BY H"
              hasNavArrow
              onPress={() => onOpenInstagram(INSTA2)}
            />

            <SettingsList.Header
              // headerText="About GURM BY H"
              headerStyle={{ marginTop: 15 }}
            />
            <SettingsList.Item
              title="스마포크"
              onPress={() => onPressBrand('https://smafolk.co.kr', '스마포크')}
            />
            <SettingsList.Item
              title="던스 스웨덴"
              onPress={() =>
                onPressBrand('https://dunssweden.co.kr', '던스 스웨덴')
              }
            />
            <SettingsList.Item
              title="릴리 바로우"
              onPress={() =>
                onPressBrand('https://lilybalou.co.kr', '릴리 바로우')
              }
            />

            <SettingsList.Header
              // headerText="About GURM BY H"
              headerStyle={{ marginTop: 50 }}
            />
            <SettingsList.Item
              title="버전"
              titleInfo="0.1.0"
              hasNavArrow={false}
            />
          </SettingsList>
        </View>
      </View>
    );
  }
}

export default index;
