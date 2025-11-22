
1. 내가 원하는 내용을 gemini가 정리해줌

제공해 주신 YouTube 영상 내용을 바탕으로 시니어 채널 영상을 제작하는 AI 에이전트 워크플로우 설계 방법과 이를 실행하는 웹앱(App) 제작 로드맵을 상세히 안내해 드리겠습니다.
영상에서 강조하듯이, 이 워크플로우는 Google OPAL 플랫폼을 기반으로 여러 AI 에이전트를 연결하여 만듭니다.
1. 시니어 채널 영상 제작 워크플로우 설계 (Google OPAL)
워크플로우를 설계하는 핵심 단계는 총 6개의 AI 에이전트를 생성하고 순서대로 연결하는 것입니다.
⚙️ 1단계: 연구 에이전트 생성 (Research Agent)
 * 목표: 콘텐츠의 트렌드와 시니어 타겟의 니즈를 분석하는 '두뇌' 역할 담당.
 * 설정:
   * 모델: Gemini 2.5 (또는 연구 능력이 우수한 모델 선택)
   * 도구(Tool): 웹 서치(Web Search) 권한 부여
   * 입력값(Input): **유저 인풋(User Input)**을 받아 타겟(예: 60대), 주제(예: 건강), 목적(예: 지식 정보 제공) 등의 정보를 입력받도록 설정.
   * 지침(Prompt): "너는 유튜브 콘텐츠를 만들 연구 에이전트이며, 다음 정보를 사용해 인터넷에서 최신 트렌드를 검색하여 시니어를 위한 콘텐츠를 아주 자세히 분석해 줘."
📝 2단계: 장면 생성 에이전트 생성 (Scene Creation Agent)
 * 목표: 연구 결과를 바탕으로 구체적인 장면 구성(시나리오)을 만드는 역할.
 * 설정:
   * 입력값: 1단계 연구 에이전트의 결과물을 연결하여 받습니다.
   * 지침: "연구 에이전트의 정보를 받아서 한 장면(Scene)을 시나리오 형태로 만들어." (장소, 시간, 등장인물, 대사, 동작 등 포함)
✂️ 3단계: 대본 추출 에이전트 생성 (Script Extraction Agent)
 * 목표: 텍스트-음성 변환(TTS)을 위해 시나리오에서 순수한 나레이션 대본만 추출.
 * 설정:
   * 입력값: 2단계 장면 생성 에이전트의 결과물을 연결하여 받습니다.
   * 지침: "장면 시나리오에서 '사람이 말하는 부분(대본)' 코어 부분만 정확하게 추출하고, 장면 이름이나 샷 넘버 같은 부가적인 텍스트는 모두 제거해." (TTS 모델이 불필요한 내용을 읽지 않도록 하기 위함)
🗣️ 4단계: 음성 생성 에이전트 생성 (TTS Agent)
 * 목표: 추출된 대본을 고품질의 음성 파일로 변환.
 * 설정:
   * 모델: AudioLM (Generate speech from text)
   * 입력값: 3단계 대본 추출 에이전트의 결과물을 연결하여 받습니다.
   * 옵션: 음성 스타일(성별: Male/Female) 및 톤 등을 선택합니다.
🖼️ 5단계 & 6단계: 이미지 및 영상 생성 에이전트 추가
 * 목표: 대본에 맞는 시각 자료(이미지/영상)를 생성.
 * 설정:
   * 이미지 에이전트: 이미지 생성 모델을 사용하여 장면 정보를 받아 이미지를 생성합니다.
   * 영상 에이전트: 영상 생성 모델인 Veo 3.1을 사용하여 장면 정보를 받아 영상을 생성합니다.
   * 입력값: 2단계 장면 생성 에이전트의 결과물 또는 장면 내용을 기반으로 **프롬프트를 생성하는 별도의 에이전트(프롬프트 추출 에이전트)**를 중간에 추가하여 연결하면 품질이 향상됩니다.
   * 중요: 유튜브용으로 16:9 비율을 설정해야 합니다 (기본 1:1이 아닌 가로가 긴 형태).
🎬 최종 아웃풋 연결 (Output)
 * 모든 에이전트가 생성한 결과물(영상, 이미지, 음성 파일)을 최종 아웃풋 노드에 연결하여 워크플로우 실행 후 결과물을 확인할 수 있도록 설정합니다.
2. 시니어 채널 워크플로우를 웹앱으로 만들기 (App)
Google OPAL에서 위와 같이 설계된 워크플로우는 별도의 코딩 없이 즉시 실행 가능한 앱으로 전환할 수 있습니다.
 * 워크플로우 완료: 1단계에서 6단계까지의 모든 에이전트 연결이 완료된 워크플로우를 저장합니다.
 * 앱 전환/공유: OPAL 플랫폼 내에서 해당 워크플로우를 Share App 기능으로 공유하거나 실행 가능한 App 형태로 배포합니다.
 * 실행: 유저는 별도의 워크플로우 편집 없이, 이 앱에 접속하여 첫 단계의 유저 인풋 필드에 콘텐츠 주제만 입력하고 Start 버튼을 누르면 워크플로우가 자동으로 실행됩니다.
이 과정을 통해 매번 복잡한 에이전트 설정을 거치지 않고도, 누구나 쉽게 시니어 콘텐츠 제작을 자동화할 수 있는 웹앱이 완성됩니다.
> ⚠️ 시작 시 유의사항:
> 영상에서 설명했듯이, 처음에는 예상치 못한 결과(예: 이미지의 텍스트 오류, 영상 비율)가 나올 수 있습니다. 워크플로우를 실행-결과 확인-문제점 개선-재실행 하는 과정을 반복하여 에이전트의 지침(Prompt)과 설정을 지속적으로 다듬는 것이 성공적인 자동화의 핵심입니다.
> 

2. 위의 내용을 웹앱형식으로 만들어줘

클로드 soneet 4.5가 만들어주는 과정

제공하신 워크플로우 설계를 실제 웹앱으로 구현하는 로드맵을 단계별로 안내해드리겠습니다.

## 📋 프로젝트 개요

**목표**: Google OPAL 기반 시니어 채널 영상 제작 AI 에이전트를 독립적인 웹앱으로 구현

---

## 🗺️ 웹앱 제작 로드맵

### **Phase 1: 기술 스택 선정 및 환경 구성** (1-2주)

#### 프론트엔드
- **React.js** + **TypeScript**: 안정적인 타입 체크와 컴포넌트 기반 개발
- **Tailwind CSS**: 빠른 UI 구현
- **Zustand** 또는 **Redux Toolkit**: 상태 관리

#### 백엔드
- **Node.js + Express** 또는 **FastAPI (Python)**: API 서버
- **PostgreSQL**: 워크플로우 설정 및 사용자 데이터 저장
- **Redis**: 작업 큐 및 캐싱

#### AI/ML 통합
- **Google Gemini API**: 연구, 시나리오 생성
- **Google TTS API**: 음성 생성
- **Imagen 3 API**: 이미지 생성
- **Veo API**: 영상 생성

---

### **Phase 2: 백엔드 아키텍처 설계** (2-3주)

```
/backend
├── /api
│   ├── /routes
│   │   ├── workflow.routes.js      # 워크플로우 실행 API
│   │   ├── agent.routes.js         # 각 에이전트 엔드포인트
│   │   └── user.routes.js          # 사용자 관리
│   ├── /controllers
│   │   ├── researchAgent.js        # 연구 에이전트 로직
│   │   ├── sceneAgent.js           # 장면 생성 에이전트
│   │   ├── scriptAgent.js          # 대본 추출 에이전트
│   │   ├── ttsAgent.js             # TTS 에이전트
│   │   ├── imageAgent.js           # 이미지 생성 에이전트
│   │   └── videoAgent.js           # 영상 생성 에이전트
│   └── /services
│       ├── geminiService.js        # Gemini API 연동
│       ├── ttsService.js           # TTS API 연동
│       └── veoService.js           # Veo API 연동
├── /models
│   ├── Workflow.model.js
│   ├── Agent.model.js
│   └── Project.model.js
├── /utils
│   ├── queueManager.js             # 작업 큐 관리
│   └── fileStorage.js              # 생성 파일 저장
└── server.js
```

#### 핵심 API 엔드포인트 설계

```javascript
// 워크플로우 실행
POST /api/workflow/execute
{
  "targetAudience": "60대",
  "topic": "건강",
  "purpose": "지식 정보 제공"
}

// 진행 상황 조회
GET /api/workflow/status/:workflowId

// 결과물 다운로드
GET /api/workflow/result/:workflowId
```

---

### **Phase 3: 에이전트 구현** (3-4주)

#### 1️⃣ 연구 에이전트 (Research Agent)

```javascript
// backend/controllers/researchAgent.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

class ResearchAgent {
  async analyze(userInput) {
    const { targetAudience, topic, purpose } = userInput;
    
    // Gemini API를 통한 트렌드 분석
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    
    const prompt = `
당신은 유튜브 콘텐츠 연구 전문가입니다.
다음 정보를 바탕으로 시니어를 위한 콘텐츠를 분석하세요:

타겟: ${targetAudience}
주제: ${topic}
목적: ${purpose}

최신 트렌드를 검색하고, 시니어에게 적합한 콘텐츠 방향을 제시하세요.
결과는 다음 형식으로 작성하세요:
- 트렌드 분석
- 추천 콘텐츠 방향
- 핵심 메시지
- 시청자 니즈 분석
    `;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  }
  
  async searchWeb(query) {
    // Google Search API 또는 SerpAPI 연동
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        q: query,
        api_key: process.env.SERP_API_KEY
      }
    });
    return response.data;
  }
}

module.exports = new ResearchAgent();
```

#### 2️⃣ 장면 생성 에이전트 (Scene Creation Agent)

```javascript
class SceneAgent {
  async createScene(researchData) {
    const prompt = `
연구 결과를 바탕으로 유튜브 영상의 한 장면을 구체적으로 설계하세요.

