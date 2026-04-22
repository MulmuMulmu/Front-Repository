import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOcrResult, updateOcrResult } from '../api/ocr';
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
    const response = await getOcrResult(id);
    if (response.success) {
      setData(response.result);
    }
    setLoading(false);
  };

  const handleEditToggle = async () => {
    if (!isEditing) {
      // 수정 시작 시 현재 데이터 백업
      setOriginalData(JSON.parse(JSON.stringify(data)));
      setIsEditing(true);
    } else {
      // '수정 완료' 클릭 시 서버에 저장하고 현재 페이지 유지
      const success = await updateOcrResult(data.receiptId, data);
      if (success) {
        alert('수정 정보가 데이터베이스에 성공적으로 반영되었습니다.');
        setIsEditing(false); // 수정 모드 종료하고 상세 보기로 전환
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

  // 영수증 이미지 경로 (생성된 샘플 영수증 이미지 사용)
  const receiptImg = '/receipt_sample.png';

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
              <label>가게 이름</label>
              <input
                type="text"
                value={data.storeName}
                disabled={true}
              />
            </div>
            <div className={styles.infoField}>
              <label>구매 날짜</label>
              <input
                type="text"
                value={data.purchasedAt}
                disabled={true}
              />
            </div>
            <div className={styles.infoField}>
              <label>업로드 시간</label>
              <input type="text" value={data.uploadedAt} disabled={true} />
            </div>
            <div className={styles.infoField}>
              <label>업로드 사용자</label>
              <input type="text" value={data.uploadedBy} disabled={true} />
            </div>
            <div className={styles.infoField}>
              <label>인식 정확도</label>
              <div className={styles.accuracyWrapper}>
                <input
                  type="number"
                  className={`${styles.accuracyInput} ${isEditing ? styles.editable : ''}`}
                  value={data.accuracy}
                  step="0.01"
                  min="0"
                  max="100"
                  disabled={!isEditing}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
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
                {data.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="text"
                        value={item.name}
                        disabled={true}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        disabled={true}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OcrVerificationPage;
