import React from 'react';
import styles from './ReportSummaryCard.module.css';

const ReportSummaryCard = () => {
  const reports = [
    { title: '금지 물품 신고', reporter: '물무', status: '완료' },
    { title: '금지 물품 신고', reporter: '가연', status: '미완' },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>신고 접수 및 처리</h2>
      <div className={styles.list}>
        {reports.map((report, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.info}>
              <h3 className={styles.reportTitle}>{report.title}</h3>
              <p className={styles.reporter}>신고자: {report.reporter}</p>
            </div>
            <div className={`${styles.status} ${report.status === '완료' ? styles.done : styles.pending}`}>
              {report.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportSummaryCard;
