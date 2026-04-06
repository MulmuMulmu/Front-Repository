const ocrQueues = [
  { id: 'Q-1001', status: 'pending', confidence: '0.68', items: '우유 x1, 식빵 x2' },
  { id: 'Q-1002', status: 'reviewing', confidence: '0.81', items: '계란 x10' },
  { id: 'Q-1003', status: 'hold', confidence: '0.59', items: '두부 x1, 파 x2' },
]

const reviewLogs = [
  { time: '18:42', action: '승인', actor: '정도욱' },
  { time: '18:38', action: '재검수 요청', actor: 'admin01' },
  { time: '18:31', action: '대기열 등록', actor: 'system' },
]

export default function OcrReviewView() {
  return (
    <div className="view-stack">
      <section className="panel">
        <div className="panel__header">
          <h2>OCR 검수 대기열</h2>
          <span className="badge badge--primary">대기 목록 · 원문 · 확정</span>
        </div>
        <div className="stat-strip">
          <article className="stat-box"><span>검수 대기</span><strong>3</strong></article>
          <article className="stat-box"><span>저신뢰</span><strong>8</strong></article>
          <article className="stat-box"><span>재검수 요청</span><strong>2</strong></article>
        </div>
      </section>

      <section className="detail-card">
        <div className="detail-card__header">
          <div>
            <h3>검수 대기열</h3>
            <span>GET /api/v1/admin/ocr/queues</span>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>queueId</th>
              <th>상태</th>
              <th>confidence</th>
              <th>초안 품목</th>
              <th>조치</th>
            </tr>
          </thead>
          <tbody>
            {ocrQueues.map((row) => (
              <tr key={row.id}>
                <td className="mono">{row.id}</td>
                <td>{row.status}</td>
                <td>{row.confidence}</td>
                <td>{row.items}</td>
                <td>
                  <div className="button-row">
                    <button type="button" className="ghost-button">상세</button>
                    <button type="button" className="ghost-button">재검수</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="detail-grid">
        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>OCR 원문과 후보</h3>
              <span>GET /api/v1/admin/ocr/queues/{'{queueId}'}</span>
            </div>
          </div>
          <div className="info-list">
            <div className="info-list__row"><span>queueId</span><strong className="mono">Q-1001</strong></div>
            <div className="info-list__row"><span>confidence</span><strong>0.68</strong></div>
            <div className="info-list__row"><span>OCR 원문</span><strong>우유 1, 식빵 2</strong></div>
            <div className="info-list__row"><span>정규화 후보</span><strong>우유 x1, 식빵 x2</strong></div>
          </div>
        </article>

        <article className="detail-card">
          <div className="detail-card__header">
            <div>
              <h3>확정과 반려</h3>
              <span>PATCH / POST /requeue</span>
            </div>
          </div>
          <div className="field-grid">
            <label>
              <span className="field-label">reviewStatus</span>
              <select className="select-shell" defaultValue="approved">
                <option value="approved">approved</option>
                <option value="rejected">rejected</option>
              </select>
            </label>
            <label>
              <span className="field-label">재검수 사유</span>
              <input className="input-shell" defaultValue="품목명 재분류 필요" />
            </label>
          </div>
          <label>
            <span className="field-label">reviewMemo</span>
            <textarea className="textarea-shell" defaultValue="품목명 정규화 완료" />
          </label>
          <div className="button-row">
            <button type="button" className="primary-button">승인</button>
            <button type="button" className="ghost-button">반려</button>
            <button type="button" className="ghost-button">재검수 요청</button>
          </div>
          <div className="info-list">
            {reviewLogs.map((log) => (
              <div key={`${log.time}-${log.action}`} className="info-list__row">
                <span>{log.time} · {log.action}</span>
                <strong>{log.actor}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
