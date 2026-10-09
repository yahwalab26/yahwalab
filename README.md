# 야화랩 웹사이트 — GitHub Pages + 개인 도메인

사이트 주소: **https://yahwalab.xyz/**

## 1. 파일 올리기
`yahwalab` 저장소의 맨 위(루트)에 이 폴더 **안의 파일·폴더 전체**를 올립니다 (폴더째 넣으면 안 됩니다).
`index.html`, `epub2/`, `web-production/`, `css/`, `js/`, `assets/`, `404.html`, `robots.txt`, `llms.txt`, `sitemap.xml`, `CNAME`

## 2. 도메인 연결 (한 번만)
**① 도메인 구입처 DNS 설정**
| 종류 | 호스트 | 값 |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | yahwalab26.github.io |

(GitHub 공식 문서 "Managing a custom domain for your GitHub Pages site"의 IP와 같은지 한 번 확인하세요.)

**② GitHub** → 저장소 *Settings → Pages* → Custom domain에 `yahwalab.xyz` 입력 → Save → DNS 확인이 끝나면 **Enforce HTTPS** 체크
(`CNAME` 파일을 함께 올려두었으니 이미 입력돼 있을 수 있습니다.)

DNS 반영은 몇 분~24시간 걸립니다. 반영되면 기존 `yahwalab26.github.io/yahwalab/` 주소는 자동으로 새 도메인으로 넘어갑니다.

## 3. 검색 노출 (가장 중요)
1. **구글 서치콘솔** → 속성 추가 → "도메인" 방식 선택 → `yahwalab.xyz` → 안내되는 TXT 레코드를 DNS에 추가 (모든 하위 주소가 한 번에 인증됨)
   - URL 접두어 방식을 쓴다면 안내되는 메타태그를 각 페이지 `<head>`의 "소유 확인 메타태그" 주석 아래에 붙여넣기
2. 서치콘솔 → 사이트맵에 `https://yahwalab.xyz/sitemap.xml` 제출, "URL 검사"에서 홈 주소 색인 생성 요청
3. **네이버 서치어드바이저** → 사이트 등록(`https://yahwalab.xyz`) → 소유 확인(HTML 태그를 같은 주석 자리에) → 사이트맵 제출, 웹페이지 수집 요청
4. 블로그·X(https://x.com/yahwalab) 프로필에 사이트 주소 걸기

## 주소 구조
```
https://yahwalab.xyz/                  Publishing (홈)
https://yahwalab.xyz/epub2/            EPUB2 제작
https://yahwalab.xyz/web-production/   홈페이지 제작
```
`robots.txt`, `sitemap.xml`, `llms.txt`는 이제 도메인 최상단에 있어 검색·AI 크롤러가 바로 읽습니다.

## 폴더 구조
`css/style.css`(스타일), `js/main.js`(로딩 모션·문의 레이어), `assets/`(로고·표지·파비콘)

## 자주 하는 수정
- **출간작 추가**: `index.html`의 `<div class="works" id="wl">`에서 `<a class="wk">` 블록 복사 → 같은 파일 위쪽 JSON-LD `ItemList`, `llms.txt`에도 추가. 표지는 `assets/img/`에 2:3 비율로 저장.
- **투고 안내 문구**: `js/main.js`의 `C.submit`
- **FAQ**: 화면의 FAQ와 JSON-LD의 FAQPage를 **둘 다** 같은 내용으로 수정
- 수정 후 `sitemap.xml`의 `lastmod` 날짜 갱신
