import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GradientBackground} from '../components/GradientBackground';
import {useLanguage} from '../i18n/I18nContext';
import {useTheme} from '../theme';
import type {LanguagePreference} from '../repositories/LanguageRepository';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const {preference, setLanguagePreference, t} = useLanguage();
  const options: [LanguagePreference, string][] = [['system', t('settings.systemDefault')], ['es', t('settings.spanish')], ['en', t('settings.english')]];
  return <GradientBackground><View style={[styles.content, {paddingBottom: 20 + insets.bottom}]}>
    <Text style={[styles.title, {color: theme.onGradientText}]}>{t('settings.title')}</Text>
    <View style={[styles.card, {backgroundColor: theme.cardOverlay, borderColor: theme.cardOverlayBorder}]}>
      <Text style={[styles.section, {color: theme.onGradientText}]}>{t('settings.languageSection')}</Text>
      {options.map(([value, label]) => <Pressable key={value} onPress={() => setLanguagePreference(value)} style={styles.option} accessibilityRole="radio" accessibilityState={{selected: preference === value}}><Text style={{color: preference === value ? theme.primary : theme.onGradientMuted}}>{preference === value ? '◉' : '○'}</Text><Text style={{color: theme.onGradientText}}>{label}</Text></Pressable>)}
    </View>
  </View></GradientBackground>;
}

const styles = StyleSheet.create({content: {padding: 20, gap: 16}, title: {fontSize: 28, fontWeight: '700'}, card: {padding: 18, borderWidth: 1, borderRadius: 22, gap: 16}, section: {fontSize: 18, fontWeight: '700'}, option: {flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 36}});
