import client from './client';

/**
 * 관리자 인증 관련 API
 */

/**
 * 관리자 로그인
 * @param {Object} credentials - 로그인 정보 (email, password)
 * @returns {Promise} API 응답 객체
 */
export const loginAdmin = async (credentials) => {
  /**
   * 실제 API 연동 시 아래 주석을 해제하고 Mock 로직을 제거하세요.
   * const response = await client.post('/auth/login', credentials);
   * return response.data;
   */

  console.log('API Request via common client stub:', credentials);
  
  // 임시 Mock 데이터 반환 (테스트용)
  return new Promise((resolve) => {
    setTimeout(() => {
      if (credentials.email === 'mulmuAdmin' && credentials.password === '1234') {
        resolve({
          success: true,
          result: {
            jwt: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567890abcdefgh'
          }
        });
      } else {
        resolve({
          success: false,
          code: 'COMMON400',
          result: '아이디 또는 비밀번호가 일치하지 않습니다.'
        });
      }
    }, 1000);
  });
};
