const accounts = [
  { id: 'A-1001', name: '운영자', role: '관리자', lastLogin: '오늘 09:12', status: 'active' },
  { id: 'A-1002', name: '정도욱', role: '검수자', lastLogin: '오늘 08:44', status: 'active' },
  { id: 'A-1003', name: '최종건', role: '운영자', lastLogin: '어제 18:21', status: 'inactive' },
]

const sessions = [
  { id: 'S-9001', device: 'Chrome / Windows', ip: '10.12.3.41', state: '활성' },
  { id: 'S-9002', device: 'Safari / iPad', ip: '10.12.3.88', state: '만료 예정' },
]

const auditLogs = [
  { time: '오늘 09:12', action: '운영자 역할 부여', target: 'A-1002' },
  { time: '오늘 08:48', action: '세션 종료', target: 'S-9002' },
  { time: '어제 18:21', action: 'inactive 변경', target: 'A-1003' },
]

export default function SettingsRulesView() {
  return (
    <div className="view-stack">
      <section className="panel">
        <div className="panel__header">
          <h2>권한 관리</h2>
          <span className="badge badge--primary">계정 · 역할 · 세션</span>
        </div>
        <div className="stat-strip">
          <article className="stat-box"><span>관리자 계정</span><strong>3</strong></article>
          <article className="stat-box"><span>활성 세션</span><strong>2</strong></article>
          <article className="stat-box"><span>역할 그룹</span><strong>3</strong></article>
        </div>
      </section>

      <section className="detail-grid">
        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>계정 목록</h3>
              <span>GET /api/v1/admin/accounts</span>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>accountId</th>
                <th>이름</th>
                <th>역할</th>
                <th>최근 로그인</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((row) => (
                <tr key={row.id}>
                  <td className="mono">{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.role}</td>
                  <td>{row.lastLogin}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>권한 수정</h3>
              <span>PATCH /api/v1/admin/accounts/{'{accountId}'}</span>
            </div>
          </div>
          <div className="field-grid">
            <label>
              <span className="field-label">역할</span>
              <select className="select-shell" defaultValue="관리자">
                <option>관리자</option>
                <option>운영자</option>
                <option>검수자</option>
              </select>
            </label>
            <label>
              <span className="field-label">상태</span>
              <select className="select-shell" defaultValue="active">
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </label>
          </div>
          <label>
            <span className="field-label">변경 사유</span>
            <input className="input-shell" defaultValue="권한 범위 조정" />
          </label>
          <div className="button-row">
            <button type="button" className="primary-button">권한 저장</button>
            <button type="button" className="ghost-button">상태 변경</button>
          </div>
        </article>
      </section>

      <section className="detail-grid">
        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>세션 관리</h3>
              <span>DELETE /api/v1/admin/accounts/{'{accountId}'}/sessions/{'{sessionId}'}</span>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>sessionId</th>
                <th>기기</th>
                <th>IP</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((row) => (
                <tr key={row.id}>
                  <td className="mono">{row.id}</td>
                  <td>{row.device}</td>
                  <td className="mono">{row.ip}</td>
                  <td>{row.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-row">
            <button type="button" className="ghost-button">세션 종료</button>
            <button type="button" className="ghost-button">로그아웃</button>
          </div>
        </article>

        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>권한 변경 이력</h3>
              <span>권한 부여 · 상태 변경 · 세션 종료</span>
            </div>
          </div>
          <div className="info-list">
            {auditLogs.map((log) => (
              <div key={`${log.time}-${log.action}`} className="info-list__row">
                <span>{log.time} · {log.action}</span>
                <strong>{log.target}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
