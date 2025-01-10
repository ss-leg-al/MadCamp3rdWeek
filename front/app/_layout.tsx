// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#DC143C' },
        headerTintColor: '#fff',
  
      }}
    >
      {/* 하위 라우트( app/index.tsx, (tabs), (detail) 등 )가 여기 스택 안에서 동작 */}
    </Stack>
  );
}