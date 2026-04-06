const groups = [
  { id: 'PG-1', status: 'active', members: '34명', flags: 'share_v2, expiry_hint', kpi: 'CTR 14%' },
  { id: 'PG-2', status: 'paused', members: '12명', flags: 'ocr_retry', kpi: 'OCR 승인율 91%' },
]

const selectedMembers = ['U-1001', 'U-1002', 'U-1018']

export default function PilotGroupsView() {
  return (
    <div className="view-stack">
      <section className="panel">
        <div className="panel__header">
          <h2>파일럿 그룹 운영</h2>
          <span className="badge badge--primary">그룹 · 플래그 · KPI</span>
        </div>
        <div className="stat-strip">
          <article className="stat-box"><span>운영 그룹</span><strong>2</strong></article>
          <article className="stat-box"><span>대상 사용자</span><strong>46</strong></article>
          <article className="stat-box"><span>기능 플래그</span><strong>3</strong></article>
        </div>
      </section>

      <section className="detail-card">
        <div className="detail-card__header">
          <div>
            <h3>그룹 목록</h3>
            <span>GET /api/v1/admin/pilot-groups · /metrics</span>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>groupId</th>
              <th>상태</th>
              <th>대상자</th>
              <th>플래그</th>
              <th>KPI</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((row) => (
              <tr key={row.id}>
                <td className="mono">{row.id}</td>
                <td>{row.status}</td>
                <td>{row.members}</td>
                <td>{row.flags}</td>
                <td>{row.kpi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="detail-grid">
        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>그룹 수정</h3>
              <span>PATCH /api/v1/admin/pilot-groups/{'{groupId}'}</span>
            </div>
          </div>
          <div className="field-grid">
            <label>
              <span className="field-label">대상 사용자</span>
              <input className="input-shell" defaultValue="U-1001, U-1002" />
            </label>
            <label>
              <span className="field-label">기능 플래그</span>
              <input className="input-shell" defaultValue="share_v2" />
            </label>
          </div>
          <div className="field-grid">
            <label>
              <span className="field-label">startAt</span>
              <input className="input-shell" defaultValue="2026-04-06T09:00:00+09:00" />
            </label>
            <label>
              <span className="field-label">endAt</span>
              <input className="input-shell" defaultValue="2026-04-20T18:00:00+09:00" />
            </label>
          </div>
          <div className="chip-row chip-row--dense">
            {selectedMembers.map((member) => (
              <span key={member}>{member}</span>
            ))}
          </div>
          <div className="button-row">
            <button type="button" className="primary-button">그룹 저장</button>
            <button type="button" className="ghost-button">대상 제거</button>
          </div>
        </article>

        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>전환율 요약</h3>
              <span>GET /metrics</span>
            </div>
          </div>
          <div className="info-list">
            <div className="info-list__row"><span>signups</span><strong>12</strong></div>
            <div className="info-list__row"><span>shares</span><strong>5</strong></div>
            <div className="info-list__row"><span>clicks</span><strong>20</strong></div>
          </div>
        </article>
      </section>
    </div>
  )
}
