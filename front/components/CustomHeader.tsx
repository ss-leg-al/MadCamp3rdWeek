// components/CustomHeader.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function CustomHeader({ title }: { title: string }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 36,
        zIndex: 1000,
        //borderBottomLeftRadius: 16, // 왼쪽 하단 둥글게
        //borderBottomRightRadius: 16, // 오른쪽 하단 둥글게
        shadowColor: '#000', // 그림자 색상 (검정)
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치 (아래로 약간)
        shadowOpacity: 0.2, // 그림자 투명도
        shadowRadius: 4, // 그림자 퍼짐 정도
      },
  headerText: {
    color: '#DC143C',

    fontSize: 18,
    fontWeight: 'bold',
  },
});