import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

const TABS = ['전체', '나눔받기', '나눔하기'];

const dummyChats = [
  { id: 1, name: '익명1', lastMessage: '안녕하세요? 나눔 가능할까요?', time: '오후 3:20', unread: 1, type: '나눔받기' },
  { id: 2, name: '익명2', lastMessage: '안녕하세요!', time: '오후 1:05', unread: 0, type: '나눔하기' },
  { id: 3, name: '익명3', lastMessage: '안녕하세요!', time: '오전 11:30', unread: 0, type: '나눔받기' },
  { id: 4, name: '익명4', lastMessage: '안녕하세요!', time: '어제', unread: 0, type: '나눔하기' },
  { id: 5, name: '익명5', lastMessage: '안녕하세요!', time: '어제', unread: 0, type: '나눔받기' },
];

export default function ChatScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('전체');

  const filteredChats = activeTab === '전체'
    ? dummyChats
    : dummyChats.filter(c => c.type === activeTab);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>대화</Text>
      </View>

      {/* 탭 */}
      <View style={styles.tabBar}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* 채팅 목록 */}
      <ScrollView>
        {filteredChats.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>채팅이 없어요</Text>
          </View>
        ) : (
          filteredChats.map(chat => (
            <TouchableOpacity
              key={chat.id}
              style={styles.chatItem}
              onPress={() => navigation.navigate('ChatRoom', { chat })}
            >
              <View style={styles.avatar} />
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{chat.name}</Text>
                <Text style={styles.chatLastMessage} numberOfLines={1}>
                  {chat.lastMessage}
                </Text>
              </View>
              <View style={styles.chatMeta}>
                <Text style={styles.chatTime}>{chat.time}</Text>
                {chat.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{chat.unread}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBF9FF' },
  header: {
    paddingTop: 80,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerTitle: { fontSize: 25, fontWeight: 'bold', color: '#495057' },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
    paddingHorizontal: 20,
  },
  tabItem: {
    marginRight: 24,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabText: { fontSize: 15, color: '#adb5bd' },
  tabTextActive: { color: '#495057', fontWeight: 'bold' },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#495057',
    borderRadius: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f1f3f5',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dee2e6',
    marginRight: 14,
  },
  chatInfo: { flex: 1 },
  chatName: { fontSize: 15, fontWeight: 'bold', color: '#495057', marginBottom: 4 },
  chatLastMessage: { fontSize: 13, color: '#adb5bd' },
  chatMeta: { alignItems: 'flex-end', gap: 6 },
  chatTime: { fontSize: 12, color: '#adb5bd' },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  unreadText: { fontSize: 11, color: '#ffffff', fontWeight: 'bold' },
  emptyContainer: { flex: 1, alignItems: 'center', paddingTop: 80 },
  emptyText: { fontSize: 15, color: '#adb5bd' },
});
