// 세션 메모리 스토어 (새로고침 전까지 데이터 유지)
const memoryStore = {
  results: {},
  listOverrides: {}
};

/**
 * OCR 검수 데이터 목록 조회 (Mock)
 */
export const getOcrList = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const baseList = [
        { id: 'REC-12345', nickname: '물무', uploadedAt: '2026-04-16 14:35:10', purchasedAt: '2026-04-16', accuracy: 98.5 },
        { id: 'REC-67890', nickname: '가연', uploadedAt: '2026-04-15 15:20:05', purchasedAt: '2026-04-15', accuracy: 82.1 },
        { id: 'REC-11111', nickname: '다연', uploadedAt: '2026-04-14 16:55:12', purchasedAt: '2026-04-14', accuracy: 95.0 },
        { id: 'REC-22222', nickname: '나연', uploadedAt: '2026-04-17 09:30:00', purchasedAt: '2026-04-17', accuracy: 88.7 },
      ];

      // 메모리 스토어에 수정된 값이 있으면 반영
      const finalReceipts = baseList.map(receipt => {
        const override = memoryStore.results[receipt.id];
        if (override) {
          return { ...receipt, accuracy: override.accuracy };
        }
        return receipt;
      });

      resolve({
        success: true,
        result: {
          receipts: finalReceipts
        }
      });
    }, 400);
  });
};

/**
 * OCR 검수 개별 상세 데이터 조회 (Mock)
 */
export const getOcrResult = async (id) => {
  // 메모리 스토어에 이미 저장된 결과가 있으면 즉시 반환
  if (memoryStore.results[id]) {
    return { success: true, result: memoryStore.results[id] };
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      let resultData = {
        receiptId: id || 'REC-12345',
        imageUrl: '/receipt_sample.png',
        storeName: '이마트 성수점',
        purchasedAt: '2026-04-16',
        uploadedAt: '2026-04-16 14:35:10',
        uploadedBy: '물무(vnaro)',
        accuracy: 98.5,
        totalAmount: 13500,
        items: [
          { id: 1, name: '유기농 양상추', quantity: 1, price: 3500 },
          { id: 2, name: '서울우유 1L', quantity: 1, price: 2900 },
          { id: 3, name: '신라면 5입', quantity: 1, price: 4200 },
          { id: 4, name: '초콜릿', quantity: 1, price: 2900 },
        ]
      };

      if (id === 'REC-67890') {
        resultData = {
          ...resultData,
          storeName: '롯데마트 의왕점',
          uploadedBy: '가연(gayeon)',
          accuracy: 82.1,
          totalAmount: 24800,
          items: [
            { id: 1, name: '계란 30구', quantity: 1, price: 7900 },
            { id: 2, name: '하림 닭가슴살', quantity: 2, price: 12000 },
            { id: 3, name: '양파 1봉', quantity: 1, price: 4900 },
          ]
        };
      } else if (id === 'REC-11111') {
        resultData = {
          ...resultData,
          storeName: '홈플러스 강서점',
          uploadedBy: '다연(dayeon)',
          accuracy: 95.0,
          totalAmount: 43500,
          items: [
            { id: 1, name: '한돈 삼겹살 600g', quantity: 1, price: 25000 },
            { id: 2, name: '참이슬 팩', quantity: 3, price: 15000 },
            { id: 3, name: '꽃상추', quantity: 1, price: 3500 },
          ]
        };
      } else if (id === 'REC-22222') {
        resultData = {
          ...resultData,
          storeName: 'GS25 신림점',
          uploadedBy: '나연(nayeon)',
          accuracy: 88.7,
          totalAmount: 7800,
          items: [
            { id: 1, name: '전주비빔 삼각김밥', quantity: 2, price: 2400 },
            { id: 2, name: '펩시콜라 500ml', quantity: 1, price: 2200 },
            { id: 3, name: '햄치즈 샌드위치', quantity: 1, price: 3200 },
          ]
        };
      }

      resolve({
        success: true,
        result: resultData
      });
    }, 500);
  });
};

export const updateOcrResult = async (id, data) => {
  console.log('Updating OCR result (Memory Store):', id, data);
  // 메모리 스토어에 데이터 저장
  memoryStore.results[id] = data;
  return { success: true };
};
