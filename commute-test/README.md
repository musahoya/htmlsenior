# 부산 출퇴근 앱 배포

프론트엔드는 기존 GitHub Pages 주소를 유지하고, 카카오 REST API 키와 API 호출은 Cloudflare Worker에만 둡니다.

## 1. Worker 배포

1. Cloudflare 대시보드에서 **Workers & Pages → Create → Worker**를 선택합니다.
2. Worker 이름을 `busan-commute-api`로 정하고 배포합니다.
3. **Edit code**에서 기본 코드를 지우고 이 폴더의 `worker.js` 전체를 붙여 넣은 뒤 다시 배포합니다.
4. Worker의 **Settings → Variables and Secrets → Add**에서 이름을 `KAKAO_REST_API_KEY`로 입력하고, 카카오 REST API 키를 값으로 넣습니다. 반드시 **Secret**으로 저장합니다.
5. 발급된 `https://busan-commute-api....workers.dev` 주소를 복사합니다.

## 2. GitHub Pages 연결

`config.js`의 `https://YOUR-WORKER.workers.dev`를 위에서 복사한 실제 Worker 주소로 바꿔 커밋합니다. API 키는 `config.js`나 다른 GitHub 파일에 넣지 마세요.

## 3. 확인

Worker 주소 뒤에 `/health`를 붙여 열었을 때 `{"ok":true}`가 나오면 서버가 실행 중입니다. 이후 기존 GitHub Pages의 `/commute-test/`를 열면 세 경로가 자동 계산됩니다.

Worker는 지정된 세 목적지만 받으며, GitHub Pages 출처만 허용합니다. 길찾기 결과는 불필요한 반복 호출을 줄이기 위해 30초 동안 캐시합니다.

