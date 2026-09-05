import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import {useTheme} from '../theme';

export function GradientBackground({children}: {children: React.ReactNode}) {
  const theme = useTheme();
  return <View style={styles.container}>
    <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
      <Defs>
        <LinearGradient id="taviro-background" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={theme.gradient[0]} />
          <Stop offset="1" stopColor={theme.gradient[1]} />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#taviro-background)" />
    </Svg>
    {children}
  </View>;
}

const styles = StyleSheet.create({container: {flex: 1}});
