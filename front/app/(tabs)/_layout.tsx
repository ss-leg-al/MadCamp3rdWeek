import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#444' },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopLeftRadius: 20, // 위 왼쪽 모서리 둥글게
          borderTopRightRadius: 20, // 위 오른쪽 모서리 둥글게
          overflow: 'hidden', // 둥근 모서리가 적용되도록 설정
          position: 'absolute', // 탭 바를 화면 위로 띄우기 (필요시)
          bottom: 0, // 화면 하단에 고정
        },
        tabBarActiveTintColor: '#DC143C',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="movies"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}