import React, {useState} from 'react';
import {ActivityIndicator, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';
import {useCardController} from '../controllers';
import {useTheme} from '../theme';
import {GradientBackground} from '../components/GradientBackground';

export default function CardEditScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {cardId} = useRoute<NativeStackScreenProps<RootStackParamList, 'CardEdit'>['route']>().params;
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const {card, loading, updateField, addField, removeField, updateName, save} = useCardController(cardId);
  if (loading) return <ActivityIndicator style={styles.loader} color={theme.primary} />;
  return <GradientBackground><ScrollView contentContainerStyle={styles.content}>
    <TextInput accessibilityLabel="Nombre de la tarjeta" value={card.name} onChangeText={updateName} placeholder="Nombre de la tarjeta" placeholderTextColor={theme.onGradientMuted} style={[styles.titleInput, {color: theme.onGradientText, borderColor: theme.cardOverlayBorder}]} />
    {card.fields.map(field => <View key={field.id} style={[styles.card, {backgroundColor: theme.cardOverlay, borderColor: theme.cardOverlayBorder}]}>
      <TextInput accessibilityLabel={`Etiqueta de ${field.id}`} value={field.label} onChangeText={label => updateField(field.id, {label})} style={[styles.label, {color: theme.onGradientText, borderColor: theme.cardOverlayBorder}]} />
      {field.type === 'photo' && field.value ? <Image source={{uri: field.value}} style={styles.photo} /> : null}
      <TextInput accessibilityLabel={`Valor de ${field.label}`} value={field.value} onChangeText={value => updateField(field.id, {value})} placeholder={field.type === 'photo' ? 'URI de foto o logo' : 'Valor'} placeholderTextColor={theme.onGradientMuted} style={[styles.input, {color: theme.onGradientText, borderColor: theme.cardOverlayBorder}]} />
      <View style={styles.row}><Pressable accessibilityRole="checkbox" accessibilityState={{checked: field.shareable}} onPress={() => updateField(field.id, {shareable: !field.shareable})}><Text style={{color: field.shareable ? theme.primary : theme.onGradientMuted}}>{field.shareable ? '☑' : '☐'} Compartible</Text></Pressable><Pressable onPress={() => removeField(field.id)}><Text style={{color: theme.error}}>Quitar</Text></Pressable></View>
    </View>)}
    <View style={styles.row}>{(['text', 'phone', 'email', 'photo'] as const).map(type => <Pressable key={type} style={[styles.smallButton, {backgroundColor: theme.primaryLight}]} onPress={() => addField(type)}><Text style={{color: theme.primary}}>{`+ ${type === 'text' ? 'Texto' : type === 'phone' ? 'Teléfono' : type === 'email' ? 'Email' : 'Foto'}`}</Text></Pressable>)}</View>
    <Pressable style={[styles.button, {backgroundColor: theme.primaryDark}]} onPress={save}><Text style={styles.buttonText}>Guardar tarjeta</Text></Pressable>
    <Pressable style={[styles.button, {backgroundColor: theme.accent}]} onPress={() => setShareMenuOpen(true)}><Text style={styles.buttonText}>Compartir</Text></Pressable>
    <Modal visible={shareMenuOpen} transparent animationType="fade" onRequestClose={() => setShareMenuOpen(false)}>
      <Pressable style={styles.modalOverlay} onPress={() => setShareMenuOpen(false)}>
        <Pressable style={[styles.modalCard, {backgroundColor: theme.surface, borderColor: theme.border}]} onPress={() => {}}>
          <Text style={[styles.modalTitle, {color: theme.text}]}>Compartir tarjeta</Text>
          <Pressable style={[styles.button, {backgroundColor: theme.accent}]} onPress={() => {setShareMenuOpen(false); navigation.navigate('ShareQr', {cardId});}}><Text style={styles.buttonText}>QR</Text></Pressable>
          <Pressable style={[styles.button, {backgroundColor: theme.accent}]} onPress={() => {setShareMenuOpen(false); navigation.navigate('ShareNfc', {cardId});}}><Text style={styles.buttonText}>NFC</Text></Pressable>
          <Pressable style={[styles.button, {backgroundColor: theme.accent}]} onPress={() => {setShareMenuOpen(false); navigation.navigate('ShareWhatsapp', {cardId});}}><Text style={styles.buttonText}>WhatsApp</Text></Pressable>
          <Pressable style={[styles.button, {backgroundColor: theme.primaryLight}]} onPress={() => setShareMenuOpen(false)}><Text style={[styles.buttonText, {color: theme.text}]}>Cancelar</Text></Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  </ScrollView></GradientBackground>;
}

const styles = StyleSheet.create({loader: {flex: 1}, content: {padding: 20, gap: 12}, titleInput: {fontSize: 28, fontWeight: '700', borderBottomWidth: 1, paddingVertical: 8}, card: {padding: 18, borderWidth: 1, borderRadius: 22, gap: 8}, label: {fontSize: 15, borderBottomWidth: 1, paddingVertical: 6}, input: {fontSize: 17, borderBottomWidth: 1, paddingVertical: 8}, row: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8}, smallButton: {padding: 10, borderRadius: 999, flex: 1, alignItems: 'center'}, button: {padding: 14, borderRadius: 999, alignItems: 'center'}, buttonText: {color: '#FFF', fontWeight: '700'}, modalOverlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'}, modalCard: {width: '85%', borderRadius: 24, borderWidth: 1, padding: 20, gap: 12, elevation: 6}, modalTitle: {fontSize: 20, fontWeight: '700', textAlign: 'center'}, photo: {width: 120, height: 120, borderRadius: 16}});
