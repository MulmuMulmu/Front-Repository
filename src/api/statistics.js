import client from './client';

export const getStatisticsData = async () => {
  try {
    const response = await client.get('/admin/data/statistics');
    return response.data;
  } catch (error) {
    return {
      success: false,
      code: 'COMMON500',
      result: '통계 데이터를 불러올 수 없습니다.'
    };
  }
};
