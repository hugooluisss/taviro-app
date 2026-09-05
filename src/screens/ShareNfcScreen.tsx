import React from 'react';
import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';
import {useShareNfcController} from '../controllers';
import {useTheme} from '../theme';

export default function ShareNfcScreen() {
  const theme = useTheme();
  const {cardId} = useRoute<NativeStackScreenProps<RootStackParamList, 'ShareNfc'>['route']>().params;
  const {card, loading, selectedFieldIds, toggleField, sharing, toggleSharing, error} = useShareNfcController(cardId);
  if (loading) return <ActivityIndicator style={styles.loader} color={theme.primary} />;
  return <ScrollView style={{backgroundColor: theme.background}} contentContainerStyle={styles.content}>
    <Text style={[styles.title, {color: theme.text}]}>Compartir por NFC</Text>
    <Text style={[styles.subtitle, {color: theme.muted}]}>Elige los datos que quieres emitir al acercar otro teléfono.</Text>
    <View style={[styles.card, {backgroundColor: theme.surface, borderColor: theme.border}]}>
      {card.fields.map(field => <Pressable key={field.id} accessibilityRole="checkbox" accessibilityState={{checked: selectedFieldIds.includes(field.id)}} onPress={() => toggleField(field.id)} style={styles.row}>
        <Text style={[styles.checkbox, {color: selectedFieldIds.includes(field.id) ? theme.primary : theme.muted}]}>{selectedFieldIds.includes(field.id) ? '☑' : '☐'}</Text>
        <Text style={[styles.field, {color: theme.text}]}>{field.label}</Text>
      </Pressable>)}
    </View>
    <Pressable accessibilityRole="button" style={[styles.button, {backgroundColor: sharing ? theme.error : theme.primary}]} onPress={toggleSharing}>
      <Text style={styles.buttonText}>{sharing ? 'Detener emisión NFC' : 'Compartir por NFC'}</Text>
    </Pressable>
    <Text style={[styles.status, {color: sharing ? theme.success : theme.muted}]}>{sharing ? 'Listo: acerca el otro teléfono.' : 'La emisión está apagada.'}</Text>
    {error && <Text accessibilityRole="alert" style={{color: theme.error}}>{error}</Text>}
  </ScrollView>;
}

const styles = StyleSheet.create({loader: {flex: 1}, content: {padding: 20, gap: 12}, title: {fontSize: 28, fontWeight: '700'}, subtitle: {fontSize: 16, marginBottom: 8}, card: {padding: 14, borderWidth: 1, borderRadius: 12, gap: 14}, row: {flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 32}, checkbox: {fontSize: 18}, field: {fontSize: 17}, button: {padding: 14, borderRadius: 10, alignItems: 'center'}, buttonText: {color: '#FFF', fontWeight: '700'}, status: {textAlign: 'center'}});
