import React, { useState } from 'react';
import { LectureDispatch, InstructorProfile } from '../types';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Award, 
  Star, 
  CheckCircle, 
  Send, 
  X,
  PlusCircle,
  Briefcase
} from 'lucide-react';

interface NetworkViewProps {
  dispatches: LectureDispatch[];
  instructors: InstructorProfile[];
  onApplyDispatch: (dispatchId: string) => void;
  onAddDispatch: (dispatch: LectureDispatch) => void;
}

export const NetworkView: React.FC<NetworkViewProps> = ({
  dispatches,
  instructors,
  onApplyDispatch,
  onAddDispatch
}) => {
  const [activeTab, setActiveTab] = useState<'dispatches' | 'instructors'>('dispatches');
  const [regionFilter, setRegionFilter] = useState<'all' | '서북구' | '동남구'>('all');
  const [applyingDispatch, setApplyingDispatch] = useState<LectureDispatch | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [showAddDispatchModal, setShowAddDispatchModal] = useState(false);

  // New dispatch form state
  const [newTitle, setNewTitle] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newRegion, setNewRegion] = useState<'서북구' | '동남구'>('서북구');
  const [newVenue, setNewVenue] = useState('');
  const [newDates, setNewDates] = useState('');
  const [newHours, setNewHours] = useState(10);
  const [newTarget, setNewTarget] = useState('');
  const [newRate, setNewRate] = useState('시간당 50,000원');
  const [newSkills, setNewSkills] = useState('생성형 AI, 파이썬');
  const [newDeadline, setNewDeadline] = useState('2026.04.15');
  const [newDesc, setNewDesc] = useState('');

  const filteredDispatches = dispatches.filter((d) => {
    if (regionFilter === 'all') return true;
    return d.region === regionFilter;
  });

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingDispatch) return;

    onApplyDispatch(applyingDispatch.id);
    setAppliedIds((prev) => [...prev, applyingDispatch.id]);
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setApplyingDispatch(null);
    }, 1500);
  };

  const handleCreateDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newOrg.trim()) return;

    const created: LectureDispatch = {
      id: `disp-${Date.now()}`,
      title: newTitle,
      organization: newOrg,
      region: newRegion,
      venue: newVenue || '천안시 관내 교육장',
      dates: newDates || '2026년 4월 중 (일정 협의)',
      hours: Number(newHours) || 10,
      targetAudience: newTarget || '천안시민 및 학생',
      hourlyRate: newRate,
      requiredSkills: newSkills.split(',').map((s) => s.trim()).filter(Boolean),
      deadline: newDeadline,
      status: '모집중',
      applicantCount: 1,
      description: newDesc || '천안 관내 AI 교육을 함께할 유능한 강사님을 모십니다.'
    };

    onAddDispatch(created);
    setShowAddDispatchModal(false);
    // Reset form
    setNewTitle('');
    setNewOrg('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            천안시 AI 강사 매칭 & 네트워크
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            천안교육지원청, 스타트업타운, 복지관의 출강 의뢰 공고를 확인하고 지원하거나 동료 강사진과 교류하세요.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddDispatchModal(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>출강 의뢰 등록</span>
          </button>
        </div>
      </div>

      {/* Segmented View Switcher */}
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('dispatches')}
            className={`py-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'dispatches'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            천안 관내 출강 공고 ({dispatches.length}건)
          </button>
          <button
            onClick={() => setActiveTab('instructors')}
            className={`py-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'instructors'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            천안 AI 강사 프로필 ({instructors.length}명)
          </button>
        </div>

        {activeTab === 'dispatches' && (
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-500 mr-1">지역:</span>
            {(['all', '서북구', '동남구'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setRegionFilter(reg)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  regionFilter === reg
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {reg === 'all' ? '전체' : reg}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dispatches Tab */}
      {activeTab === 'dispatches' && (
        <div className="space-y-4">
          {filteredDispatches.map((item) => {
            const isApplied = appliedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-indigo-700">{item.organization}</span>
                      <span aria-hidden="true">·</span>
                      <span>천안시 {item.region}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-rose-600 font-medium">마감 {item.deadline}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.title}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-1 text-xs font-semibold rounded shrink-0 self-start ${
                    item.status === '마감임박'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs mb-4">
                  <div>
                    <span className="text-slate-400 block text-[11px]">강의 장소</span>
                    <span className="font-medium text-slate-800">{item.venue}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">교육 일정 및 시간</span>
                    <span className="font-medium text-slate-800 font-mono tabular-nums">
                      {item.dates} ({item.hours}시간)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">수강 대상</span>
                    <span className="font-medium text-slate-800">{item.targetAudience}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">지급 강사료</span>
                    <span className="font-bold text-indigo-700 font-mono tabular-nums">{item.hourlyRate}</span>
                  </div>
                </div>

                {/* Required Skills */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-slate-400 text-[11px]">요구 역량:</span>
                    {item.requiredSkills.map((sk) => (
                      <span key={sk} className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {sk}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 font-mono tabular-nums">
                      현재 지원자 <strong>{item.applicantCount + (isApplied ? 1 : 0)}</strong>명
                    </span>
                    <button
                      disabled={isApplied}
                      onClick={() => setApplyingDispatch(item)}
                      className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        isApplied
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                      }`}
                    >
                      {isApplied ? '지원 완료' : '출강 지원서 제출'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Instructors Tab */}
      {activeTab === 'instructors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {instructors.map((inst) => (
            <div
              key={inst.id}
              className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                      <span>{inst.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>누적 {inst.totalHours}시간 출강</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {inst.name} 강사
                    </h3>
                    <div className="text-xs text-indigo-600 font-medium">
                      {inst.title}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-mono tabular-nums">{inst.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {inst.bio}
                </p>

                {/* Expertise */}
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
                    전문 강의 분야
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {inst.expertise.map((exp) => (
                      <span key={exp} className="text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
                    공인 자격 및 수료
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {inst.certifications.map((cert) => (
                      <span key={cert} className="text-[11px] text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  천안시 교육기관 검증 강사
                </span>
                <button
                  onClick={() => alert(`${inst.name} 강사님께 협업 제안 메시지가 전달되었습니다.`)}
                  className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors cursor-pointer"
                >
                  강의 협업 제안
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Apply Modal */}
      {applyingDispatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  출강 지원서 제출
                </h3>
                <div className="text-xs text-slate-500 truncate max-w-xs">
                  {applyingDispatch.organization} · {applyingDispatch.title}
                </div>
              </div>
              <button
                onClick={() => setApplyingDispatch(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {applySuccess ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">
                  출강 지원이 성공적으로 완료되었습니다!
                </h4>
                <p className="text-xs text-slate-500">
                  해당 기관의 담당자에게 강사님의 프로필과 강의 이력이 전달되었습니다. 심사 결과는 SMS로 안내됩니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmApply} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    지원 강사 성명
                  </label>
                  <input
                    type="text"
                    defaultValue="김민준 강사"
                    required
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    연락처 (휴대폰)
                  </label>
                  <input
                    type="tel"
                    defaultValue="010-8472-1923"
                    required
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    천안 관내 주요 출강 이력 및 핵심 강점
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="천안 그린스타트업타운 및 관내 중고등학교 생성형 AI 및 파이썬 코딩 출강 3년 경력 보유. 수강생 맞춤형 실습 지도 가능합니다."
                    required
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600">
                  <div className="font-semibold text-slate-800 mb-1">확인 사항</div>
                  <div>일정: {applyingDispatch.dates} ({applyingDispatch.hours}시간)</div>
                  <div>장소: {applyingDispatch.venue}</div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setApplyingDispatch(null)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>지원서 제출</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Add Dispatch Modal */}
      {showAddDispatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  천안 관내 신규 출강 의뢰 등록
                </h3>
                <div className="text-xs text-slate-500">
                  학교, 기관, 기업의 AI 전문 강사 섭외 공고를 게시합니다.
                </div>
              </div>
              <button
                onClick={() => setShowAddDispatchModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDispatch} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  공고 제목 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 2026 천안시 방과후 초등 AI 코딩 강사 모집"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    의뢰 기관명 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 천안동남구종합복지관"
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    관내 권역 *
                  </label>
                  <select
                    value={newRegion}
                    onChange={(e) => setNewRegion(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="서북구">천안 서북구</option>
                    <option value="동남구">천안 동남구</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  강의 장소
                </label>
                <input
                  type="text"
                  placeholder="예: 천안시 서북구 불당동 복지관 2층 컴퓨터실"
                  value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    강의 일정
                  </label>
                  <input
                    type="text"
                    placeholder="예: 2026.04.10 ~ 05.29 (매주 금)"
                    value={newDates}
                    onChange={(e) => setNewDates(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    총 강의 시수 (시간)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newHours}
                    onChange={(e) => setNewHours(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    강사료 기준
                  </label>
                  <input
                    type="text"
                    placeholder="예: 시간당 50,000원"
                    value={newRate}
                    onChange={(e) => setNewRate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    접수 마감일
                  </label>
                  <input
                    type="text"
                    placeholder="예: 2026.03.31"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  필요 요구 기술 (쉼표로 구분)
                </label>
                <input
                  type="text"
                  placeholder="예: 엔트리 코딩, 생성형 AI, 아두이노"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  상세 교육 요강 및 안내
                </label>
                <textarea
                  rows={3}
                  placeholder="교육의 목적, 강의 대상자 수준, 강의실 장비 지원 현황 등을 상세히 기재해 주세요."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddDispatchModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md cursor-pointer shadow-xs"
                >
                  공고 게시하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
