# 🛠️ MentoView-FE 프로젝트 설정 및 실행 방법  

이 문서는 **Node.js 설치부터 VS Code에서 React 애플리케이션을 실행하는 과정**을 설명합니다.

---

## 1️⃣ 프로젝트 세팅

### 💻 **Windows / Mac**
1. [Node.js 공식 사이트](https://nodejs.org/)에서 **LTS 버전** 다운로드  
2. 설치 후 **터미널 (Git Bash, PowerShell, VS Code 터미널 등)** 에서 아래 명령어 실행  
   ```sh
   node -v   # Node.js 버전 확인
   npm -v    # npm 버전 확인
3. 프로젝트 클론 및 이동
    ```sh
    git clone -b dev https://github.com/linkpond/MentoView-FE.git
    cd MentoView-FE
4. 패키지 설치
    ```sh
    npm install
5. 프로젝트 서버 실행
    ```sh
    npm start
    
## 2️⃣ 프로젝트 구조
```md
MentoView-FE
├── src
│ ├── components/ # 재사용 가능한 UI 컴포넌트 모음(Nav, Footer 등)
│ ├── hooks/ # 커스텀 훅 API 저장
│ ├── pages/ # 개별 페이지 컴포넌트 (ex: Main, About 등)
│ ├── styles/ # 전역 및 컴포넌트 스타일링 파일
│ ├── App.js # 메인 애플리케이션 컴포넌트
│ ├── index.js # React 애플리케이션의 진입점
├── public/ # 정적 파일 (ex: index.html, favicon 등)
├── package.json # 프로젝트 설정 및 의존성 목록
└── README.md # 프로젝트 설명 문서
