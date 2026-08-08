# B4-1 Runtime Evidence

B4-1 **「나를 소개하는 웹페이지 처음부터 만들기」** 미션의 실제 브라우저 실행 및 기능 검증 증빙입니다.

- Repository: [MetaStudy999/codyssey-basic-b4-1-portfolio](https://github.com/MetaStudy999/codyssey-basic-b4-1-portfolio)
- GitHub Pages: [B4-1 Portfolio](https://metastudy999.github.io/codyssey-basic-b4-1-portfolio/)
- Evidence folder: [docs/evidence](https://github.com/MetaStudy999/codyssey-basic-b4-1-portfolio/tree/main/docs/evidence)

> 증빙 이미지는 원본 PNG를 사용합니다. 변환·리사이즈·재압축한 WebP 증빙 파일은 제거했습니다.

## Evidence Index

| 구분 | 증빙 내용 | 파일 |
|---|---|---|
| Desktop | 데스크톱 기본 화면 | [desktop.png](./desktop.png) |
| Dark Mode | 다크 모드 적용 화면 | [dark.png](./dark.png) |
| Projects | GitHub API 저장소 카드 렌더링 | [projects.png](./projects.png) |
| Contact | 필수값 미입력 검증 | [contact-empty.png](./contact-empty.png) |
| Contact | 잘못된 이메일 검증 | [contact-invalid-email.png](./contact-invalid-email.png) |
| Contact | 정상 제출 및 성공 상태 | [contact-success.png](./contact-success.png) |
| Mobile | 모바일 기본 화면 | [mobile.png](./mobile.png) |
| Mobile Menu | 햄버거 메뉴 열린 상태 | [mobile-menu.png](./mobile-menu.png) |
| Mobile Projects | 모바일 Projects 화면 | [mobile-projects.png](./mobile-projects.png) |
| Scroll Top | 모바일 스크롤 탑 버튼 표시 | [mobile-scroll-top.png](./mobile-scroll-top.png) |
| Responsive 768 | 768px 반응형 화면 | [responsive-768.png](./responsive-768.png) |
| Responsive 1024 | 1024px 반응형 화면 | [responsive-1024.png](./responsive-1024.png) |
| Console | DevTools Console 오류/경고 없음 확인 | [console-no-errors.png](./console-no-errors.png) |
| GitHub Pages | Pages 배포 설정 화면 | [github-pages-settings.png](./github-pages-settings.png) |
| GitHub Pages | Pages 설정 핵심 영역 확대 | [github-pages-settings-crop.png](./github-pages-settings-crop.png) |

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

평가 시에는 이 문서에서 각 PNG 링크를 열어 실제 실행 화면을 확인하고, 배포 상태는 위의 GitHub Pages 링크에서 직접 확인할 수 있습니다.
