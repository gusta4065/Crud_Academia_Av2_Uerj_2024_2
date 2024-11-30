import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';

// Define o tipo para o Workout
interface Workout {
  id: string; // A chave usada como ID
  title: string; // Título (exemplo: a própria chave)
  days: number; // Número de elementos armazenados
}
async function getWorkouts(): Promise<Workout[]> {
  try {
    const keys = await AsyncStorage.getAllKeys(); // Obtém todas as chaves
    if (keys && keys.length > 0) {
      const keyValues = await AsyncStorage.multiGet(keys); // Busca os valores correspondentes às chaves
      return keyValues.map(([key, value]) => ({
        id: key, // Usa a chave como ID
        title: key, // Exemplo: usa a chave como título
        days: value ? JSON.parse(value).length : 0, // Faz o parse do valor ou exibe um fallback
      }));
    }
  } catch (e) {
    console.error('Erro ao buscar treinos do AsyncStorage', e);
  }
  return [];
}


export default function Tab() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    // Busca os dados armazenados no AsyncStorage
    const fetchData = async () => {
      const storedWorkouts = await getWorkouts();
      setWorkouts(storedWorkouts);
    };
    fetchData();
  }, []);



  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.workoutItem}>
              <TouchableOpacity onPress={()=>{
                router.push({
                  pathname: '/workouts/workout/[workout_id]',
                  params: {workout_id: item.id}
                })
              }}>
                <View style={styles.workoutText}>
                  <Text style={styles.workoutTitle}>{item.title}</Text>
                  {/*<Text>{item.description}</Text>*/}
                </View>
              </TouchableOpacity>
              <View style={styles.action_buttonsContainer}>
                <Button icon="trash-can-outline" compact={true}  style={styles.action_button} onPress={async () => {
                    await AsyncStorage.removeItem(item.id); // Remove o item do AsyncStorage
                    setWorkouts((prevWorkouts) =>
                      prevWorkouts.filter((workout) => workout.id !== item.id)
                    ); // Atualiza a lista
                  }}>Excluir</Button>
                <Button icon="note-edit-outline" compact={true}  style={styles.action_button} onPress={() => router.push({
                  pathname: '/workoutForms/workoutForm',
                  params: {workout_id: item.id, day :item.days}
                })}>Editar</Button>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Nenhum treino disponível.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  workoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
    marginBottom: 4,
  },
  workoutText: {
    flex: 3,
    marginRight: 10,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  action_buttonsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end', // Alinha os botões no canto direito
    justifyContent: 'space-between',
  },
  action_button: {
    marginVertical: 5, // Margem vertical para espaçamento entre os botões
  },
});

