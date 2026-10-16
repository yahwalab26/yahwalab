#!/usr/bin/env node
/**
 * build-works.mjs — 정산 사이트(Supabase)의 공개 출간작을 홈페이지 index.html에 반영합니다.
 *
 *  - 데이터: public.public_works 뷰 (서버 키로만 읽힘)
 *  - 바꾸는 곳: index.html 의 출간작 카드(WORKS 마커 사이) + JSON-LD 의 "야화랩 출간작" 목록
 *  - 표지: covers 버킷의 파일을 assets/img/ 에 같은 이름으로 내려받음
 *
 * 사용법
 *   (실서버)  SUPABASE_URL=… SUPABASE_SERVICE_ROLE_KEY=… node scripts/build-works.mjs
 *   (점검용)  node scripts/build-works.mjs --json works.json --no-download [--root 폴더] [--dry]
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = k => { const i = args.indexOf(k); return i < 0 ? null : (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true); };
const ROOT = path.resolve(opt('--root') || '.');
const HTML = path.join(ROOT, 'index.html');
const IMG = path.join(ROOT, 'assets', 'img');
const die = m => { console.error('✗ ' + m); process.exit(1); };

const GENRE_SCHEMA = { 'BL': 'BL', '로판': '로맨스 판타지', '현로': '현대 로맨스' };
const esc = s => String(s ?? '').replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
const exists = p => fs.access(p).then(() => true, () => false);

/* ---------- 1) 데이터 ---------- */
async function fetchRows() {
  const f = opt('--json');
  if (f) return JSON.parse(await fs.readFile(f, 'utf8'));
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) die('SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY 환경변수가 필요합니다.');
  const r = await fetch(`${url}/rest/v1/public_works?select=*`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
  if (!r.ok) die(`출간작 조회 실패 (${r.status}) ${await r.text()}`);
  return r.json();
}
function normalize(rows) {
  if (!Array.isArray(rows)) die('출간작 데이터 형식이 올바르지 않습니다.');
  rows = rows.slice().sort((a, b) =>
    (a.sort_order ?? 1e9) - (b.sort_order ?? 1e9) ||
    String(a.release_date || '').localeCompare(String(b.release_date || '')) ||
    String(a.title).localeCompare(String(b.title), 'ko'));
  rows.forEach(r => {
    const who = r.title || '(제목 없음)';
    if (!r.title) die('작품명이 비어 있는 행이 있습니다.');
    if (!r.pen_names) die(`"${who}": 필명이 없습니다.`);
    if (!GENRE_SCHEMA[r.genre]) die(`"${who}": 장르 값이 올바르지 않습니다 (${r.genre}).`);
    if (!/^[A-Za-z0-9._-]+\.(jpe?g|png|webp)$/i.test(r.cover_path || '')) die(`"${who}": 표지 파일명이 올바르지 않습니다 (${r.cover_path}).`);
    if (!/^https:\/\/blog\.naver\.com\//.test(r.blog_url || '')) die(`"${who}": 블로그 주소가 올바르지 않습니다.`);
  });
  return rows;
}

/* ---------- 2) 표지 내려받기 · 정리 ---------- */
async function syncCovers(rows) {
  await fs.mkdir(IMG, { recursive: true });
  const base = process.env.SUPABASE_URL;
  for (const r of rows) {
    const dst = path.join(IMG, r.cover_path);
    if (await exists(dst)) continue;
    const res = await fetch(`${base}/storage/v1/object/public/covers/${encodeURIComponent(r.cover_path)}`);
    if (!res.ok) die(`표지 내려받기 실패 (${res.status}): ${r.cover_path}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const jpg = buf[0] === 0xFF && buf[1] === 0xD8;
    if (buf.length < 1000 || (/\.jpe?g$/i.test(r.cover_path) && !jpg)) die(`표지 파일이 올바르지 않습니다: ${r.cover_path}`);
    await fs.writeFile(dst, buf);
    console.log('  + ' + r.cover_path);
  }
  /* 정산 사이트가 만든 자동 이름(cover-14자리.jpg) 중 더 이상 쓰이지 않는 것만 삭제. 손으로 넣은 옛 표지는 건드리지 않음 */
  const keep = new Set(rows.map(r => r.cover_path));
  for (const f of await fs.readdir(IMG))
    if (/^cover-\d{14}(-\d)?\.jpg$/.test(f) && !keep.has(f)) { await fs.unlink(path.join(IMG, f)); console.log('  - ' + f); }
}

/* ---------- 3) HTML 생성 ---------- */
const card = r => {
  const label = r.label || '야화랩';
  return `<a class="wk" href="${esc(r.blog_url)}" target="_blank" rel="noopener"><img class="cvi" src="./assets/img/${esc(r.cover_path)}" alt="${esc(r.title)} 표지 - ${esc(r.pen_names)} 작, ${esc(r.genre)} 웹소설, ${esc(label)} 출간" width="520" height="780" loading="lazy"><div class="t"><div><h3>${esc(r.title)}</h3><p class="au">${esc(r.pen_names)}</p></div><span>${esc(r.genre)}</span></div></a>`;
};
const person = n => ({ '@type': 'Person', name: n });
const listItem = (r, i) => {
  const names = r.pen_names.split(',').map(s => s.trim()).filter(Boolean);
  return { '@type': 'ListItem', position: i + 1, item: {
    '@type': 'Book', name: r.title, author: names.length > 1 ? names.map(person) : person(names[0]),
    genre: GENRE_SCHEMA[r.genre], inLanguage: 'ko', publisher: { '@id': 'https://yahwalab.xyz/#org' }, url: r.blog_url } };
};
/* 기존 JSON-LD 와 같은 모양(", " · ": " 구분)으로 직렬화해 변경 내역이 깔끔하게 보이게 함 */
const pj = v => Array.isArray(v) ? '[' + v.map(pj).join(', ') + ']'
  : (v && typeof v === 'object') ? '{' + Object.entries(v).map(([k, x]) => JSON.stringify(k) + ': ' + pj(x)).join(', ') + '}'
  : JSON.stringify(v);

function between(html, a, b, inner) {
  const i = html.indexOf(a), j = html.indexOf(b);
  if (i < 0 || j < 0 || j < i) die(`index.html 에서 마커를 찾지 못했습니다: ${a}`);
  return html.slice(0, i + a.length) + inner + html.slice(j);
}
function build(html, rows) {
  html = between(html, '<!--WORKS:START-->', '<!--WORKS:END-->', rows.map(card).join(''));
  const open = '<script type="application/ld+json">', i = html.indexOf(open);
  if (i < 0) die('JSON-LD 를 찾지 못했습니다.');
  const s = i + open.length, e = html.indexOf('</script>', s);
  const ld = JSON.parse(html.slice(s, e));
  const list = (ld['@graph'] || []).find(x => x['@type'] === 'ItemList' && x.name === '야화랩 출간작');
  if (!list) die('JSON-LD 의 "야화랩 출간작" 목록을 찾지 못했습니다.');
  list.itemListElement = rows.map(listItem);
  return html.slice(0, s) + pj(ld) + html.slice(e);
}

/* ---------- 실행 ---------- */
const rows = normalize(await fetchRows());
if (!rows.length && !opt('--allow-empty')) die('공개된 출간작이 0건입니다. 오류로 보고 중단합니다. (의도한 경우 --allow-empty)');
console.log(`출간작 ${rows.length}건: ` + rows.map(r => r.title).join(' · '));
if (!opt('--no-download')) await syncCovers(rows);
const before = await fs.readFile(HTML, 'utf8'), after = build(before, rows);
if (after === before) console.log('변경 없음');
else if (opt('--dry')) console.log('(dry) index.html 이 바뀔 예정입니다.');
else { await fs.writeFile(HTML, after, 'utf8'); console.log('index.html 갱신'); }
