import client from './client';

/**
 * 전체 사용자 관리(User Management) 화면 전용 API
 */

/**
 * 전체 사용자 목록 조회 (/admin/users/list)
 */
export const getUsers = async (params) => {
  try {
    const response = await client.get('/admin/users/list', { params });
    return response.data;
  } catch (error) {
    return {
      success: false,
      code: 'COMMON500',
      result: '사용자 리스트를 불러올 수 없습니다.'
    };
  }
};

export const getUserPosts = async (userId) => {
  try {
    const response = await client.get('/admin/users/shares/list', {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      code: 'COMMON500',
      result: '사용자의 나눔글 목록을 불러올 수 없습니다.'
    };
  }
};

export const processUserPenalty = async (userId, status, reportId) => {
  try {
    const response = await client.patch('/admin/report/users', { 
      userId, 
      status,
      reportId
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      code: error.response?.data?.code || 'COMMON500',
      result: error.response?.data?.result || '사용자 상태를 변경할 수 없습니다.'
    };
  }
};
