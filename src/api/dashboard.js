import client from './client';

/**
 * 대시보드(Dashboard) 화면 전용 API
 */

/**
 * 사용자 통계 조회 (전체 사용자, 경고, 정지 등)
 */
export const getUserStatistics = async () => {
  try {
    // const response = await client.get('/users/statistics', {
    //   headers: { Authorization: 'exampleToken' }
    // });
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          result: {
            totalUsers: 1000,
            atLeastOneWarming: 20, // 사용자 수정분 유지
            permanentSuspension: 0
          }
        });
      }, 500);
    });
  } catch (error) {
    return {
      success: false,
      code: 'COMMON500',
      result: '사용자 통계 정보를 불러올 수 없습니다.'
    };
  }
};

/**
 * 당일 신고 건수 조회
 */
export const getTodayReportsCount = async () => {
  try {
    // const response = await client.get('/reports/today/count', {
    //     headers: { Authorization: 'exampleToken' }
    // });
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          result: {
            todayReports: 12
          }
        });
      }, 400);
    });
  } catch (error) {
    return {
      success: false,
      code: 'COMMON500',
      result: '당일 신고 건수를 불러올 수 없습니다.'
    };
  }
};

/**
 * 당일 나눔 횟수 조회
 */
export const getTodaySharesCount = async () => {
  try {
    // const response = await client.get('/statistics/today/shares', {
    //   headers: { Authorization: 'exampleToken' }
    // });
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          result: {
            todayShares: 50
          }
        });
      }, 300);
    });
  } catch (error) {
    return {
      success: false,
      code: 'COMMON500',
      result: '당일 나눔 횟수를 불러올 수 없습니다.'
    };
  }
};
