import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

const dummyMyPosts = [
  { id: 1, title: '양상추 나눔해요', description: '당일 구매했는데, 많아서...', date: '26.04.01', emoji: '🥬', food: '양상추', category: '채소/과일', expiryDate: '26.04.10', image: null },
  { id: 2, title: '방울토마토 반팩', description: '반팩 정도 있어요', date: '26.04.03', emoji: '🍅', food: '방울토마토', category: '채소/과일', expiryDate: '26.04.08', image: null },
  { id: 3, title: '식빵 나눔', description: '유통기한이 오늘까지예요', date: '26.04.05', emoji: '🍞', food: '식빵', category: '쌀/면/빵', expiryDate: '26.04.05', image: null },
];

export default function MyPostsScreen({ navigation }) {
  const [posts, setPosts] = useState(dummyMyPosts);

  const handleDelete = (id) => {
    Alert.alert('삭제', '게시글을 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제', style: 'destructive', onPress: () => {
          setPosts(prev => prev.filter(p => p.id !== id));
        }
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>＜</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내가 쓴 글</Text>
        <View style={{ width: 24 }} />
      </View>

      {posts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>작성한 글이 없어요.</Text>
        </View>
      ) : (
        <ScrollView>
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postImageBox}>
                <Text style={styles.postEmoji}>{post.emoji}</Text>
              </View>
              <View style={styles.postInfo}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postDesc} numberOfLines={1}>{post.description}</Text>
                <Text style={styles.postDate}>{post.date}</Text>
              </View>
              <View style={styles.postActions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate('MyPostEdit', { post })}
                >
                  <Text style={styles.editButtonText}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(post.id)}
                >
                  <Text style={styles.deleteButtonText}>삭제</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
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
  },
  backButton: { fontSize: 24, fontWeight: 'bold', color: '#495057' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#495057' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 15, color: '#adb5bd' },
  postCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dee2e6',
    gap: 14,
  },
  postImageBox: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#f1f3f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postEmoji: { fontSize: 28 },
  postInfo: { flex: 1 },
  postTitle: { fontSize: 16, fontWeight: 'bold', color: '#495057', marginBottom: 4 },
  postDesc: { fontSize: 13, color: '#adb5bd', marginBottom: 4 },
  postDate: { fontSize: 12, color: '#dee2e6' },
  postActions: { gap: 8 },
  editButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  editButtonText: { fontSize: 13, color: '#495057' },
  deleteButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  deleteButtonText: { fontSize: 13, color: '#FF6B6B' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  editModal: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  editModalTitle: { fontSize: 17, fontWeight: 'bold', color: '#495057', marginBottom: 20 },
  editLabel: { fontSize: 13, color: '#adb5bd', marginBottom: 6 },
  editInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#495057',
    backgroundColor: '#f8f9fa',
    marginBottom: 16,
  },
  editTextarea: {
    height: 100,
    paddingTop: 12,
  },
  editButtons: { flexDirection: 'row', gap: 12 },
  cancelButton: {
    flex: 1, height: 48, borderRadius: 8,
    borderWidth: 1, borderColor: '#dee2e6',
    alignItems: 'center', justifyContent: 'center',
  },
  cancelButtonText: { fontSize: 15, color: '#495057' },
  saveButton: {
    flex: 1, height: 48, borderRadius: 8,
    backgroundColor: '#87CEEB',
    alignItems: 'center', justifyContent: 'center',
  },
  saveButtonText: { fontSize: 15, color: '#ffffff', fontWeight: 'bold' },
});
