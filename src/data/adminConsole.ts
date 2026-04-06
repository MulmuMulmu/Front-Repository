export type ViewId =
  | 'dashboard'
  | 'ocr'
  | 'reports'
  | 'pilot'
  | 'notices'
  | 'permissions'

export type NavItem = {
  id: ViewId
  label: string
}

export type SummaryMetric = {
  label: string
  value: string
  delta: string
}

export type QueueItem = {
  id: string
  area: string
  title: string
  owner: string
  status: '대기' | '검토 중' | '보류'
  priority: '긴급' | '높음' | '보통'
  due: string
}

export type TrendPoint = {
  day: string
  signups: number
  shares: number
  alerts: number
}

export type FeatureCard = {
  title: string
  purpose: string
  roles: string
  details: string[]
}

export const navItems: NavItem[] = [
  { id: 'dashboard', label: '홈' },
  { id: 'ocr', label: 'OCR 검수 대기열' },
  { id: 'reports', label: '게시글 신고 처리' },
  { id: 'pilot', label: '파일럿 그룹 운영' },
  { id: 'notices', label: '공지/배너 관리' },
  { id: 'permissions', label: '권한 관리' },
]

export const summaryMetrics: SummaryMetric[] = [
  { label: '신규 가입', value: '128', delta: '+12.4%' },
  { label: '나눔 완료', value: '46', delta: '+8.1%' },
  { label: '미처리 신고', value: '12', delta: '-3건' },
  { label: '저신뢰 OCR', value: '8', delta: '+2건' },
]

export const queueItems: QueueItem[] = [
  {
    id: 'RP-9021',
    area: '신고',
    title: '개봉 반찬 신고 2건',
    owner: '최종건',
    status: '검토 중',
    priority: '긴급',
    due: '12분',
  },
  {
    id: 'Q-1104',
    area: 'OCR',
    title: '저신뢰 품목 3건',
    owner: '정도욱',
    status: '대기',
    priority: '높음',
    due: '28분',
  },
  {
    id: 'SH-7713',
    area: '게시글',
    title: '금지 품목 의심 글',
    owner: '정진호',
    status: '대기',
    priority: '높음',
    due: '44분',
  },
  {
    id: 'AL-204',
    area: '알림',
    title: '메일 발송 실패 묶음',
    owner: '조희언',
    status: '보류',
    priority: '보통',
    due: '오늘 중',
  },
]

export const trendSeries: TrendPoint[] = [
  { day: '월', signups: 92, shares: 28, alerts: 7 },
  { day: '화', signups: 104, shares: 31, alerts: 5 },
  { day: '수', signups: 111, shares: 35, alerts: 6 },
  { day: '목', signups: 98, shares: 29, alerts: 8 },
  { day: '금', signups: 126, shares: 41, alerts: 4 },
  { day: '토', signups: 134, shares: 43, alerts: 6 },
  { day: '일', signups: 128, shares: 46, alerts: 5 },
]

export const featureSlides: FeatureCard[][] = [
  [
    {
      title: '홈',
      purpose: '핵심 지표와 긴급 작업 확인',
      roles: '운영자 · 관리자',
      details: ['KPI 카드', '처리 큐', '7일 추이'],
    },
    {
      title: 'OCR 검수 대기열',
      purpose: '저신뢰 OCR 검수와 확정',
      roles: '검수자 · 관리자',
      details: ['대기 목록', 'OCR 원문', '확정/반려'],
    },
    {
      title: '게시글 신고 처리',
      purpose: '신고 게시글 검토와 조치',
      roles: '운영자 · 관리자',
      details: ['신고 목록', '게시글 원문', '숨김/유지'],
    },
  ],
  [
    {
      title: '파일럿 그룹 운영',
      purpose: '대상자와 기능 플래그 운영',
      roles: '운영자 · 관리자',
      details: ['그룹 목록', '참여자 수', '전환율 요약'],
    },
    {
      title: '공지/배너 관리',
      purpose: '공지와 배너 노출 관리',
      roles: '운영자 · 관리자',
      details: ['제목', '노출 기간', '예약/종료'],
    },
    {
      title: '권한 관리',
      purpose: '계정과 접근 범위 조정',
      roles: '관리자',
      details: ['계정 목록', '역할', '권한 수정'],
    },
  ],
]
