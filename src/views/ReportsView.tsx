const reports = [
  { id: 'RP-9001', status: 'open', reason: '금지 품목 의심', writer: '박서윤', receivedAt: '19:20' },
  { id: 'RP-9002', status: 'reviewing', reason: '허위 정보 가능성', writer: '김가람', receivedAt: '18:42' },
  { id: 'RP-9003', status: 'resolved', reason: '중복 게시', writer: '이준호', receivedAt: '17:18' },
]

const selectedPost = {
  shareId: 'SH-7002',
  title: '품목 확인 필요',
  writer: '박서윤',
  region: '부산',
  reportReason: '금지 품목 의심',
  body: '냉장 보관 식품 나눔 글입니다.',
}

const noteHistory = [
  { body: '첨부 이미지 확인 필요', author: 'admin01' },
  { body: '임시 숨김 후 재검토', author: 'admin02' },
]

const attachments = ['photo-1.jpg', 'chat-log.txt']

export default function ReportsView() {
  return (
    <div className="view-stack">
      <section className="panel">
        <div className="panel__header">
          <h2>게시글 신고 처리</h2>
          <span className="badge badge--primary">신고 목록 · 원문 · 조치</span>
        </div>
        <div className="stat-strip">
          <article className="stat-box"><span>접수 신고</span><strong>12</strong></article>
          <article className="stat-box"><span>조치 대기</span><strong>4</strong></article>
          <article className="stat-box"><span>숨김 게시글</span><strong>2</strong></article>
        </div>
      </section>

      <section className="detail-grid">
        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>신고 목록</h3>
              <span>GET /api/v1/admin/reports</span>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>reportId</th>
                <th>상태</th>
                <th>사유</th>
                <th>작성자</th>
                <th>접수</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((row) => (
                <tr key={row.id}>
                  <td className="mono">{row.id}</td>
                  <td>{row.status}</td>
                  <td>{row.reason}</td>
                  <td>{row.writer}</td>
                  <td>{row.receivedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>게시글 원문</h3>
              <span>GET /api/v1/admin/reports/{'{reportId}'} · GET /api/v1/admin/share-posts/{'{shareId}'}</span>
            </div>
          </div>
          <div className="info-list">
            <div className="info-list__row"><span>shareId</span><strong className="mono">{selectedPost.shareId}</strong></div>
            <div className="info-list__row"><span>제목</span><strong>{selectedPost.title}</strong></div>
            <div className="info-list__row"><span>작성자</span><strong>{selectedPost.writer}</strong></div>
            <div className="info-list__row"><span>지역</span><strong>{selectedPost.region}</strong></div>
            <div className="info-list__row"><span>신고 사유</span><strong>{selectedPost.reportReason}</strong></div>
            <div className="info-list__row"><span>본문</span><strong>{selectedPost.body}</strong></div>
          </div>
        </article>
      </section>

      <section className="detail-grid">
        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>조치</h3>
              <span>PATCH /api/v1/admin/reports/{'{reportId}'}/status · PATCH /api/v1/admin/share-posts/{'{shareId}'}/status</span>
            </div>
          </div>
          <div className="field-grid">
            <label>
              <span className="field-label">신고 상태</span>
              <select className="select-shell" defaultValue="reviewing">
                <option value="reviewing">reviewing</option>
                <option value="hold">hold</option>
                <option value="resolved">resolved</option>
              </select>
            </label>
            <label>
              <span className="field-label">게시글 처리</span>
              <select className="select-shell" defaultValue="hidden">
                <option value="hidden">hidden</option>
                <option value="approved">approved</option>
                <option value="restored">restored</option>
              </select>
            </label>
          </div>
          <label>
            <span className="field-label">처리 메모</span>
            <textarea className="textarea-shell" defaultValue="첨부 확인 후 임시 숨김 처리" />
          </label>
          <div className="button-row">
            <button type="button" className="primary-button">숨김</button>
            <button type="button" className="ghost-button">유지</button>
            <button type="button" className="ghost-button">제재</button>
          </div>
        </article>

        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>운영 메모와 첨부</h3>
              <span>POST /notes · DELETE /attachments · DELETE /notes/{'{noteId}'}</span>
            </div>
          </div>
          <div className="chip-row chip-row--dense">
            {attachments.map((file) => (
              <span key={file}>{file}</span>
            ))}
          </div>
          <div className="info-list">
            {noteHistory.map((note) => (
              <div key={`${note.author}-${note.body}`} className="info-list__row">
                <span>{note.body}</span>
                <strong>{note.author}</strong>
              </div>
            ))}
          </div>
          <div className="button-row">
            <button type="button" className="primary-button">메모 저장</button>
            <button type="button" className="ghost-button">첨부 삭제</button>
            <button type="button" className="ghost-button">메모 삭제</button>
          </div>
        </article>
      </section>
    </div>
  )
}
