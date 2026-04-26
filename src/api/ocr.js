import client from './client';

/**
 * OCR 검수 데이터 목록 조회 (/admin/ocr/list)
 */
export const getOcrList = async () => {
  try {
    const response = await client.get('/admin/ocr/list');
    return response.data;
  } catch (error) {
    return {
      success: false,
      code: 'COMMON500',
      result: 'OCR 검수 대기 목록을 불러올 수 없습니다.'
    };
  }
};

/**
 * OCR 검수 개별 상세 데이터 조회 (/admin/ocr/one)
 */
export const getOcrResult = async (id) => {
  try {
    const response = await client.get('/admin/ocr/one', {
      params: { ocrId: id }
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      code: 'COMMON500',
      result: 'OCR 검수 한 건을 불러올 수 없습니다.'
    };
  }
};

/**
 * OCR로 스캔한 식재료 품목 조회 (/admin/ocr/one/ingredients)
 */
export const getOcrIngredients = async (id) => {
  try {
    const response = await client.get('/admin/ocr/one/ingredients', {
      params: { ocrId: id }
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      code: 'COMMON500',
      result: 'OCR로 스캔한 식재료 품목을 불러올 수 없습니다.'
    };
  }
};

/**
 * OCR 정확도 수정 (/admin/ocr/accuracy)
 */
export const updateOcrAccuracy = async (ocrId, accuracy) => {
  try {
    const response = await client.post('/admin/ocr/accuracy', { 
      ocrId, 
      accuracy 
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      code: 'COMMON500',
      result: 'ocr 정확도를 수정할 수 없습니다.'
    };
  }
};

/**
 * OCR 검수 결과 수정 반영 (/admin/ocr/one/ingredients)
 */
export const updateOcrResult = async (id, data) => {
  try {
    const response = await client.post('/admin/ocr/one/ingredients', data, {
      params: { ocrId: id }
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      code: 'COMMON500',
      result: 'OCR 수정 사항을 반영할 수 없습니다.'
    };
  }
};
