import { fireEvent, render, screen, within } from '@testing-library/react'
import App from './App'

function login() {
  fireEvent.click(screen.getByRole('button', { name: '로그인' }))
}

describe('Admin dashboard', () => {
  it('shows the login card on first load', () => {
    render(<App />)

    expect(screen.getByRole('dialog', { name: '물무물무' })).toBeInTheDocument()
    expect(screen.getByText('로그인 후 운영 화면에 접근할 수 있습니다.')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('관리자 아이디')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument()
  })

  it('renders the simplified admin shell and primary menu tree after login', () => {
    render(<App />)
    login()
    const adminMenu = screen.getByRole('navigation', { name: '관리자 메뉴' })

    expect(screen.getAllByRole('heading', { name: '물무물무' }).length).toBeGreaterThan(0)
    expect(within(adminMenu).getByText('홈')).toBeInTheDocument()
    expect(within(adminMenu).getByText('OCR 검수 대기열')).toBeInTheDocument()
    expect(within(adminMenu).getByText('권한 관리')).toBeInTheDocument()
    expect(screen.getByText('신규 가입')).toBeInTheDocument()
    expect(screen.getByText('상태 확인')).toBeInTheDocument()
    expect(screen.getByText('운영 정상 · 확인 필요 4건')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '로그아웃' })).toBeInTheDocument()
  })

  it('shows the streamlined dashboard sections', () => {
    render(<App />)
    login()

    expect(screen.getByRole('heading', { name: '운영 상황' })).toBeInTheDocument()
    expect(screen.getByText('바로 확인할 일')).toBeInTheDocument()
    expect(screen.getByText('주간 운영 추이')).toBeInTheDocument()
    expect(screen.queryByText('운영 메뉴')).not.toBeInTheDocument()
  })

  it('removes verbose copy from the dashboard headline and KPI labels', () => {
    render(<App />)
    login()

    expect(screen.queryByText('오늘의 운영 상황과 조치 지점')).not.toBeInTheDocument()
    expect(screen.queryByText('관리자에서 할 수 있는 일')).not.toBeInTheDocument()
    expect(screen.queryByText('오늘 신규 가입')).not.toBeInTheDocument()
    expect(screen.queryByText('오늘 나눔 완료')).not.toBeInTheDocument()
  })

  it('renders the six main admin screens with their core tools', () => {
    render(<App />)
    login()

    const cases = [
      ['OCR 검수 대기열', '검수 대기열', '확정과 반려'],
      ['게시글 신고 처리', '신고 목록', '게시글 원문'],
      ['파일럿 그룹 운영', '그룹 목록', '그룹 수정'],
      ['공지/배너 관리', '공지 작성', '배너 관리'],
      ['권한 관리', '계정 목록', '권한 변경 이력'],
    ] as const

    cases.forEach(([menu, primary, secondary]) => {
      fireEvent.click(screen.getByRole('button', { name: `${menu} 열기` }))
      expect(screen.getAllByText(primary).length).toBeGreaterThan(0)
      expect(screen.getAllByText(secondary).length).toBeGreaterThan(0)
    })
  })
})
