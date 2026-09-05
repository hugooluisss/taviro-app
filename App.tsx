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
import {ProfileScreen, ShareNfcScreen, ShareQrScreen, ShareWhatsappScreen} from './src/screens';

export type RootStackParamList = {
  Profile: undefined;
  ShareQr: undefined;
  ShareNfc: undefined;
  ShareWhatsapp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDark = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider><StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} /><NavigationContainer><Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{title: 'Taviro'}} />
      <Stack.Screen name="ShareQr" component={ShareQrScreen} options={{title: 'Compartir por QR'}} />
      <Stack.Screen name="ShareNfc" component={ShareNfcScreen} options={{title: 'Compartir por NFC'}} />
      <Stack.Screen name="ShareWhatsapp" component={ShareWhatsappScreen} options={{title: 'Compartir por WhatsApp'}} />
    </Stack.Navigator></NavigationContainer></SafeAreaProvider>
  );
}

export default App;
