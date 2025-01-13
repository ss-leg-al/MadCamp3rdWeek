import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,KeyboardAvoidingView } from 'react-native';
import CustomHeader from '@/components/CustomHeader';

export default function ChatbotScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '안녕하세요! 무엇이든 물어보세요' },
    {role: 'system', content: '너는 영화 전문가야. 영화 추천, 리뷰, 평론, cgv, 롯데시네마, 메가박스 등에 대해 말해.'},
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `, // 키를 직접 삽입
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: updatedMessages,
        }),
      });

      const data = await response.json();
      const botMessage = { role: 'assistant', content: data.choices[0].message.content };
      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: '죄송합니다, 요청을 처리하는 중 문제가 발생했습니다.',
      };
      setMessages([...updatedMessages, errorMessage]);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="" />
      <ScrollView style={styles.chatContainer}>
        {messages
        .filter((message) => message.role !== 'system') // system 메시지 필터링
        .map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.role === 'user' ? styles.userBubble : styles.assistantBubble,
            ]}
          >
            <Text style={styles.messageText}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.centeredInputContainer}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={setInput}
          placeholder="메시지를 입력하세요..."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 90,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '75%',
  },
  userBubble: {
    backgroundColor: '#ffa593bd',
    alignSelf: 'flex-end',
  },
  assistantBubble: {
    backgroundColor: '#EDEDED',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 18,
  },
  centeredInputContainer: {
    position: 'absolute',
    top: '90%',
    left: '3%',
    right: '3%',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor:'#DC143C',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});