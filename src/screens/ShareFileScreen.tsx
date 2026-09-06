import React from 'react';
import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';
import {useShareFileController} from '../controllers';
import {useTheme} from '../theme';
import {GradientBackground} from '../components/GradientBackground';
import {useLanguage} from '../i18n/I18nContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function ShareFileScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const {t} = useLanguage();
  const {cardId} = useRoute<NativeStackScreenProps<RootStackParamList, 'ShareFile'>['route']>().params;
  const {card, loading, selectedFieldIds, toggleField, share} = useShareFileController(cardId);

  if (loading) return <ActivityIndicator style={styles.loader} color={theme.primary} />;
  return <GradientBackground><ScrollView contentContainerStyle={[styles.content, {paddingBottom: 20 + insets.bottom}]}>
    <Text style={[styles.title, {color: theme.onGradientText}]}>{t('shareFile.title')}</Text>
    <Text style={[styles.subtitle, {color: theme.onGradientMuted}]}>{t('shareFile.subtitle')}</Text>
    <View style={[styles.card, {backgroundColor: theme.cardOverlay, borderColor: theme.cardOverlayBorder}]}>
      {card.fields.map(field => <Pressable key={field.id} accessibilityRole="checkbox" accessibilityState={{checked: selectedFieldIds.includes(field.id)}} onPress={() => toggleField(field.id)} style={styles.field}>
        <Text style={[styles.checkbox, {color: selectedFieldIds.includes(field.id) ? theme.primary : theme.onGradientMuted}]}>{selectedFieldIds.includes(field.id) ? '☑' : '☐'}</Text>
        <Text style={{color: theme.onGradientText}}>{field.label || t('shareFile.noLabelField')}</Text>
        <Text style={[styles.value, {color: theme.onGradientMuted}]} numberOfLines={1}>{field.value}</Text>
      </Pressable>)}
    </View>
    <Pressable accessibilityRole="button" style={[styles.button, {backgroundColor: theme.primary}]} onPress={share}><Text style={styles.buttonText}>{t('shareFile.share')}</Text></Pressable>
  </ScrollView></GradientBackground>;
}

const styles = StyleSheet.create({loader: {flex: 1}, content: {padding: 20, gap: 12}, title: {fontSize: 28, fontWeight: '700'}, subtitle: {fontSize: 16, marginBottom: 8}, card: {borderWidth: 1, borderRadius: 22, padding: 8}, field: {flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10}, checkbox: {fontSize: 22}, value: {flex: 1, textAlign: 'right'}, button: {padding: 14, borderRadius: 999, alignItems: 'center'}, buttonText: {color: '#FFF', fontWeight: '700'}});

export default ShareFileScreen;
