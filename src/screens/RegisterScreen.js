import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { checkId, signup } from '../api/auth';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idChecked, setIdChecked] = useState(false);
  const [idCheckMessage, setIdCheckMessage] = useState('');
  const [idCheckSuccess, setIdCheckSuccess] = useState(false);

  const handleIdCheck = async () => {
    if (!id) {
      Alert.alert('알림', '아이디를 입력해주세요.');
      return;
    }
    try {
      const data = await checkId(id);
      setIdCheckMessage(data.result);
      setIdCheckSuccess(data.success);
      setIdChecked(data.success);
    } catch (e) {
      setIdCheckMessage('서버와 연결할 수 없습니다.');
      setIdCheckSuccess(false);
    }
  };

  const handleRegister = async () => {
    if (!name || !id || !password || !passwordConfirm) {
      Alert.alert('알림', '모든 항목을 입력해주세요.');
      return;
    }
    if (!idChecked) {
      Alert.alert('알림', '아이디 중복확인을 해주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert('알림', '비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    try {
      const data = await signup({ name, id, password, check_password: passwordConfirm });

      if (data.success) {
        Alert.alert('완료', data.result, [
          { text: '확인', onPress: () => navigation.navigate('Allergy') },
        ]);
      } else {
        Alert.alert('오류', data.result || '회원가입을 완료할 수 없습니다.');
      }
    } catch (e) {
      Alert.alert('오류', '서버와 연결할 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>아이디</Text>
        <View style={styles.idContainer}>
          <TextInput
            style={styles.idInput}
            value={id}
            onChangeText={(text) => {
              setId(text);
              setIdChecked(false);
              setIdCheckMessage('');
            }}
          />
          <TouchableOpacity style={styles.duplicateButton} onPress={handleIdCheck}>
            <Text style={styles.duplicateButtonText}>중복확인</Text>
          </TouchableOpacity>
        </View>
        {idCheckMessage !== '' && (
          <Text style={[styles.idCheckMessage, { color: idCheckSuccess ? '#87CEEB' : '#FF6B6B' }]}>
            {idCheckMessage}
          </Text>
        )}

        <Text style={styles.label}>비밀번호</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#adb5bd" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>비밀번호 확인</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry={!showPasswordConfirm}
          />
          <TouchableOpacity onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}>
            <Ionicons name={showPasswordConfirm ? 'eye-off-outline' : 'eye-outline'} size={20} color="#adb5bd" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.registerButton, loading && { opacity: 0.6 }]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#495057" />
            : <Text style={styles.registerButtonText}>회원가입</Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9FF',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 180,
  },
  label: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    marginBottom: 24,
    fontSize: 14,
    color: '#495057',
  },
  idContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    marginBottom: 24,
  },
  idInput: {
    flex: 1,
    height: 44,
    fontSize: 14,
    color: '#495057',
  },
  duplicateButton: {
    backgroundColor: '#87CEEB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  duplicateButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  passwordContainer: {
    width: '100%',
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    marginBottom: 24,
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
    color: '#495057',
  },
  idCheckMessage: {
    fontSize: 12,
    marginTop: -16,
    marginBottom: 16,
  },
  registerButton: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  registerButtonText: {
    color: '#495057',
    fontSize: 16,
  },
});