import React from 'react';
import styles from './ReportItem.module.css';

const ReportItem = ({ title, reporter, content, status, onProcessUser, onViewPost, onMaskPost }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.reporter}>신고자: {reporter}</p>
        </div>
        <div className={`${styles.statusBadge} ${status === '완료' ? styles.done : styles.pending}`}>
          {status}
        </div>
      </div>
      <p className={styles.content}>내용: {content}</p>
      <div className={styles.actions}>
        <button className={styles.actionBtn} onClick={onViewPost}>게시물 보기</button>
        <button className={styles.actionBtn} onClick={onMaskPost}>게시물 숨김</button>
        <button className={styles.actionBtn} onClick={onProcessUser}>사용자 처리</button>
      </div>
    </div>
  );
};

export default ReportItem;
