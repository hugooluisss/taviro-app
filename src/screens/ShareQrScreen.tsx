import React from 'react';
import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useShareQrController} from '../controllers';
import {useTheme} from '../theme';

export function ShareQrScreen() {
  const theme = useTheme();
  const {profile, selectedFieldIds, toggleField, vcard, loading} = useShareQrController();

  if (loading) return <ActivityIndicator style={styles.loader} color={theme.primary} />;
  return <ScrollView style={{backgroundColor: theme.background}} contentContainerStyle={styles.content}>
    <Text style={[styles.title, {color: theme.text}]}>Compartir por QR</Text>
    <Text style={[styles.subtitle, {color: theme.muted}]}>Elige los campos que quieres compartir.</Text>
    <View style={[styles.card, {backgroundColor: theme.surface, borderColor: theme.border}]}>
      {profile.fields.map(field => {
        const checked = selectedFieldIds.includes(field.id);
        return <Pressable key={field.id} accessibilityRole="checkbox" accessibilityState={{checked}} onPress={() => toggleField(field.id)} style={styles.field}>
          <Text style={{color: checked ? theme.primary : theme.muted}}>{checked ? '☑' : '☐'}</Text>
          <Text style={[styles.fieldText, {color: theme.text}]}>{field.label || 'Campo sin etiqueta'}</Text>
        </Pressable>;
      })}
    </View>
    <View style={[styles.qrCard, {backgroundColor: theme.surface, borderColor: theme.border}]}>
      <QRCode value={vcard} size={240} color={theme.text} backgroundColor={theme.surface} />
      <Text style={[styles.hint, {color: theme.muted}]}>Escanea este código para guardar tu contacto.</Text>
    </View>
  </ScrollView>;
}

export default ShareQrScreen;

const styles = StyleSheet.create({
  loader: {flex: 1},
  content: {padding: 20, gap: 12},
  title: {fontSize: 28, fontWeight: '700'},
  subtitle: {fontSize: 16, marginBottom: 8},
  card: {padding: 14, borderWidth: 1, borderRadius: 12, gap: 14},
  field: {flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 32},
  fieldText: {fontSize: 17},
  qrCard: {alignItems: 'center', padding: 20, borderWidth: 1, borderRadius: 12, gap: 16},
  hint: {fontSize: 14, textAlign: 'center'},
});
