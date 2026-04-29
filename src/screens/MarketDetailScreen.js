import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const dummyDetail = {
  id: 1,
  title: '양상추 팔아요',
  food: '양상추',
  category: '원형 보존 농산물',
  description: '당일 샀는데, 혼자 먹기 많아서 나눔해요!',
  image: null,
  author: '물무',
  authorImage: null,
};

export default function MarketDetailScreen({ navigation, route }) {
  const post = route?.params?.post || dummyDetail;
  const detail = { ...dummyDetail, ...post };

  const handleReport = () => {
    Alert.alert('신고', '이 게시물을 신고하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '신고', style: 'destructive', onPress: () => Alert.alert('신고가 접수되었습니다.') },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* 사진 영역 */}
        <View style={styles.imageContainer}>
          {detail.image ? (
            <Image source={{ uri: detail.image }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderEmoji}>🥬</Text>
            </View>
          )}

          {/* 뒤로가기 */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>＜</Text>
          </TouchableOpacity>

          {/* 신고 */}
          <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
            <Ionicons name="alert-circle-outline" size={20} color="#495057" />
          </TouchableOpacity>
        </View>

        {/* 프로필 */}
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            {detail.authorImage ? (
              <Image source={{ uri: detail.authorImage }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder} />
            )}
          </View>
          <Text style={styles.authorName}>{detail.author}</Text>
        </View>

        <View style={styles.divider} />

        {/* 본문 */}
        <View style={styles.content}>
          <Text style={styles.title}>{detail.title}</Text>
          <Text style={styles.foodInfo}>
            {detail.food} ({detail.category})
          </Text>
          <Text style={styles.description}>{detail.description}</Text>
        </View>
      </ScrollView>

      {/* 채팅하기 버튼 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => navigation.navigate('채팅', {
            screen: 'ChatRoom',
            params: { chat: { name: detail.author }, post: detail },
          })}
        >
          <Text style={styles.chatButtonText}>채팅하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBF9FF' },
  imageContainer: {
    width: '100%',
    height: 280,
  },
  image: { width: '100%', height: 280 },
  imagePlaceholder: {
    width: '100%',
    height: 280,
    backgroundColor: '#e9ecef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderEmoji: { fontSize: 64 },
  backButton: {
    position: 'absolute',
    top: 52,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: { fontSize: 18, fontWeight: 'bold', color: '#495057' },
  reportButton: {
    position: 'absolute',
    top: 52,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportIcon: { fontSize: 18 },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    overflow: 'hidden',
  },
  avatarImage: { width: 40, height: 40 },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dee2e6',
  },
  authorName: { fontSize: 15, fontWeight: '600', color: '#495057' },
  divider: { height: 0.5, backgroundColor: '#dee2e6', marginHorizontal: 20 },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 120 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#495057', marginBottom: 8 },
  foodInfo: { fontSize: 14, color: '#adb5bd', marginBottom: 16 },
  description: { fontSize: 15, color: '#495057', lineHeight: 24 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBF9FF',
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#dee2e6',
  },
  chatButton: {
    height: 52,
    backgroundColor: '#87CEEB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatButtonText: { color: '#ffffff', fontSize: 17, fontWeight: 'bold' },
});
