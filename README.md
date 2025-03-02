# 🎮 Gamegoo Admin - 어드민 페이지

**게임 매칭 서비스 `겜구(Gamegoo)`의 어드민 페이지**로,<br/>
운영자가 유저 관리, 매칭 모니터링, 신고 처리 등의 기능을 수행할 수 있도록 지원합니다.

<br/>



## 📂 프로젝트 구조

```
/gamegoo-admin
├── src/
│   ├── api/          # API 요청 관리
│   ├── components/   # 공통 컴포넌트
│   ├── constants/    # 상수 관리
│   ├── hooks/        # 커스텀 훅
│   ├── layouts/      # 레이아웃 관련 컴포넌트
│   ├── pages/        # 주요 페이지 (대시보드, 유저 관리, 신고 처리 등)
│   ├── routes/       # 라우트 설정
│   ├── store/        # 전역 상태 관리 (Redux/Zustand)
│   ├── styles/       # 전역 스타일 관리
│   ├── types/        # TypeScript 타입 정의
│   ├── utils/        # 유틸리티 함수
│   ├── App.tsx       # 메인 엔트리 파일
│   ├── main.tsx      # 렌더링 시작점
│   ├── vite-env.d.ts # Vite 환경 설정
│   └── index.html    # 기본 HTML 템플릿
├── .gitignore        # Git ignore 설정
├── eslint.config.js  # ESLint 설정
├── package.json      # 프로젝트 의존성 관리
├── tsconfig.json     # TypeScript 설정
├── tsconfig.app.json # TypeScript 애플리케이션 설정
├── README.md         # 프로젝트 소개 및 실행 가이드
```

---

## 🚀 설치 및 실행 방법

### 1️⃣ 환경 변수 설정

`.env` 파일을 생성하여 필요한 API 키 및 환경 변수를 설정
`.env.example` 파일을 참고하여 필요한 값을 입력하기

```
VITE_API_URL=your_api_url
VITE_AUTH_KEY=your_auth_key
```

### 2️⃣ 프로젝트 실행

```sh
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

---

## 🎯 주요 기능

- 📊 **대시보드**: 실시간 데이터 분석 및 게임 매칭 현황 모니터링
- 👤 **유저 관리**: 가입 유저 목록 조회 및 제재 기능
- 🚨 **신고 처리**: 신고 접수 목록 확인 및 처리
- 🔧 **설정 관리**: 매칭 정책 및 어드민 계정 설정

---

## 🔧 기술 스택

- **Framework/Language**: React, TypeScript
- **State Management**: Redux Toolkit
- **UI Library**: Styled Components
- **API 요청**: Axios
- **빌드 및 배포**: Vite, Vercel

---

## 🚀 Git 컨벤션

### 📝 Issue 생성

- **이슈 템플릿을 사용**하여 Assignees, Labels 선택
- 이슈 제목: **대문자로 시작** (ex. **Feat**, **Fix**, **Style** 등)
- TODO에 상세 내용 작성

### 🏷️ Labels

이슈 생성 시 라벨을 설정하여 협업을 원활하게 진행

---

### 🌱 Branch 생성

- **develop 브랜치에서 새로운 브랜치 생성**
- 브랜치명은 소문자로, 이슈 번호를 포함하여 생성

```sh
git checkout -b 브랜치명
```

| 타입               | 설명                               |
| ------------------ | ---------------------------------- |
| `feat`             | 새로운 기능 추가                   |
| `fix`              | 버그 수정                          |
| `docs`             | 문서 수정                          |
| `style`            | CSS 작업, 코드 포맷팅              |
| `refactor`         | 코드 리팩토링                      |
| `api`              | API 관련 작업                      |
| `test`             | 테스트 코드 추가                   |
| `chore`            | 패키지 매니저 수정, 설정 파일 변경 |
| `comment`          | 주석 추가 및 변경                  |
| `file`             | 파일 또는 폴더명 수정, 이동, 삭제  |
| `!BREAKING CHANGE` | API 대규모 변경                    |
| `!hotfix`          | 긴급 버그 수정                     |

---

### ✅ Commit 메시지 규칙

```sh
git commit -m "type(#이슈번호): 작업 내용"
```

✅ 예시:

```sh
git commit -m "feat(#12): 유저 신고 관리 기능 추가"
```

---

### 🔄 Pull Request 규칙

- **develop 브랜치로 PR 생성**
- PR 제목: commit 메시지와 동일하게 작성
- PR 본문:
  - `[Feat]` 핵심 내용 요약
  - 간결한 리스트 형식으로 변경 사항 설명
- Merge는 리뷰어가 수행

---

## 🎯 팀원 리뷰 후 Merge

- PR 리뷰 시 해당 브랜치로 checkout 후 확인
- Merge 후 이슈 자동 닫기

```sh
git merge 브랜치명
git push origin develop
```
