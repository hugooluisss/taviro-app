import React from 'react';
import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';
import QRCode from 'react-native-qrcode-svg';
import {useShareQrController} from '../controllers';
import {useTheme} from '../theme';
import {GradientBackground} from '../components/GradientBackground';

export function ShareQrScreen() {
  const theme = useTheme();
  const {cardId} = useRoute<NativeStackScreenProps<RootStackParamList, 'ShareQr'>['route']>().params;
  const {card, selectedFieldIds, toggleField, vcard, loading} = useShareQrController(cardId);

  if (loading) return <ActivityIndicator style={styles.loader} color={theme.primary} />;
  return <GradientBackground><ScrollView contentContainerStyle={styles.content}>
    <Text style={[styles.title, {color: theme.onGradientText}]}>Compartir por QR</Text>
    <Text style={[styles.subtitle, {color: theme.onGradientMuted}]}>Elige los campos que quieres compartir.</Text>
    <View style={[styles.card, {backgroundColor: theme.cardOverlay, borderColor: theme.cardOverlayBorder}]}>
      {card.fields.map(field => {
        const checked = selectedFieldIds.includes(field.id);
        return <Pressable key={field.id} accessibilityRole="checkbox" accessibilityState={{checked}} onPress={() => toggleField(field.id)} style={styles.field}>
          <Text style={{color: checked ? theme.primary : theme.onGradientMuted}}>{checked ? '☑' : '☐'}</Text>
          <Text style={[styles.fieldText, {color: theme.onGradientText}]}>{field.label || 'Campo sin etiqueta'}</Text>
        </Pressable>;
      })}
    </View>
    <View style={[styles.qrCard, {backgroundColor: theme.cardOverlay, borderColor: theme.cardOverlayBorder}]}>
      <QRCode value={vcard} size={240} color={theme.onGradientText} backgroundColor={theme.cardOverlay} />
      <Text style={[styles.hint, {color: theme.onGradientMuted}]}>Escanea este código para guardar tu contacto.</Text>
    </View>
  </ScrollView></GradientBackground>;
}

export default ShareQrScreen;

const styles = StyleSheet.create({
  loader: {flex: 1},
  content: {padding: 20, gap: 12},
  title: {fontSize: 28, fontWeight: '700'},
  subtitle: {fontSize: 16, marginBottom: 8},
  card: {padding: 18, borderWidth: 1, borderRadius: 22, gap: 14},
  field: {flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 32},
  fieldText: {fontSize: 17},
  qrCard: {alignItems: 'center', padding: 20, borderWidth: 1, borderRadius: 22, gap: 16},
  hint: {fontSize: 14, textAlign: 'center'},
});
