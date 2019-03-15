import { createStackNavigator, createAppContainer } from 'react-navigation';

import AppContainer from '../containers/AppContainer';
import BrandsWebviewContainer from '../containers/BrandsWebviewContainer';
import SettingContainer from '../containers/SettingContainer';

const AppNavigator = createStackNavigator({
  Home: {
    screen: AppContainer,
    navigationOptions: {
      headerBackTitle: null,
      header: null,
    },
  },
  Setting: {
    screen: SettingContainer,
    navigationOptions: () => ({
      headerTitle: '설정',
    }),
  },
  Brands: {
    screen: BrandsWebviewContainer,
  },
});

export default createAppContainer(AppNavigator);
