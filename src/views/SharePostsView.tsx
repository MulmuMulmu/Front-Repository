const posts = [
  { id: 'SH-7001', status: 'open', state: 'reviewing', title: '유통기한 임박 식품 나눔', chatRoomId: 'ROOM-8001' },
  { id: 'SH-7002', status: 'hidden', state: 'hidden', title: '품목 확인 필요', chatRoomId: 'ROOM-8002' },
  { id: 'SH-7003', status: 'open', state: 'approved', title: '냉장 채소 나눔', chatRoomId: 'ROOM-8011' },
]

const selectedPost = {
  id: 'SH-7002',
  writer: '박서윤',
  region: '부산',
  chatRoomId: 'ROOM-8002',
  title: '품목 확인 필요',
}

export default function SharePostsView() {
  return (
    <div className="view-stack">
      <section className="panel">
        <div className="panel__header">
          <h2>게시글 관리</h2>
          <span className="badge badge--primary">목록 · 상세 · 승인 · 숨김</span>
        </div>
        <div className="stat-strip">
          <article className="stat-box"><span>공개 글</span><strong>18</strong></article>
          <article className="stat-box"><span>숨김 글</span><strong>2</strong></article>
          <article className="stat-box"><span>운영 메모</span><strong>4</strong></article>
        </div>
      </section>

      <section className="detail-card">
        <div className="detail-card__header">
          <div>
            <h3>게시글 목록</h3>
            <span>GET /api/v1/admin/share-posts</span>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>shareId</th>
              <th>상태</th>
              <th>운영 상태</th>
              <th>제목</th>
              <th>chatRoomId</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((row) => (
              <tr key={row.id}>
                <td className="mono">{row.id}</td>
                <td>{row.status}</td>
                <td>{row.state}</td>
                <td>{row.title}</td>
                <td className="mono">{row.chatRoomId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="detail-grid">
        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>상세와 상태 변경</h3>
              <span>GET / PATCH /status</span>
            </div>
          </div>
          <div className="info-list">
            <div className="info-list__row"><span>shareId</span><strong className="mono">{selectedPost.id}</strong></div>
            <div className="info-list__row"><span>작성자</span><strong>{selectedPost.writer}</strong></div>
            <div className="info-list__row"><span>지역</span><strong>{selectedPost.region}</strong></div>
            <div className="info-list__row"><span>제목</span><strong>{selectedPost.title}</strong></div>
            <div className="info-list__row"><span>chatRoomId</span><strong className="mono">{selectedPost.chatRoomId}</strong></div>
          </div>
          <div className="field-grid">
            <label>
              <span className="field-label">변경 상태</span>
              <select className="select-shell" defaultValue="hidden">
                <option value="approved">approved</option>
                <option value="hidden">hidden</option>
                <option value="restored">restored</option>
              </select>
            </label>
            <label>
              <span className="field-label">사유</span>
              <input className="input-shell" defaultValue="금지 품목 확인" />
            </label>
          </div>
          <div className="button-row">
            <button type="button" className="primary-button">승인</button>
            <button type="button" className="ghost-button">숨김</button>
            <button type="button" className="ghost-button">복구</button>
          </div>
        </article>

        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>운영 메모</h3>
              <span>POST /notes · DELETE /notes/{'{noteId}'}</span>
            </div>
          </div>
          <label>
            <span className="field-label">메모 내용</span>
            <textarea className="textarea-shell" defaultValue="게시글 상태 재확인 필요" />
          </label>
          <div className="button-row">
            <button type="button" className="primary-button">메모 저장</button>
            <button type="button" className="ghost-button">메모 삭제</button>
          </div>
        </article>
      </section>
    </div>
  )
}
