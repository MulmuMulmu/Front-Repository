import { queueItems, summaryMetrics, trendSeries } from '../data/adminConsole'

type SeriesKey = 'signups' | 'shares' | 'alerts'
type BadgeTone = 'primary' | 'default'

type TrendSeriesMeta = {
  key: SeriesKey
  label: string
  className: string
}

const trendMeta: TrendSeriesMeta[] = [
  { key: 'signups', label: '가입', className: 'chart-path chart-path--primary' },
  { key: 'shares', label: '나눔', className: 'chart-path chart-path--soft' },
  { key: 'alerts', label: '알림', className: 'chart-path chart-path--light' },
]

const axisLabelIndices = new Set([0, 3, 6])

function Badge({ children, tone = 'default' }: { children: string; tone?: BadgeTone }) {
  return <span className={`badge ${tone === 'primary' ? 'badge--primary' : ''}`}>{children}</span>
}

export default function DashboardView() {
  const max = Math.max(...trendSeries.flatMap((point) => [point.signups, point.shares, point.alerts]))
  const lastPoint = trendSeries[trendSeries.length - 1]
  const chartHeight = 172
  const chartWidth = 560
  const chartPaddingX = 12
  const chartPaddingTop = 16
  const chartPaddingBottom = 12
  const chartInnerHeight = chartHeight - chartPaddingTop - chartPaddingBottom
  const stepX = (chartWidth - chartPaddingX * 2) / (trendSeries.length - 1)
  const yAxisValues = [max, Math.round(max / 2), 0]

  const getX = (index: number) => chartPaddingX + index * stepX
  const getY = (value: number) =>
    chartPaddingTop + (chartInnerHeight - (value / max) * chartInnerHeight)

  const buildPath = (key: SeriesKey) =>
    trendSeries
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${getX(index)} ${getY(point[key])}`)
      .join(' ')

  return (
    <div className="view-stack">
      <section className="summary-grid" aria-label="핵심 운영 지표">
        {summaryMetrics.map((metric) => (
          <article key={metric.label} className="summary-card">
            <div className="summary-card__top">
              <span className="summary-card__label">{metric.label}</span>
              <span className="summary-card__delta">{metric.delta}</span>
            </div>
            <strong className="summary-card__value">{metric.value}</strong>
          </article>
        ))}
      </section>

      <section className="hero-grid">
        <section className="panel">
          <div className="panel__header">
            <h2>바로 확인할 일</h2>
            <Badge tone="primary">우선 4건</Badge>
          </div>
          <div className="queue-list">
            {queueItems.map((item) => (
              <article key={item.id} className="queue-item">
                <div className="queue-item__main">
                  <div className="queue-item__title-row">
                    <span className="queue-item__area">{item.area}</span>
                    <strong>{item.title}</strong>
                  </div>
                  <div className="queue-item__meta">
                    <span>{item.owner}</span>
                    <Badge>{item.status}</Badge>
                  </div>
                </div>
                <div className="queue-item__side">
                  <Badge>{item.priority}</Badge>
                  <span className="queue-item__due">{item.due}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel__header">
            <h2>주간 운영 추이</h2>
          </div>
          <div className="trend-shell">
            <div className="trend-metrics" aria-hidden="true">
              {trendMeta.map((series) => (
                <div key={series.key} className="trend-metric">
                  <span className={`trend-swatch ${series.className}`} />
                  <div>
                    <span>{series.label}</span>
                    <strong>{lastPoint[series.key]}</strong>
                  </div>
                </div>
              ))}
            </div>
            <div className="trend-chart-frame">
              <div className="trend-y-axis" aria-hidden="true">
                {yAxisValues.map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>
              <div className="trend-plot">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="주간 운영 추이 차트">
                  {yAxisValues.map((value) => (
                    <line
                      key={value}
                      x1={chartPaddingX}
                      y1={getY(value)}
                      x2={chartWidth - chartPaddingX}
                      y2={getY(value)}
                      className="chart-guide"
                    />
                  ))}
                  {trendMeta.map((series) => (
                    <path key={series.key} className={series.className} d={buildPath(series.key)} />
                  ))}
                  {trendMeta.map((series) => {
                    const cx = getX(trendSeries.length - 1)
                    const cy = getY(lastPoint[series.key])
                    return <circle key={series.key} cx={cx} cy={cy} r="3.5" className={`chart-endpoint ${series.className}`} />
                  })}
                </svg>
                <div className="trend-axis" aria-hidden="true">
                  {trendSeries.map((point, index) => (
                    <span key={point.day}>{axisLabelIndices.has(index) ? point.day : ''}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

    </div>
  )
}
