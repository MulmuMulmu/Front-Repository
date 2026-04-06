const notices = [
  { id: 'NT-1001', title: '서비스 점검 안내', target: '전체 사용자', status: '노출 중', period: '오늘 21:00~23:30' },
  { id: 'NT-1002', title: '파일럿 그룹 공지', target: '파일럿 사용자', status: '예약', period: '내일 09:00' },
]

const banners = [
  { id: 'BN-2001', slot: '홈 상단', title: '점검 배너', status: '노출 중', period: '오늘 20:00~23:30' },
  { id: 'BN-2002', slot: '웹 메인', title: '파일럿 배너', status: '예약', period: '내일 09:00~18:00' },
]

const alerts = [
  { id: 'AL-1', title: 'OCR 실패 급증', status: 'open', owner: '정도욱' },
  { id: 'AL-2', title: '메일 발송 지연', status: 'pending', owner: '조희언' },
]

export default function NoticesAlertsView() {
  return (
    <div className="view-stack">
      <section className="panel">
        <div className="panel__header">
          <h2>공지/배너 관리</h2>
          <span className="badge badge--primary">공지 · 배너 · 알림</span>
        </div>
        <div className="stat-strip">
          <article className="stat-box"><span>노출 공지</span><strong>1</strong></article>
          <article className="stat-box"><span>예약 공지</span><strong>1</strong></article>
          <article className="stat-box"><span>배너 슬롯</span><strong>2</strong></article>
        </div>
      </section>

      <section className="detail-grid">
        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>공지 작성</h3>
              <span>POST / PATCH /api/v1/admin/notices</span>
            </div>
          </div>
          <div className="field-grid">
            <label>
              <span className="field-label">제목</span>
              <input className="input-shell" defaultValue="서비스 점검 안내" />
            </label>
            <label>
              <span className="field-label">대상</span>
              <select className="select-shell" defaultValue="all">
                <option value="all">전체 사용자</option>
                <option value="pilot">파일럿 사용자</option>
              </select>
            </label>
          </div>
          <div className="field-grid">
            <label>
              <span className="field-label">노출 시작</span>
              <input className="input-shell" defaultValue="2026-04-06 21:00" />
            </label>
            <label>
              <span className="field-label">노출 종료</span>
              <input className="input-shell" defaultValue="2026-04-06 23:30" />
            </label>
          </div>
          <label>
            <span className="field-label">본문</span>
            <textarea className="textarea-shell" defaultValue="오늘 22시에 점검이 진행됩니다." />
          </label>
          <div className="button-row">
            <button type="button" className="primary-button">즉시 노출</button>
            <button type="button" className="ghost-button">예약 저장</button>
          </div>
        </article>

        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>배너 관리</h3>
              <span>웹/앱 배너 슬롯 설정</span>
            </div>
          </div>
          <div className="field-grid">
            <label>
              <span className="field-label">배너 위치</span>
              <select className="select-shell" defaultValue="홈 상단">
                <option>홈 상단</option>
                <option>웹 메인</option>
              </select>
            </label>
            <label>
              <span className="field-label">상태</span>
              <select className="select-shell" defaultValue="노출 중">
                <option>노출 중</option>
                <option>예약</option>
                <option>종료</option>
              </select>
            </label>
          </div>
          <label>
            <span className="field-label">문구</span>
            <input className="input-shell" defaultValue="오늘 22시 점검 예정" />
          </label>
          <div className="button-row">
            <button type="button" className="primary-button">배너 저장</button>
            <button type="button" className="ghost-button">노출 종료</button>
          </div>
        </article>
      </section>

      <section className="detail-grid">
        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>공지와 배너 목록</h3>
              <span>GET / DELETE /api/v1/admin/notices</span>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>id</th>
                <th>제목</th>
                <th>대상/위치</th>
                <th>상태</th>
                <th>기간</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((row) => (
                <tr key={row.id}>
                  <td className="mono">{row.id}</td>
                  <td>{row.title}</td>
                  <td>{row.target}</td>
                  <td>{row.status}</td>
                  <td>{row.period}</td>
                </tr>
              ))}
              {banners.map((row) => (
                <tr key={row.id}>
                  <td className="mono">{row.id}</td>
                  <td>{row.title}</td>
                  <td>{row.slot}</td>
                  <td>{row.status}</td>
                  <td>{row.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>운영 알림</h3>
              <span>GET / PATCH /api/v1/admin/alerts</span>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>alertId</th>
                <th>제목</th>
                <th>상태</th>
                <th>담당</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((row) => (
                <tr key={row.id}>
                  <td className="mono">{row.id}</td>
                  <td>{row.title}</td>
                  <td>{row.status}</td>
                  <td>{row.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-row">
            <button type="button" className="ghost-button">확인</button>
            <button type="button" className="ghost-button">보류</button>
            <button type="button" className="ghost-button">종료</button>
          </div>
        </article>
      </section>
    </div>
  )
}