연구 데이터:
${researchData}

다음 형식으로 작성하세요:
### 장면 제목: [제목]
- 장소: [장소 설명]
- 시간: [시간대]
- 등장인물: [등장인물 설명]
- 나레이션: "[대사 내용]"
- 동작: [동작 설명]
- 화면 구성: [카메라 앵글, 구도]
    `;
    
    const result = await this.geminiAPI.generate(prompt);
    return result;
  }
}
```

#### 3️⃣ 대본 추출 에이전트 (Script Extraction Agent)

```javascript
class ScriptAgent {
  extractScript(sceneData) {
    // 정규표현식을 사용한 나레이션 추출
    const narrationPattern = /나레이션:\s*"([^"]+)"/g;
    const matches = [...sceneData.matchAll(narrationPattern)];
    
    const cleanScript = matches
      .map(match => match[1])
      .join(' ')
      .replace(/\[.*?\]/g, '') // 대괄호 제거
      .replace(/Scene \d+:|샷 \d+:/gi, '') // 장면 번호 제거
      .trim();
    
    return cleanScript;
  }
}
```

#### 4️⃣ TTS 에이전트

```javascript
const textToSpeech = require('@google-cloud/text-to-speech');

class TTSAgent {
  constructor() {
    this.client = new textToSpeech.TextToSpeechClient();
  }
  
  async generateAudio(script, voiceConfig = {}) {
    const request = {
      input: { text: script },
      voice: {
        languageCode: 'ko-KR',
        name: voiceConfig.name || 'ko-KR-Standard-A',
        ssmlGender: voiceConfig.gender || 'FEMALE'
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 0.9, // 시니어를 위해 약간 느리게
        pitch: 0
      }
    };
    
    const [response] = await this.client.synthesizeSpeech(request);
    return response.audioContent;
  }
}
```

#### 5️⃣ 이미지 생성 에이전트

```javascript
class ImageAgent {
  async generateImage(sceneData) {
    // Imagen API 사용
    const prompt = this.extractImagePrompt(sceneData);
    
    const response = await fetch('https://imagen.googleapis.com/v1/images:generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GOOGLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        aspect_ratio: '16:9', // 유튜브용
        number_of_images: 1
      })
    });
    
    return await response.json();
  }
  
  extractImagePrompt(sceneData) {
    // 장면 데이터에서 시각적 요소만 추출
    const visualElements = sceneData.match(/장소:(.*?)\n/)?.[1] || '';
    const composition = sceneData.match(/화면 구성:(.*?)\n/)?.[1] || '';
    
    return `${visualElements}, ${composition}, 고품질, 시니어 친화적, 따뜻한 분위기`;
  }
}
```

#### 6️⃣ 영상 생성 에이전트

```javascript
class VideoAgent {
  async generateVideo(sceneData, imageUrl) {
    // Veo 3.1 API 사용
    const prompt = this.createVideoPrompt(sceneData);
    
    const response = await fetch('https://veo.googleapis.com/v1/videos:generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GOOGLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        reference_image: imageUrl,
        aspect_ratio: '16:9',
        duration: 5 // 5초 클립
      })
    });
    
    return await response.json();
  }
}
```

---

### **Phase 4: 프론트엔드 구현** (3-4주)

```
/frontend
├── /src
│   ├── /components
│   │   ├── WorkflowInput.tsx       # 사용자 입력 폼
│   │   ├── ProgressTracker.tsx     # 진행 상황 표시
│   │   ├── ResultViewer.tsx        # 결과물 뷰어
│   │   └── AgentCard.tsx           # 각 에이전트 상태 카드
│   ├── /pages
│   │   ├── Dashboard.tsx
│   │   ├── CreateProject.tsx
│   │   └── Results.tsx
│   ├── /hooks
│   │   ├── useWorkflow.ts
│   │   └── useWebSocket.ts         # 실시간 업데이트
│   └── /store
│       └── workflowStore.ts
```

#### 메인 입력 컴포넌트

```typescript
// WorkflowInput.tsx
import React, { useState } from 'react';

interface WorkflowInputProps {
  onSubmit: (data: InputData) => void;
}

interface InputData {
  targetAudience: string;
  topic: string;
  purpose: string;
}

export const WorkflowInput: React.FC<WorkflowInputProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<InputData>({
    targetAudience: '',
    topic: '',
    purpose: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          타겟 연령대
        </label>
        <select
          value={formData.targetAudience}
          onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">선택하세요</option>
          <option value="50대">50대</option>
          <option value="60대">60대</option>
          <option value="70대 이상">70대 이상</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          주제
        </label>
        <input
          type="text"
          value={formData.topic}
          onChange={(e) => setFormData({...formData, topic: e.target.value})}
          placeholder="예: 건강, 취미, 재테크"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          목적
        </label>
        <textarea
          value={formData.purpose}
          onChange={(e) => setFormData({...formData, purpose: e.target.value})}
          placeholder="예: 지식 정보 제공, 엔터테인먼트"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        영상 생성 시작
      </button>
    </form>
  );
};
```

#### 진행 상황 추적 컴포넌트

```typescript
// ProgressTracker.tsx
import React from 'react';

interface Agent {
  name: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
}

export const ProgressTracker: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  return (
    <div className="space-y-4">
      {agents.map((agent, index) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">{agent.name}</span>
            <span className={`text-sm ${
              agent.status === 'completed' ? 'text-green-600' :
              agent.status === 'running' ? 'text-blue-600' :
              agent.status === 'error' ? 'text-red-600' :
              'text-gray-400'
            }`}>
              {agent.status === 'completed' ? '완료' :
               agent.status === 'running' ? '진행 중' :
               agent.status === 'error' ? '오류' : '대기'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${agent.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
```

---

### **Phase 5: 워크플로우 오케스트레이션** (2주)

```javascript
// backend/services/workflowOrchestrator.js
const Bull = require('bull');
const workflowQueue = new Bull('workflow', process.env.REDIS_URL);

class WorkflowOrchestrator {
  async execute(userInput, workflowId) {
    try {
      // 1. 연구 에이전트 실행
      await this.updateStatus(workflowId, 'research', 'running');
      const researchData = await researchAgent.analyze(userInput);
      await this.updateStatus(workflowId, 'research', 'completed');
      
      // 2. 장면 생성 에이전트 실행
      await this.updateStatus(workflowId, 'scene', 'running');
      const sceneData = await sceneAgent.createScene(researchData);
      await this.updateStatus(workflowId, 'scene', 'completed');
      
      // 3. 대본 추출
      await this.updateStatus(workflowId, 'script', 'running');
      const script = scriptAgent.extractScript(sceneData);
      await this.updateStatus(workflowId, 'script', 'completed');
      
      // 4. 병렬 처리: TTS, 이미지, 영상 생성
      await this.updateStatus(workflowId, 'generation', 'running');
      const [audio, image, video] = await Promise.all([
        ttsAgent.generateAudio(script),
        imageAgent.generateImage(sceneData),
        videoAgent.generateVideo(sceneData)
      ]);
      
      // 5. 결과물 저장
      const result = await this.saveResults(workflowId, {
        audio, image, video, script, sceneData
      });
      
      await this.updateStatus(workflowId, 'generation', 'completed');
      
      return result;
      
    } catch (error) {
      await this.updateStatus(workflowId, 'error', 'error');
      throw error;
    }
  }
  
  async updateStatus(workflowId, agent, status) {
    // WebSocket으로 프론트엔드에 실시간 업데이트
    io.to(workflowId).emit('status-update', { agent, status });
    
    // DB에 저장
    await Workflow.updateOne(
      { _id: workflowId },
      { $set: { [`agents.${agent}.status`]: status } }
    );
  }
}
```

---

### **Phase 6: 배포 및 최적화** (1-2주)

#### Docker 구성

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - DATABASE_URL=${DATABASE_URL}
    depends_on:
      - postgres
      - redis

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=senior_channel
      - POSTGRES_PASSWORD=password

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```

---

## 🎯 완성된 웹앱 사용 흐름

1. **사용자 로그인** → 대시보드 접속
2. **새 프로젝트 생성** → 타겟/주제/목적 입력
3. **워크플로우 실행** → 6개 에이전트 순차 실행
4. **실시간 진행 상황** 확인 (WebSocket)
5. **결과물 다운로드** → MP3(음성), PNG(이미지), MP4(영상), TXT(대본)

이 로드맵대로 진행하시면 Google OPAL과 동일한 기능을 갖춘 독립적인 웹앱을 구축할 수 있습니다. 어느 단계부터 시작하시겠습니까?

# 시니어 채널 영상 제작 AI 웹앱 완전 구축 가이드

처음부터 끝까지 단계별로 진행하겠습니다.

---

## 🚀 STEP 0: 개발 환경 준비

### 필수 소프트웨어 설치

```bash
# Node.js 설치 확인
node --version  # v18 이상 권장

# Python 설치 확인 (백엔드 옵션용)
python --version  # 3.9 이상

# Git 설치 확인
git --version

# Docker 설치 (선택사항, 배포용)
docker --version
```

### Google Cloud 계정 설정

1. **Google Cloud Console** 접속: https://console.cloud.google.com
2. 새 프로젝트 생성: "senior-channel-ai"
3. **API 활성화**:
   - Gemini API
   - Cloud Text-to-Speech API
   - Vertex AI (Imagen, Veo)
4. **API 키 생성**:
   - 좌측 메뉴 → API 및 서비스 → 사용자 인증 정보
   - API 키 생성 후 안전하게 저장

---

## 📁 STEP 1: 프로젝트 구조 생성

```bash
# 프로젝트 루트 디렉토리 생성
mkdir senior-channel-ai
cd senior-channel-ai

# Git 초기화
git init

# 백엔드, 프론트엔드 폴더 생성
mkdir backend frontend

