import client from './client';

/**
 * 전체 사용자 관리(User Management) 화면 전용 API
 */

/**
 * 전체 사용자 목록 조회 (/admin/users/list)
 */
export const getUsers = async (params) => {
  try {
    // 실제 연결 시 아래 코드 사용
    // const response = await client.get('/admin/users/list', { 
    //   params,
    //   headers: { Authorization: 'exampleToken' }
    // });
    // return response.data;

    // API 연결 전 미리 정리된 Mock 데이터 사용
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          result: [
            {
              number: 1,
              userId: "exmapleUserId1",
              nickName: "exmapleUserNickName1",
              totalWarming: 1,
              totalShare: 2
            },
            {
              number: 2,
              userId: "exmapleUserId2",
              nickName: "exmapleUserNickName2",
              totalWarming: 1,
              totalShare: 3
            },
            {
              number: 3,
              userId: "vnaro",
              nickName: "물무",
              totalWarming: 0,
              totalShare: 15
            },
            {
              number: 4,
              userId: "gayeon",
              nickName: "가연",
              totalWarming: 1,
              totalShare: 5
            }
          ]
        });
      }, 500);
    });
  } catch (error) {
    return {
      success: false,
      code: 'COMMON500',
      result: '사용자 리스트를 불러올 수 없습니다.'
    };
  }
};

/**
 * 특정 사용자의 작성 나눔글 조회
 */
export const getUserPosts = async (userId) => {
  try {
    // 실제 연결 시 아래 코드 사용
    // const response = await client.get('/admin/users/shares/list', {
    //   params: { userId },
    //   headers: { Authorization: 'exampleToken' }
    // });
    // return response.data;

    // API 규격에 맞춰 정리된 Mock 데이터 사용
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          result: [
            {
              shareId: "exampleShareId1",
              image: "/lettuce.png",
              title: "양상추",
              content: "당일 구매했는데, 혼자 먹기 많아서..."
            },
            {
              shareId: "exampleShareId2",
              image: "/bread.png",
              title: "식빵",
              content: "유통기한이 오늘까지에요"
            },
            {
              shareId: "exampleShareId3",
              image: "https://example.com/item.jpg",
              title: "신규 규격 샘플",
              content: "새로운 API 데이터 구조 예시입니다."
            }
          ]
        });
      }, 400);
    });
  } catch (error) {
    return {
      success: false,
      code: 'COMMON500',
      result: '사용자의 나눔글 목록을 불러올 수 없습니다.'
    };
  }
};

/**
 * 사용자 경고/정지 처리 (/admin/report/users)
 */
export const processUserPenalty = async (userId, status) => {
  try {
    // 실제 연결 시 아래 코드 사용
    // const response = await client.post('/admin/report/users', { 
    //   userId, 
    //   status 
    // }, {
    //   headers: { Authorization: 'exampleToken' }
    // });
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        let resultMsg = "사용자 처리가 완료되었습니다.";
        if (status === "영구정지") {
          resultMsg = "사용자가 영구 정지 되었습니다.";
        } else if (status === "사용자 경고") {
          resultMsg = "사용자에게 경고 하나를 부여했습니다.";
        }

        resolve({
          success: true,
          result: resultMsg
        });
      }, 500);
    });
  } catch (error) {
    return {
      success: false,
      code: 'COMMON500',
      result: '사용자 상태를 변경할 수 없습니다.'
    };
  }
};
