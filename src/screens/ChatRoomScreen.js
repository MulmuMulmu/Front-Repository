import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const dummyMessages = [
  { id: 1, text: '안녕하세요? 나눔 가능할까요?', isMine: false, time: '오후 3:18', date: '2026년 4월 3일' },
  { id: 2, text: '네! 물론이죠', isMine: true, time: '오후 3:19', date: '2026년 4월 3일' },
  { id: 3, text: '내일 오후 가능할까요?', isMine: false, time: '오후 3:20', date: '2026년 4월 3일' },
];

export default function ChatRoomScreen({ navigation, route }) {
  const chat = route?.params?.chat || { name: '익명1' };
  const post = route?.params?.post || { title: '양상추', description: '당일 구매했는데, 많아서...', image: null };
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), text: input.trim(), isMine: true, time: '방금' },
    ]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>＜</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{chat.name}</Text>
        <TouchableOpacity>
          <Text style={styles.doneButton}>완료</Text>
        </TouchableOpacity>
      </View>

      {/* 메시지 목록 */}
      <ScrollView
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
      >
        {/* 게시물 카드 */}
        <View style={styles.postCard}>
          <View style={styles.postImageBox}>
            {post.image ? (
              <Image source={{ uri: post.image }} style={styles.postImage} />
            ) : (
              <Text style={styles.postImageEmoji}>🥬</Text>
            )}
          </View>
          <View style={styles.postCardInfo}>
            <Text style={styles.postCardTitle} numberOfLines={1}>{post.title}</Text>
            <Text style={styles.postCardDesc} numberOfLines={1}>{post.description}</Text>
          </View>
        </View>

        {/* 날짜 구분선 + 메시지 */}
        {messages.map((msg, index) => {
          const showDate = index === 0 || messages[index - 1].date !== msg.date;
          return (
            <View key={msg.id}>
              {showDate && (
                <View style={styles.dateSeparator}>
                  <Text style={styles.dateSeparatorText}>{msg.date}</Text>
                </View>
              )}
              <View style={[styles.messageRow, msg.isMine ? styles.messageRowMine : styles.messageRowOther]}>
                {!msg.isMine && <View style={styles.otherAvatar} />}
                <View style={styles.messageBubbleWrapper}>
                  <View style={[styles.bubble, msg.isMine ? styles.bubbleMine : styles.bubbleOther]}>
                    <Text style={[styles.bubbleText, msg.isMine && styles.bubbleTextMine]}>
                      {msg.text}
                    </Text>
                  </View>
                  <Text style={[styles.messageTime, msg.isMine && { textAlign: 'right' }]}>
                    {msg.time}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* 입력창 */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="메시지를 입력하세요"
          placeholderTextColor="#adb5bd"
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, input.trim() === '' && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={input.trim() === ''}
        >
          <Ionicons name="send" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBF9FF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
    backgroundColor: '#FBF9FF',
  },
  backButton: { fontSize: 24, fontWeight: 'bold', color: '#495057' },
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: '#495057' },
  messageList: { flex: 1 },
  messageListContent: { padding: 16, gap: 12 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end' },
  messageRowMine: { justifyContent: 'flex-end' },
  messageRowOther: { justifyContent: 'flex-start' },
  otherAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#dee2e6',
    marginRight: 8,
    flexShrink: 0,
  },
  messageBubbleWrapper: { maxWidth: '70%', gap: 4 },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleMine: {
    backgroundColor: '#87CEEB',
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
    borderWidth: 0.5,
    borderColor: '#dee2e6',
  },
  bubbleText: { fontSize: 15, color: '#495057', lineHeight: 22 },
  bubbleTextMine: { color: '#ffffff' },
  messageTime: { fontSize: 11, color: '#adb5bd' },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#dee2e6',
    backgroundColor: '#FBF9FF',
    gap: 10,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    fontSize: 15,
    color: '#495057',
  },
  sendButton: {
    width: 44,
    height: 44,
    backgroundColor: '#87CEEB',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: { backgroundColor: '#dee2e6' },
  doneButton: { fontSize: 16, color: '#87CEEB', fontWeight: 'bold' },
  postCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: '#dee2e6',
    gap: 12,
  },
  postImageBox: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#f1f3f5',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  postImage: { width: 52, height: 52 },
  postImageEmoji: { fontSize: 24 },
  postCardInfo: { flex: 1 },
  postCardTitle: { fontSize: 14, fontWeight: 'bold', color: '#495057', marginBottom: 4 },
  postCardDesc: { fontSize: 13, color: '#adb5bd' },
  dateSeparator: { alignItems: 'center', marginVertical: 12 },
  dateSeparatorText: { fontSize: 12, color: '#adb5bd' },
});
