import React from 'react';
import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useShareWhatsappController} from '../controllers';
import {useTheme} from '../theme';

export function ShareWhatsappScreen() {
  const theme = useTheme();
  const {profile, loading, selectedFieldIds, toggleField, share, openWhatsApp, whatsappAvailable} = useShareWhatsappController();

  if (loading) return <ActivityIndicator style={styles.loader} color={theme.primary} />;
  return <ScrollView style={{backgroundColor: theme.background}} contentContainerStyle={styles.content}>
    <Text style={[styles.title, {color: theme.text}]}>Compartir por WhatsApp</Text>
    <Text style={[styles.subtitle, {color: theme.muted}]}>Elige los campos que quieres compartir.</Text>
    <View style={[styles.card, {backgroundColor: theme.surface, borderColor: theme.border}]}>
      {profile.fields.map(field => <Pressable key={field.id} accessibilityRole="checkbox" accessibilityState={{checked: selectedFieldIds.includes(field.id)}} onPress={() => toggleField(field.id)} style={styles.field}>
        <Text style={[styles.checkbox, {color: selectedFieldIds.includes(field.id) ? theme.primary : theme.muted}]}>{selectedFieldIds.includes(field.id) ? '☑' : '☐'}</Text>
        <Text style={{color: theme.text}}>{field.label || 'Sin etiqueta'}</Text>
        <Text style={[styles.value, {color: theme.muted}]} numberOfLines={1}>{field.value}</Text>
      </Pressable>)}
    </View>
    <Pressable accessibilityRole="button" style={[styles.button, {backgroundColor: theme.primary}]} onPress={share}><Text style={styles.buttonText}>Compartir</Text></Pressable>
    {whatsappAvailable && <Pressable accessibilityRole="button" style={[styles.button, {backgroundColor: theme.accent}]} onPress={openWhatsApp}><Text style={styles.buttonText}>Abrir WhatsApp</Text></Pressable>}
  </ScrollView>;
}

const styles = StyleSheet.create({loader: {flex: 1}, content: {padding: 20, gap: 12}, title: {fontSize: 28, fontWeight: '700'}, subtitle: {fontSize: 16, marginBottom: 8}, card: {borderWidth: 1, borderRadius: 12, padding: 8}, field: {flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10}, checkbox: {fontSize: 22}, value: {flex: 1, textAlign: 'right'}, button: {padding: 14, borderRadius: 10, alignItems: 'center'}, buttonText: {color: '#FFF', fontWeight: '700'}});

export default ShareWhatsappScreen;
