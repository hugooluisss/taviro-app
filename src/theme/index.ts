import {useColorScheme} from 'react-native';

const primary = '#6C4DFF';
export const themes = {
  light: {background: '#F8F7FC', surface: '#FFFFFF', text: '#171525', muted: '#6E6A7D', border: '#E5E1F0', primary, primaryLight: '#E9E4FF', primaryDark: '#4B32C7', accent: '#00A896', success: '#2E9D63', error: '#D64550', warning: '#D99A25', gradient: ['#FDFCFF', '#DDD4FF'] as [string, string], onGradientText: '#171525', onGradientMuted: '#625A78', cardOverlay: 'rgba(255,255,255,0.72)', cardOverlayBorder: 'rgba(108,77,255,0.18)'},
  dark: {background: '#12101A', surface: '#201D2B', text: '#F7F5FF', muted: '#AAA5B9', border: '#393346', primary, primaryLight: '#332A61', primaryDark: '#9B88FF', accent: '#55D6C2', success: '#65D995', error: '#FF7D86', warning: '#F3BF5D', gradient: ['#1B1240', '#6C4DFF'] as [string, string], onGradientText: '#FFFFFF', onGradientMuted: '#D8D0F2', cardOverlay: 'rgba(255,255,255,0.10)', cardOverlayBorder: 'rgba(255,255,255,0.18)'},
};

export type Theme = typeof themes.light;
export function useTheme(): Theme {
  return themes[useColorScheme() === 'dark' ? 'dark' : 'light'];
}
