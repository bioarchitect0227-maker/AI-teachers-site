import React, { useState } from 'react';
import { Material, GeneratedLessonPlan } from '../types';
import { 
  Sparkles, 
  BookOpen, 
  Clock, 
  Users, 
  Check, 
  Copy, 
  Download, 
  PlusCircle, 
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';

interface AIAssistantViewProps {
  onSaveToMaterials: (material: Material) => void;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  onSaveToMaterials
}) => {
  const [targetAudience, setTargetAudience] = useState<string>('대학·청년 구직자');
  const [topic, setTopic] = useState<string>('생성형 AI 프롬프트 엔지니어링 실무');
  const [sessionType, setSessionType] = useState<string>('4차시 집중 워크숍 (총 8시간)');
  const [focusPoint, setFocusPoint] = useState<string>('현장 실습 및 비즈니스 템플릿 완성');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedToLibrary, setSavedToLibrary] = useState<boolean>(false);

  // Default active generated plan
  const [currentPlan, setCurrentPlan] = useState<GeneratedLessonPlan | null>({
    title: '[천안 청년 특화] 실무 비즈니스 프롬프트 엔지니어링 & 업무 자동화 수업 지도안',
    target: '대학생 및 취업준비 청년 (20~30대)',
    duration: '4차시 (총 8시간, 차시당 120분)',
    topic: '생성형 AI 프롬프트 엔지니어링 실무',
    objectives: [
      '대규모 언어 모델(LLM)의 생성 원리와 프롬프트 핵심 5대 구성 요소 습득',
      '기획서, 시장조사, 비즈니스 이메일 작성용 실전 프롬프트 템플릿 직접 설계',
      '환각(Hallucination) 검증 및 천안시 청년 취업 포트폴리오 프로젝트 연계'
    ],
    timeline: [
      {
        phase: '1. 도입 (Ice-breaking & 동기유발)',
        durationMinutes: 20,
        activity: '천안시 스타트업 및 중견기업의 AI 채용 트렌드 소개, 비포/애프터 프롬프트 결과물 비교 체험',
        toolsUsed: '대형 스크린, ChatGPT, 강의 슬라이드'
      },
      {
        phase: '2. 전개 (핵심 이론 & 원리 탐구)',
        durationMinutes: 40,
        activity: 'Role-Context-Task-Constraint-Example 구조화 공식 및 Few-Shot 프롬프팅 메커니즘 학습',
        toolsUsed: '구글 코랩 / 챗봇 인터페이스 실시간 프롬프트 테스트'
      },
      {
        phase: '3. 실습 (핸즈온 워크숍)',
        durationMinutes: 50,
        activity: '조별 실습: 천안 로컬 관광지/카페 브랜딩 기획서 및 소셜 마케팅 카피 자동 생성 파이프라인 제작',
        toolsUsed: '노션 템플릿, 프롬프트 라이브러리 시트'
      },
      {
        phase: '4. 정리 및 평가',
        durationMinutes: 10,
        activity: '팀별 최고 프롬프트 시연, 피드백 공유 및 확인 퀴즈 풀이',
        toolsUsed: '실시간 설문 도구, 학습지'
      }
    ],
    exercises: [
      '미션 1: 신제품 출시 홍보를 위한 타깃 고객 페르소나 정의 및 맞춤형 이메일 초안 생성 프롬프트 작성',
      '미션 2: 10페이지 분량의 긴 정부 지원사업 공고문을 3줄 핵심 요약표(지원자격, 혜택, 마감일)로 추출하기',
      '미션 3: 챗봇에게 "너는 천안 지역 전문 비즈니스 컨설턴트야"라는 시스템 프롬프트(페르소나) 부여 후 SWOT 분석 유도'
    ],
    quizQuestions: [
      {
        question: '생성형 AI 모델에게 원하는 결과의 정확도를 높이기 위해 몇 가지 모범 예시를 함께 제공하는 기법은?',
        options: ['Zero-Shot Prompting', 'Few-Shot Prompting', 'Chain of Thought (CoT)', 'Fine-Tuning'],
        answer: 1,
        explanation: 'Few-Shot 프롬프팅은 입력 프롬프트 내에 1~3개 이상의 입력-출력 예시를 제공하여 모델이 일관된 패턴으로 응답하도록 유도하는 대표적인 기법입니다.'
      },
      {
        question: '프롬프트 설계 시 환각(Hallucination) 현상을 최소화하기 위한 가장 효과적인 조치는?',
        options: [
          '프롬프트를 최대한 짧고 모호하게 작성한다.',
          '"출처에 없는 내용은 추측하지 말고 모른다고 답하라"는 명시적 제약 조건을 부여한다.',
          '온도(Temperature) 값을 최댓값으로 설정한다.',
          '반말과 구어체로 질문한다.'
        ],
        answer: 1,
        explanation: '모델에게 신뢰할 수 있는 참조 문서를 함께 제공하고, "주어진 본문 외의 내용은 생성하지 말 것"을 엄격히 지시하는 것이 환각 방지의 핵심입니다.'
      },
      {
        question: '다음 중 프롬프트의 5대 필수 구성요소에 해당하지 않는 것은?',
        options: ['역할 (Role)', '맥락 (Context)', '모델 컴파일러 코드 (Binary)', '제약조건 (Constraints)'],
        answer: 2,
        explanation: '프롬프트는 자연어로 전달되는 지시문이므로 기계어/바이너리 코드는 구성요소에 포함되지 않습니다.'
      }
    ]
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setSavedToLibrary(false);

    // Simulate smart AI generation customized to selected options
    setTimeout(() => {
      let audienceLabel = targetAudience;
      let topicTitle = topic;

      const newPlan: GeneratedLessonPlan = {
        title: `[천안 AI 맞춤교안] ${topicTitle} (${audienceLabel} 대상)`,
        target: `${audienceLabel} (천안 관내 교육 대상)`,
        duration: sessionType,
        topic: topicTitle,
        objectives: [
          `${topicTitle}의 기본 개념과 일상/실무 적용 가능성을 체계적으로 이해`,
          `천안 지역 맞춤형 실습 예제를 통한 학습자의 직접 조작 및 결과물 도출`,
          `인공지능 윤리, 저작권, 보안 수칙에 대한 비판적 사고 역량 함양`
        ],
        timeline: [
          {
            phase: '1. 도입 (15분)',
            durationMinutes: 15,
            activity: `${audienceLabel} 눈높이에 맞춘 AI 실생활 사례 영상 시청 및 흥미 유발 질의응답`,
            toolsUsed: '시청각 자료, 스마트 기기'
          },
          {
            phase: '2. 전개 (35분)',
            durationMinutes: 35,
            activity: `${topicTitle} 핵심 개념 해설 및 강사 시연 (실시간 화면 미러링)`,
            toolsUsed: '프로젝터, 실습 소프트웨어'
          },
          {
            phase: '3. 실습 (60분)',
            durationMinutes: 60,
            activity: `강조 포인트: [${focusPoint}] 반영 1:1 핸즈온 개별 및 모둠 프로젝트 완성`,
            toolsUsed: '개인 PC/태블릿, 실습 활동지'
          },
          {
            phase: '4. 정리 (10분)',
            durationMinutes: 10,
            activity: '학습 성과 공유, 상호 평가 및 퀴즈를 통한 핵심 요점 리마인드',
            toolsUsed: '학습 평가표'
          }
        ],
        exercises: [
          `실습 1: ${topicTitle} 기초 인터페이스 탐색 및 기본 샘플 실행해보기`,
          `실습 2: 천안시 공공데이터 및 일상 생활 문제 해결을 위한 응용 과제 수행`,
          `실습 3: 나만의 창작물 완성 후 동료 수강생들과 결과 화면 공유하기`
        ],
        quizQuestions: [
          {
            question: `${topicTitle} 학습 시 가장 유의해야 할 올바른 인공지능 활용 태도는?`,
            options: [
              'AI가 내놓은 결과를 검증 없이 100% 신뢰한다.',
              '생성된 결과의 출처와 사실 여부를 항상 교차 검토(Fact-check)한다.',
              '타인의 개인정보를 프롬프트에 자유롭게 입력한다.',
              '결과물을 자신이 직접 창작한 것으로 속인다.'
            ],
            answer: 1,
            explanation: '인공지능의 산출물은 반드시 인간 전문가의 교차 검증 및 윤리적 검토를 거쳐야 합니다.'
          },
          {
            question: '수업 중 발생할 수 있는 오류를 해결하는 가장 좋은 방법은?',
            options: [
              '오류 메시지를 복사하여 AI에게 원인과 해결 코드를 질문한다.',
              '프로그램을 바로 삭제한다.',
              '아무것도 건드리지 않고 수업을 중단한다.',
              '전원 코드를 뽑는다.'
            ],
            answer: 0,
            explanation: '에러 로그나 비정상 동작을 AI 도우미에게 구체적으로 제시하면 빠르고 정확한 디버깅 힌트를 얻을 수 있습니다.'
          }
        ]
      };

      setCurrentPlan(newPlan);
      setIsGenerating(false);
    }, 600);
  };

  const handleCopyText = () => {
    if (!currentPlan) return;
    const text = `
[수업 지도안] ${currentPlan.title}
대상: ${currentPlan.target}
시수: ${currentPlan.duration}
주제: ${currentPlan.topic}

■ 학습 목표
${currentPlan.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}

■ 수업 진행 타임라인
${currentPlan.timeline.map((t) => `• ${t.phase} (${t.durationMinutes}분): ${t.activity} [준비: ${t.toolsUsed}]`).join('\n')}

■ 학생 실습 미션
${currentPlan.exercises.map((e, i) => `[미션 ${i + 1}] ${e}`).join('\n')}

■ 수업 확인 퀴즈
${currentPlan.quizQuestions.map((q, i) => `Q${i + 1}. ${q.question}\n${q.options.map((opt, oi) => `  ${oi + 1}) ${opt}`).join('\n')}\n정답: ${q.answer + 1}번\n해설: ${q.explanation}`).join('\n\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPlan = () => {
    if (!currentPlan) return;
    const text = `# ${currentPlan.title}\n\n**대상:** ${currentPlan.target}\n**시수:** ${currentPlan.duration}\n**주제:** ${currentPlan.topic}\n\n## 1. 학습 목표\n${currentPlan.objectives.map((o) => `- ${o}`).join('\n')}\n\n## 2. 수업 지도안 (타임라인)\n${currentPlan.timeline.map((t) => `### ${t.phase} (${t.durationMinutes}분)\n- **내용:** ${t.activity}\n- **교구/도구:** ${t.toolsUsed}\n`).join('\n')}\n## 3. 핸즈온 실습 미션\n${currentPlan.exercises.map((e, i) => `${i + 1}. ${e}`).join('\n')}\n\n## 4. 확인 퀴즈\n${currentPlan.quizQuestions.map((q, i) => `**Q${i + 1}. ${q.question}**\n${q.options.map((opt, oi) => `- [${oi === q.answer ? 'x' : ' '}] ${opt}`).join('\n')}\n*해설: ${q.explanation}*\n`).join('\n')}`;

    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `천안_AI_수업지도안_${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveToMaterialsLib = () => {
    if (!currentPlan) return;

    const newMaterial: Material = {
      id: `mat-ai-${Date.now()}`,
      title: currentPlan.title,
      category: 'generative-ai',
      targetLevel: 'university',
      targetLabel: currentPlan.target.slice(0, 8),
      fileType: 'PDF',
      fileSize: '3.2 MB',
      author: {
        name: '김민준',
        role: 'AI 에듀허브 강사',
        affiliation: '천안시 AI 강사 네트워크'
      },
      downloads: 1,
      likes: 1,
      uploadedAt: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      description: `천안시 관내 ${currentPlan.target} 교육을 위해 AI 교안 어시스턴트로 자동 구성된 실무 수업 지도안 및 퀴즈 세트입니다.`,
      learningGoals: currentPlan.objectives,
      curriculumOutline: currentPlan.timeline.map((t) => `${t.phase}: ${t.activity}`),
      tags: ['AI지도안', '천안맞춤교안', '퀴즈세트', '실습워크숍']
    };

    onSaveToMaterials(newMaterial);
    setSavedToLibrary(true);
    setTimeout(() => setSavedToLibrary(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>천안 AI 강사 스마트 툴킷</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            AI 수업 지도안 & 퀴즈 생성기
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            수강 대상과 강의 주제만 선택하면 천안시 교육 환경에 최적화된 차시별 타임라인, 실습 미션, 퀴즈를 10초 만에 설계합니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Control Deck (Parameters) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>교안 설계 옵션 설정</span>
            </h3>

            {/* Target Audience */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                교육 대상 (수준)
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="초등 늘봄학교 (3~6학년)">초등 늘봄학교 (3~6학년)</option>
                <option value="중·고등학생 (SW·정보 교과)">중·고등학생 (SW·정보 교과)</option>
                <option value="대학·청년 구직자">대학·청년 구직자 (천안 그린스타트업)</option>
                <option value="천안 제조기업 재직자 엔지니어">천안 제조기업 재직자 엔지니어</option>
                <option value="5060 시민 및 시니어 어르신">5060 시민 및 시니어 어르신 (디지털배움터)</option>
              </select>
            </div>

            {/* Subject Topic */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                강의 주제
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="생성형 AI 프롬프트 엔지니어링 실무">생성형 AI 프롬프트 엔지니어링 실무</option>
                <option value="엔트리 AI 블록 코딩 & 인공지능 윤리">엔트리 AI 블록 코딩 & 인공지능 윤리</option>
                <option value="스마트팩토리 센서 데이터 이상탐지 파이썬 실무">스마트팩토리 센서 데이터 이상탐지 파이썬</option>
                <option value="미드저니 & 스테이블디퓨전 이미지 생성 워크숍">미드저니 & 이미지 생성 디자인 워크숍</option>
                <option value="스마트폰으로 배우는 일상생활 AI 비서 꿀팁">스마트폰으로 배우는 일상생활 AI 비서</option>
              </select>
            </div>

            {/* Session Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                강의 형태 및 시수
              </label>
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="2시간 단기 원데이 특강">2시간 단기 원데이 특강</option>
                <option value="4차시 집중 워크숍 (총 8시간)">4차시 집중 워크숍 (총 8시간)</option>
                <option value="8주 정규 교육 과정 (주 1회 3시간)">8주 정규 교육 과정 (주 1회 3시간)</option>
                <option value="12주 방과후 늘봄학교 과정">12주 방과후 늘봄학교 과정</option>
              </select>
            </div>

            {/* Focus Point */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                강조 포인트
              </label>
              <select
                value={focusPoint}
                onChange={(e) => setFocusPoint(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="현장 실습 및 비즈니스 템플릿 완성">현장 실습 및 비즈니스 템플릿 완성</option>
                <option value="친절한 설명과 눈높이 실습 위주">친절한 설명과 눈높이 실습 위주</option>
                <option value="천안 로컬 공공데이터 및 산단 사례 연계">천안 로컬 공공데이터 및 산단 사례 연계</option>
                <option value="AI 윤리, 환각 방지, 저작권 가이드 중심">AI 윤리, 환각 방지, 저작권 가이드 중심</option>
              </select>
            </div>

            <button
              disabled={isGenerating}
              onClick={handleGenerate}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'AI 교안 설계 중...' : '맞춤형 수업 지도안 생성하기'}</span>
            </button>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <div className="font-semibold text-slate-900 mb-1">
              강사용 팁:
            </div>
            천안시 관내 교육기관(충남교육청, 스타트업타운, 복지관) 출강 시 지도안 제출 양식에 맞추어 즉시 출력 또는 마크다운 파일로 다운로드할 수 있습니다.
          </div>
        </div>

        {/* Right Output Stage (Generated Lesson Plan Preview) */}
        <div className="lg:col-span-7">
          {currentPlan ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col h-full overflow-hidden">
              {/* Output Header */}
              <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-indigo-700">{currentPlan.target}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{currentPlan.duration}</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900">
                    {currentPlan.title}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleCopyText}
                    title="클립보드 복사"
                    className="p-2 text-slate-600 hover:bg-white hover:text-slate-900 rounded-lg border border-slate-200 transition-colors cursor-pointer text-xs flex items-center gap-1"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? '복사됨' : '복사'}</span>
                  </button>

                  <button
                    onClick={handleDownloadPlan}
                    title="마크다운 다운로드"
                    className="p-2 text-slate-600 hover:bg-white hover:text-slate-900 rounded-lg border border-slate-200 transition-colors cursor-pointer text-xs flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>다운로드</span>
                  </button>

                  <button
                    onClick={handleSaveToMaterialsLib}
                    title="교육자료실에 바로 등록"
                    className="px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>{savedToLibrary ? '등록 완료!' : '자료실 등록'}</span>
                  </button>
                </div>
              </div>

              {/* Output Content */}
              <div className="p-6 overflow-y-auto space-y-6 text-xs max-h-[650px]">
                {/* Objectives */}
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>1. 핵심 학습 목표</span>
                  </h3>
                  <div className="space-y-1.5 pl-1">
                    {currentPlan.objectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    <span>2. 차시별 진행 지도안 (시간 분배)</span>
                  </h3>
                  <div className="space-y-2.5">
                    {currentPlan.timeline.map((step, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                          <span>{step.phase}</span>
                          <span className="text-indigo-600 font-mono tabular-nums">{step.durationMinutes}분</span>
                        </div>
                        <p className="text-slate-600 mb-1.5 leading-relaxed">
                          {step.activity}
                        </p>
                        <div className="text-[11px] text-slate-400">
                          준비물 및 도구: {step.toolsUsed}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exercises */}
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    <span>3. 학생용 핸즈온 실습 미션</span>
                  </h3>
                  <div className="space-y-2">
                    {currentPlan.exercises.map((ex, idx) => (
                      <div key={idx} className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 text-slate-800">
                        <div className="font-semibold text-indigo-900 mb-0.5">
                          미션 {idx + 1}
                        </div>
                        <div>{ex}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quizzes */}
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                    <span>4. 수업 이해도 점검 퀴즈 & 해설</span>
                  </h3>
                  <div className="space-y-3">
                    {currentPlan.quizQuestions.map((quiz, qIdx) => (
                      <div key={qIdx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="font-semibold text-slate-900 mb-2">
                          Q{qIdx + 1}. {quiz.question}
                        </div>
                        <div className="space-y-1 mb-2">
                          {quiz.options.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className={`p-1.5 rounded text-[11px] ${
                                oIdx === quiz.answer
                                  ? 'bg-emerald-100/70 text-emerald-900 font-medium'
                                  : 'text-slate-600'
                              }`}
                            >
                              {oIdx + 1}) {opt} {oIdx === quiz.answer && '(정답)'}
                            </div>
                          ))}
                        </div>
                        <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                          <strong>해설:</strong> {quiz.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12 bg-white rounded-xl border border-slate-200 text-slate-400">
              옵션을 선택하고 지도안을 생성해 보세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
