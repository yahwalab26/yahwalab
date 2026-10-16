# 야화랩 웹사이트 — GitHub Pages + 개인 도메인

사이트 주소: **https://yahwalab.xyz/**

## 1. 파일 올리기
`yahwalab` 저장소의 맨 위(루트)에 이 폴더 **안의 파일·폴더 전체**를 올립니다 (폴더째 넣으면 안 됩니다).
`index.html`, `epub2/`, `web-production/`, `css/`, `js/`, `assets/`, `scripts/`, `.github/`, `404.html`, `robots.txt`, `llms.txt`, `sitemap.xml`, `CNAME`

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

## 이메일 구분
- **투고 문의** (홈 `투고 문의` 버튼 · 투고 팝업 · 투고 FAQ · `llms.txt` 제출물): `editor@yahwalab.xyz`
- **그 외 전부** (푸터 · 제작 문의 · 조직 정보 JSON-LD · 404): `admin@yahwalab.xyz`
- 팝업에 표시되는 주소는 `js/main.js` 맨 위 `MAIL` 값에서 바꿉니다.

## 표지 이미지 보호
표지에서 우클릭·끌어가기·길게 누르기 메뉴를 막습니다(`css/style.css` 맨 아래, `js/main.js` 맨 아래). 자동 출간작 반영이 `index.html`을 다시 써도 유지되도록 마크업이 아닌 CSS/JS로 처리했습니다.
다만 개발자도구·화면 캡처·직접 주소 접근까지 막는 기능은 아니며, 일반 사용자의 "이미지 주소 복사 / 다른 이름으로 저장"을 불편하게 하는 억제용입니다.

## 자동 반영 범위
`scripts/build-works.mjs`가 `index.html`(카드·JSON-LD) 외에 `llms.txt`의 출간작 목록과 `sitemap.xml` 홈 `lastmod`도 갱신합니다.

## 자주 하는 수정
- **출간작 추가**: 정산 사이트에서 등록하면 자동 반영됩니다. 손으로 넣을 때는 `index.html`의 `<a class="wk">` 블록 복사 → JSON-LD `ItemList`에도 추가. 표지는 `assets/img/`에 2:3 비율로 저장.
- **투고 안내 문구**: `js/main.js`의 `C.submit`
- **공유 대표 이미지**: `assets/og-image.png` (1200×630)
- **FAQ**: 화면의 FAQ와 JSON-LD의 FAQPage를 **둘 다** 같은 내용으로 수정
- 수정 후 `sitemap.xml`의 `lastmod` 날짜 갱신
