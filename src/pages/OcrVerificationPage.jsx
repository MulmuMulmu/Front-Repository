import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOcrResult, getOcrIngredients, updateOcrAccuracy } from '../api/ocr';

import styles from './OcrVerificationPage.module.css';

const OcrVerificationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [originalData, setOriginalData] = useState(null); // 수정 취소용 원본 데이터 보관
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resDetail, resIngredients] = await Promise.all([
        getOcrResult(id),
        getOcrIngredients(id)
      ]);

      if (resDetail.success) {
        const combinedData = {
          ...resDetail.result,
          accuracy: Number(resDetail.result.accuracy) || 0, // 숫자형 변환으로 앞자리 0 제거
          items: resIngredients.success ? resIngredients.result : []
        };
        setData(combinedData);
      }
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = async () => {
    if (!isEditing) {
      // 수정 시작 시 현재 데이터 백업
      setOriginalData(JSON.parse(JSON.stringify(data)));
      setIsEditing(true);
    } else {
      // '수정 완료' 클릭 시 서버에 저장하고 현재 페이지 유지
      const response = await updateOcrAccuracy(id, data.accuracy);
      if (response.success) {
        alert(response.result);
        setIsEditing(false); // 수정 모드 종료하고 상세 보기로 전환
      } else {
        alert(response.result);
      }
    }
  };

  const handleCancel = () => {
    // 수정 취소 시 백업 데이터로 복구
    setData(originalData);
    setIsEditing(false);
  };

  if (loading) return <div className={styles.loading}>데이터를 불러오고 있습니다...</div>;
  if (!data) return <div className={styles.error}>데이터를 불러오는데 실패했습니다.</div>;

  // 영수증 이미지 경로 (서버 데이터 사용)
  const receiptImg = data.receiptImage || '/receipt_sample.png';

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>OCR 자동 인식 검수</h1>
        <div className={styles.actions}>
          {!isEditing && (
            <button
              className={`${styles.btn} ${styles.secondary}`}
              onClick={() => navigate('/ocr')}
            >
              목록으로
            </button>
          )}
          {isEditing && (
            <button className={`${styles.btn} ${styles.secondary}`} onClick={handleCancel}>
              취소하기
            </button>
          )}
          <button 
            className={`${styles.btn} ${isEditing ? styles.primary : styles.secondary}`}
            onClick={handleEditToggle}
          >
            {isEditing ? '수정 완료' : '수정하기'}
          </button>
        </div>
      </header>

      <div className={styles.mainContent}>
        {/* 좌측: 원본 영수증 이미지 */}
        <div className={styles.imageSection}>
          <div className={styles.sectionHeader}>원본 영수증</div>
          <div className={styles.imageWrapper}>
            <img src={receiptImg} alt="Original Receipt" className={styles.receiptImage} />
          </div>
        </div>

        {/* 우측: OCR 데이터 검수 */}
        <div className={styles.dataSection}>
          <div className={styles.sectionHeader}>인식 결과 대조</div>

          <div className={styles.infoGrid}>
            <div className={styles.infoField}>
              <label>구매 날짜</label>
              <input
                type="text"
                value={(data.purchaseTime || '').replace('T', ' ')}
                disabled={true}
              />
            </div>
            <div className={styles.infoField}>
              <label>업로드 시간</label>
              <input type="text" value={(data.createTime || '').replace('T', ' ')} disabled={true} />
            </div>
            <div className={styles.infoField}>
              <label>업로드 사용자</label>
              <input type="text" value={data.nickName || ''} disabled={true} />
            </div>
            <div className={styles.infoField}>
              <label>인식 정확도</label>
              <div className={styles.accuracyWrapper}>
                <input
                  type="number"
                  className={`${styles.accuracyInput} ${isEditing ? styles.editable : ''}`}
                  value={data.accuracy === 0 && isEditing ? '' : data.accuracy}
                  step="0.01"
                  min="0"
                  max="100"
                  disabled={!isEditing}
                  onFocus={(e) => {
                    if (data.accuracy === 0) {
                      e.target.value = '';
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value;
                    const value = rawValue === '' ? 0 : parseFloat(rawValue);
                    setData({ ...data, accuracy: Math.min(100, Math.max(0, value)) });
                  }}
                />
                <span className={styles.percentSymbol}>%</span>
                <div className={styles.accuracyBar}>
                  <div
                    className={styles.accuracyFill}
                    style={{ width: `${data.accuracy}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.itemTableWrapper}>
            <table className={styles.itemTable}>
              <thead>
                <tr>
                  <th>품목명</th>
                  <th>수량</th>
                </tr>
              </thead>
              <tbody>
                {data.items && data.items.length > 0 ? (
                  data.items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={item.itemName || ''}
                          disabled={true}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.quantity || 0}
                          disabled={true}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className={styles.noItems}>인식된 품목 정보가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OcrVerificationPage;
