const users = [
  { id: 'U-1001', name: '김가람', region: '서울', state: 'active', pilot: 'Y', lastSeen: '방금 전' },
  { id: 'U-1002', name: '박서윤', region: '부산', state: 'active', pilot: 'Y', lastSeen: '12분 전' },
  { id: 'U-1003', name: '이준호', region: '대전', state: 'inactive', pilot: 'N', lastSeen: '3일 전' },
]

export default function UserMonitoringView() {
  return (
    <div className="view-stack">
      <section className="panel">
        <div className="panel__header">
          <h2>사용자 확인</h2>
          <span className="badge badge--primary">이름 · 지역 · 상태</span>
        </div>
        <div className="stat-strip">
          <article className="stat-box"><span>관심 사용자</span><strong>12</strong></article>
          <article className="stat-box"><span>서울 지역</span><strong>384</strong></article>
          <article className="stat-box"><span>파일럿 후보</span><strong>24</strong></article>
        </div>
      </section>

      <section className="detail-grid">
        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>이름 검색</h3>
              <span>사용자명 기반 검색</span>
            </div>
          </div>
          <div className="field-grid">
            <label>
              <span className="field-label">이름</span>
              <input className="input-shell" defaultValue="김" />
            </label>
            <label>
              <span className="field-label">상태</span>
              <select className="select-shell" defaultValue="all">
                <option value="all">전체</option>
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </label>
          </div>
          <div className="button-row">
            <button type="button" className="primary-button">검색</button>
            <button type="button" className="ghost-button">관심 사용자 저장</button>
          </div>
        </article>

        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>지역/상태 필터</h3>
              <span>운영 대상 좁히기</span>
            </div>
          </div>
          <div className="field-grid">
            <label>
              <span className="field-label">지역</span>
              <select className="select-shell" defaultValue="서울">
                <option>서울</option>
                <option>부산</option>
                <option>대전</option>
              </select>
            </label>
            <label>
              <span className="field-label">파일럿 포함</span>
              <select className="select-shell" defaultValue="yes">
                <option value="yes">포함</option>
                <option value="no">제외</option>
              </select>
            </label>
          </div>
          <div className="chip-row chip-row--dense">
            <span>관심 사용자</span>
            <span>지역 필터</span>
            <span>상태 필터</span>
          </div>
        </article>
      </section>

      <section className="detail-card">
        <div className="detail-card__header">
          <div>
            <h3>사용자 목록</h3>
            <span>이름/지역/상태/파일럿 여부</span>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>userId</th>
              <th>이름</th>
              <th>지역</th>
              <th>상태</th>
              <th>파일럿</th>
              <th>최근 활동</th>
            </tr>
          </thead>
          <tbody>
            {users.map((row) => (
              <tr key={row.id}>
                <td className="mono">{row.id}</td>
                <td>{row.name}</td>
                <td>{row.region}</td>
                <td>{row.state}</td>
                <td>{row.pilot}</td>
                <td>{row.lastSeen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
