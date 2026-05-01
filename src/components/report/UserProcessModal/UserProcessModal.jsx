import React, { useState, useEffect } from 'react';
import { processUserPenalty } from '../../../api/userManagement';
import { getReportDetail } from '../../../api/reports';
import styles from './UserProcessModal.module.css';

const UserProcessModal = ({ isOpen, onClose, reportData }) => {
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 상세 조회를 위해 고유 식별자인 reportId를 우선적으로 사용합니다.
    const idToFetch = reportData?.reportId || reportData?.shareId;
    if (isOpen && idToFetch) {
      fetchDetail(idToFetch);
    } else if (!isOpen) {
      // 닫힐 때 이전 데이터 초기화
      setDetailData(null);
    }
  }, [isOpen, reportData]);

  const fetchDetail = async (id) => {
    setLoading(true);
    const response = await getReportDetail(id);
    if (response.success) {
      setDetailData(response.result);
    }
    setLoading(false);
  };

  if (!isOpen || !reportData) return null;

  const handlePenalty = async (status) => {
    const confirmMsg = status === '영구정지' 
      ? '정말 이 사용자를 영구 정지하시겠습니까?' 
      : '이 사용자에게 경고를 부여하시겠습니까?';
      
    if (!window.confirm(confirmMsg)) return;

    // 서버의 reportData 객체에서 타겟 유저의 ID를 유연하게 가져옵니다.
    // getReportDetail에서 가져온 reportedNameId를 최우선으로 사용합니다.
    const targetUserId = detailData?.reportedNameId || reportData.userId || reportData.targetId || reportData.sellerId || reportData.reporterId;
    
    // 신고 고유 ID를 가져옵니다.
    const reportId = detailData?.reportId || reportData.reportId;
    
    if (!targetUserId) {
      alert('대상 사용자의 ID를 찾을 수 없습니다.');
      return;
    }

    const response = await processUserPenalty(targetUserId, status, reportId);

    if (response.success) {
      alert(response.result);
      onClose(); // 성공 시 모달 닫기
    } else {
      alert(response.result);
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        
        <h2 className={styles.modalTitle}>사용자 처리</h2>
        
        {loading ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: '#666' }}>상세 정보를 불러오는 중...</div>
        ) : (
          <>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>신고 정보</h4>
              <p className={styles.infoText}><strong>신고자:</strong> {detailData?.reporterName || reportData.reporterName}</p>
              <p className={styles.infoText}>
                <strong>대상자:</strong> {detailData?.reportedName || '알 수 없음'} / (누적 경고 : {detailData?.totalWarming === '영구정지' ? '영구정지' : `${detailData?.totalWarming || 0}회`})
              </p>
            </div>

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>신고 상세 내용</h4>
              <div className={styles.detailBox}>
                <p className={styles.detailItem}><strong>신고제목:</strong> {detailData?.title || '제목 없음'}</p>
                <p className={styles.detailItem}><strong>신고내용:</strong> {detailData?.content || reportData.content}</p>
              </div>
            </div>

            <div className={styles.footer}>
              <button className={styles.warnBtn} onClick={() => handlePenalty('사용자 경고')}>
                사용자 경고
              </button>
              <button className={styles.banBtn} onClick={() => handlePenalty('영구정지')}>
                영구 정지
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProcessModal;
