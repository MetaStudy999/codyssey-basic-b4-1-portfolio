# B4-1 Runtime Evidence

B4-1 **「나를 소개하는 웹페이지 처음부터 만들기」** 미션의 실제 브라우저 실행 및 기능 검증 증빙입니다.

- Repository: [MetaStudy999/codyssey-basic-b4-1-portfolio](https://github.com/MetaStudy999/codyssey-basic-b4-1-portfolio)
- GitHub Pages: [B4-1 Portfolio](https://metastudy999.github.io/codyssey-basic-b4-1-portfolio/)
- Evidence folder: [docs/evidence](https://github.com/MetaStudy999/codyssey-basic-b4-1-portfolio/tree/main/docs/evidence)

> 증빙 이미지는 원본 PNG를 사용합니다. 변환·리사이즈·재압축한 WebP 증빙 파일은 제거했습니다.

## Evidence Map

평가자가 증빙의 목적을 한눈에 파악할 수 있도록 **화면 → 반응형 → 모바일 인터랙션 → 폼 → 외부 API → 개발자/배포 검증** 순으로 분류했습니다.

| No. | 분류 | 검증 목적 | 증빙 수 |
|---:|---|---|---:|
| 1 | 🖥️ Desktop & Theme | 기본 데스크톱 UI와 다크 모드 확인 | 2 |
| 2 | 📐 Responsive Layout | 태블릿·데스크톱 브레이크포인트 확인 | 2 |
| 3 | 📱 Mobile & Interaction | 모바일 화면과 햄버거/프로젝트/스크롤 탑 동작 확인 | 4 |
| 4 | 📝 Contact Form | 입력 검증·오류 처리·정상 제출 확인 | 3 |
| 5 | 🔗 GitHub API | 외부 API 기반 Projects 동적 렌더링 확인 | 1 |
| 6 | 🛠️ Developer & Deployment | Console 무오류 및 GitHub Pages 배포 확인 | 3 |
|  | **합계** |  | **15** |

---

## 1. 🖥️ Desktop & Theme

데스크톱 환경에서 사이트의 기본 레이아웃과 테마 전환 결과를 확인합니다.

| 증빙 | 확인 항목 | 파일 |
|---|---|---|
| Desktop 기본 화면 | Hero 및 주요 섹션의 데스크톱 레이아웃 정상 표시 | [desktop.png](./desktop.png) |
| Dark Mode | 다크 모드 적용 상태 및 테마 UI 확인 | [dark.png](./dark.png) |

## 2. 📐 Responsive Layout

미션에서 요구하는 주요 브레이크포인트의 반응형 레이아웃을 확인합니다.

| 증빙 | 확인 항목 | 파일 |
|---|---|---|
| Tablet 768px | 768px 구간의 반응형 레이아웃 | [responsive-768.png](./responsive-768.png) |
| Desktop 1024px | 1024px 구간의 반응형 레이아웃 | [responsive-1024.png](./responsive-1024.png) |

## 3. 📱 Mobile & Interaction

모바일 환경에서 레이아웃뿐 아니라 사용자가 직접 조작하는 핵심 인터랙션을 확인합니다.

| 증빙 | 확인 항목 | 파일 |
|---|---|---|
| Mobile 기본 화면 | 약 375px 모바일 기본 레이아웃 | [mobile.png](./mobile.png) |
| Hamburger Menu | 햄버거 버튼 클릭 후 모바일 메뉴가 열린 상태 | [mobile-menu.png](./mobile-menu.png) |
| Mobile Projects | 모바일 화면에서 Projects 카드 표시 상태 | [mobile-projects.png](./mobile-projects.png) |
| Scroll Top | 스크롤 후 상단 이동 버튼이 표시된 상태 | [mobile-scroll-top.png](./mobile-scroll-top.png) |

## 4. 📝 Contact Form Validation

Contact 폼의 **실패 → 오류 안내 → 성공** 흐름을 단계별로 확인합니다.

| 단계 | 검증 시나리오 | 기대/확인 결과 | 파일 |
|---:|---|---|---|
| 1 | 필수값을 비운 상태로 제출 | 필수 입력값 오류 표시 | [contact-empty.png](./contact-empty.png) |
| 2 | 잘못된 이메일 형식으로 제출 | 이메일 형식 오류 표시 | [contact-invalid-email.png](./contact-invalid-email.png) |
| 3 | 유효한 값으로 정상 제출 | 성공 메시지 및 제출 완료 상태 | [contact-success.png](./contact-success.png) |

## 5. 🔗 GitHub API & Dynamic Projects

외부 GitHub API에서 저장소 정보를 받아 Projects 영역을 동적으로 구성한 결과를 확인합니다.

| 증빙 | 확인 항목 | 파일 |
|---|---|---|
| Projects API 결과 | GitHub 저장소 카드가 실제 데이터로 렌더링된 상태 | [projects.png](./projects.png) |

## 6. 🛠️ Developer Verification & Deployment

사용자 화면 외에 개발자 도구와 배포 설정을 통해 실행 안정성과 외부 접근 가능 상태를 확인합니다.

| 증빙 | 확인 항목 | 파일 |
|---|---|---|
| DevTools Console | Console 오류·경고·Issues 없음 확인 | [console-no-errors.png](./console-no-errors.png) |
| GitHub Pages 설정 | `main` 기반 GitHub Pages 배포 설정 화면 | [github-pages-settings.png](./github-pages-settings.png) |
| GitHub Pages 핵심 설정 | Pages 설정의 핵심 영역을 확대해 확인 | [github-pages-settings-crop.png](./github-pages-settings-crop.png) |

---

## Runtime Verification Summary

실제 브라우저에서 다음 항목을 확인했습니다.

- 데스크톱 레이아웃 정상 표시
- 모바일 375px, 태블릿 768px, 데스크톱 1024px 반응형 레이아웃 확인
- 다크 모드 적용 및 새로고침 후 설정 유지 확인
- 모바일 햄버거 메뉴 동작 확인
- 네비게이션 이동 대상 도달 확인
- 스크롤 탑 버튼 표시 및 상단 이동 확인
- Contact 폼의 빈 값, 잘못된 이메일, 정상 제출 흐름 확인
- GitHub API를 통한 프로젝트 카드 렌더링 확인
- DevTools Console에서 오류/경고/Issues 없음 확인
- GitHub Pages 외부 접속 확인

## Evidence Boundary

다음 항목은 현재 증빙으로 과장하여 PASS 처리하지 않습니다.

- GitHub API 오류 상태 및 Retry UI의 실제 런타임 재현
- GitHub API 빈 응답 상태의 실제 런타임 재현
- 스크롤 애니메이션의 정확한 보간 동작 자체
- IntersectionObserver의 정확한 threshold 값에 대한 브라우저 런타임 계측
- 헤더 스크롤 임계값의 별도 런타임 계측

이 항목들은 코드/정적 검증과 실제 브라우저 증빙을 구분하여 관리합니다.

## Submission Note

평가 시에는 위 **Evidence Map → 분야별 상세 표 → PNG 링크** 순서로 확인하면 전체 증빙을 빠르게 검토할 수 있습니다. 배포 상태는 상단의 GitHub Pages 링크에서 직접 확인할 수 있습니다.
