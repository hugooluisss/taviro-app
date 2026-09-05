import React from 'react';
import {ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../App';
import {useCardsController} from '../controllers';
import {useTheme} from '../theme';
import {GradientBackground} from '../components/GradientBackground';

export function CardListScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {cards, loading, createCard, duplicateCard, deleteCard} = useCardsController();
  if (loading) return <ActivityIndicator style={styles.loader} color={theme.primary} />;
  const addCard = async () => { const card = await createCard('Nueva tarjeta'); navigation.navigate('CardEdit', {cardId: card.id}); };
  return <GradientBackground><ScrollView contentContainerStyle={styles.content}>
    <Text style={[styles.title, {color: theme.onGradientText}]}>Mis tarjetas</Text>
    {cards.map(card => <View key={card.id} style={[styles.card, {backgroundColor: theme.cardOverlay, borderColor: theme.cardOverlayBorder}]}>
      <Pressable onPress={() => navigation.navigate('CardEdit', {cardId: card.id})} style={styles.info}><Text style={[styles.cardName, {color: theme.onGradientText}]}>{card.name}</Text><Text style={{color: theme.onGradientMuted}}>{card.fields.length} campos</Text></Pressable>
      <View style={styles.row}><Pressable onPress={() => duplicateCard(card.id)}><Text style={{color: theme.primary}}>⎘ Duplicar</Text></Pressable><Pressable onPress={() => Alert.alert('Eliminar tarjeta', `¿Eliminar ${card.name}?`, [{text: 'Cancelar'}, {text: 'Sí', onPress: () => deleteCard(card.id)}])}><Text style={{color: theme.error}}>⌫ Eliminar</Text></Pressable></View>
    </View>)}
    <Pressable style={[styles.button, {backgroundColor: theme.primary}]} onPress={addCard}><Text style={styles.buttonText}>+ Nueva tarjeta</Text></Pressable>
  </ScrollView></GradientBackground>;
}

const styles = StyleSheet.create({loader: {flex: 1}, content: {padding: 20, gap: 12}, title: {fontSize: 28, fontWeight: '700', marginBottom: 8}, card: {padding: 18, borderWidth: 1, borderRadius: 22, gap: 12}, info: {gap: 4}, cardName: {fontSize: 19, fontWeight: '700'}, row: {flexDirection: 'row', justifyContent: 'space-between'}, button: {padding: 15, borderRadius: 999, alignItems: 'center'}, buttonText: {color: '#FFF', fontWeight: '700'}});
export default CardListScreen;
