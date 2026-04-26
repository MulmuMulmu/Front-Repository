import React, { useState, useEffect } from 'react';
import { getTodayReportsCount } from '../../../api/dashboard';
import styles from './ReportSummary.module.css';

const ReportSummary = () => {
  const [data, setData] = useState({
    todayReports: 0,
    notCompletedReports: 0,
    completedReports: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTodayReportsCount();
      if (response.success) {
        setData(response.result);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: '신고 건수', value: data.todayReports },
    { label: '완료 건수', value: data.completedReports },
    { label: '미완 건수', value: data.notCompletedReports },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>당일 신고 현황 요약</h2>
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
