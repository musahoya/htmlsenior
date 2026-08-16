# 부산 출퇴근 앱 배포

프론트엔드는 기존 GitHub Pages 주소를 유지하고, 카카오 REST API 키와 API 호출은 Netlify Function에만 둡니다.

## 1. Netlify 연결

1. Netlify에서 **Add new project → Import an existing project → GitHub**를 선택합니다.
2. `musahoya/htmlsenior` 저장소를 선택합니다.
3. **Branch to deploy**는 `main`, **Base directory**는 `commute-test`로 지정합니다.
4. Build command는 비워 두고 Publish directory는 `.`으로 지정해 배포합니다.

## 2. 비밀키 설정

Netlify 프로젝트의 **Project configuration → Environment variables**에서 `KAKAO_REST_API_KEY`를 만들고 카카오 REST API 키를 값으로 저장합니다. API 키는 GitHub 파일에 넣지 마세요. 저장한 다음 다시 배포합니다.

## 3. GitHub Pages 연결

Netlify가 발급한 `https://사이트이름.netlify.app` 주소를 복사합니다. `config.js`의 `YOUR-SITE` 부분을 실제 사이트 이름으로 바꾼 뒤 GitHub에 반영합니다.

이후 기존 GitHub Pages의 `/commute-test/`를 열면 세 경로가 자동 계산됩니다. Function은 지정된 세 목적지만 받고 GitHub Pages 출처만 허용합니다.

