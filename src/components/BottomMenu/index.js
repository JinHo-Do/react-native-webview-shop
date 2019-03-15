import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

class BottomMenu extends Component {
  render() {
    const {
      navigation,
      canGoBack,
      canGoForward,
      onGoBack,
      onGoForward,
      onGoHome,
      onGoCart,
      onGoMyPage,
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity disabled={!canGoBack} onPress={onGoBack}>
          <Icon
            name="arrow-left"
            size={25}
            // color={canGoBack ? '#4F8EF7' : '#d5d5d5'}
            color={canGoBack ? '#ffffff' : '#555555'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onGoForward}>
          <Icon
            name="arrow-right"
            size={25}
            // color={canGoForward ? '#4F8EF7' : '#d5d5d5'}
            color={canGoForward ? '#ffffff' : '#555555'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onGoHome}>
          {/* <Icon name="home" size={25} color="#4F8EF7" /> */}
          <Icon name="home" size={25} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onGoCart}>
          <Icon name="basket" size={25} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onGoMyPage}>
          <Icon name="user" size={25} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Icon name="settings" size={25} color="#ffffff" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS !== 'android' ? 50 : 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    backgroundColor: '#000000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default BottomMenu;
