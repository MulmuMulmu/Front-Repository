import { expect, test } from '@playwright/test'
import fs from 'node:fs/promises'
import path from 'node:path'

const outputDir = path.join(process.cwd(), 'artifacts', 'screenshots')

async function ensureOutputDir() {
  await fs.mkdir(outputDir, { recursive: true })
}

async function login(page: import('@playwright/test').Page) {
  await page.getByRole('button', { name: '로그인' }).click()
  await expect(page.getByRole('navigation', { name: '관리자 메뉴' })).toBeVisible()
}

async function captureShell(page: import('@playwright/test').Page, name: string) {
  await page.locator('.app-shell').screenshot({
    path: path.join(outputDir, name),
  })
}

async function expectCurrentHeading(page: import('@playwright/test').Page, title: string) {
  await expect(page.locator('.topbar').getByRole('heading', { name: title })).toBeVisible()
}

test.describe('admin image assets', () => {
  test.beforeAll(async () => {
    await ensureOutputDir()
  })

  test('captures required figures', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('dialog', { name: '물무물무' })).toBeVisible()

    await page.screenshot({
      path: path.join(outputDir, 'figure-5-5-7-admin-login.png'),
    })

    await login(page)

    await page.locator('.sidebar').screenshot({
      path: path.join(outputDir, 'figure-5-4-1-admin-menu-structure.png'),
    })

    await expectCurrentHeading(page, '운영 상황')
    await captureShell(page, 'figure-5-5-1-operations-dashboard.png')

    await page.getByRole('button', { name: 'OCR 검수 대기열 열기' }).click()
    await expectCurrentHeading(page, 'OCR 검수 대기열')
    await captureShell(page, 'figure-5-5-2-ocr-review-queue.png')

    await page.getByRole('button', { name: '게시글 신고 처리 열기' }).click()
    await expectCurrentHeading(page, '게시글 신고 처리')
    await captureShell(page, 'figure-5-5-3-post-report-processing.png')

    await page.getByRole('button', { name: '파일럿 그룹 운영 열기' }).click()
    await expectCurrentHeading(page, '파일럿 그룹 운영')
    await captureShell(page, 'figure-5-5-4-pilot-group-operations.png')

    await page.getByRole('button', { name: '공지/배너 관리 열기' }).click()
    await expectCurrentHeading(page, '공지/배너 관리')
    await captureShell(page, 'figure-5-5-5-notice-banner-management.png')

    await page.getByRole('button', { name: '권한 관리 열기' }).click()
    await expectCurrentHeading(page, '권한 관리')
    await captureShell(page, 'figure-5-5-6-permission-management.png')

    const expectedFiles = [
      'figure-5-4-1-admin-menu-structure.png',
      'figure-5-5-1-operations-dashboard.png',
      'figure-5-5-2-ocr-review-queue.png',
      'figure-5-5-3-post-report-processing.png',
      'figure-5-5-4-pilot-group-operations.png',
      'figure-5-5-5-notice-banner-management.png',
      'figure-5-5-6-permission-management.png',
      'figure-5-5-7-admin-login.png',
    ]

    for (const file of expectedFiles) {
      const fullPath = path.join(outputDir, file)
      const stat = await fs.stat(fullPath)
      expect(stat.size).toBeGreaterThan(0)
    }
  })
})
