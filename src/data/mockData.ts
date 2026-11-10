import { Course, Material, Student, LectureDispatch, InstructorProfile } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: '천안 청년 AI 아카데미 : 생성형 AI & 프롬프트 엔지니어링 실무',
    region: '천안 서북구',
    venue: '천안 그린스타트업타운 3층 오픈랩 (천안역 서부)',
    target: '천안시 거주 청년 및 예비창업자 (20~39세)',
    period: '2026.03.04 ~ 2026.04.22 (8주)',
    instructorName: '김민준 수석강사',
    totalStudents: 24,
    status: '진행중',
    progressPercentage: 62,
    scheduleDays: '매주 화, 목 19:00 - 21:30'
  },
  {
    id: 'course-2',
    title: '천안 초중등 미래 꿈나무 : 피지컬 컴퓨팅 & 아두이노 AI 로보틱스',
    region: '천안 서북구',
    venue: '천안불당중학교 과학창의융합관 2실',
    target: '천안 관내 중학교 1~3학년 학생',
    period: '2026.03.07 ~ 2026.05.30 (12주)',
    instructorName: '이지원 강사',
    totalStudents: 18,
    status: '진행중',
    progressPercentage: 45,
    scheduleDays: '매주 토 10:00 - 13:00'
  },
  {
    id: 'course-3',
    title: '천안 스마트팩토리 재직자 과정 : 파이썬 & 산업데이터 이상탐지 머신러닝',
    region: '천안 동남구',
    venue: '한국기술교육대학교 2캠퍼스 산학협력관 402호',
    target: '천안 제2·3·4일반산업단지 제조기업 엔지니어',
    period: '2026.04.10 ~ 2026.05.29 (8주)',
    instructorName: '박현우 연구위원',
    totalStudents: 16,
    status: '모집중',
    progressPercentage: 0,
    scheduleDays: '매주 금 14:00 - 18:00'
  },
  {
    id: 'course-4',
    title: '천안 디지털 배움터 : 5060 시민을 위한 알기 쉬운 일상 스마트폰 & 생성형 AI',
    region: '천안 동남구',
    venue: '천안동남구종합사회복지관 2층 디지털배움실',
    target: '천안시민 및 어르신',
    period: '2026.02.16 ~ 2026.03.30 (6주)',
    instructorName: '정소영 주임강사',
    totalStudents: 15,
    status: '진행중',
    progressPercentage: 80,
    scheduleDays: '매주 월, 수 14:00 - 16:00'
  }
];

