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
  try {
    const response = await client.post('/admin/auth/login', credentials);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      success: false,
      code: error.code || 'COMMON500',
      result: error.message || '관리자 로그인을 처리할 수 없습니다.'
    };
  }
};