# 환경 변수 파일 생성
touch .env.example .gitignore
```

### .gitignore 작성

```plaintext
# .gitignore
node_modules/
.env
.env.local
dist/
build/
*.log
.DS_Store
uploads/
results/
```

---

## 🔧 STEP 2: 백엔드 구축 (Node.js + Express)

### 2.1 백엔드 초기화

```bash
cd backend
npm init -y

# 필수 패키지 설치
npm install express cors dotenv
npm install @google/generative-ai @google-cloud/text-to-speech
npm install axios multer bull bull-board
npm install mongoose  # MongoDB 사용 시
npm install pg pg-hstore  # PostgreSQL 사용 시
npm install socket.io
npm install uuid

# 개발 도구
npm install --save-dev nodemon
```

### 2.2 백엔드 폴더 구조 생성

```bash
mkdir -p src/{controllers,services,models,routes,utils,config}
mkdir -p uploads results
```

### 2.3 기본 서버 설정 (server.js)

```javascript
// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 제공
app.use('/uploads', express.static('uploads'));
app.use('/results', express.static('results'));

// WebSocket 연결
io.on('connection', (socket) => {
  console.log('클라이언트 연결됨:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('클라이언트 연결 해제됨:', socket.id);
  });
});

// Socket.io를 전역으로 사용 가능하게 설정
app.set('io', io);

// 라우트 임포트
const workflowRoutes = require('./src/routes/workflow.routes');

// 라우트 설정
app.use('/api/workflow', workflowRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: '시니어 채널 AI API 서버' });
});

// 에러 핸들링
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
```

### 2.4 환경 변수 설정

```bash
# backend/.env
PORT=5000
FRONTEND_URL=http://localhost:3000

# Google API 키
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_CLOUD_PROJECT_ID=your_project_id
GOOGLE_APPLICATION_CREDENTIALS=./config/google-credentials.json

# 데이터베이스 (선택)
DATABASE_URL=postgresql://user:password@localhost:5432/senior_channel

# Redis (작업 큐용)
REDIS_URL=redis://localhost:6379

# 파일 저장 경로
UPLOAD_PATH=./uploads
RESULTS_PATH=./results
```

### 2.5 Gemini 서비스 구현

```javascript
// backend/src/services/gemini.service.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  }

  async generateContent(prompt) {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API 오류:', error);
      throw new Error('텍스트 생성 실패');
    }
  }

  async generateWithContext(systemPrompt, userPrompt) {
    const fullPrompt = `${systemPrompt}\n\n사용자 입력:\n${userPrompt}`;
    return await this.generateContent(fullPrompt);
  }
}

module.exports = new GeminiService();
```

### 2.6 연구 에이전트 구현

```javascript
// backend/src/controllers/research.agent.js
const geminiService = require('../services/gemini.service');

class ResearchAgent {
  async analyze(userInput) {
    const { targetAudience, topic, purpose } = userInput;

    const systemPrompt = `
당신은 유튜브 시니어 채널 콘텐츠 전문 연구원입니다.
다음 역할을 수행하세요:

1. 제공된 주제에 대한 최신 트렌드 분석
2. 타겟 연령대의 관심사와 니즈 파악
3. 적합한 콘텐츠 방향 제시
4. 핵심 메시지 도출

결과는 다음 형식으로 구조화하세요:

## 트렌드 분석
[현재 트렌드와 관련 통계]

## 타겟 분석
[${targetAudience} 연령대의 특성과 니즈]

## 추천 콘텐츠 방향
[구체적인 콘텐츠 아이디어 3가지]

## 핵심 메시지
[시청자에게 전달할 핵심 가치]

## 주의사항
[시니어 콘텐츠 제작 시 고려사항]
    `;

    const userPrompt = `
타겟 연령대: ${targetAudience}
주제: ${topic}
목적: ${purpose}

위 정보를 바탕으로 상세한 콘텐츠 연구 리포트를 작성해주세요.
    `;

    try {
      const result = await geminiService.generateWithContext(
        systemPrompt,
        userPrompt
      );
      
      return {
        success: true,
        data: result,
        metadata: {
          targetAudience,
          topic,
          purpose,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      throw new Error(`연구 에이전트 실행 실패: ${error.message}`);
    }
  }
}

module.exports = new ResearchAgent();
```

### 2.7 장면 생성 에이전트 구현

```javascript
// backend/src/controllers/scene.agent.js
const geminiService = require('../services/gemini.service');

class SceneAgent {
  async createScene(researchData) {
    const systemPrompt = `
당신은 유튜브 영상 시나리오 작가입니다.
연구 데이터를 바탕으로 시니어 친화적인 영상 장면을 설계하세요.

장면 구성 요소:
- 장면 제목: 간결하고 명확한 제목
- 장소: 구체적인 배경 설명
- 시간대: 아침/오후/저녁 등
- 분위기: 따뜻함, 편안함 등
- 나레이션: 실제 말할 대사 (자연스럽고 이해하기 쉽게)
- 화면 구성: 카메라 앵글, 구도, 색감
- 시각 요소: 화면에 보일 물체, 사람, 행동

반드시 다음 형식을 따르세요:

### 장면 1: [제목]

**장소:** [장소 상세 설명]
**시간:** [시간대]
**분위기:** [분위기 설명]

**나레이션:**
"[실제 읽을 대사 내용]"

**화면 구성:**
[카메라 앵글, 구도, 화면 비율 16:9 고려]

**시각 요소:**
[화면에 등장할 모든 시각적 요소]

**음향:**
[배경음악 분위기, 효과음]
    `;

    try {
      const result = await geminiService.generateWithContext(
        systemPrompt,
        `연구 데이터:\n${researchData}\n\n위 연구 결과를 바탕으로 1개의 완성된 장면을 설계하세요.`
      );

      return {
        success: true,
        scene: result,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`장면 생성 실패: ${error.message}`);
    }
  }
}

module.exports = new SceneAgent();
```

### 2.8 대본 추출 에이전트 구현

```javascript
// backend/src/controllers/script.agent.js

class ScriptAgent {
  extractScript(sceneData) {
    try {
      // 나레이션 섹션 추출
      const narrationPattern = /\*\*나레이션:\*\*\s*\n?"([^"]+)"/gs;
      const matches = [...sceneData.matchAll(narrationPattern)];

      if (matches.length === 0) {
        // 대체 패턴 시도
        const altPattern = /나레이션[:\s]*["']([^"']+)["']/gi;
        const altMatches = [...sceneData.matchAll(altPattern)];
        
        if (altMatches.length === 0) {
          throw new Error('나레이션을 찾을 수 없습니다.');
        }
        
        return this.cleanScript(altMatches.map(m => m[1]).join(' '));
      }

      const rawScript = matches.map(match => match[1]).join(' ');
      return this.cleanScript(rawScript);
      
    } catch (error) {
      throw new Error(`대본 추출 실패: ${error.message}`);
    }
  }

  cleanScript(script) {
    return script
      .replace(/\[.*?\]/g, '')           // 대괄호 제거
      .replace(/Scene \d+:/gi, '')       // 장면 번호 제거
      .replace(/샷 \d+:/g, '')           // 샷 번호 제거
      .replace(/\*\*.*?\*\*/g, '')       // 마크다운 굵게 제거
      .replace(/#{1,6}\s/g, '')          // 마크다운 헤더 제거
      .replace(/\s+/g, ' ')              // 연속 공백 제거
      .trim();
  }

  validateScript(script) {
    if (!script || script.length < 10) {
      throw new Error('대본이 너무 짧습니다.');
    }
    if (script.length > 5000) {
      throw new Error('대본이 너무 깁니다. TTS 제한을 초과합니다.');
    }
    return true;
  }
}

module.exports = new ScriptAgent();
```

### 2.9 TTS 에이전트 구현

```javascript
// backend/src/services/tts.service.js
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class TTSService {
  constructor() {
    this.client = new textToSpeech.TextToSpeechClient();
  }

  async generateAudio(script, options = {}) {
    try {
      const request = {
        input: { text: script },
        voice: {
          languageCode: options.languageCode || 'ko-KR',
          name: options.voiceName || 'ko-KR-Standard-A',
          ssmlGender: options.gender || 'FEMALE'
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: options.speakingRate || 0.85,  // 시니어를 위해 느리게
          pitch: options.pitch || 0,
          volumeGainDb: options.volumeGainDb || 0.0
        }
      };

      const [response] = await this.client.synthesizeSpeech(request);

      // 파일 저장
      const fileName = `audio_${uuidv4()}.mp3`;
      const filePath = path.join(process.env.RESULTS_PATH || './results', fileName);
      
      await fs.writeFile(filePath, response.audioContent, 'binary');

      return {
        success: true,
        fileName,
        filePath,
        fileUrl: `/results/${fileName}`,
        duration: this.estimateDuration(script, request.audioConfig.speakingRate)
      };
      
    } catch (error) {
      console.error('TTS 생성 오류:', error);
      throw new Error(`음성 생성 실패: ${error.message}`);
    }
  }

  estimateDuration(text, speakingRate) {
    // 한국어 기준: 평균 분당 300자
    const charsPerMinute = 300 * speakingRate;
    const minutes = text.length / charsPerMinute;
    return Math.ceil(minutes * 60); // 초 단위
  }

  async listAvailableVoices(languageCode = 'ko-KR') {
    try {
      const [response] = await this.client.listVoices({ languageCode });
      return response.voices;
    } catch (error) {
      console.error('음성 목록 조회 오류:', error);
      throw error;
    }
  }
}

module.exports = new TTSService();
```

### 2.10 TTS 에이전트 컨트롤러

```javascript
// backend/src/controllers/tts.agent.js
const ttsService = require('../services/tts.service');

class TTSAgent {
  async generateSpeech(script, voiceConfig = {}) {
    try {
      // 대본 검증
      if (!script || script.trim().length === 0) {
        throw new Error('유효하지 않은 대본입니다.');
      }

      // 기본 음성 설정 (시니어 친화적)
      const defaultConfig = {
        languageCode: 'ko-KR',
        voiceName: 'ko-KR-Standard-A',  // 여성 목소리
        gender: 'FEMALE',
        speakingRate: 0.85,  // 조금 느리게
        pitch: 0,
        volumeGainDb: 2.0  // 볼륨 약간 높게
      };

      const config = { ...defaultConfig, ...voiceConfig };

      console.log('TTS 생성 시작:', {
        scriptLength: script.length,
        voiceConfig: config
      });

      const result = await ttsService.generateAudio(script, config);

      return {
        success: true,
        audio: result,
        script,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('TTS 에이전트 오류:', error);
      throw new Error(`음성 생성 실패: ${error.message}`);
    }
  }

  async getAvailableVoices() {
    try {
      return await ttsService.listAvailableVoices('ko-KR');
    } catch (error) {
      throw new Error(`음성 목록 조회 실패: ${error.message}`);
    }
  }
}

module.exports = new TTSAgent();
```

### 2.11 이미지 생성 에이전트 구현

```javascript
// backend/src/services/imagen.service.js
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class ImagenService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
  }

