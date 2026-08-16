const ORIGIN_ADDRESS = '부산 남구 오륙도SK뷰아파트';
const DESTINATIONS = {oncheon:'부산 온천천공원길 38-4',millak:'부산 수영구 민락동 36-3',jwadong:'부산 해운대구 좌동 벽산1차아파트 104동'};

export default async (request) => {
  const origin=request.headers.get('origin')||'';
  const allowedOrigins=(Netlify.env.get('ALLOWED_ORIGINS')||'https://musahoya.github.io,https://busan-commute-api.netlify.app').split(',').map(value=>value.trim());
  const cors={'Access-Control-Allow-Origin':allowedOrigins.includes(origin)?origin:allowedOrigins[0],'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Vary':'Origin'};
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors});
  if(request.method!=='POST')return json({error:'POST 요청만 지원합니다.'},405,cors);
  if(origin&&!allowedOrigins.includes(origin))return json({error:'허용되지 않은 사이트입니다.'},403,cors);
  const key=Netlify.env.get('KAKAO_REST_API_KEY');
  if(!key)return json({error:'서버에 카카오 API 키가 설정되지 않았습니다.'},500,cors);
  try{
    const body=await request.json();const destination=DESTINATIONS[body.destinationId];
    if(!destination)return json({error:'등록되지 않은 목적지입니다.'},400,cors);
    const[start,end]=await Promise.all([geocode('부산 남구 오륙도SK뷰아파트',key),geocode(destination,key)]);
    const summary=await directions(start,end,key);
    return json({destinationId:body.destinationId,durationSeconds:summary.duration,distanceMeters:summary.distance,updatedAt:new Date().toISOString()},200,{...cors,'Cache-Control':'private, no-store'});
  }catch(error){console.error(error);return json({error:error.message||'경로 계산에 실패했습니다.'},502,cors)}
};

async function geocode(query,key){const headers={Authorization:'KakaoAK '+key};let response=await fetch('https://dapi.kakao.com/v2/local/search/address.json?query='+encodeURIComponent(query),{headers});let data=response.ok?await response.json():null;if(!data?.documents?.length){response=await fetch('https://dapi.kakao.com/v2/local/search/keyword.json?query='+encodeURIComponent(query),{headers});data=response.ok?await response.json():null}if(!response.ok)throw new Error('카카오 주소검색 오류 ('+response.status+')');if(!data?.documents?.length)throw new Error('주소를 찾지 못했습니다: '+query);return{x:data.documents[0].x,y:data.documents[0].y}}
async function directions(start,end,key){const url=new URL('https://apis-navi.kakaomobility.com/v1/directions');url.searchParams.set('origin',start.x+','+start.y);url.searchParams.set('destination',end.x+','+end.y);url.searchParams.set('priority','RECOMMEND');url.searchParams.set('summary','true');const response=await fetch(url,{headers:{Authorization:'KakaoAK '+key}});const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error('카카오 길찾기 오류 ('+response.status+')');const summary=data.routes?.[0]?.summary;if(!summary)throw new Error(data.routes?.[0]?.result_msg||'이동 경로를 찾지 못했습니다.');return summary}
function json(body,status,headers){return new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json; charset=utf-8',...headers}})}

