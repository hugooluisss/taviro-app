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
import {ProfileScreen} from './src/screens';
import {useTheme} from './src/theme';

const Stack = createNativeStackNavigator();

function App() {
  const theme = useTheme();
  const isDark = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider><StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} /><NavigationContainer><Stack.Navigator><Stack.Screen name="Profile" component={ProfileScreen} options={{title: 'Taviro'}} /></Stack.Navigator></NavigationContainer></SafeAreaProvider>
  );
}

export default App;
