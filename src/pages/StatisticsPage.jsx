import React, { useState, useEffect, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList
} from 'recharts';
import { getStatisticsData } from '../api/statistics';
import styles from './StatisticsPage.module.css';

const StatisticsPage = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 날짜 범위 상태 (기본값: 최근 7일)
  // 어제 날짜를 종료일 기준으로 설정
  const yesterday = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - 1);
    return d;
  }, []);

  const defaultStart = useMemo(() => {
    const d = new Date(yesterday);
    d.setDate(d.getDate() - 6);
    return d;
  }, [yesterday]);

  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(yesterday);

  // 날짜 포맷 변환 (YYYY-MM-DD)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await getStatisticsData({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
    });
    
    if (response.success && Array.isArray(response.result)) {
      // 서버 데이터 형식을 차트용으로 변환
      const formatted = response.result.map(item => ({
        date: item.date,
        totalCount: item.total,
        item1_name: item.rank1?.[0] || '',
        item1_value: item.rank1?.[1] || 0,
        item2_name: item.rank2?.[0] || '',
        item2_value: item.rank2?.[1] || 0,
        item3_name: item.rank3?.[0] || '',
        item3_value: item.rank3?.[1] || 0,
      }));
      setAllData(formatted);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  // 서버에서 이미 필터링된 데이터를 주므로 allData를 그대로 사용
  const chartData = useMemo(() => allData, [allData]);

  // 커스텀 툴팁 구현
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          <div className={styles.tooltipDivider} />
          <p className={styles.tooltipTotal}>
            총 수집량: <span>{payload.find(p => p.dataKey === 'totalCount')?.value}건</span>
          </p>
          <div className={styles.tooltipItems}>
            <p className={styles.itemRow}>
              <span className={styles.dot} style={{ backgroundColor: '#8884d8' }} />
              {payload[0].payload.item1_name}: {payload.find(p => p.dataKey === 'item1_value')?.value}회
            </p>
            <p className={styles.itemRow}>
              <span className={styles.dot} style={{ backgroundColor: '#82ca9d' }} />
              {payload[0].payload.item2_name}: {payload.find(p => p.dataKey === 'item2_value')?.value}회
            </p>
            <p className={styles.itemRow}>
              <span className={styles.dot} style={{ backgroundColor: '#ffc658' }} />
              {payload[0].payload.item3_name}: {payload.find(p => p.dataKey === 'item3_value')?.value}회
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) return <div className={styles.loading}>통계 데이터를 불러오는 중입니다...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>데이터 분석 및 통계</h1>
        <div className={styles.filterSection}>
          <div className={styles.datePickerGroup}>
            <label>조회 기간 선택</label>
            <div className={styles.pickers}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy-MM-dd"
                maxDate={yesterday}
                className={styles.dateInput}
              />
              <span className={styles.tilde}>~</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={yesterday}
                dateFormat="yyyy-MM-dd"
                className={styles.dateInput}
              />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <h2 className={styles.sectionTitle}>통계 통합 리포트</h2>
          <p className={styles.sectionDesc}>전체 수집량(선)과 주요 식재료 수집량(막대)의 상관관계 분석</p>
        </div>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={500}>
            <ComposedChart
              data={chartData}
              barGap={10} // 막대 사이 간격 추가
              margin={{ top: 40, right: 30, bottom: 20, left: 20 }}
            >
              <CartesianGrid stroke="#f5f5f5" vertical={false} />
              <XAxis
                dataKey="date"
                scale="band"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#666' }}
                tickFormatter={(dateStr) => {
                  if (!dateStr) return '';
                  const parts = dateStr.split('-');
                  if (parts.length < 3) return dateStr;
                  return `${parts[0].slice(2)}-${parts[1]}-${parts[2]}`;
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />

              {/* 바 그래프: 상위 3개 식재료 (라벨 회전 적용) */}
              <Bar dataKey="item1_value" name="상위 1위" fill="#8884d8" radius={[4, 4, 0, 0]} barSize={25}>
                <LabelList 
                  dataKey="item1_name" 
                  position="top" 
                  offset={15} 
                  angle={-45}
                  textAnchor="start"
                  style={{ fontSize: 10, fontWeight: 700, fill: '#444' }} 
                />
              </Bar>
              <Bar dataKey="item2_value" name="상위 2위" fill="#82ca9d" radius={[4, 4, 0, 0]} barSize={25}>
                <LabelList 
                  dataKey="item2_name" 
                  position="top" 
                  offset={15} 
                  angle={-45}
                  textAnchor="start"
                  style={{ fontSize: 10, fontWeight: 700, fill: '#444' }} 
                />
              </Bar>
              <Bar dataKey="item3_value" name="상위 3위" fill="#ffc658" radius={[4, 4, 0, 0]} barSize={25}>
                <LabelList 
                  dataKey="item3_name" 
                  position="top" 
                  offset={15} 
                  angle={-45}
                  textAnchor="start"
                  style={{ fontSize: 10, fontWeight: 700, fill: '#444' }} 
                />
              </Bar>

              {/* 꺾은선 그래프: 전체 수집량 */}
              <Line
                type="linear"
                dataKey="totalCount"
                name="전체 수집량"
                stroke="#ff7300"
                strokeWidth={3}
                dot={{ r: 4, fill: '#ff7300', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default StatisticsPage;