  async generateImage(prompt, options = {}) {
    try {
      // Imagen API 엔드포인트 (실제 URL은 Google Cloud 콘솔에서 확인)
      const endpoint = `https://us-central1-aiplatform.googleapis.com/v1/projects/${this.projectId}/locations/us-central1/publishers/google/models/imagegeneration:predict`;

      const requestBody = {
        instances: [{
          prompt: this.enhancePrompt(prompt, options)
        }],
        parameters: {
          sampleCount: 1,
          aspectRatio: options.aspectRatio || '16:9',
          negativePrompt: options.negativePrompt || 'low quality, blurry, distorted',
          safetyFilterLevel: 'block_some',
          personGeneration: 'allow_adult'
        }
      };

      const response = await axios.post(endpoint, requestBody, {
        headers: {
          'Authorization': `Bearer ${await this.getAccessToken()}`,
          'Content-Type': 'application/json'
        }
      });

      // Base64 이미지 데이터 추출
      const imageData = response.data.predictions[0].bytesBase64Encoded;
      
      // 파일 저장
      const fileName = `image_${uuidv4()}.png`;
      const filePath = path.join(process.env.RESULTS_PATH || './results', fileName);
      
      await fs.writeFile(filePath, Buffer.from(imageData, 'base64'));

      return {
        success: true,
        fileName,
        filePath,
        fileUrl: `/results/${fileName}`,
        prompt: requestBody.instances[0].prompt
      };

    } catch (error) {
      console.error('Imagen API 오류:', error.response?.data || error.message);
      throw new Error(`이미지 생성 실패: ${error.message}`);
    }
  }

  enhancePrompt(prompt, options) {
    // 시니어 친화적 이미지 스타일 추가
    const baseStyle = 'high quality, professional photography, warm lighting, clear and simple composition';
    const seniorFriendly = 'age-appropriate, respectful, positive atmosphere';
    
    return `${prompt}, ${baseStyle}, ${seniorFriendly}`;
  }

  async getAccessToken() {
    // Google Cloud 인증 토큰 발급
    // 실제로는 @google-cloud/auth-library 사용 권장
    const { GoogleAuth } = require('google-auth-library');
    const auth = new GoogleAuth({
      scopes: 'https://www.googleapis.com/auth/cloud-platform'
    });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    return token.token;
  }
}

module.exports = new ImagenService();
```

### 2.12 이미지 에이전트 컨트롤러

```javascript
// backend/src/controllers/image.agent.js
const imagenService = require('../services/imagen.service');

class ImageAgent {
  async generateImage(sceneData) {
    try {
      // 장면 데이터에서 시각적 프롬프트 추출
      const imagePrompt = this.extractImagePrompt(sceneData);

      console.log('이미지 생성 시작:', imagePrompt);

      const result = await imagenService.generateImage(imagePrompt, {
        aspectRatio: '16:9',
        negativePrompt: 'text, watermark, logo, low quality, blurry'
      });

      return {
        success: true,
        image: result,
        prompt: imagePrompt,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('이미지 에이전트 오류:', error);
      throw new Error(`이미지 생성 실패: ${error.message}`);
    }
  }

  extractImagePrompt(sceneData) {
    // 정규표현식으로 주요 시각 정보 추출
    const patterns = {
      location: /\*\*장소:\*\*\s*(.+?)(?:\n|$)/i,
      time: /\*\*시간:\*\*\s*(.+?)(?:\n|$)/i,
      atmosphere: /\*\*분위기:\*\*\s*(.+?)(?:\n|$)/i,
      visual: /\*\*시각 요소:\*\*\s*(.+?)(?:\n|$)/i,
      composition: /\*\*화면 구성:\*\*\s*(.+?)(?:\n|$)/i
    };

    const extracted = {};
    for (const [key, pattern] of Object.entries(patterns)) {
      const match = sceneData.match(pattern);
      if (match) {
        extracted[key] = match[1].trim();
      }
    }

    // 프롬프트 조합
    const promptParts = [
      extracted.location || '',
      extracted.time || '',
      extracted.atmosphere || '',
      extracted.visual || '',
      extracted.composition || ''
    ].filter(Boolean);

    return promptParts.join(', ');
  }
}

module.exports = new ImageAgent();
```

### 2.13 워크플로우 오케스트레이터 구현

```javascript
// backend/src/services/workflow.orchestrator.js
const researchAgent = require('../controllers/research.agent');
const sceneAgent = require('../controllers/scene.agent');
const scriptAgent = require('../controllers/script.agent');
const ttsAgent = require('../controllers/tts.agent');
const imageAgent = require('../controllers/image.agent');
const { v4: uuidv4 } = require('uuid');

class WorkflowOrchestrator {
  constructor(io) {
    this.io = io;
    this.workflows = new Map();
  }

  async execute(userInput, workflowId = uuidv4()) {
    // 워크플로우 초기화
    this.workflows.set(workflowId, {
      status: 'running',
      startTime: new Date(),
      agents: {
        research: { status: 'pending', progress: 0 },
        scene: { status: 'pending', progress: 0 },
        script: { status: 'pending', progress: 0 },
        tts: { status: 'pending', progress: 0 },
        image: { status: 'pending', progress: 0 }
      },
      results: {}
    });

    try {
      // 1단계: 연구 에이전트
      await this.updateAgentStatus(workflowId, 'research', 'running', 0);
      console.log('[1/5] 연구 에이전트 실행 중...');
      
      const researchResult = await researchAgent.analyze(userInput);
      this.workflows.get(workflowId).results.research = researchResult;
      
      await this.updateAgentStatus(workflowId, 'research', 'completed', 100);
      console.log('[1/5] 연구 에이전트 완료');

      // 2단계: 장면 생성 에이전트
      await this.updateAgentStatus(workflowId, 'scene', 'running', 0);
      console.log('[2/5] 장면 생성 에이전트 실행 중...');
      
      const sceneResult = await sceneAgent.createScene(researchResult.data);
      this.workflows.get(workflowId).results.scene = sceneResult;
      
      await this.updateAgentStatus(workflowId, 'scene', 'completed', 100);
      console.log('[2/5] 장면 생성 에이전트 완료');

      // 3단계: 대본 추출 에이전트
      await this.updateAgentStatus(workflowId, 'script', 'running', 0);
      console.log('[3/5] 대본 추출 에이전트 실행 중...');
      
      const script = scriptAgent.extractScript(sceneResult.scene);
      scriptAgent.validateScript(script);
      this.workflows.get(workflowId).results.script = script;
      
      await this.updateAgentStatus(workflowId, 'script', 'completed', 100);
      console.log('[3/5] 대본 추출 에이전트 완료');
      console.log('추출된 대본:', script.substring(0, 100) + '...');

      // 4단계: TTS 에이전트
      await this.updateAgentStatus(workflowId, 'tts', 'running', 0);
      console.log('[4/5] TTS 에이전트 실행 중...');
      
      const ttsResult = await ttsAgent.generateSpeech(script);
      this.workflows.get(workflowId).results.tts = ttsResult;
      
      await this.updateAgentStatus(workflowId, 'tts', 'completed', 100);
      console.log('[4/5] TTS 에이전트 완료');

      // 5단계: 이미지 생성 에이전트
      await this.updateAgentStatus(workflowId, 'image', 'running', 0);
      console.log('[5/5] 이미지 생성 에이전트 실행 중...');
      
      const imageResult = await imageAgent.generateImage(sceneResult.scene);
      this.workflows.get(workflowId).results.image = imageResult;
      
      await this.updateAgentStatus(workflowId, 'image', 'completed', 100);
      console.log('[5/5] 이미지 생성 에이전트 완료');

      // 워크플로우 완료
      const workflow = this.workflows.get(workflowId);
      workflow.status = 'completed';
      workflow.endTime = new Date();
      workflow.duration = workflow.endTime - workflow.startTime;

      console.log(`\n워크플로우 완료! (소요 시간: ${workflow.duration}ms)`);
      
      this.emitWorkflowUpdate(workflowId, {
        status: 'completed',
        results: workflow.results
      });

      return {
        workflowId,
        status: 'completed',
        results: workflow.results,
        duration: workflow.duration
      };

    } catch (error) {
      console.error('워크플로우 실행 오류:', error);
      
      const workflow = this.workflows.get(workflowId);
      workflow.status = 'error';
      workflow.error = error.message;

      this.emitWorkflowUpdate(workflowId, {
        status: 'error',
        error: error.message
      });

      throw error;
    }
  }

  async updateAgentStatus(workflowId, agentName, status, progress) {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return;

    workflow.agents[agentName] = { status, progress };
    
    this.emitWorkflowUpdate(workflowId, {
      agent: agentName,
      status,
      progress
    });
  }

  emitWorkflowUpdate(workflowId, data) {
    if (this.io) {
      this.io.to(workflowId).emit('workflow-update', {
        workflowId,
        ...data,
        timestamp: new Date().toISOString()
      });
    }
  }

