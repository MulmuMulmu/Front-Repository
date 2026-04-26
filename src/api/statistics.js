import client from './client';

export const getStatisticsData = async (params) => {
  try {
    const response = await client.get('/admin/data/statistics', { params });
    return response.data;
  } catch (error) {
    return {
      success: false,
      code: 'COMMON500',
      result: 'OCR 데이터 통계를 불러올 수 없습니다.'
    };
  }
};
