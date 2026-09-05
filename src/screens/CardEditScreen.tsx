import React, {useState} from 'react';
import {ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';
import {useCardController} from '../controllers';
import {useTheme} from '../theme';

export default function CardEditScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {cardId} = useRoute<NativeStackScreenProps<RootStackParamList, 'CardEdit'>['route']>().params;
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const {card, loading, updateField, addField, removeField, updateName, save} = useCardController(cardId);
  if (loading) return <ActivityIndicator style={styles.loader} color={theme.primary} />;
  return <ScrollView style={{backgroundColor: theme.background}} contentContainerStyle={styles.content}>
    <TextInput accessibilityLabel="Nombre de la tarjeta" value={card.name} onChangeText={updateName} placeholder="Nombre de la tarjeta" placeholderTextColor={theme.muted} style={[styles.titleInput, {color: theme.text, borderColor: theme.border}]} />
    {card.fields.map(field => <View key={field.id} style={[styles.card, {backgroundColor: theme.surface, borderColor: theme.border}]}>
      <TextInput accessibilityLabel={`Etiqueta de ${field.id}`} value={field.label} onChangeText={label => updateField(field.id, {label})} style={[styles.label, {color: theme.text, borderColor: theme.border}]} />
      {field.type === 'photo' && field.value ? <Image source={{uri: field.value}} style={styles.photo} /> : null}
      <TextInput accessibilityLabel={`Valor de ${field.label}`} value={field.value} onChangeText={value => updateField(field.id, {value})} placeholder={field.type === 'photo' ? 'URI de foto o logo' : 'Valor'} placeholderTextColor={theme.muted} style={[styles.input, {color: theme.text, borderColor: theme.border}]} />
      <View style={styles.row}><Pressable accessibilityRole="checkbox" accessibilityState={{checked: field.shareable}} onPress={() => updateField(field.id, {shareable: !field.shareable})}><Text style={{color: field.shareable ? theme.primary : theme.muted}}>{field.shareable ? '☑' : '☐'} Compartible</Text></Pressable><Pressable onPress={() => removeField(field.id)}><Text style={{color: theme.error}}>Quitar</Text></Pressable></View>
    </View>)}
    <View style={styles.row}>{(['text', 'phone', 'email', 'photo'] as const).map(type => <Pressable key={type} style={[styles.smallButton, {backgroundColor: theme.primaryLight}]} onPress={() => addField(type)}><Text style={{color: theme.primary}}>{`+ ${type === 'text' ? 'Texto' : type === 'phone' ? 'Teléfono' : type === 'email' ? 'Email' : 'Foto'}`}</Text></Pressable>)}</View>
    <Pressable style={[styles.button, {backgroundColor: theme.primaryDark}]} onPress={save}><Text style={styles.buttonText}>Guardar tarjeta</Text></Pressable>
    <Pressable style={[styles.button, {backgroundColor: theme.accent}]} onPress={() => setShareMenuOpen(open => !open)}><Text style={styles.buttonText}>Compartir</Text></Pressable>
    {shareMenuOpen ? <View style={styles.row}>
      <Pressable style={[styles.button, styles.shareButton, {backgroundColor: theme.accent}]} onPress={() => {setShareMenuOpen(false); navigation.navigate('ShareQr', {cardId});}}><Text style={styles.buttonText}>QR</Text></Pressable>
      <Pressable style={[styles.button, styles.shareButton, {backgroundColor: theme.accent}]} onPress={() => {setShareMenuOpen(false); navigation.navigate('ShareNfc', {cardId});}}><Text style={styles.buttonText}>NFC</Text></Pressable>
      <Pressable style={[styles.button, styles.shareButton, {backgroundColor: theme.accent}]} onPress={() => {setShareMenuOpen(false); navigation.navigate('ShareWhatsapp', {cardId});}}><Text style={styles.buttonText}>WhatsApp</Text></Pressable>
    </View> : null}
  </ScrollView>;
}

const styles = StyleSheet.create({loader: {flex: 1}, content: {padding: 20, gap: 12}, titleInput: {fontSize: 28, fontWeight: '700', borderBottomWidth: 1, paddingVertical: 8}, card: {padding: 14, borderWidth: 1, borderRadius: 12, gap: 8}, label: {fontSize: 15, borderBottomWidth: 1, paddingVertical: 6}, input: {fontSize: 17, borderBottomWidth: 1, paddingVertical: 8}, row: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8}, smallButton: {padding: 8, borderRadius: 8, flex: 1, alignItems: 'center'}, button: {padding: 14, borderRadius: 10, alignItems: 'center'}, shareButton: {flex: 1}, buttonText: {color: '#FFF', fontWeight: '700'}, photo: {width: 120, height: 120, borderRadius: 8}});
