/**
 * 통관 및 데이터 통계 데이터 조회 (Mock)
 * 날짜별 수집량(Line)과 상위 3개 식재료 검색량(Bar)이 통합된 구조
 */
export const getStatisticsData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 2026-03-18 ~ 2026-04-16 (30일치 데이터 시뮬레이션)
      const mockDailyData = [];
      const items = ['양상추', '계란', '닭가슴살', '우유', '양파', '고구마', '사과', '바나나', '소고기', '두부'];
      
      const today = new Date();
      
      for (let i = 30; i >= 1; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        
        const totalCount = Math.floor(Math.random() * 50) + 50; // 50~100 사이
        
        // 해당 날짜의 상위 3개 아이템 무작위 생성
        const dailyItems = [...items].sort(() => 0.5 - Math.random()).slice(0, 3);
        
        mockDailyData.push({
          date: dateStr,
          timestamp: date.getTime(),
          totalCount: totalCount,
          item1_name: dailyItems[0],
          item1_value: Math.floor(totalCount * 0.4),
          item2_name: dailyItems[1],
          item2_value: Math.floor(totalCount * 0.25),
          item3_name: dailyItems[2],
          item3_value: Math.floor(totalCount * 0.15),
        });
      }

      resolve({
        success: true,
        result: {
          dailyCollection: mockDailyData
        }
      });
    }, 500);
  });
};
