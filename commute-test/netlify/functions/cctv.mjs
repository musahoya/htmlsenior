// 국토교통부 ITS OpenAPI(CCTV 정보)를 서버에서 대신 호출한다. 키는 Netlify 환경변수 ITS_API_KEY 에만 있다.
// GET /.netlify/functions/cctv            → 부산 범위 CCTV 목록(이름·영상주소·좌표)
// GET /.netlify/functions/cctv?q=광안      → 이름에 '광안'이 들어간 것만

const BUSAN = { minX: '128.75', maxX: '129.40', minY: '34.95', maxY: '35.45' };
const API = 'https://openapi.its.go.kr:9443/cctvInfo';

export default async (request) => {
  const origin = request.headers.get('origin') || '';
  const allowed = (Netlify.env.get('ALLOWED_ORIGINS') || 'https://musahoya.github.io,https://busan-commute-api.netlify.app').split(',').map((v) => v.trim());
  const cors = {
    'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0],
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (request.method !== 'GET') return json({ error: 'GET 요청만 지원합니다.' }, 405, cors);
  if (origin && !allowed.includes(origin)) return json({ error: '허용되지 않은 사이트입니다.' }, 403, cors);

  const key = Netlify.env.get('ITS_API_KEY');
  if (!key) return json({ error: '서버에 ITS_API_KEY 가 설정되지 않았습니다.' }, 500, cors);

  try {
    const q = (new URL(request.url).searchParams.get('q') || '').trim();
    // cctvType 1 = 실시간 스트리밍(HLS), 2 = 동영상 파일. 둘 다 받아 합친다.
    // 도로 종류 ex=고속도로, its=국도·시내도로. 부산 시내 CCTV 는 its 쪽이라 둘 다 조회한다.
    const combos = ['ex', 'its'].flatMap((road) => ['1', '2'].map((cctvType) => [road, cctvType]));
    const diagnostics = [];
    const results = await Promise.all(combos.map(([road, cctvType]) => fetchType(key, road, cctvType)
      .then((rows) => { diagnostics.push({ road, cctvType, ok: true, count: rows.length }); return rows; })
      .catch((error) => { diagnostics.push({ road, cctvType, ok: false, error: String(error.message || error).slice(0, 300) }); return []; })));
    const seen = new Set();
    const items = results.flat().filter((item) => {
      const id = item.name + '|' + item.url;
      if (seen.has(id)) return false;
      seen.add(id);
      return !q || item.name.includes(q);
    });
    items.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    return json({ count: items.length, items, diagnostics, updatedAt: new Date().toISOString() }, 200, { ...cors, 'Cache-Control': 'public, max-age=600' });
  } catch (error) {
    console.error(error);
    return json({ error: error.message || 'CCTV 목록을 가져오지 못했습니다.' }, 502, cors);
  }
};

async function fetchType(key, road, cctvType) {
  const url = new URL(API);
  url.searchParams.set('apiKey', key);
  url.searchParams.set('type', road);
  url.searchParams.set('cctvType', cctvType);
  for (const [name, value] of Object.entries(BUSAN)) url.searchParams.set(name, value);
  url.searchParams.set('getType', 'json');

  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  const text = await response.text();
  if (!response.ok) throw new Error('ITS 응답 오류 (' + response.status + '): ' + text.slice(0, 120));
  let data;
  try { data = JSON.parse(text); } catch { throw new Error('ITS 응답을 읽지 못했습니다: ' + text.slice(0, 120)); }
  const list = data?.response?.data ?? [];
  if (!list.length) throw new Error('0건: ' + text.slice(0, 200));
  return list.map((row) => ({
    name: String(row.cctvname ?? ''),
    url: String(row.cctvurl ?? ''),
    format: String(row.cctvformat ?? ''),
    x: Number(row.coordx),
    y: Number(row.coordy),
    type: cctvType === '1' ? 'live' : 'video',
  })).filter((row) => row.name && row.url);
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers } });
}
