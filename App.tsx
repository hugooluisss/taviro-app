/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CardEditScreen, CardListScreen, SettingsScreen, ShareFileScreen, ShareNfcScreen, ShareQrScreen} from './src/screens';
import {useTheme} from './src/theme';
import {LanguageProvider, useLanguage} from './src/i18n/I18nContext';

export type RootStackParamList = {
  CardList: undefined;
  CardEdit: {cardId: string};
  ShareQr: {cardId: string};
  ShareNfc: {cardId: string};
  ShareFile: {cardId: string};
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppContent() {
  const isDark = useColorScheme() === 'dark';
  const theme = useTheme();
  const {t} = useLanguage();
  return (
    <SafeAreaProvider><StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} /><NavigationContainer><Stack.Navigator screenOptions={{headerStyle: {backgroundColor: theme.gradient[0]}, headerTintColor: theme.onGradientText, headerTitleStyle: {color: theme.onGradientText}, headerShadowVisible: false}}>
      <Stack.Screen name="CardList" component={CardListScreen} options={{title: t('nav.cardList')}} />
      <Stack.Screen name="CardEdit" component={CardEditScreen} options={{title: t('nav.cardEdit')}} />
      <Stack.Screen name="ShareQr" component={ShareQrScreen} options={{title: t('nav.shareQr')}} />
      <Stack.Screen name="ShareNfc" component={ShareNfcScreen} options={{title: t('nav.shareNfc')}} />
      <Stack.Screen name="ShareFile" component={ShareFileScreen} options={{title: t('nav.shareFile')}} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{title: t('nav.settings')}} />
    </Stack.Navigator></NavigationContainer></SafeAreaProvider>
  );
}

function App() { return <LanguageProvider><AppContent /></LanguageProvider>; }

export default App;
