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
import {CardEditScreen, CardListScreen, ShareNfcScreen, ShareQrScreen, ShareWhatsappScreen} from './src/screens';

export type RootStackParamList = {
  CardList: undefined;
  CardEdit: {cardId: string};
  ShareQr: {cardId: string};
  ShareNfc: {cardId: string};
  ShareWhatsapp: {cardId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDark = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider><StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} /><NavigationContainer><Stack.Navigator>
      <Stack.Screen name="CardList" component={CardListScreen} options={{title: 'Mis tarjetas'}} />
      <Stack.Screen name="CardEdit" component={CardEditScreen} options={{title: 'Editar tarjeta'}} />
      <Stack.Screen name="ShareQr" component={ShareQrScreen} options={{title: 'Compartir por QR'}} />
      <Stack.Screen name="ShareNfc" component={ShareNfcScreen} options={{title: 'Compartir por NFC'}} />
      <Stack.Screen name="ShareWhatsapp" component={ShareWhatsappScreen} options={{title: 'Compartir por WhatsApp'}} />
    </Stack.Navigator></NavigationContainer></SafeAreaProvider>
  );
}

export default App;
