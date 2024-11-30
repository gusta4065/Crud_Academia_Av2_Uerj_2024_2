import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';

type Exercise = {
  id: string;
  title?: string;
  name?: string;
  sets?: string;
  reps?: string;
};

type SessionExercises = {
  session_id: string;
  session_execices?: Exercise[];
};

const EditPage = () => {
  const router = useRouter();
  const { cardId, workout_id } = useLocalSearchParams();
  const newCardId = Array.isArray(cardId) ? cardId[0] : cardId;
  const workoutId = Array.isArray(workout_id) ? workout_id[0] : workout_id;

  const [exercises, setExercises] = useState<Exercise[]>([]);

  // const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (newCardId) {
        const storedExercises = await getExercises(newCardId);
        setExercises(storedExercises);
      }
    };
    fetchData();
  }, [newCardId]); // Reagir à mudança de newCardId

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


  
// Função para adicionar um novo exercício
  const addCard = () => {
    const newCard = createObject(exercises.length + 1); // Cria o novo objeto
    setExercises((prevexercises) => [...prevexercises, newCard]); // Atualiza o estado
  };

  const createObject = (length: number): Exercise => ({
    id: (Math.random() + 1).toString(36).substring(7),
    title: `Exercicio ${length}`,
    name: '',
    sets: '',
    reps: '',
  });

  const handleInputChange = (id: string, field: keyof Exercise, value: string) => {
    setExercises((prevexercises) =>
      prevexercises.map((card) =>
        card.id === id ? { ...card, [field]: value } : card
      )
    );
  };

  const handleSave = async () => {
    const session: SessionExercises = { session_id: newCardId, session_execices: exercises };
    asyncCallHandleSave(session);
    router.back();
  };

  async function asyncCallHandleSave(session: SessionExercises) {
    const { getItem, setItem } = useAsyncStorage(workoutId);
    try {
      const storedData = await getItem();
      let parsedData: SessionExercises[] = [];

      if (storedData) {
        parsedData = JSON.parse(storedData);
      }

      const index = parsedData.findIndex((item) => item.session_id === session.session_id);

      if (index !== -1) {
        parsedData[index] = session;
      } else {
        parsedData.push(session);
      }

      await setItem(JSON.stringify(parsedData));
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {exercises.map((card) => (
          <View key={card.id} style={{ position:'relative', marginBottom: 8 }}>
            <Card style={{flex:2}}>
              <Card.Content>
                <Text style={styles.title}>{card.title}</Text>
                <View style={styles.action_buttonsContainer}>
                {/*<Text style={{flex:1, flexDirection:'row-reversed', fontSize:30}}>{card.name}</Text>*/}
                  <Button
                        icon="trash-can-outline"
                        compact={true}
                        style={styles.action_button}
                        onPress={() =>
                          setExercises((prev) =>
                            prev.filter((item) => item.id !== card.id)
                          )
                        }
                      >
                        Excluir
                  </Button>
                  
                </View>
                <Text > Exercicio</Text>
                <TextInput label={card.name != ''? card.name : '' } mode="outlined" style={styles.input} 
                onChangeText={(value) =>
                  handleInputChange(card.id, 'name', value)
                }
                />
                <Text > Series</Text>
                <TextInput label={card.sets != ''? card.sets : ''} mode="outlined" style={styles.input}
                onChangeText={(value) =>
                  handleInputChange(card.id, 'sets', value)
                }
                />
                <Text >Repetições (8-12)</Text>
                <TextInput
                  label={card.reps != ''? card.reps : ""} 
                  mode="outlined"
                  style={styles.input}
                  onChangeText={(value) =>
                    handleInputChange(card.id, 'reps', value)
                  }
                />
              </Card.Content>
            </Card>
          </View>
        ))}
      </ScrollView>
      <Button mode="contained" onPress={addCard} style={styles.button}>
        Novo Exercício
      </Button>
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Salvar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  action_buttonsContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  action_button: {
    marginVertical: 5,
  },
  button: {
    marginTop: 16,
  },
});

export default EditPage;
