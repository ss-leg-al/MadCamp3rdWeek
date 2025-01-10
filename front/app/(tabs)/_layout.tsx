// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#444' },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#333' },
        tabBarActiveTintColor: 'tomato',
        headerShown: false, // 헤더 숨김
        
      }}
    >
      {/* expo-router가 (tabs)/index.tsx, (tabs)/movies.tsx, (tabs)/profile.tsx 등을 자동으로 탭에 매핑 */}
    </Tabs>
  );
}