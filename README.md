# 야화랩 웹사이트 — GitHub Pages 업로드용

사이트 주소: https://yahwalab26.github.io/yahwalab/

## 올리는 방법 (GitHub Pages)
1. GitHub의 `yahwalab` 저장소(repository)를 엽니다.
2. **이 폴더 안의 파일·폴더 전체**(`index.html`, `epub2`, `web-production`, `css`, `js`, `assets`, `404.html`, `robots.txt`, `llms.txt`, `sitemap.xml`)를 저장소 **맨 위(루트)** 에 업로드합니다. (폴더째 `yahwalab/`를 통째로 넣으면 주소가 `/yahwalab/yahwalab/`가 되니 주의)
   - 웹: *Add file → Upload files* 에 끌어다 놓고 Commit
3. *Settings → Pages* → Source: **Deploy from a branch** → Branch: `main` / `/(root)` → Save
4. 1~2분 뒤 https://yahwalab26.github.io/yahwalab/ 에서 확인

## 주소 구조
```
/yahwalab/                    Publishing (홈)
/yahwalab/epub2/              EPUB2 제작
/yahwalab/web-production/     홈페이지 제작
```
모든 경로는 상대 경로라서 저장소 이름이 바뀌어도 화면은 정상이지만, 검색용 주소(canonical·sitemap·JSON-LD)는 `https://yahwalab26.github.io/yahwalab` 로 되어 있으니 주소가 바뀌면 그 부분을 바꾸세요.

## 올린 뒤 해야 할 일 (검색 노출)
1. **구글 서치콘솔**: 속성 추가 → URL 접두어 `https://yahwalab26.github.io/yahwalab/` → 인증(HTML 태그 방식) → 안내된 메타태그를 각 페이지 `<head>`의 "소유 확인 메타태그" 주석 아래에 붙여넣기 → 사이트맵 `sitemap.xml` 제출
2. **네이버 서치어드바이저**: 사이트 등록 → 소유 확인(HTML 태그) → 같은 위치에 메타태그 붙여넣기 → 사이트맵 제출, 웹페이지 수집 요청
3. 블로그·X 프로필에 사이트 주소 걸기

## robots.txt 관련 참고
검색 로봇은 `https://yahwalab26.github.io/robots.txt`(도메인 최상단)만 읽습니다. 프로젝트 사이트(`/yahwalab/`)에서는 이 위치에 파일을 둘 수 없지만, robots.txt가 없으면 모든 로봇이 허용으로 처리되므로 지금은 문제가 없습니다. 이 폴더의 `robots.txt`는 나중에 개인 도메인으로 옮길 때 그대로 쓰시면 됩니다.

## 자주 하는 수정
- **출간작 추가**: `index.html`의 `<div class="works" id="wl">`에서 `<a class="wk">` 블록 복사 → 같은 파일 위쪽 JSON-LD `ItemList`, `llms.txt`에도 추가. 표지는 `assets/img/`에 2:3 비율로 저장.
- **투고 안내 문구**: `js/main.js`의 `C.submit`
- **FAQ**: 화면의 FAQ와 JSON-LD의 FAQPage를 **둘 다** 같은 내용으로 수정
- 수정 후 `sitemap.xml`의 `lastmod` 날짜 갱신
