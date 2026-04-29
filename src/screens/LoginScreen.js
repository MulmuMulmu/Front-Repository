import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { login } from '../api/auth';
import { setToken } from '../api/token';

export default function LoginScreen({ navigation }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!id || !password) {
      Alert.alert('알림', '아이디와 비밀번호를 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      const data = await login({ id, password });
      if (data.success) {
        setToken(data.result.jwt);
        if (data.result.fisrtLogin === 'true') {
          navigation.replace('Allergy');
        } else {
          navigation.replace('Main');
        }
      } else {
        Alert.alert('로그인 실패', data.result || '로그인 할 수 없습니다.');
      }
    } catch (e) {
      Alert.alert('오류', '서버와 연결할 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>로그인</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="아이디를 입력해주세요"
          value={id}
          onChangeText={setId}
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#adb5bd" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, loading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#ffffff" />
            : <Text style={styles.loginButtonText}>로그인</Text>
          }
        </TouchableOpacity>

        <Text style={styles.or}>OR</Text>

        <TouchableOpacity style={styles.kakaoButton}>
          <Image
            source={require('../../assets/kakao.png')}
            style={styles.kakaoImage}
            resizeMode="stretch"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerButtonText}>회원가입</Text>
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
  titleContainer: {
    width: '100%',
    paddingTop: 80,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495057',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 130,
    paddingHorizontal: 24,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  passwordContainer: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    fontSize: 18,
  },
  loginButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#87CEEB',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  or: {
    color: '#adb5bd',
    marginBottom: 12,
  },
  kakaoButton: {
    width: '100%',
    marginBottom: 24,
  },
  kakaoImage: {
    width: '100%',
    height: 48,
  },
  registerButton: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    color: '#495057',
    fontSize: 17,
  },
});