const sessions = [
  { id: 'S-9001', device: 'Chrome / Windows', ip: '10.12.3.41', loginAt: '09:12', state: '활성', risk: '낮음' },
  { id: 'S-9002', device: 'Safari / iPad', ip: '10.12.3.88', loginAt: '07:40', state: '만료 예정', risk: '보통' },
  { id: 'S-9003', device: 'Chrome / macOS', ip: '10.12.8.14', loginAt: '23:11', state: '종료됨', risk: '높음' },
]

const auditLogs = [
  { time: '09:12', event: '로그인 성공', target: 'admin01' },
  { time: '09:18', event: '세션 종료', target: 'S-9003' },
  { time: '09:21', event: '권한 확인', target: 'tr-admin-001' },
]

export default function AuthSecurityView() {
  return (
    <div className="view-stack">
      <section className="panel">
        <div className="panel__header">
          <h2>로그인과 권한</h2>
          <span className="badge badge--primary">인증 · 세션 · 계정</span>
        </div>
        <div className="stat-strip">
          <article className="stat-box"><span>활성 세션</span><strong>6</strong></article>
          <article className="stat-box"><span>권한 역할</span><strong>3</strong></article>
          <article className="stat-box"><span>위험 세션</span><strong>1</strong></article>
        </div>
      </section>

      <section className="detail-grid">
        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>관리자 로그인</h3>
              <span>POST /api/v1/admin/auth/login</span>
            </div>
            <span className="badge">resultCode 200</span>
          </div>
          <div className="field-grid">
            <label>
              <span className="field-label">관리자 아이디</span>
              <input className="input-shell" defaultValue="admin01" />
            </label>
            <label>
              <span className="field-label">비밀번호</span>
              <input className="input-shell" type="password" defaultValue="password1234" />
            </label>
          </div>
          <div className="button-row">
            <button type="button" className="primary-button">로그인 요청</button>
            <button type="button" className="ghost-button">로그아웃 요청</button>
          </div>
        </article>

        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>현재 계정 정보</h3>
              <span>GET /api/v1/admin/auth/me</span>
            </div>
          </div>
          <div className="info-list">
            <div className="info-list__row"><span>adminId</span><strong className="mono">A-1001</strong></div>
            <div className="info-list__row"><span>name</span><strong>운영자</strong></div>
            <div className="info-list__row"><span>role</span><strong>super_admin</strong></div>
            <div className="info-list__row"><span>scopes</span><div className="chip-row chip-row--dense"><span>reports</span><span>ocr</span><span>notices</span><span>accounts</span></div></div>
          </div>
        </article>
      </section>

      <section className="detail-grid">
        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>세션 관리</h3>
              <span>DELETE /accounts/{'{accountId}'}/sessions/{'{sessionId}'}</span>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>세션 ID</th>
                <th>기기</th>
                <th>IP</th>
                <th>로그인</th>
                <th>상태</th>
                <th>위험</th>
                <th>조치</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((row) => (
                <tr key={row.id}>
                  <td className="mono">{row.id}</td>
                  <td>{row.device}</td>
                  <td className="mono">{row.ip}</td>
                  <td>{row.loginAt}</td>
                  <td>{row.state}</td>
                  <td>{row.risk}</td>
                  <td><button type="button" className="ghost-button">세션 종료</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>계정 상태 변경</h3>
              <span>PATCH /api/v1/admin/accounts/{'{accountId}'}</span>
            </div>
          </div>
          <div className="field-grid">
            <label>
              <span className="field-label">계정 상태</span>
              <select className="select-shell" defaultValue="inactive">
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </label>
            <label>
              <span className="field-label">변경 사유</span>
              <input className="input-shell" defaultValue="권한 회수" />
            </label>
          </div>
          <div className="button-row">
            <button type="button" className="primary-button">상태 저장</button>
            <button type="button" className="ghost-button">권한 재검증</button>
          </div>
          <div className="info-list">
            {auditLogs.map((log) => (
              <div key={`${log.time}-${log.event}`} className="info-list__row">
                <span>{log.time} · {log.event}</span>
                <strong>{log.target}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