export const INITIAL_MATERIALS: Material[] = [
  {
    id: 'mat-1',
    title: '[2026 최신] 천안 청년 실무 프롬프트 엔지니어링 4주 완성 강의안 및 실습 프롬프트집',
    category: 'generative-ai',
    targetLevel: 'university',
    targetLabel: '대학생·청년',
    fileType: 'PPTX',
    fileSize: '34.2 MB',
    author: {
      name: '김민준',
      role: '수석 AI 강사',
      affiliation: '천안 AI 에듀협의회'
    },
    downloads: 382,
    likes: 89,
    uploadedAt: '2026.03.02',
    description: 'ChatGPT, Claude, Gemini 실무 프롬프트 구조화 기법(Few-shot, CoT, Role-Prompting)과 비즈니스 기획서, 시장조사 자동화 템플릿이 포함된 120페이지 분량의 풀패키지 교안입니다.',
    learningGoals: [
      '생성형 AI의 동작 원리와 프롬프트 엔지니어링 5대 원칙 습득',
      '문서 요약, 이메일 작성, 비즈니스 리포트 생성 실무 워크플로우 구축',
      '할루시네이션(환각) 방지 및 Grounding 검색 검증 프로세스 숙지'
    ],
    curriculumOutline: [
      '1강: LLM의 이해와 프롬프트의 기본 공식 (역할-맥락-지시-제약-예시)',
      '2강: 기획서 및 업무 보고서 자동 작성을 위한 단계별 프롬프트 체인',
      '3강: 데이터 분석 및 CSV 표 데이터 다루기 (Advanced Data Analysis)',
      '4강: 맞춤형 커스텀 GPTs 및 프롬프트 라이브러리 제작 프로젝트'
    ],
    tags: ['프롬프트엔지니어링', 'ChatGPT', '청년취업', '실무교안', '천안그린스타트업']
  },
  {
    id: 'mat-2',
    title: '천안 초·중등 엔트리(Entry) 인공지능 블록 코딩 8차시 교안 및 활동지',
    category: 'school-basic',
    targetLevel: 'elementary',
    targetLabel: '초등·중등',
    fileType: 'PDF',
    fileSize: '18.7 MB',
    author: {
      name: '이지원',
      role: 'SW·AI 미래교육 전문강사',
      affiliation: '천안창의교육센터'
    },
    downloads: 512,
    likes: 124,
    uploadedAt: '2026.02.24',
    description: '초등 5~6학년 및 중학생을 위한 오디오/비디오 감지, 텍스트 분류 AI 블록을 활용한 인터랙티브 게임 만들기 8차시 활동지 모음입니다. 학생용 활동지와 교사용 지도안이 분리되어 제공됩니다.',
    learningGoals: [
      '인공지능 모델 학습의 개념(데이터 수집, 지도학습, 모델 테스트) 이해',
      '카메라 비디오 감지를 통한 손동작 인식 분리수거 게임 제작',
      '음성 인식 블록을 활용한 스마트 홈 도우미 프로젝트 구현'
    ],
    curriculumOutline: [
      '1차시: 인공지능이란 무엇일까? 우리 주변의 AI 찾기',
      '2차시: 엔트리 AI 블록 탐험 (이미지/텍스트/음성 인식)',
      '3-4차시: 손짓으로 제어하는 스마트 쓰레기 분리수거 로봇',
      '5-6차시: 음성 명령으로 켜고 끄는 천안 미래 스마트시티 조명',
      '7-8차시: 나만의 AI 프로젝트 발표 및 친구 작품 평가'
    ],
    tags: ['엔트리AI', '초등코딩', '인공지능기초', '지도안', '활동지']
  },
  {
    id: 'mat-3',
    title: '천안 제조업 특화 : 스마트팩토리 센서 데이터 이상탐지 실습 (Jupyter Notebook)',
    category: 'cheonan-industry',
    targetLevel: 'corporate',
    targetLabel: '기업·재직자',
    fileType: 'IPYNB',
    fileSize: '8.4 MB',
    author: {
      name: '박현우',
      role: '산업데이터 AI 컨설턴트',
      affiliation: '한국기술교육대 산학협력단'
    },
    downloads: 245,
    likes: 67,
    uploadedAt: '2026.02.18',
    description: '천안 산업단지 내 자동차 부품 및 반도체 장비 제조 라인의 진동/온도 시계열 데이터를 바탕으로 Scikit-Learn Isolation Forest 및 오토인코더(Autoencoder)를 활용한 이상감지 실습 코드입니다.',
    learningGoals: [
      '제조 현장 시계열 센서 데이터 전처리 및 결측치/이상치 정제',
      '비지도학습(Unsupervised Learning) 기반 이상치 탐지 알고리즘 구현',
      '임계값 설정 및 현장 작업자를 위한 알림 대시보드 시각화 연계'
    ],
    curriculumOutline: [
      '모듈 1: 천안 제조라인 설비 센서 데이터 구조 및 Pandas 시계열 전처리',
      '모듈 2: 통계적 방법(3-Sigma, IQR)을 활용한 1차 필터링',
      '모듈 3: Isolation Forest & Local Outlier Factor 모델링',
      '모듈 4: 실제 공정 이상 발생 사례 시뮬레이션 및 알림 로직 작성'
    ],
    tags: ['스마트팩토리', '천안산단', '제조데이터', '이상탐지', '파이썬실습']
  },
  {
    id: 'mat-4',
    title: '중고등학생을 위한 파이썬 기초 & 데이터 시각화 12주 정규 커리큘럼',
    category: 'python-data',
    targetLevel: 'middle-high',
    targetLabel: '중고등',
    fileType: 'PPTX',
    fileSize: '45.1 MB',
    author: {
      name: '강성민',
      role: '정보교과 전문강사',
      affiliation: '천안AI인재양성원'
    },
    downloads: 310,
    likes: 78,
    uploadedAt: '2026.01.29',
    description: '프로그래밍을 처음 접하는 천안 관내 중·고등학생을 위한 12주 파이썬 기초 교재. 구글 코랩(Colab) 환경에서 별도 설치 없이 바로 실행 가능한 실습 링크가 슬라이드마다 첨부되어 있습니다.',
    learningGoals: [
      '변수, 조건문, 반복문 등 핵심 문법의 논리적 사고 훈련',
      'Matplotlib, Seaborn 라이브러리로 천안시 공공데이터(기온, 교통) 시각화',
      '간단한 텍스트 챗봇 및 퀴즈 프로그램 최종 프로젝트 제작'
    ],
    curriculumOutline: [
      '1~3주: 파이썬 문법과 조건/반복 제어 구조',
      '4~6주: 함수, 리스트, 딕셔너리를 활용한 데이터 구조화',
      '7~9주: 공공데이터 포털의 천안시 날씨/인구 데이터 가져와 그래프 그리기',
      '10~12주: 나만의 파이썬 미니 프로젝트 완성 및 코드 리뷰'
    ],
    tags: ['파이썬기초', '구글코랩', '데이터시각화', '중고등코딩', '천안공공데이터']
  },
  {
    id: 'mat-5',
    title: '아두이노 ESP32 & 카메라 모듈을 활용한 TinyML 에지(Edge) AI 교구 실습서',
    category: 'physical-robot',
    targetLevel: 'middle-high',
    targetLabel: '중고등·대학',
    fileType: 'PDF',
    fileSize: '22.8 MB',
    author: {
      name: '이지원',
      role: '피지컬 컴퓨팅 강사',
      affiliation: '천안창의교육센터'
    },
    downloads: 189,
    likes: 54,
    uploadedAt: '2026.01.15',
    description: '저비용 ESP32-CAM 보드와 Edge Impulse 플랫폼을 연동하여 PC 연결 없이 소형 칩 위에서 사물 인식 및 제스처 분류를 수행하는 차세대 임베디드 AI 수업 가이드입니다.',
    learningGoals: [
      '에지 컴퓨팅(Edge Computing)과 TinyML의 개념 습득',
      '직접 수집한 이미지 데이터를 Edge Impulse로 전처리 및 모델 학습',
      '훈련된 모델을 마이크로컨트롤러에 업로드하고 LED/서보모터 구동'
    ],
    curriculumOutline: [
      '1장: TinyML 개요 및 ESP32 개발환경 세팅',
      '2장: 데이터 수집: 카메라를 이용한 객체 이미지 캡처',
      '3장: 임펄스 설계 및 CNN 모델 경량화',
      '4장: 모터 및 부저 연동 스마트 도어락 프로토타입 완성'
    ],
    tags: ['TinyML', '아두이노', '피지컬AI', '하드웨어실습', '엣지컴퓨팅']
  },
  {
    id: 'mat-6',
    title: '어르신 대상 스마트폰 음성비서 & 챗GPT 실생활 꿀팁 지도안 (글자크기 확대판)',
    category: 'generative-ai',
    targetLevel: 'senior-citizen',
    targetLabel: '시민·시니어',
    fileType: 'PPTX',
    fileSize: '15.3 MB',
    author: {
      name: '정소영',
      role: '디지털포용 전문강사',
      affiliation: '천안평생학습네트워크'
    },
    downloads: 421,
    likes: 110,
    uploadedAt: '2026.02.10',
    description: '시니어 어르신들이 읽기 편하도록 큰 글씨와 실제 스마트폰 캡처 화면 위주로 제작된 실생활 중심 교안입니다. 병원 예약 질문하기, 손주 생일 축하 메시지 쓰기, 건강 식단 묻기 등 친근한 주제로 구성되었습니다.',
    learningGoals: [
      '스마트폰 음성 입력 기능(마이크 버튼) 능숙한 조작',
      '생성형 AI에게 말하듯이 일상 생활 궁금증 질문하고 답변 읽기',
      '보이스피싱 등 AI를 악용한 사기 수법 예방 및 디지털 보안 수칙 숙지'
    ],
    curriculumOutline: [
      '1차시: 내 손안의 똑똑한 친구, 말로 물어보는 챗봇 첫걸음',
      '2차시: 천안 병원 찾기와 건강 상식 질문하기',
      '3차시: 가족에게 전하는 감동 메시지와 감사 편지 짓기',
      '4차시: 가짜 뉴스 및 사기 전화 똑똑하게 걸러내는 방법'
    ],
    tags: ['디지털배움터', '시니어AI', '실생활활용', '큰글씨교안', '천안시민교육']
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'stu-1',
    classId: 'course-1',
    name: '최민서',
    phone: '010-8472-1923',
    email: 'minseo.choi@naver.com',
    organization: '천안시 서북구 쌍용동 (구직준비)',
    attendanceRate: 100,
    completedAssignments: 5,
    totalAssignments: 5,
    quizScore: 96,
    status: '우수',
    joinedDate: '2026.03.04',
    notes: '프롬프트 설계 능력이 뛰어나며, 천안 로컬 소상공인을 위한 마케팅 카피 자동화 프로젝트를 우수하게 수행함.',
    attendanceHistory: [
      { date: '03.04', status: 'present' },
      { date: '03.06', status: 'present' },
      { date: '03.11', status: 'present' },
      { date: '03.13', status: 'present' },
      { date: '03.18', status: 'present' }
    ]
  },
  {
    id: 'stu-2',
    classId: 'course-1',
    name: '김준호',
    phone: '010-3321-7789',
    email: 'junho.kim@gmail.com',
    organization: '순천향대학교 미디어소프트웨어학과 3학년',
    attendanceRate: 80,
    completedAssignments: 4,
    totalAssignments: 5,
    quizScore: 88,
    status: '수강중',
    joinedDate: '2026.03.04',
    notes: 'API 연동 실습에 관심이 많음. 3월 13일 취업 면접 일정으로 1회 결석 사유서 제출함.',
    attendanceHistory: [
      { date: '03.04', status: 'present' },
      { date: '03.06', status: 'present' },
      { date: '03.11', status: 'present' },
      { date: '03.13', status: 'absent' },
      { date: '03.18', status: 'present' }
    ]
  },
  {
    id: 'stu-3',
    classId: 'course-1',
    name: '박다영',
    phone: '010-9124-5510',
    email: 'dayoung.park@daum.net',
    organization: '천안 스타트업 예비창업자',
    attendanceRate: 100,
    completedAssignments: 5,
    totalAssignments: 5,
    quizScore: 92,
    status: '우수',
    joinedDate: '2026.03.04',
    notes: '쇼핑몰 CS 자동 응답 프롬프트를 실제 창업 비즈니스에 적용 테스트 중. 적극적인 질문 태도.',
    attendanceHistory: [
      { date: '03.04', status: 'present' },
      { date: '03.06', status: 'present' },
      { date: '03.11', status: 'present' },
      { date: '03.13', status: 'present' },
      { date: '03.18', status: 'present' }
    ]
  },
  {
    id: 'stu-4',
    classId: 'course-1',
    name: '이수혁',
    phone: '010-4491-6201',
    email: 'sh.lee99@gmail.com',
    organization: '호서대학교 컴퓨터공학부 4학년',
    attendanceRate: 60,
    completedAssignments: 2,
    totalAssignments: 5,
    quizScore: 65,
    status: '주의필요',
    joinedDate: '2026.03.04',
    notes: '지각 2회, 과제 제출 지연 발생. 1:1 면담을 통해 졸업 논문 병행 부담 파악 후 분량 조율 지도.',
    attendanceHistory: [
      { date: '03.04', status: 'present' },
      { date: '03.06', status: 'late' },
      { date: '03.11', status: 'late' },
      { date: '03.13', status: 'absent' },
      { date: '03.18', status: 'present' }
    ]
  },
  {
    id: 'stu-5',
    classId: 'course-1',
    name: '정유진',
    phone: '010-7210-9832',
    email: 'yujin.jung@kakao.com',
    organization: '천안시 동남구 신부동 거주',
    attendanceRate: 100,
    completedAssignments: 5,
    totalAssignments: 5,
    quizScore: 95,
    status: '우수',
    joinedDate: '2026.03.04',
    notes: '문서 작성 자동화 결과물의 완성도가 매우 높으며, 동료 수강생 피어 리뷰 리더 역할을 솔선수범함.',
    attendanceHistory: [
      { date: '03.04', status: 'present' },
      { date: '03.06', status: 'present' },
      { date: '03.11', status: 'present' },
      { date: '03.13', status: 'present' },
      { date: '03.18', status: 'present' }
    ]
  },
  {
    id: 'stu-6',
    classId: 'course-1',
    name: '한동훈',
    phone: '010-5512-3041',
    email: 'donghun.han@naver.com',
    organization: '천안 직산 테크노파크 입주기업 재직',
    attendanceRate: 80,
    completedAssignments: 4,
    totalAssignments: 5,
    quizScore: 82,
    status: '수강중',
    joinedDate: '2026.03.04',
    notes: '실무 데이터 연계 질문을 주로 하며, 업무 효율화 프롬프트 라이브러리를 사내 전파할 계획이라고 밝힘.',
    attendanceHistory: [
      { date: '03.04', status: 'present' },
      { date: '03.06', status: 'present' },
      { date: '03.11', status: 'present' },
      { date: '03.13', status: 'late' },
      { date: '03.18', status: 'present' }
    ]
  },
  // Course 2 students
  {
    id: 'stu-7',
    classId: 'course-2',
    name: '윤하은',
    phone: '010-3321-4991',
    email: 'haeun.yoon@student.kr',
    organization: '천안불당중학교 2학년',
    attendanceRate: 100,
    completedAssignments: 4,
    totalAssignments: 4,
    quizScore: 98,
    status: '우수',
    joinedDate: '2026.03.07',
    notes: '센서 배선과 코딩 논리가 매우 정확함. 스마트 홈 LED 제어 과제 창의성 부문 만점.',
    attendanceHistory: [
      { date: '03.07', status: 'present' },
      { date: '03.14', status: 'present' },
      { date: '03.21', status: 'present' }
    ]
  },
  {
    id: 'stu-8',
    classId: 'course-2',
    name: '송태원',
    phone: '010-8819-2041',
    email: 'tw.song@student.kr',
    organization: '천안불무중학교 1학년',
    attendanceRate: 100,
    completedAssignments: 3,
    totalAssignments: 4,
    quizScore: 85,
    status: '수강중',
    joinedDate: '2026.03.07',
    notes: '로봇 구동에 높은 열의를 보임. 브레드보드 전원 극성 주의사항을 개별 지도함.',
    attendanceHistory: [
      { date: '03.07', status: 'present' },
      { date: '03.14', status: 'present' },
      { date: '03.21', status: 'present' }
    ]
  }
];

