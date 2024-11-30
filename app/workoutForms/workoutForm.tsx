import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Card, Button, FAB } from 'react-native-paper';

export default function WorkoutForm() {
  const router = useRouter();
  const  {day, workout_id} = useLocalSearchParams(); // Recebe o parâmetro enviado
  
  const dayS = Array.isArray(day) ? day[0] : day;

  
  const allCards = [
    { id: 'A', title: 'Treino A', },
    { id: 'B', title: 'Treino B', },
    { id: 'C', title: 'Treino C', },
    { id: 'D', title: 'Treino D', },
  ];

  const [cards, setCards] = useState(allCards);

  // Atualiza o número de cards a serem exibidos com base no parâmetro da URL
  useEffect(() => {
    const cardCount = parseInt(dayS, 10) || allCards.length; // Usa o parâmetro ou exibe todos os cards por padrão
    setCards(allCards.slice(0, cardCount));
  }, [dayS]);

  const handleEdit = (card_id: string) => {
    router.push({
      pathname: '/workoutForms/edit/[cardId]',
      params: {
        workout_id: workout_id,
        cardId: card_id
      },
    });
  };

  const handleSave = () => {
    router.back()
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text>esse é o id do treino {workout_id}</Text>
        {cards.map((card) => (
          <Card key={card.id} style={styles.card}>
            <Card.Title title={card.title} />
            <Card.Actions>
              <Button onPress={() => handleEdit(card.id)}>Editar</Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        label="Voltar"
        icon="content-save"
        onPress={handleSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
  },
  description: {
    fontSize: 12,
    color: '#6b6b6b',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
});