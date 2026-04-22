import client from './client';

/**
 * 신고 관리 관련 API
 */

/**
 * 신고 목록 조회 (Date, type)
 */
export const getReports = async (params) => {
    try {
        // const response = await client.get('/reports', { 
        //     headers: { Authorization: 'exampleToken' },
        //     params: params // QueryString (Date, type)
        // });
        // return response.data;

        // Mock 데이터 (날짜별 차별화)
        let mockReports = [];
        
        if (params.Date === '2026-03-29') {
            mockReports = [
                {
                    reportId: 'rep-0329-1',
                    shareId: 'share-0329-1',
                    reporterName: '물무1',
                    content: '개봉된 가공식품 나눔',
                    status: '완료'
                },
                {
                    reportId: 'rep-0329-2',
                    shareId: 'share-0329-2',
                    reporterName: '가연',
                    content: '주류 판매',
                    status: '미완'
                }
            ];
        } else if (params.Date === '2026-04-13') {
            mockReports = [
                {
                    reportId: 'rep-0413-1',
                    shareId: 'share-0413-1',
                    reporterName: '홍길동',
                    content: '유통기한 경과 제품',
                    status: '완료'
                },
                {
                    reportId: 'rep-0413-2',
                    shareId: 'share-0413-2',
                    reporterName: '김철수',
                    content: '판매 금지 품목 게시',
                    status: '미완'
                }
            ];
        } else {
            // 다른 날짜의 경우 빈 목록 또는 기본 데이터
            mockReports = [
                {
                    reportId: `rep-${params.Date}-1`,
                    shareId: `share-${params.Date}-1`,
                    reporterName: '일반사용자',
                    content: `${params.Date} 날짜의 테스트 신고 항목입니다.`,
                    status: '미완'
                }
            ];
        }

        // 필터링 시뮬레이션 (type에 따라)
        let resultReports = mockReports;
        if (params.type === 'completed') {
            resultReports = mockReports.filter(r => r.status === '완료');
        } else if (params.type === 'notCompleted') {
            resultReports = mockReports.filter(r => r.status === '미완');
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    result: {
                        reports: resultReports
                    }
                });
            }, 300);
        });
    } catch (error) {
        return {
            success: false,
            code: 'COMMON500',
            result: '신고 목록을 조회할 수 없습니다.'
        };
    }
};

/**
 * 신고 상세 조회
 */
export const getReportDetail = async (id) => {
    // const response = await client.get(`/reports/${id}`);
    // return response.data;
    return { success: true, result: {} }; // Mock
};

/**
 * 게시물 처리 (완료/미완 등)
 */
export const updateReportStatus = async (id, status) => {
    // const response = await client.patch(`/reports/${id}/status`, { status });
    // return response.data;
    return { success: true }; // Mock
};

/**
 * 게시글 숨김 처리 (Masking)
 */
export const maskPost = async (shareId) => {
    try {
        // const response = await client.post('/admin/report/post/masking', null, {
        //     headers: { Authorization: 'exampleToken' },
        //     params: { shareId } // QueryString
        // });
        // return response.data;

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    result: '게시글이 숨김 처리 되었습니다.'
                });
            }, 500);
        });
    } catch (error) {
        return {
            success: false,
            code: 'COMMON500',
            result: '게시글을 숨김 처리 할 수 없습니다.'
        };
    }
};

/**
 * 나눔 게시글 상세 정보 조회 (/admin/shares/one)
 */
export const getShareDetail = async (shareId) => {
    try {
        // const response = await client.get('/admin/shares/one', {
        //     headers: { Authorization: 'exampleToken' },
        //     params: { shareId } // QueryString
        // });
        // return response.data;

        return new Promise((resolve) => {
            setTimeout(() => {
                // Mock 데이터: 실제 연동 시에는 서버에서 받아온 데이터를 반환합니다.
                resolve({
                    success: true,
                    result: {
                        image: '/lettuce.png',
                        sellerName: '가연',
                        title: '양상추 나눔합니다!',
                        category: '농산물',
                        description: '당일 구매했는데 혼자 먹기 너무 많아서 나눔합니다. 싱싱해요!',
                        createTime: '2026-04-13T20:00:00'
                    }
                });
            }, 300);
        });
    } catch (error) {
        return {
            success: false,
            code: 'COMMON500',
            result: '나눔 정보를 불러올 수 없습니다.'
        };
    }
};