  getWorkflowStatus(workflowId) {
    return this.workflows.get(workflowId);
  }
}

module.exports = WorkflowOrchestrator;
```

### 2.14 워크플로우 라우트 구현

```javascript
// backend/src/routes/workflow.routes.js
const express = require('express');
const router = express.Router();
const WorkflowOrchestrator = require('../services/workflow.orchestrator');

// 워크플로우 실행
router.post('/execute', async (req, res) => {
  try {
    const { targetAudience, topic, purpose } = req.body;

    // 입력 검증
    if (!targetAudience || !topic || !purpose) {
      return res.status(400).json({
        error: '필수 입력값이 누락되었습니다.',
        required: ['targetAudience', 'topic', 'purpose']
      });
    }

    const io = req.app.get('io');
    const orchestrator = new WorkflowOrchestrator(io);

    // 비동기로 워크플로우 실행
    const workflowPromise = orchestrator.execute({
      targetAudience,
      topic,
      purpose
    });

    // 즉시 워크플로우 ID 반환
    workflowPromise.then(result => {
      console.log('워크플로우 완료:', result.workflowId);
    }).catch(error => {
      console.error('워크플로우 오류:', error);
    });

    const workflowId = (await workflowPromise).workflowId;

    res.json({
      success: true,
      workflowId,
      message: '워크플로우가 시작되었습니다.'
    });

  } catch (error) {
    console.error('워크플로우 실행 오류:', error);
    res.status(500).json({
      error: error.message
    });
  }
});

// 워크플로우 상태 조회
router.get('/status/:workflowId', (req, res) => {
  const { workflowId } = req.params;
  const io = req.app.get('io');
  const orchestrator = new WorkflowOrchestrator(io);
  
  const status = orchestrator.getWorkflowStatus(workflowId);

  if (!status) {
    return res.status(404).json({
      error: '워크플로우를 찾을 수 없습니다.'
    });
  }

  res.json({
    success: true,
    workflow: status
  });
});

// 결과물 다운로드
router.get('/result/:workflowId', (req, res) => {
  const { workflowId } = req.params;
  const io = req.app.get('io');
  const orchestrator = new WorkflowOrchestrator(io);
  
  const workflow = orchestrator.getWorkflowStatus(workflowId);

  if (!workflow || workflow.status !== 'completed') {
    return res.status(404).json({
      error: '완료된 워크플로우를 찾을 수 없습니다.'
    });
  }

  res.json({
    success: true,
    results: workflow.results
  });
});

module.exports = router;
```

### 2.15 package.json 스크립트 추가

```json
{
  "name": "senior-channel-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"No tests yet\""
  }
}
```

---

## 🎨 STEP 3: 프론트엔드 구축 (React + TypeScript)

### 3.1 프론트엔드 초기화

```bash
cd ../frontend

# Create React App with TypeScript
npx create-react-app . --template typescript

# 추가 패키지 설치
npm install axios socket.io-client
npm install @heroicons/react
npm install react-router-dom
npm install zustand  # 상태 관리
```

계속 진행할까요? 프론트엔드 구현을 이어서 작성하겠습니다.

## 🎨 STEP 3: 프론트엔드 구축 (계속)

### 3.2 프론트엔드 폴더 구조 생성

```bash
cd frontend/src
mkdir -p components/{layout,workflow} pages hooks services types store utils
```

### 3.3 타입 정의

```typescript
// frontend/src/types/workflow.types.ts
export interface UserInput {
  targetAudience: string;
  topic: string;
  purpose: string;
}

export interface Agent {
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
}

export interface WorkflowAgents {
  research: Agent;
  scene: Agent;
  script: Agent;
  tts: Agent;
  image: Agent;
}

export interface WorkflowResults {
  research?: {
    success: boolean;
    data: string;
    metadata: any;
  };
  scene?: {
    success: boolean;
    scene: string;
    timestamp: string;
  };
  script?: string;
  tts?: {
    success: boolean;
    audio: {
      fileName: string;
      fileUrl: string;
      duration: number;
    };
    script: string;
  };
  image?: {
    success: boolean;
    image: {
      fileName: string;
      fileUrl: string;
      prompt: string;
    };
  };
}

export interface WorkflowState {
  workflowId: string | null;
  status: 'idle' | 'running' | 'completed' | 'error';
  agents: WorkflowAgents;
  results: WorkflowResults;
  error: string | null;
  startTime?: Date;
  endTime?: Date;
  duration?: number;
}
```

### 3.4 API 서비스 구현

```typescript
// frontend/src/services/api.service.ts
import axios from 'axios';
import { UserInput } from '../types/workflow.types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  private axios;

  constructor() {
    this.axios = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // 워크플로우 실행
  async executeWorkflow(userInput: UserInput) {
    try {
      const response = await this.axios.post('/workflow/execute', userInput);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || '워크플로우 실행 실패');
    }
  }

  // 워크플로우 상태 조회
  async getWorkflowStatus(workflowId: string) {
    try {
      const response = await this.axios.get(`/workflow/status/${workflowId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || '상태 조회 실패');
    }
  }

  // 결과물 조회
  async getWorkflowResults(workflowId: string) {
    try {
      const response = await this.axios.get(`/workflow/result/${workflowId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || '결과 조회 실패');
    }
  }

  // 파일 URL 생성
  getFileUrl(fileUrl: string) {
    return `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${fileUrl}`;
  }
}

export default new ApiService();
```

### 3.5 WebSocket 서비스 구현

```typescript
// frontend/src/services/socket.service.ts
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (this.socket?.connected) return;

    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    this.socket.on('connect', () => {
      console.log('✅ WebSocket 연결됨:', this.socket?.id);
    });

    this.socket.on('disconnect', () => {
      console.log('❌ WebSocket 연결 해제됨');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket 연결 오류:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // 워크플로우 룸에 참여
  joinWorkflow(workflowId: string) {
    if (this.socket) {
      this.socket.emit('join-workflow', workflowId);
      console.log(`워크플로우 룸 참여: ${workflowId}`);
    }
  }

  // 워크플로우 업데이트 리스너
  onWorkflowUpdate(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('workflow-update', callback);
    }
  }

  // 리스너 제거
  offWorkflowUpdate() {
    if (this.socket) {
      this.socket.off('workflow-update');
    }
  }
}

export default new SocketService();
```

### 3.6 상태 관리 (Zustand Store)

```typescript
// frontend/src/store/workflowStore.ts
import { create } from 'zustand';
import { WorkflowState, WorkflowAgents } from '../types/workflow.types';

interface WorkflowStore extends WorkflowState {
  setWorkflowId: (id: string) => void;
  setStatus: (status: WorkflowState['status']) => void;
  updateAgent: (agentName: keyof WorkflowAgents, agent: Partial<any>) => void;
  setResults: (results: any) => void;
  setError: (error: string) => void;
  reset: () => void;
}

const initialState: WorkflowState = {
  workflowId: null,
  status: 'idle',
  agents: {
    research: { status: 'pending', progress: 0 },
    scene: { status: 'pending', progress: 0 },
    script: { status: 'pending', progress: 0 },
    tts: { status: 'pending', progress: 0 },
    image: { status: 'pending', progress: 0 },
  },
  results: {},
  error: null,
};

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  ...initialState,

  setWorkflowId: (id) => set({ workflowId: id }),

  setStatus: (status) => set({ status }),

  updateAgent: (agentName, agent) =>
    set((state) => ({
      agents: {
        ...state.agents,
        [agentName]: {
          ...state.agents[agentName],
          ...agent,
        },
      },
    })),

  setResults: (results) => set({ results }),

  setError: (error) => set({ error, status: 'error' }),

  reset: () => set(initialState),
}));
```

### 3.7 커스텀 훅 - useWorkflow

```typescript
// frontend/src/hooks/useWorkflow.ts
import { useEffect } from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import apiService from '../services/api.service';
import socketService from '../services/socket.service';
import { UserInput } from '../types/workflow.types';

export const useWorkflow = () => {
  const store = useWorkflowStore();

  useEffect(() => {
    // WebSocket 연결
    socketService.connect();

    // 워크플로우 업데이트 리스너
    socketService.onWorkflowUpdate((data) => {
      console.log('워크플로우 업데이트:', data);

      if (data.agent) {
        // 에이전트 상태 업데이트
        store.updateAgent(data.agent, {
          status: data.status,
          progress: data.progress,
        });
      }

      if (data.status === 'completed') {
        store.setStatus('completed');
        store.setResults(data.results);
      }

      if (data.status === 'error') {
        store.setError(data.error);
      }
    });

    return () => {
      socketService.offWorkflowUpdate();
      socketService.disconnect();
    };
  }, [store]);

  const executeWorkflow = async (userInput: UserInput) => {
    try {
      store.reset();
      store.setStatus('running');

      const response = await apiService.executeWorkflow(userInput);
      
      if (response.success) {
        store.setWorkflowId(response.workflowId);
        socketService.joinWorkflow(response.workflowId);
      } else {
        throw new Error('워크플로우 실행 실패');
      }
    } catch (error: any) {
      store.setError(error.message);
    }
  };

  const fetchResults = async (workflowId: string) => {
    try {
      const response = await apiService.getWorkflowResults(workflowId);
      if (response.success) {
        store.setResults(response.results);
        store.setStatus('completed');
      }
    } catch (error: any) {
      store.setError(error.message);
    }
  };

  return {
    ...store,
    executeWorkflow,
    fetchResults,
  };
};
```

### 3.8 워크플로우 입력 컴포넌트

```typescript
// frontend/src/components/workflow/WorkflowInput.tsx
import React, { useState } from 'react';
import { UserInput } from '../../types/workflow.types';

interface WorkflowInputProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
}

