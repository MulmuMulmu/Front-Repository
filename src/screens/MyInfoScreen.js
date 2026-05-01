import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { changePassword, logout, deleteAccount } from '../api/auth';
import { clearToken } from '../api/token';

export default function MyInfoScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState(null);
  const [nickname, setNickname] = useState('물무');
  const [nicknameModalVisible, setNicknameModalVisible] = useState(false);
  const [nicknameInput, setNicknameInput] = useState('');
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [pwModalVisible, setPwModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwLoading, setPwLoading] = useState(false);

  const openCamera = async () => {
    setPhotoModalVisible(false);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('카메라 접근 권한이 필요합니다.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setProfileImage(result.assets[0].uri);
  };

  const openGallery = async () => {
    setPhotoModalVisible(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('갤러리 접근 권한이 필요합니다.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setProfileImage(result.assets[0].uri);
  };

  const handleNicknameSave = () => {
    if (nicknameInput.trim() === '') {
      Alert.alert('닉네임을 입력해주세요.');
      return;
    }
    setNickname(nicknameInput.trim());
    setNicknameModalVisible(false);
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert('알림', '모든 항목을 입력해주세요.');
      return;
    }
    setPwLoading(true);
    try {
      const data = await changePassword({ oldPassword, newPassword });
      if (data.success) {
        Alert.alert('완료', data.result, [
          { text: '확인', onPress: () => {
            setPwModalVisible(false);
            setOldPassword('');
            setNewPassword('');
          }},
        ]);
      } else {
        Alert.alert('오류', data.result || '비밀번호를 변경할 수 없습니다.');
      }
    } catch (e) {
      Alert.alert('오류', '서버와 연결할 수 없습니다.');
    } finally {
      setPwLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('로그아웃', '로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '로그아웃', style: 'destructive', onPress: async () => {
          try {
            await logout();
          } catch (e) {
            // 서버 오류여도 클라이언트에서는 로그아웃 진행
          } finally {
            clearToken();
            navigation.replace('Login');
          }
        }
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert('회원 탈퇴', '정말 탈퇴하시겠습니까?\n탈퇴 후 복구가 불가능합니다.', [
      { text: '취소', style: 'cancel' },
      {
        text: '탈퇴', style: 'destructive', onPress: async () => {
          try {
            const data = await deleteAccount();
            if (!data.success) {
              Alert.alert('오류', data.result || '회원탈퇴를 할 수 없습니다.');
              return;
            }
          } catch (e) {
            Alert.alert('오류', '서버와 연결할 수 없습니다.');
            return;
          }
          clearToken();
          navigation.replace('Login');
        }
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>내 정보</Text>
      </View>

      <ScrollView>
        {/* 프로필 */}
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={() => setPhotoModalVisible(true)}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder} />
            )}
            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={14} color="#495057" />
            </View>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 14, gap: 6 }}>
            <Text style={styles.nickname}>{nickname}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setNicknameInput(nickname);
                setNicknameModalVisible(true);
              }}
            >
              <Ionicons name="create-outline" size={20} color="#adb5bd" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 거래 섹션 */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>거래</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyPosts')}>
            <Text style={styles.menuItemText}>내가 쓴 글</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={() => navigation.navigate('MyShareHistory')}>
            <Text style={styles.menuItemText}>나눔 내역</Text>
          </TouchableOpacity>
        </View>

        {/* 계정 섹션 */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>계정</Text>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>아이디</Text>
            <Text style={styles.menuItemValue}>mulmoo</Text>
          </View>
          <TouchableOpacity style={styles.menuItem} onPress={() => setPwModalVisible(true)}>
            <Text style={styles.menuItemText}>비밀번호 변경</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}
            onPress={() => navigation.navigate('Allergy')}>
            <Text style={styles.menuItemText}>알레르기 / 식성 수정</Text>
          </TouchableOpacity>
        </View>

        {/* 기타 섹션 */}
        <View style={[styles.card, { marginBottom: 40 }]}>
          <Text style={styles.cardSectionTitle}>기타</Text>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuItemText}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={handleDeleteAccount}>
            <Text style={[styles.menuItemText, { color: '#FF6B6B' }]}>회원 탈퇴</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 닉네임 수정 모달 */}
      <Modal visible={nicknameModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.nicknameModal}>
            <Text style={styles.nicknameModalTitle}>닉네임 수정</Text>
            <TextInput
              style={styles.nicknameInput}
              value={nicknameInput}
              onChangeText={setNicknameInput}
              placeholder="새 닉네임을 입력해주세요"
              placeholderTextColor="#adb5bd"
              autoFocus
            />
            <View style={styles.nicknameModalButtons}>
              <TouchableOpacity
                style={styles.nicknameModalCancel}
                onPress={() => setNicknameModalVisible(false)}
              >
                <Text style={styles.nicknameModalCancelText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nicknameModalSave}
                onPress={handleNicknameSave}
              >
                <Text style={styles.nicknameModalSaveText}>저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 비밀번호 변경 모달 */}
      <Modal visible={pwModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.nicknameModal}>
            <Text style={styles.nicknameModalTitle}>비밀번호 변경</Text>
            <TextInput
              style={[styles.nicknameInput, { marginBottom: 10 }]}
              value={oldPassword}
              onChangeText={setOldPassword}
              placeholder="현재 비밀번호"
              placeholderTextColor="#adb5bd"
              secureTextEntry
              autoFocus
            />
            <TextInput
              style={styles.nicknameInput}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="새 비밀번호"
              placeholderTextColor="#adb5bd"
              secureTextEntry
            />
            <View style={styles.nicknameModalButtons}>
              <TouchableOpacity
                style={styles.nicknameModalCancel}
                onPress={() => {
                  setPwModalVisible(false);
                  setOldPassword('');
                  setNewPassword('');
                }}
              >
                <Text style={styles.nicknameModalCancelText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.nicknameModalSave, pwLoading && { opacity: 0.6 }]}
                onPress={handlePasswordChange}
                disabled={pwLoading}
              >
                {pwLoading
                  ? <ActivityIndicator color="#ffffff" size="small" />
                  : <Text style={styles.nicknameModalSaveText}>변경</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 사진 변경 모달 */}
      {photoModalVisible && (
        <TouchableOpacity style={styles.photoOverlay} onPress={() => setPhotoModalVisible(false)}>
          <View style={styles.photoModal}>
            <Text style={styles.photoModalTitle}>프로필 사진 변경</Text>
            <View style={styles.photoOptionRow}>
              <TouchableOpacity style={styles.photoOption} onPress={openCamera}>
                <Ionicons name="camera-outline" size={30} color="#495057" />
                <Text style={styles.photoOptionLabel}>camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.photoOption} onPress={openGallery}>
                <Ionicons name="image-outline" size={30} color="#495057" />
                <Text style={styles.photoOptionLabel}>gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
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
  profileSection: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 28,
    backgroundColor: '#FBF9FF',
  },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 90, height: 90, borderRadius: 45 },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#87CEEB',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dee2e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nicknameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 6,
  },
  nickname: { fontSize: 18, fontWeight: 'bold', color: '#495057', textAlign: 'center' },
  editButton: { padding: 2 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardSectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#adb5bd',
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f1f3f5',
  },
  menuItemText: { fontSize: 15, color: '#495057' },
  menuItemValue: { fontSize: 14, color: '#adb5bd' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nicknameModal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
  },
  nicknameModalTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 16,
    textAlign: 'center',
  },
  nicknameInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#495057',
    marginBottom: 16,
  },
  nicknameModalButtons: { flexDirection: 'row', gap: 10 },
  nicknameModalCancel: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nicknameModalCancelText: { fontSize: 15, color: '#495057' },
  nicknameModalSave: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nicknameModalSaveText: { fontSize: 15, color: '#ffffff', fontWeight: 'bold' },
  photoOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end',
  },
  photoModal: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  photoModalTitle: { fontSize: 16, fontWeight: 'bold', color: '#495057', marginBottom: 16 },
  photoOptionRow: { flexDirection: 'row', gap: 16 },
  photoOption: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#f1f3f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  photoOptionIcon: { fontSize: 28, marginBottom: 4 },
  photoOptionLabel: { fontSize: 12, color: '#495057' },
});
