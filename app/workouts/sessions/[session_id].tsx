import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';

type Exercise = {
  id: string;
  title: string;
  name: string;
  sets: string;
  reps: string;
};

export default function Tab() {
  const { session_id, workout_id } = useLocalSearchParams();

  // Certifique-se de que session_id e workout_id são strings
  const sessionId = Array.isArray(session_id) ? session_id[0] : session_id;
  const workoutId = Array.isArray(workout_id) ? workout_id[0] : workout_id;

  // Armazena IDs dos exercícios concluídos
  const [finishedExercises, setFinishedExercises] = useState<string[]>([]);

  // Função para alternar o estado de conclusão de um exercício
  const toggleExercise = (key: string) => {
    setFinishedExercises((prev) =>
      prev.includes(key) ? prev.filter((id) => id !== key) : [...prev, key]
    );
  };

  // Busca os exercícios de uma sessão específica
  async function getExercises(sessionId: string):Promise<Exercise[]> {
    try {
      const { getItem } = useAsyncStorage(workoutId || ''); // Garante que workoutId é string
      const storedWorkouts = await getItem();
      if (storedWorkouts) {
        const session = JSON.parse(storedWorkouts).find(
          (item: { session_id: string }) => item.session_id === sessionId
        );
        return session ? session.session_execices : [];
      }
    } catch (error) {
      console.error('Erro ao buscar exercícios:', error);
    }
    return [];
  }

  async function updateAsyncStorage(updatedExercises: Exercise[]) {
    try {
      const { setItem, getItem } = useAsyncStorage(workoutId || '');
      const storedWorkouts = await getItem();
  
      if (storedWorkouts) {
        const parsedWorkouts = JSON.parse(storedWorkouts);
        const updatedWorkouts = parsedWorkouts.map((workout: any) => {
          if (workout.session_id === sessionId) {
            return {
              ...workout,
              session_execices: updatedExercises,
            };
          }
          return workout;
        });
  
        await setItem(JSON.stringify(updatedWorkouts));
      }
    } catch (error) {
      console.error('Erro ao atualizar o AsyncStorage:', error);
    }
  }

  // Lista inicial de exercícios
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (sessionId) {
        const storedExercises = await getExercises(sessionId);
        setExercises(storedExercises);
      }
    };
    fetchData();
  }, [sessionId]); // Reagir à mudança de sessionId

  return (
    <View style={styles.container}>

      <ScrollView>
        {exercises.map((card) => (
          <View key={card.id}>
            <View style={{ position: 'relative', marginBottom: 8 }}>
              <Card
                style={[
                  styles.card,
                  finishedExercises.includes(card.id) && styles.cardCompleted,
                ]}
              >
                <Card.Content>
                  <View style={styles.workoutText}>
                    <Text
                      style={[
                        styles.workoutItem,
                        finishedExercises.includes(card.id) &&
                          styles.workoutItemCompleted,
                      ]}
                    >
                      {card.title}
                    </Text>
                    <Text style={{ fontSize: 32 }}>{card.name}</Text>
                    <Text style={{ fontSize: 22 }}>Séries: {card.sets}</Text>
                    <Text style={{ fontSize: 21 }}>Repetições: {card.reps}</Text>
                  </View>
                  <View style={styles.action_buttonsContainer}>
                    <Button
                      icon={`check-underline-circle${
                        finishedExercises.includes(card.id) ? '' : '-outline'
                      }`}
                      compact={true}
                      style={styles.action_button}
                      onPress={() => toggleExercise(card.id)}
                    >
                      {finishedExercises.includes(card.id)
                        ? 'Concluído'
                        : 'Concluir'}
                    </Button>
                    <Button
                      icon="trash-can-outline"
                      compact={true}
                      style={styles.action_button}
                      onPress={async () => {
                        setExercises((prev) => {
                          const updatedExercises = prev.filter((item) => item.id !== card.id);
                          // Atualize o AsyncStorage com a nova lista de exercícios
                          updateAsyncStorage(updatedExercises);
                          return updatedExercises;
                        });
                      }}
                    >
                    Excluir
                  </Button>
                  </View>
                </Card.Content>
              </Card>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  card: {
    flex: 2,
    backgroundColor: '#fff',
  },
  cardCompleted: {
    backgroundColor: '#d4edda', // Verde claro para indicar concluído
  },
  workoutItem: {
    fontSize: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
    marginBottom: 4,
  },
  workoutItemCompleted: {
    textDecorationLine: 'line-through', // Linha no texto para indicar conclusão
    color: '#6c757d', // Cor cinza
  },
  workoutText: {
    flex: 3,
    marginRight: 10,
  },
  action_buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  action_button: {
    marginVertical: 5,
  },
});
