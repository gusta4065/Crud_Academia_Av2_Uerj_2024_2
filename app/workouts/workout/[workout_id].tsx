import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';

// Define a interface para os dados da sessão
interface Session {
    session_id: string;
    session_exercises?: any[]; // Adicione propriedades adicionais, se necessário
  }

export default function Tab() {
  const { workout_id } = useLocalSearchParams();
  const workoutId = Array.isArray(workout_id) ? workout_id[0] : workout_id;

  // Armazena IDs dos exercícios concluídos
  const [finishedWorkouts, setFinishedWorkouts] = useState<string[]>([]);

  // Função para alternar o estado de conclusão de um exercício
  const toggleExercise = (key: string) => {
    setFinishedWorkouts((prev) =>
      prev.includes(key) ? prev.filter((id) => id !== key) : [...prev, key]
    );
  };

  async function getSessionId(): Promise<Session[]> {
    try {
        const {getItem} = useAsyncStorage(workoutId);
        const storedData = await getItem();
        if(storedData!=null){
            return JSON.parse(storedData);
            //const parsedData =  JSON.parse(storedData);
            //return parsedData.map((item: { session_id: string; }) => item.session_id);
        }else {
            console.log('Nenhum dado encontrado na chave "@Workout1".');
            return [];
        }
    } catch (error) {
        console.error('Erro ao buscar dados do AsyncStorage:', error);
        return [];
    }
}
  
  
  // Lista inicial de exercícios
  const [sessions, setSessionsId] = useState<Session[]>([]);
  useEffect(() => {
    const fetchSessionIds = async () => {
      const sessionIds = await getSessionId();
      setSessionsId(sessionIds);
    };
  
    fetchSessionIds();
  }, []);
  

  return (
    <View style={styles.container}>
      <ScrollView>
        {sessions.map((card) => (
            <View key={card.session_id}>
            <View style={{ position: 'relative', marginBottom: 8 }}>
              <Card
                style={[
                  styles.card,
                  finishedWorkouts.includes(card.session_id) && styles.cardCompleted,
                ]}
              >
                <Card.Content>
                <TouchableOpacity onPress={()=>{
                router.push({
                  pathname: '/workouts/sessions/[session_id]',
                  params: {
                    session_id: card.session_id,
                    workout_id: workout_id,
                }
                })
              }}>
                  <View style={styles.workoutText}>
                    <Text
                      style={[
                        styles.workoutItem,
                        finishedWorkouts.includes(card.session_id) &&
                          styles.workoutItemCompleted,
                      ]}
                    >
                      Treino {card.session_id}
                    </Text>
                  </View>
                </TouchableOpacity>
                  <View style={styles.action_buttonsContainer}>
                    <Button
                      icon={`check-underline-circle${
                        finishedWorkouts.includes(card.session_id) ? '' : '-outline'
                      }`}
                      compact={true}
                      style={styles.action_button}
                      onPress={() => toggleExercise(card.session_id)}
                    >
                      {finishedWorkouts.includes(card.session_id)
                        ? 'Concluído'
                        : 'Concluir'}
                    </Button>
                    <Button
                      icon="trash-can-outline"
                      compact={true}
                      style={styles.action_button}
                      onPress={() =>
                        setSessionsId((prev) =>
                          prev.filter((item) => item.session_id !== card.session_id)
                        )
                      }
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