export const INITIAL_DISPATCHES: LectureDispatch[] = [
  {
    id: 'disp-1',
    title: '2026 상반기 천안시 초등 늘봄학교 인공지능(AI) 코딩 전문강사 파견 섭외',
    organization: '충청남도천안교육지원청 미래교육지원센터',
    region: '서북구',
    venue: '천안시 서북구 관내 초등학교 4개교 (불당·백석·두정동 인근)',
    dates: '2026.04.06 ~ 2026.07.17 (14주)',
    hours: 56,
    targetAudience: '초등 3~4학년 방과후 늘봄교실',
    hourlyRate: '시간당 50,000원 + 교재비 지원',
    requiredSkills: ['엔트리 AI', '스크래치', '초등 코딩 지도사 자격 우대'],
    deadline: '2026.03.25',
    status: '모집중',
    applicantCount: 5,
    description: '천안 관내 초등학교 늘봄학교 확대에 따른 기초 AI 소양 및 블록 코딩 놀이형 수업을 진행해주실 열정 있는 강사님들을 모집합니다. 주 1회 학교별 2시간 편성.'
  },
  {
    id: 'disp-2',
    title: '천안 그린스타트업타운 입주기업 임직원 대상 생성형 AI 업무 생산성 특강',
    organization: '충남정보문화산업진흥원 (CCIA)',
    region: '서북구',
    venue: '천안역 서부 그린스타트업타운 복합허브센터 2층 대회의실',
    dates: '2026.04.15 (수) 14:00 - 18:00 (4시간 단기 특강)',
    hours: 4,
    targetAudience: '스타트업 대표 및 기획·마케팅 담당자 30명',
    hourlyRate: '시간당 150,000원 (총 60만원)',
    requiredSkills: ['ChatGPT 실무 프롬프트', 'Midjourney 이미지 생성', 'Claude 기획서 작성'],
    deadline: '2026.03.31',
    status: '모집중',
    applicantCount: 8,
    description: '스타트업 현장에서 즉시 활용 가능한 실전 생성형 AI 활용법(제안서 요약, 마케팅 소재 생성, 사업계획서 보완 프롬프트)을 실습 위주로 지도해주실 전문 강사님을 초빙합니다.'
  },
  {
    id: 'disp-3',
    title: '천안시 동남구 청소년수련관 주말 청소년 피지컬 AI 로봇 자율주행 캠프',
    organization: '천안시청소년재단 동남구청소년수련관',
    region: '동남구',
    venue: '천안시 동남구 목천읍 청소년수련관 3층 메이커스페이스',
    dates: '2026.05.09 ~ 2026.05.23 (3주 매주 토요일, 총 18시간)',
    hours: 18,
    targetAudience: '관내 중·고등학생 20명',
    hourlyRate: '시간당 60,000원',
    requiredSkills: ['아두이노/라즈베리파이', '자율주행 RC카', '파이썬 기본'],
    deadline: '2026.04.10',
    status: '모집중',
    applicantCount: 3,
    description: '주말 3주간 청소년들과 함께 초음파/카메라 센서를 장착한 미니 자율주행차를 제작하고 트랙을 완주하는 팀 프로젝트 캠프를 총괄 지도해주실 메이커 전문 강사님을 모십니다.'
  },
  {
    id: 'disp-4',
    title: '천안시민 평생학습포럼 : 생활 속 스마트 AI 비서와 디지털 문해력 릴레이 강좌',
    organization: '천안시 평생학습원',
    region: '동남구',
    venue: '천안시평생학습관 1강의실 (동남구 원성동)',
    dates: '2026.04.02 ~ 2026.04.30 (5주 매주 목요일)',
    hours: 15,
    targetAudience: '천안시 일반 시민 25명',
    hourlyRate: '시간당 45,000원',
    requiredSkills: ['스마트폰 활용', '네이버 클로바/ChatGPT 기초', '친절한 설명 태도'],
    deadline: '2026.03.20',
    status: '마감임박',
    applicantCount: 7,
    description: '디지털 전환 시대를 맞이하여 천안 시민들이 일상에서 편리하게 인공지능을 접하고 보이스피싱을 예방할 수 있는 실생활 눈높이 교육을 이끌어주실 강사님을 선정합니다.'
  }
];

