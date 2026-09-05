import React from 'react';
import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useProfileController} from '../controllers';
import {useTheme} from '../theme';

export function ProfileScreen() {
  const theme = useTheme();
  const {profile, loading, updateField, addField, removeField, setPhotoUri, save} = useProfileController();
  if (loading) return <ActivityIndicator style={styles.loader} color={theme.primary} />;
  return <ScrollView style={{backgroundColor: theme.background}} contentContainerStyle={styles.content}>
    <Text style={[styles.title, {color: theme.text}]}>Mi tarjeta Taviro</Text>
    <Text style={[styles.subtitle, {color: theme.muted}]}>Edita tus datos y elige qué compartir.</Text>
    <TextInput accessibilityLabel="URL de foto o logo" value={profile.photoUri ?? ''} onChangeText={setPhotoUri} placeholder="URL local de foto o logo (opcional)" placeholderTextColor={theme.muted} style={[styles.input, {color: theme.text, borderColor: theme.border}]} />
    {profile.fields.map(field => <View key={field.id} style={[styles.card, {backgroundColor: theme.surface, borderColor: theme.border}]}>
      <TextInput accessibilityLabel={`Etiqueta de ${field.id}`} value={field.label} onChangeText={label => updateField(field.id, {label})} style={[styles.label, {color: theme.text, borderColor: theme.border}]} />
      <TextInput accessibilityLabel={`Valor de ${field.label}`} value={field.value} onChangeText={value => updateField(field.id, {value})} placeholder="Valor" placeholderTextColor={theme.muted} style={[styles.input, {color: theme.text, borderColor: theme.border}]} />
      <View style={styles.row}>
        <Pressable accessibilityRole="checkbox" accessibilityState={{checked: field.shareable}} onPress={() => updateField(field.id, {shareable: !field.shareable})}>
          <Text style={{color: field.shareable ? theme.primary : theme.muted}}>{field.shareable ? '☑' : '☐'} Compartible</Text>
        </Pressable>
        <Pressable onPress={() => removeField(field.id)}><Text style={{color: theme.error}}>Quitar</Text></Pressable>
      </View>
    </View>)}
    <Pressable style={[styles.button, {backgroundColor: theme.primary}]} onPress={addField}><Text style={styles.buttonText}>+ Agregar campo</Text></Pressable>
    <Pressable style={[styles.button, {backgroundColor: theme.primaryDark}]} onPress={save}><Text style={styles.buttonText}>Guardar tarjeta</Text></Pressable>
    <Text style={[styles.pending, {color: theme.muted}]}>Compartir por QR · NFC · WhatsApp (pendiente)</Text>
  </ScrollView>;
}

const styles = StyleSheet.create({loader: {flex: 1}, content: {padding: 20, gap: 12}, title: {fontSize: 28, fontWeight: '700'}, subtitle: {fontSize: 16, marginBottom: 8}, card: {padding: 14, borderWidth: 1, borderRadius: 12, gap: 8}, label: {fontSize: 15, borderBottomWidth: 1, paddingVertical: 6}, input: {fontSize: 17, borderBottomWidth: 1, paddingVertical: 8}, row: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}, button: {padding: 14, borderRadius: 10, alignItems: 'center'}, buttonText: {color: '#FFF', fontWeight: '700'}, pending: {textAlign: 'center', marginTop: 8}});
