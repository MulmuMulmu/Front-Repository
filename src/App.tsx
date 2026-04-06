import { type ComponentType, useMemo, useState } from 'react'
import { navItems, type ViewId } from './data/adminConsole'
import DashboardView from './views/DashboardView'
import ReportsView from './views/ReportsView'
import OcrReviewView from './views/OcrReviewView'
import PilotGroupsView from './views/PilotGroupsView'
import NoticesAlertsView from './views/NoticesAlertsView'
import SettingsRulesView from './views/SettingsRulesView'

function BrandMark() {
  return (
    <svg
      aria-hidden="true"
      className="brand-mark"
      viewBox="0 0 120 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="leftDrop" x1="12" y1="18" x2="72" y2="92">
          <stop offset="0%" stopColor="#edf4ff" />
          <stop offset="55%" stopColor="#b7d1ff" />
          <stop offset="100%" stopColor="#7ca6ff" />
        </linearGradient>
        <linearGradient id="rightDrop" x1="48" y1="10" x2="104" y2="88">
          <stop offset="0%" stopColor="#edf5ff" />
          <stop offset="50%" stopColor="#c8dcff" />
          <stop offset="100%" stopColor="#92b6ff" />
        </linearGradient>
      </defs>
      <path
        d="M36 8C22 26 10 46 10 62C10 84 24 98 44 98C63 98 78 84 78 62C78 46 67 26 54 8C50 2 40 2 36 8Z"
        fill="url(#leftDrop)"
        fillOpacity="0.95"
        stroke="#8bb0ff"
        strokeWidth="3"
      />
      <path
        d="M68 8C54 26 42 46 42 62C42 84 56 98 76 98C95 98 110 84 110 62C110 46 98 26 86 8C81 2 72 2 68 8Z"
        fill="url(#rightDrop)"
        fillOpacity="0.86"
        stroke="#7ea4ff"
        strokeWidth="3"
      />
    </svg>
  )
}

const viewComponents: Record<ViewId, ComponentType> = {
  dashboard: DashboardView,
  ocr: OcrReviewView,
  reports: ReportsView,
  pilot: PilotGroupsView,
  notices: NoticesAlertsView,
  permissions: SettingsRulesView,
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeView, setActiveView] = useState<ViewId>('dashboard')
  const CurrentView = viewComponents[activeView]
  const activeLabel = useMemo(
    () => navItems.find((item) => item.id === activeView)?.label ?? '홈',
    [activeView],
  )

  return (
    <div className="app-root">
      <div className={`app-shell ${isAuthenticated ? '' : 'app-shell--locked'}`} aria-hidden={!isAuthenticated}>
        <aside className="sidebar">
          <div className="sidebar__brand">
            <BrandMark />
            <div>
              <span className="sidebar__eyebrow">관리자 운영 화면</span>
              <h1>물무물무</h1>
            </div>
          </div>

          <nav aria-label="관리자 메뉴">
            <ul className="sidebar__menu">
              {navItems.map((item) => (
                <li key={item.id} className={activeView === item.id ? 'is-active' : ''}>
                  <button type="button" aria-label={`${item.label} 열기`} onClick={() => setActiveView(item.id)}>
                    <strong>{item.label}</strong>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sidebar__footer">
            <span>상태 확인</span>
            <strong>운영 정상 · 확인 필요 4건</strong>
            <div className="chip-row chip-row--dense">
              <span>신고 12</span>
              <span>OCR 8</span>
              <span>알림 2</span>
            </div>
            <button type="button" className="sidebar__logout">
              로그아웃
            </button>
          </div>
        </aside>

        <main className="dashboard">
          <header className="topbar">
            <div className="topbar__title">
              <span className="topbar__eyebrow">물무물무</span>
              <h2>{activeView === 'dashboard' ? '운영 상황' : activeLabel}</h2>
            </div>
            <div className="topbar__meta">
              <div className="meta-card">
                <span>동기화</span>
                <strong>2026-04-07 00:12</strong>
              </div>
              <div className="meta-card">
                <span>현재 화면</span>
                <strong>{activeLabel}</strong>
              </div>
            </div>
          </header>

          <CurrentView />
        </main>
      </div>

      {!isAuthenticated ? (
        <div className="login-overlay" role="dialog" aria-modal="true" aria-labelledby="login-title">
          <div className="login-card">
          <div className="login-card__brand">
              <BrandMark />
              <div>
                <span className="login-card__eyebrow">관리자 운영 화면</span>
                <h2 id="login-title">물무물무</h2>
              </div>
            </div>
            <p className="login-card__subtitle">로그인 후 운영 화면에 접근할 수 있습니다.</p>
            <div className="login-card__fields">
              <label>
                <span className="field-label">아이디</span>
                <input className="input-shell" placeholder="관리자 아이디" />
              </label>
              <label>
                <span className="field-label">비밀번호</span>
                <input className="input-shell" type="password" placeholder="비밀번호" />
              </label>
            </div>
            <div className="button-row">
              <button type="button" className="primary-button" onClick={() => setIsAuthenticated(true)}>
                로그인
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