export const INITIAL_INSTRUCTORS: InstructorProfile[] = [
  {
    id: 'inst-1',
    name: '김민준',
    title: '천안 AI 에듀협의회 수석연구원',
    expertise: ['생성형 AI', '프롬프트 엔지니어링', '파이썬 머신러닝'],
    location: '천안시 서북구 불당동',
    totalHours: 1240,
    rating: 4.95,
    bio: '삼성전자 소프트웨어센터 출신으로, 천안 그린스타트업타운 및 충남 도내 대학에서 실무 생성형 AI 강좌를 3년 연속 최우수 평가로 운영하고 있습니다.',
    certifications: ['마이크로소프트 AI 엔지니어', '정보처리기사', 'SW코딩교육지도사 1급']
  },
  {
    id: 'inst-2',
    name: '이지원',
    title: '천안창의교육센터 선임강사',
    expertise: ['피지컬 컴퓨팅', '초중등 늘봄학교 AI', 'TinyML', '아두이노'],
    location: '천안시 서북구 백석동',
    totalHours: 980,
    rating: 4.92,
    bio: '초등 및 중학교 학생들의 눈높이에 맞춘 메이커 & 피지컬 컴퓨팅 교육 전문가. 천안교육지원청 우수 강사 표창 수상.',
    certifications: ['로봇지도사 1급', '메이커스페이스 공인마스터', '초등융합SW강사']
  },
  {
    id: 'inst-3',
    name: '박현우',
    title: '한국기술교육대 산업데이터 겸임교수',
    expertise: ['스마트팩토리 AI', '제조 이상탐지', '딥러닝 컴퓨터비전'],
    location: '천안시 동남구 병천면',
    totalHours: 1560,
    rating: 4.88,
    bio: '천안·아산 자동차 부품 협력업체 및 제조 데이터 분석 프로젝트 20여 건 수행. 공정 엔지니어를 위한 파이썬 실무 교육에 특화되어 있습니다.',
    certifications: ['국제공인 데이터분석가 (ADP)', '빅데이터분석기사', '스마트제조 컨설턴트']
  },
  {
    id: 'inst-4',
    name: '정소영',
    title: '천안 디지털배움터 주임강사',
    expertise: ['시니어 디지털 리터러시', '스마트폰 AI 활용', '생활 인공지능'],
    location: '천안시 동남구 신부동',
    totalHours: 850,
    rating: 4.97,
    bio: '어르신들과 일반 시민들을 위한 따뜻하고 친절한 맞춤형 AI 교육 진행. 복지관 및 평생학습관 수강 만족도 1위.',
    certifications: ['디지털포용전문강사', '평생교육사 2급', '노인심리상담사']
  }
];

export const CHEONAN_VENUES = [
  { name: '천안 그린스타트업타운 (서부역)', type: '청년·창업', address: '천안시 서북구 와촌동 106-17' },
  { name: '충남정보문화산업진흥원 (CCIA)', type: '기업·콘텐츠', address: '천안시 서북구 직산읍 직산로 136' },
  { name: '한국기술교육대학교 2캠퍼스', type: '재직자·산학협력', address: '천안시 서북구 과수원길 25' },
  { name: '천안시청소년수련관', type: '청소년 메이커', address: '천안시 동남구 목천읍 남화리 79' },
  { name: '천안불당중학교 미래융합실', type: '초중등 학교', address: '천안시 서북구 불당동' },
  { name: '천안동남구종합사회복지관', type: '시민·시니어', address: '천안시 동남구 삼룡동' }
];