export const WorkflowInput: React.FC<WorkflowInputProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserInput>({
    targetAudience: '',
    topic: '',
    purpose: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.targetAudience || !formData.topic || !formData.purpose) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (field: keyof UserInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        시니어 채널 영상 제작
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 타겟 연령대 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            타겟 연령대 <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.targetAudience}
            onChange={(e) => handleChange('targetAudience', e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          >
            <option value="">선택하세요</option>
            <option value="50대">50대</option>
            <option value="60대">60대</option>
            <option value="70대">70대</option>
            <option value="80대 이상">80대 이상</option>
          </select>
        </div>

        {/* 주제 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            주제 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.topic}
            onChange={(e) => handleChange('topic', e.target.value)}
            disabled={isLoading}
            placeholder="예: 건강, 취미, 재테크, 여행, 요리"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
          <p className="mt-1 text-sm text-gray-500">
            시니어에게 유용한 정보나 관심사를 입력하세요
          </p>
        </div>

        {/* 목적 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            콘텐츠 목적 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.purpose}
            onChange={(e) => handleChange('purpose', e.target.value)}
            disabled={isLoading}
            placeholder="예: 지식 정보 제공, 엔터테인먼트, 실용적인 팁 공유"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
          <p className="mt-1 text-sm text-gray-500">
            이 영상을 통해 시청자에게 전달하고자 하는 가치를 설명하세요
          </p>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              생성 중...
            </span>
          ) : (
            '영상 생성 시작'
          )}
        </button>
      </form>

      {/* 안내 메시지 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 mb-2">💡 도움말</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 생성 과정은 약 2-5분 정도 소요됩니다</li>
          <li>• AI가 연구, 시나리오, 대본, 음성, 이미지를 자동으로 생성합니다</li>
          <li>• 진행 상황은 실시간으로 확인할 수 있습니다</li>
        </ul>
      </div>
    </div>
  );
};
```

### 3.9 진행 상황 추적 컴포넌트

```typescript
// frontend/src/components/workflow/ProgressTracker.tsx
import React from 'react';
import { WorkflowAgents } from '../../types/workflow.types';

interface ProgressTrackerProps {
  agents: WorkflowAgents;
}

const agentInfo = {
  research: { name: '연구 에이전트', icon: '🔍', description: '트렌드 및 콘텐츠 분석' },
  scene: { name: '장면 생성 에이전트', icon: '🎬', description: '시나리오 작성' },
  script: { name: '대본 추출 에이전트', icon: '📝', description: '나레이션 추출' },
  tts: { name: 'TTS 에이전트', icon: '🗣️', description: '음성 생성' },
  image: { name: '이미지 에이전트', icon: '🖼️', description: '이미지 생성' },
};

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ agents }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'running':
        return 'bg-blue-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '완료';
      case 'running':
        return '진행 중';
      case 'error':
        return '오류';
      default:
        return '대기';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'running':
        return '⟳';
      case 'error':
        return '✕';
      default:
        return '○';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">생성 진행 상황</h2>

      <div className="space-y-4">
        {Object.entries(agents).map(([key, agent], index) => {
          const info = agentInfo[key as keyof typeof agentInfo];
          
          return (
            <div
              key={key}
              className="bg-white rounded-lg shadow-md p-5 transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{info.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{info.name}</h3>
                    <p className="text-sm text-gray-500">{info.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm font-medium ${
                      agent.status === 'completed'
                        ? 'text-green-600'
                        : agent.status === 'running'
                        ? 'text-blue-600'
                        : agent.status === 'error'
                        ? 'text-red-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {getStatusIcon(agent.status)} {getStatusText(agent.status)}
                  </span>
                </div>
              </div>

              {/* 프로그레스 바 */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getStatusColor(
                    agent.status
                  )}`}
                  style={{ width: `${agent.progress}%` }}
                >
                  {agent.status === 'running' && (
                    <div className="h-full w-full bg-white opacity-30 animate-pulse"></div>
                  )}
                </div>
              </div>

              {/* 진행률 표시 */}
              <div className="mt-2 text-right">
                <span className="text-xs text-gray-500">{agent.progress}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 전체 진행률 */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
        <h3 className="text-lg font-semibold mb-2">전체 진행률</h3>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold">
            {Math.round(
              Object.values(agents).reduce((sum, agent) => sum + agent.progress, 0) / 5
            )}
            %
          </div>
          <div className="text-sm opacity-90">
            {Object.values(agents).filter((a) => a.status === 'completed').length} / 5 완료
          </div>
        </div>
      </div>
    </div>
  );
};
```

### 3.10 결과 뷰어 컴포넌트

```typescript
// frontend/src/components/workflow/ResultViewer.tsx
import React from 'react';
import { WorkflowResults } from '../../types/workflow.types';
import apiService from '../../services/api.service';

interface ResultViewerProps {
  results: WorkflowResults;
}

export const ResultViewer: React.FC<ResultViewerProps> = ({ results }) => {
  const downloadFile = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = apiService.getFileUrl(url);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">생성 결과</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 연구 결과 */}
        {results.research && (
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">🔍</span> 연구 분석 결과
            </h3>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-md overflow-auto max-h-96">
                {results.research.data}
              </pre>
            </div>
          </div>
        )}

        {/* 장면 시나리오 */}
        {results.scene && (
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">🎬</span> 장면 시나리오
            </h3>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-md overflow-auto max-h-96">
                {results.scene.scene}
              </pre>
            </div>
          </div>
        )}

        {/* 대본 */}
        {results.script && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">📝</span> 추출된 대본
            </h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700 leading-relaxed">{results.script}</p>
            </div>
          </div>
        )}

        {/* 음성 파일 */}
        {results.tts && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">🗣️</span> 생성된 음성
            </h3>
            <audio
              controls
              className="w-full mb-4"
              src={apiService.getFileUrl(results.tts.audio.fileUrl)}
            >
              브라우저가 오디오 재생을 지원하지 않습니다.
            </audio>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>재생 시간: {results.tts.audio.duration}초</span>
              <button
                onClick={() =>
                  downloadFile(results.tts!.audio.fileUrl, results.tts!.audio.fileName)
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                다운로드
              </button>
            </div>
          </div>
        )}

        {/* 이미지 */}
        {results.image && (
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">🖼️</span> 생성된 이미지
            </h3>
            <img
              src={apiService.getFileUrl(results.image.image.fileUrl)}
              alt="Generated"
              className="w-full rounded-lg shadow-lg mb-4"
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                프롬프트: {results.image.image.prompt}
              </p>
              <button
                onClick={() =>
                  downloadFile(
                    results.image!.image.fileUrl,
                    results.image!.image.fileName
                  )
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                다운로드
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 전체 다운로드 버튼 */}
      <div className="mt-8 text-center">
        <button
          onClick={() => {
            if (results.tts) downloadFile(results.tts.audio.fileUrl, results.tts.audio.fileName);
            if (results.image) downloadFile(results.image.image.fileUrl, results.image.image.fileName);
          }}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
        >
          모든 파일 다운로드
        </button>
      </div>
    </div>
  );
};
```

### 3.11 메인 페이지 구현

```typescript
// frontend/src/pages/Dashboard.tsx
import React from 'react';
import { WorkflowInput } from '../components/workflow/WorkflowInput';
import { ProgressTracker } from '../components/workflow/ProgressTracker';
import { ResultViewer } from '../components/workflow/ResultViewer';
import { useWorkflow } from '../hooks/useWorkflow';

export const Dashboard: React.FC = () => {
  const workflow = useWorkflow();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            시니어 채널 AI 영상 제작 시스템
          </h1>
          <p className="mt-2 text-gray-600">
            AI 에이전트가 자동으로 시니어 친화적인 콘텐츠를 생성합니다
          </p>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 입력 폼 */}
        {workflow.status === 'idle' && (
          <WorkflowInput
            onSubmit={workflow.executeWorkflow}
            isLoading={workflow.status === 'running'}
          />
        )}

        {/* 진행 상황 */}
        {workflow.status === 'running' && (
          <ProgressTracker agents={workflow.agents} />
        )}

        {/* 결과 화면 */}
        {workflow.status === 'completed' && (
          <>
            <ResultViewer results={workflow.results} />
            
            {/* 새로 시작 버튼 */}
            <div className="text-center mt-8">
              <button
                onClick={workflow.reset}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                새 영상 만들기
              </button>
            </div>
          </>
        )}

        {/* 에러 화면 */}
        {workflow.status === 'error' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                오류가 발생했습니다
              </h3>
              <p className="text-red-600 mb-4">{workflow.error}</p>
              <button
                onClick={workflow.reset}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                다시 시도
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="mt-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 2024 시니어 채널 AI. Powered by Google Gemini & Cloud AI</p>
        </div>
      </footer>
    </div>
  );
};
```

### 3.12 App.tsx 수정

```typescript
// frontend/src/App.tsx
import React from 'react';
import { Dashboard } from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
```

### 3.13 환경 변수 설정

```bash
# frontend/.env
REACT_APP_API_URL=http://localhost:5000
```

### 3.14 Tailwind CSS 설정 (선택사항)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```javascript
// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```css
/* frontend/src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🚀 STEP 4: 실행 및 테스트

### 4.1 백엔드 실행

```bash
cd backend

# 결과 폴더 생성
mkdir -p results uploads

# 서버 실행
npm run dev
```

콘솔에 다음과 같은 메시지가 표시되어야 합니다:
```
서버가 포트 5000에서 실행 중입니다.
```

### 4.2 프론트엔드 실행

```bash
cd frontend
npm start
```

브라우저가 자동으로 `http://localhost:3000`을 엽니다.

---

계속해서 테스트, 배포, 최적화를 진행할까요?

## 🧪 STEP 5: 테스트 및 디버깅

### 5.1 백엔드 WebSocket 서버 수정

```javascript
// backend/server.js (WebSocket 부분 수정)
io.on('connection', (socket) => {
  console.log('✅ 클라이언트 연결됨:', socket.id);
  
  // 워크플로우 룸 참여
  socket.on('join-workflow', (workflowId) => {
    socket.join(workflowId);
    console.log(`클라이언트 ${socket.id}가 워크플로우 ${workflowId}에 참여`);
  });

  socket.on('disconnect', () => {
    console.log('❌ 클라이언트 연결 해제됨:', socket.id);
  });
});
```

### 5.2 테스트용 Mock 데이터 생성 (개발 중 API 제한 우회용)

```javascript
// backend/src/services/mock.service.js
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class MockService {
  async generateMockAudio(script) {
    // 개발 중에는 빈 MP3 파일 생성
    const fileName = `audio_${uuidv4()}.mp3`;
    const filePath = path.join(process.env.RESULTS_PATH || './results', fileName);
    
    // 빈 파일 생성 (실제 환경에서는 TTS 사용)
    await fs.writeFile(filePath, Buffer.from('mock audio data'));
    
    return {
      success: true,
      fileName,
      filePath,
      fileUrl: `/results/${fileName}`,
      duration: 30
    };
  }

  async generateMockImage(prompt) {
    const fileName = `image_${uuidv4()}.png`;
    const filePath = path.join(process.env.RESULTS_PATH || './results', fileName);
    
    // 플레이스홀더 이미지 URL 사용
    const placeholderUrl = `https://via.placeholder.com/1280x720.png?text=${encodeURIComponent(prompt.substring(0, 50))}`;
    
    // 실제로는 이미지를 다운로드하여 저장
    const axios = require('axios');
    const response = await axios.get(placeholderUrl, { responseType: 'arraybuffer' });
    await fs.writeFile(filePath, response.data);
    
    return {
      success: true,
      fileName,
      filePath,
      fileUrl: `/results/${fileName}`,
      prompt
    };
  }
}

module.exports = new MockService();
```

### 5.3 개발/프로덕션 모드 분기 처리

```javascript
// backend/src/controllers/tts.agent.js (수정)
const ttsService = require('../services/tts.service');
const mockService = require('../services/mock.service');

class TTSAgent {
  async generateSpeech(script, voiceConfig = {}) {
    try {
      if (!script || script.trim().length === 0) {
        throw new Error('유효하지 않은 대본입니다.');
      }

      console.log('TTS 생성 시작:', { scriptLength: script.length });

      // 개발 모드에서는 Mock 사용
      const result = process.env.NODE_ENV === 'production'
        ? await ttsService.generateAudio(script, voiceConfig)
        : await mockService.generateMockAudio(script);

      return {
        success: true,
        audio: result,
        script,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('TTS 에이전트 오류:', error);
      throw new Error(`음성 생성 실패: ${error.message}`);
    }
  }
}

module.exports = new TTSAgent();
```

```javascript
// backend/src/controllers/image.agent.js (수정)
const imagenService = require('../services/imagen.service');
const mockService = require('../services/mock.service');

class ImageAgent {
  async generateImage(sceneData) {
    try {
      const imagePrompt = this.extractImagePrompt(sceneData);
      console.log('이미지 생성 시작:', imagePrompt);

      // 개발 모드에서는 Mock 사용
      const result = process.env.NODE_ENV === 'production'
        ? await imagenService.generateImage(imagePrompt, { aspectRatio: '16:9' })
        : await mockService.generateMockImage(imagePrompt);

      return {
        success: true,
        image: result,
        prompt: imagePrompt,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('이미지 에이전트 오류:', error);
      throw new Error(`이미지 생성 실패: ${error.message}`);
    }
  }

  extractImagePrompt(sceneData) {
    const patterns = {
      location: /\*\*장소:\*\*\s*(.+?)(?:\n|$)/i,
      time: /\*\*시간:\*\*\s*(.+?)(?:\n|$)/i,
      atmosphere: /\*\*분위기:\*\*\s*(.+?)(?:\n|$)/i,
      visual: /\*\*시각 요소:\*\*\s*(.+?)(?:\n|$)/i,
      composition: /\*\*화면 구성:\*\*\s*(.+?)(?:\n|$)/i
    };

    const extracted = {};
    for (const [key, pattern] of Object.entries(patterns)) {
      const match = sceneData.match(pattern);
      if (match) {
        extracted[key] = match[1].trim();
      }
    }

    const promptParts = [
      extracted.location || '따뜻한 실내',
      extracted.time || '낮',
      extracted.atmosphere || '편안한 분위기',
      extracted.visual || '시니어 친화적인 장면',
      '16:9 비율, 고품질'
    ].filter(Boolean);

    return promptParts.join(', ');
  }
}

module.exports = new ImageAgent();
```

### 5.4 환경 변수 업데이트

```bash
# backend/.env
NODE_ENV=development  # 또는 production
PORT=5000
FRONTEND_URL=http://localhost:3000

# Google API 키 (프로덕션 모드에서만 필요)
GEMINI_API_KEY=your_actual_api_key_here
GOOGLE_CLOUD_PROJECT_ID=your_project_id
GOOGLE_APPLICATION_CREDENTIALS=./config/google-credentials.json

# 파일 저장 경로
UPLOAD_PATH=./uploads
RESULTS_PATH=./results
```

---

## 🎯 STEP 6: 실제 테스트 수행

### 6.1 기본 테스트 시나리오

1. **백엔드 서버 시작**
```bash
cd backend
npm run dev
```

2. **프론트엔드 시작**
```bash
cd frontend
npm start
```

3. **웹 브라우저에서 테스트**
   - http://localhost:3000 접속
   - 다음 입력:
     - 타겟 연령대: 60대
     - 주제: 건강한 아침 식사
     - 목적: 시니어에게 영양 균형 잡힌 식단 정보 제공
   - "영상 생성 시작" 클릭

4. **콘솔 로그 확인**

백엔드 콘솔에 다음과 같은 로그가 표시되어야 합니다:
```
✅ 클라이언트 연결됨: abc123
클라이언트 abc123가 워크플로우 xyz789에 참여
[1/5] 연구 에이전트 실행 중...
[1/5] 연구 에이전트 완료
[2/5] 장면 생성 에이전트 실행 중...
...
```

### 6.2 문제 해결 가이드

#### 문제 1: WebSocket 연결 실패
```
해결책:
1. CORS 설정 확인
2. 포트 번호 일치 확인 (5000)
3. 방화벽 설정 확인
```

#### 문제 2: Gemini API 오류
```
해결책:
1. API 키 유효성 확인
2. .env 파일 로드 확인 (require('dotenv').config())
3. Google Cloud 프로젝트에서 API 활성화 확인
```

#### 문제 3: 파일 저장 오류
```bash
# results 폴더 권한 확인
chmod 755 backend/results
chmod 755 backend/uploads
```

---

## 🐳 STEP 7: Docker 컨테이너화

### 7.1 백엔드 Dockerfile

```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# 패키지 파일 복사 및 설치
COPY package*.json ./
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# 결과 폴더 생성
RUN mkdir -p results uploads

# 포트 노출
EXPOSE 5000

# 서버 실행
CMD ["node", "server.js"]
```

### 7.2 프론트엔드 Dockerfile

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS build

WORKDIR /app

# 패키지 파일 복사 및 설치
COPY package*.json ./
RUN npm ci

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# Nginx로 정적 파일 서빙
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 7.3 Nginx 설정

```nginx
# frontend/nginx.conf
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    # React Router 지원
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 프록시
    location /api {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket 지원
    location /socket.io {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }
}
```

### 7.4 Docker Compose 설정

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    container_name: senior-channel-backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - GOOGLE_CLOUD_PROJECT_ID=${GOOGLE_CLOUD_PROJECT_ID}
      - FRONTEND_URL=http://localhost
    volumes:
      - ./backend/results:/app/results
      - ./backend/uploads:/app/uploads
      - ./backend/config:/app/config:ro
    restart: unless-stopped
    networks:
      - app-network

  frontend:
    build: ./frontend
    container_name: senior-channel-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  results-data:
  uploads-data:
```

### 7.5 .dockerignore 파일

```plaintext
# backend/.dockerignore
node_modules
npm-debug.log
.env
.git
.gitignore
results/*
uploads/*
*.md
```

```plaintext
# frontend/.dockerignore
node_modules
npm-debug.log
.env
.env.local
.git
.gitignore
build
*.md
```

### 7.6 Docker로 실행

```bash
# 루트 디렉토리에서
docker-compose up --build

# 백그라운드 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down

# 볼륨까지 삭제
docker-compose down -v
```

---

## ☁️ STEP 8: 클라우드 배포 (Vultr Ubuntu)

### 8.1 서버 준비

```bash
# SSH로 서버 접속
ssh root@your_server_ip

# 시스템 업데이트
apt update && apt upgrade -y

# Docker 설치
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Docker Compose 설치
apt install docker-compose -y

# 방화벽 설정
ufw allow 22
ufw allow 80
ufw allow 443
ufw allow 5000
ufw enable
```

### 8.2 프로젝트 배포

```bash
# Git 저장소 클론
git clone https://github.com/your-username/senior-channel-ai.git
cd senior-channel-ai

# 환경 변수 설정
nano .env
```

**.env 파일 내용:**
```bash
GEMINI_API_KEY=your_actual_key
GOOGLE_CLOUD_PROJECT_ID=your_project_id
NODE_ENV=production
```

```bash
# Google Cloud 인증 파일 업로드
mkdir -p backend/config
nano backend/config/google-credentials.json
# (Google Cloud Console에서 다운로드한 JSON 붙여넣기)

# Docker Compose로 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f backend
```

### 8.3 Nginx 리버스 프록시 설정 (선택사항)

```bash
# Nginx 설치
apt install nginx -y

# 설정 파일 생성
nano /etc/nginx/sites-available/senior-channel
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /socket.io {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }
}
```

```bash
# 설정 활성화
ln -s /etc/nginx/sites-available/senior-channel /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 8.4 SSL 인증서 설정 (Let's Encrypt)

```bash
# Certbot 설치
apt install certbot python3-certbot-nginx -y

# SSL 인증서 발급
certbot --nginx -d your-domain.com

# 자동 갱신 테스트
certbot renew --dry-run
```

---

## 🔧 STEP 9: 성능 최적화

### 9.1 백엔드 최적화

```javascript
// backend/src/utils/cache.js
const NodeCache = require('node-cache');

class CacheService {
  constructor() {
    this.cache = new NodeCache({
      stdTTL: 3600, // 1시간
      checkperiod: 600 // 10분마다 체크
    });
  }

  set(key, value, ttl = 3600) {
    return this.cache.set(key, value, ttl);
  }

  get(key) {
    return this.cache.get(key);
  }

  del(key) {
    return this.cache.del(key);
  }

  flush() {
    return this.cache.flushAll();
  }
}

module.exports = new CacheService();
```

### 9.2 연구 에이전트에 캐싱 적용

```javascript
// backend/src/controllers/research.agent.js (수정)
const geminiService = require('../services/gemini.service');
const cacheService = require('../utils/cache');
const crypto = require('crypto');

class ResearchAgent {
  async analyze(userInput) {
    // 캐시 키 생성
    const cacheKey = this.generateCacheKey(userInput);
    const cached = cacheService.get(cacheKey);
    
    if (cached) {
      console.log('캐시에서 연구 결과 로드');
      return cached;
    }

    const { targetAudience, topic, purpose } = userInput;
    
    const systemPrompt = `
당신은 유튜브 시니어 채널 콘텐츠 전문 연구원입니다.
다음 역할을 수행하세요:

1. 제공된 주제에 대한 최신 트렌드 분석
2. 타겟 연령대의 관심사와 니즈 파악
3. 적합한 콘텐츠 방향 제시
4. 핵심 메시지 도출

결과는 다음 형식으로 구조화하세요:

## 트렌드 분석
[현재 트렌드와 관련 통계]

## 타겟 분석
[${targetAudience} 연령대의 특성과 니즈]

## 추천 콘텐츠 방향
[구체적인 콘텐츠 아이디어 3가지]

## 핵심 메시지
[시청자에게 전달할 핵심 가치]

## 주의사항
[시니어 콘텐츠 제작 시 고려사항]
    `;

    const userPrompt = `
타겟 연령대: ${targetAudience}
주제: ${topic}
목적: ${purpose}

위 정보를 바탕으로 상세한 콘텐츠 연구 리포트를 작성해주세요.
    `;

    try {
      const result = await geminiService.generateWithContext(
        systemPrompt,
        userPrompt
      );
      
      const response = {
        success: true,
        data: result,
        metadata: {
          targetAudience,
          topic,
          purpose,
          timestamp: new Date().toISOString()
        }
      };

      // 캐시에 저장 (1시간)
      cacheService.set(cacheKey, response, 3600);
      
      return response;
    } catch (error) {
      throw new Error(`연구 에이전트 실행 실패: ${error.message}`);
    }
  }

  generateCacheKey(userInput) {
    const str = JSON.stringify(userInput);
    return crypto.createHash('md5').update(str).digest('hex');
  }
}

module.exports = new ResearchAgent();
```

### 9.3 Rate Limiting 적용

```javascript
// backend/src/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

const workflowLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 5, // 최대 5회
  message: {
    error: '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { workflowLimiter };
```

```javascript
// backend/src/routes/workflow.routes.js (수정)
const express = require('express');
const router = express.Router();
const WorkflowOrchestrator = require('../services/workflow.orchestrator');
const { workflowLimiter } = require('../middleware/rateLimiter');

// Rate limiting 적용
router.post('/execute', workflowLimiter, async (req, res) => {
  // ... 기존 코드
});

module.exports = router;
```

---

## 📊 STEP 10: 모니터링 및 로깅

### 10.1 Winston 로거 설정

```bash
cd backend
npm install winston winston-daily-rotate-file
```

```javascript
// backend/src/utils/logger.js
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

const logDir = path.join(__dirname, '../../logs');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'senior-channel-backend' },
  transports: [
    // 에러 로그
    new DailyRotateFile({
      filename: path.join(logDir, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '30d'
    }),
    // 전체 로그
    new DailyRotateFile({
      filename: path.join(logDir, 'combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d'
    })
  ]
});

// 개발 환경에서는 콘솔 출력
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

module.exports = logger;
```

### 10.2 로거 적용

```javascript
// backend/server.js (수정)
const logger = require('./src/utils/logger');

// ... 기존 코드

server.listen(PORT, () => {
  logger.info(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

// 에러 핸들링
app.use((err, req, res, next) => {
  logger.error('서버 오류:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });
  
  res.status(500).json({ error: err.message });
});
```

---

## 📱 STEP 11: 추가 기능 구현

### 11.1 워크플로우 히스토리 저장 (MongoDB)

```bash
cd backend
npm install mongoose
```

```javascript
// backend/src/models/Workflow.model.js
const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
  workflowId: {
    type: String,
    required: true,
    unique: true
  },
  userInput: {
    targetAudience: String,
    topic: String,
    purpose: String
  },
  status: {
    type: String,
    enum: ['running', 'completed', 'error'],
    default: 'running'
  },
  results: {
    type: mongoose.Schema.Types.Mixed
  },
  error: String,
  duration: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
});

module.exports = mongoose.model('Workflow', workflowSchema);
```

```javascript
// backend/src/config/database.js
const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      logger.warn('MongoDB URI가 설정되지 않았습니다. 히스토리 기능이 비활성화됩니다.');
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    logger.info('MongoDB 연결 성공');
  } catch (error) {
    logger.error('MongoDB 연결 실패:', error);
  }
};

module.exports = connectDB;
```

```javascript
// backend/server.js (수정)
const connectDB = require('./src/config/database');

// MongoDB 연결
connectDB();

// ... 기존 코드
```

### 11.2 히스토리 조회 API

```javascript
// backend/src/routes/workflow.routes.js (추가)

// 워크플로우 히스토리 조회
router.get('/history', async (req, res) => {
  try {
    const Workflow = require('../models/Workflow.model');
    const { limit = 10, page = 1 } = req.query;
    
    const workflows = await Workflow.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await Workflow.countDocuments();
    
    res.json({
      success: true,
      data: workflows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    logger.error('히스토리 조회 오류:', error);
    res.status(500).json({ error: error.message });
  }
});
```

---

## 🎉 완성 및 최종 체크리스트

### ✅ 기능 체크리스트

- [x] 백엔드 서버 (Express + Socket.IO)
- [x] 프론트엔드 (React + TypeScript)
- [x] 6개 AI 에이전트 구현
  - [x] 연구 에이전트 (Gemini)
  - [x] 장면 생성 에이전트
  - [x] 대본 추출 에이전트
  - [x] TTS 에이전트 (Google TTS)
  - [x] 이미지 생성 에이전트 (Imagen)
  - [x] 영상 생성 에이전트 (Veo) - 기본 구조
- [x] 실시간 진행 상황 추적 (WebSocket)
- [x] 결과물 다운로드
- [x] Docker 컨테이너화
- [x] 클라우드 배포 가이드
- [x] 캐싱 및 성능 최적화
- [x] 로깅 시스템
- [x] Rate Limiting
- [x] 히스토리 관리

### 🚀 최종 실행 명령어

```bash
# 로컬 개발 환경
# 터미널 1 - 백엔드
cd backend
npm install
npm run dev

# 터미널 2 - 프론트엔드
cd frontend
npm install
npm start

# Docker 환경
docker-compose up --build

# 프로덕션 배포 (Vultr)
ssh root@your_server
cd senior-channel-ai
docker-compose up -d
docker-compose logs -f
```

### 📝 환경 변수 최종 설정

```bash
# backend/.env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-domain.com

# Google API
GEMINI_API_KEY=your_key
GOOGLE_CLOUD_PROJECT_ID=your_project
GOOGLE_APPLICATION_CREDENTIALS=./config/google-credentials.json

# Database (선택)
MONGODB_URI=mongodb://localhost:27017/senior_channel

# File Storage
UPLOAD_PATH=./uploads
RESULTS_PATH=./results

# Logging
LOG_LEVEL=info
```

```bash
# frontend/.env
REACT_APP_API_URL=http://localhost:5000
# 또는 프로덕션
REACT_APP_API_URL=https://api.your-domain.com
```

---

## 🎓 사용 가이드

### 사용자 매뉴얼

1. **웹사이트 접속**: https://your-domain.com
2. **정보 입력**:
   - 타겟 연령대 선택 (50대/60대/70대/80대 이상)
   - 주제 입력 (예: 건강, 취미, 재테크)
   - 콘텐츠 목적 설명
3. **생성 시작**: "영상 생성 시작" 버튼 클릭
4. **진행 상황 확인**: 실시간으로 5개 에이전트의 작업 진행 확인
5. **결과 확인 및 다운로드**:
   - 연구 분석 보고서
   - 장면 시나리오
   - 추출된 대본
   - 생성된 음성 파일 (MP3)
   - 생성된 이미지 (PNG, 16:9)

### 개발자 가이드

#### 새 에이전트 추가하기

```javascript
// 1. 에이전트 컨트롤러 생성
// backend/src/controllers/new.agent.js
class NewAgent {
  async execute(input) {
    // 로직 구현
    return result;
  }
}
module.exports = new NewAgent();

// 2. 워크플로우에 추가
// backend/src/services/workflow.orchestrator.js
const newAgent = require('../controllers/new.agent');

// execute 메서드 내에 추가
const newResult = await newAgent.execute(previousResult);
this.workflows.get(workflowId).results.new = newResult;
```

---

**축하합니다! 🎉**

시니어 채널 영상 제작 AI 웹앱을 처음부터 끝까지 완성했습니다.

다음 단계로 무엇을 진행하시겠습니까?
1. 특정 기능 심화 개발
2. 추가 에이전트 구현 (영상 생성 Veo 완성)
3. UI/UX 개선
4. 데이터베이스 연동 강화
5. 기타 질문이나 문제 해결
