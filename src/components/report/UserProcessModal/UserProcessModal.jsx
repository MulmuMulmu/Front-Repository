import { processUserPenalty } from '../../../api/userManagement';
import styles from './UserProcessModal.module.css';

const UserProcessModal = ({ isOpen, onClose, reportData }) => {
  if (!isOpen || !reportData) return null;

  const handlePenalty = async (status) => {
    const confirmMsg = status === '영구정지' 
      ? '정말 이 사용자를 영구 정지하시겠습니까?' 
      : '이 사용자에게 경고를 부여하시겠습니까?';
      
    if (!window.confirm(confirmMsg)) return;

    // reportData.targetId가 없는 경우를 대비해 Mock ID ('user-123') 사용
    const targetUserId = reportData.targetId || 'user-123';
    const response = await processUserPenalty(targetUserId, status);

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
        
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>신고 정보</h4>
          <p className={styles.infoText}><strong>신고자:</strong> {reportData.reporterName}</p>
          <p className={styles.infoText}><strong>대상자:</strong> {reportData.targetName || '나연'} / (누적 경고 : 1회)</p>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>신고 상세 내용</h4>
          <div className={styles.detailBox}>
            <p className={styles.detailItem}><strong>신고제목:</strong> 금지 물품 신고</p>
            <p className={styles.detailItem}><strong>신고내용:</strong> {reportData.content}</p>
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
      </div>
    </div>
  );
};

export default UserProcessModal;
