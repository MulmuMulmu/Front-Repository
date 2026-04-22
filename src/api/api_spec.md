# 물무물무 관리자 API 명세서

## 인증 (Authentication)

### 1. 관리자 로그인
관리자 계정으로 로그인을 시도합니다.

- **URL**: `/api/v1/auth/login` (예시)
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`

#### Request Body
```json
{
  "email": "mulmuAdmin",
  "password": "1234"
}
```

#### Responses

##### 1) 200 OK (성공)
로그인에 성공하고 JWT 토큰을 반환합니다.
```json
{
  "success": true,
  "result": {
    "jwt": "임의의 토큰 64자리 값"
  }
}
```

##### 2) 400 Bad Request (아이디/비밀번호 불일치)
```json
{
  "success": false,
  "code": "COMMON400",
  "result": "아이디 또는 비밀번호가 일치하지 않습니다."
}
```

##### 3) 500 Internal Server Error (서버 오류)
```json
{
  "success": false,
  "code": "COMMON500",
  "result": "관리자 로그인을 처리할 수 없습니다."
}
```

---

## 신고 관리 (Report Management)

### 1. 신고 목록 조회
선택한 날짜와 필터(상태)에 따른 신고 내역 목록을 조회합니다.

- **URL**: `/api/v1/reports` (예시)
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer {token}`

#### Request Body
```json
{
  "Date": "2026-04-13",
  "type": "all" // all 또는 completed 또는 notCompleted
}
```

#### Responses

##### 1) 200 OK (성공)
```json
{
  "success": true,
  "result": {
    "reports" : [
      {
        "reportId" : "exampleReportId",
        "shareId" : "exampleShareId",
        "reporterName" : "물무",
        "content" : "개봉된 가공식품 나눔",
        "status" : "완료"
      },
      {
        "reportId" : "exampleReportId",
        "shareId" : "exampleShareId",
        "reporterName" : "가연",
        "content" : "주류 판매",
        "status" : "미완"
      }
    ]
  }
}
```

##### 2) 500 Internal Server Error (서버 오류)
```json
{
  "success": false,
  "code" : "COMMON500",
  "result": "신고 목록을 조회할 수 없습니다."
}
```
