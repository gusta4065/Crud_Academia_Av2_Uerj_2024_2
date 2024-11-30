import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="createWorkout"
        options={{
          title: 'Criar treino',
          tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="dumbbell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'index',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
    </Tabs>
  );
}
