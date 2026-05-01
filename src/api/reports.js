import client from './client';

/**
 * 신고 관리 관련 API
 */

/**
 * 신고 목록 조회 (Date, type)
 */
export const getReports = async (params) => {
    try {
        const response = await client.get('/admin/report/list', { 
            params: params // QueryString (Date, type)
        });
        return response.data;
    } catch (error) {
        return {
            success: false,
            code: 'COMMON500',
            result: '신고 목록을 조회할 수 없습니다.'
        };
    }
};

/**
 * 신고 상세 조회 (/admin/report/one)
 */
export const getReportDetail = async (id) => {
    try {
        const response = await client.get('/admin/report/one', {
            params: { reportId: id } // QueryString key를 reportId로 변경
        });
        return response.data;
    } catch (error) {
        return {
            success: false,
            code: 'COMMON500',
            result: '신고 내역 한 건을 자세히 불러올 수 없습니다.'
        };
    }
};

/**
 * 게시글 숨김 처리 (Masking)
 */
export const maskPost = async (shareId) => {
    try {
        const response = await client.patch('/admin/report/post/masking', null, {
            params: { shareId } // QueryString
        });
        return response.data;
    } catch (error) {
        return {
            success: false,
            code: error.response?.data?.code || 'COMMON500',
            result: error.response?.data?.result || '게시글을 숨김 처리 할 수 없습니다.'
        };
    }
};

/**
 * 나눔 게시글 상세 정보 조회 (/admin/shares/one)
 */
export const getShareDetail = async (shareId) => {
    try {
        const response = await client.get('/admin/shares/one', {
            params: { shareId } // QueryString
        });
        return response.data;
    } catch (error) {
        return {
            success: false,
            code: 'COMMON500',
            result: '나눔 정보를 불러올 수 없습니다.'
        };
    }
};
