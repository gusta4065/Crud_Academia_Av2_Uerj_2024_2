import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Avatar, IconButton, FAB, Button } from 'react-native-paper';
import { Link } from 'expo-router';

export default function Tab() {
  // Estado para armazenar o FAB selecionado
  const [selectedCircle, setSelectedCircle] = useState<number | null>(null);

  // Função para alternar o FAB selecionado
  const toggleCircle = (key: number) => {
    setSelectedCircle((prev) => (prev === key ? null : key));
  };

  return (
    <Card style={styles.container}>
      <Card.Title
        title="Criar novo Treino"
        left={(props) => <Avatar.Icon {...props} icon="plus" />}
        /* right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => console.log('oiii')} /> } */
      />
      <Card.Content>
        <Text>Em quantos dias vão ser divididos o seu treino? </Text>
        <View style={styles.days_container}>
          <FAB icon={`numeric-1-circle${selectedCircle === 1 ? '' : '-outline'}`} onPress={() => toggleCircle(1)} />
          <FAB icon={`numeric-2-circle${selectedCircle === 2 ? '' : '-outline'}`} onPress={() => toggleCircle(2)} />
          <FAB icon={`numeric-3-circle${selectedCircle === 3 ? '' : '-outline'}`} onPress={() => toggleCircle(3)} />
          <FAB icon={`numeric-4-circle${selectedCircle === 4 ? '' : '-outline'}`} onPress={() => toggleCircle(4)} />
        </View>
        <View style={styles.button}>  
          <Button mode="contained" onPress={() => console.log(`Redirecionando parametro {id: ${selectedCircle} } `)}>
            <Link push href={{
              pathname: '/workoutForms/workoutForm',
              params: {
                day : selectedCircle,
                workout_id: (Math.random() + 1).toString(36).substring(7),
              }
            }}>Confirmar</Link>
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  days_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button:{
    alignItems: 'flex-end',
    //flex: 2,
    marginTop: 30,
    width: 215,
  }
});
