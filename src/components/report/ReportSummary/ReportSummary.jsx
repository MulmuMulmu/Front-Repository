import React from 'react';
import styles from './ReportSummary.module.css';

const ReportSummary = () => {
  const stats = [
    { label: '당일 신고 건수', value: '12' },
    { label: '완료 건수', value: '7' },
    { label: '미완 건수', value: '5' },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>신고 현황 요약</h2>
      <div className={styles.stats}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <p className={styles.label}>{stat.label}</p>
            <h3 className={styles.value}>{stat.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportSummary;
