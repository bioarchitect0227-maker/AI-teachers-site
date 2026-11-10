import React, { useState } from 'react';
import { Material, CategoryType, TargetLevel } from '../types';
import { X, Upload, FileText, Check } from 'lucide-react';

interface UploadMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (material: Material) => void;
}

export const UploadMaterialModal: React.FC<UploadMaterialModalProps> = ({
  isOpen,
  onClose,
  onUpload
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('generative-ai');
  const [targetLevel, setTargetLevel] = useState<TargetLevel>('university');
  const [fileType, setFileType] = useState<'PPTX' | 'PDF' | 'IPYNB' | 'ZIP' | 'DOCX'>('PPTX');
  const [fileSize, setFileSize] = useState('18.5 MB');
  const [authorName, setAuthorName] = useState('김민준');
  const [affiliation, setAffiliation] = useState('천안 AI 강사 네트워크');
  const [description, setDescription] = useState('');
  const [goalsText, setGoalsText] = useState('');
  const [curriculumText, setCurriculumText] = useState('');
  const [tagsText, setTagsText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const targetsMap: Record<TargetLevel, string> = {
      all: '전체',
      elementary: '초등',
      'middle-high': '중·고등',
      university: '대학·청년',
      'senior-citizen': '시민·시니어',
      corporate: '기업·재직자'
    };

    const newMat: Material = {
      id: `mat-${Date.now()}`,
      title,
      category,
      targetLevel,
      targetLabel: targetsMap[targetLevel] || '일반',
      fileType,
      fileSize: fileSize || '15.0 MB',
      author: {
        name: authorName || '천안 AI 강사',
        role: '전문강사',
        affiliation: affiliation || '천안시 교육기관'
      },
      downloads: 0,
      likes: 0,
      uploadedAt: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      description,
      learningGoals: goalsText
        ? goalsText.split('\n').map((g) => g.trim()).filter(Boolean)
        : ['실무 인공지능 이해 및 활용 역량 강화'],
      curriculumOutline: curriculumText
        ? curriculumText.split('\n').map((c) => c.trim()).filter(Boolean)
        : ['1차시: 기초 개념', '2차시: 실전 실습'],
      tags: tagsText
        ? tagsText.split(',').map((t) => t.trim().replace(/^#/, '')).filter(Boolean)
        : ['AI교육', '천안시강사']
    };

    onUpload(newMat);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl max-h-[90vh] rounded-2xl shadow-xl flex flex-col overflow-hidden border border-slate-200">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              천안 AI 교육자료 등록 및 공유
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              자료명 (제목) *
            </label>
            <input
              type="text"
              required
              placeholder="예: [2026] 천안 청년 대상 챗GPT 실무 프롬프트 4주 마스터 슬라이드"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                교육 분야 *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="generative-ai">생성형 AI & 프롬프트</option>
                <option value="school-basic">초·중등 AI 기초 (엔트리)</option>
                <option value="python-data">파이썬 & 데이터 분석</option>
                <option value="physical-robot">피지컬 & 로보틱스 (TinyML)</option>
                <option value="cheonan-industry">천안 스마트제조 AI</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                대상 학습자 *
              </label>
              <select
                value={targetLevel}
                onChange={(e) => setTargetLevel(e.target.value as TargetLevel)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="elementary">초등학생 (늘봄학교)</option>
                <option value="middle-high">중·고등학생</option>
                <option value="university">대학·청년 구직자</option>
                <option value="senior-citizen">시민·시니어 (디지털배움터)</option>
                <option value="corporate">기업·재직자 (산단)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                파일 포맷
              </label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              >
                <option value="PPTX">PPTX (파워포인트 슬라이드)</option>
                <option value="PDF">PDF (전자교재/활동지)</option>
                <option value="IPYNB">IPYNB (주피터 노트북 코드)</option>
                <option value="DOCX">DOCX (지도안 양식)</option>
                <option value="ZIP">ZIP (통합 패키지 파일)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                용량 표기
              </label>
              <input
                type="text"
                placeholder="예: 24.5 MB"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                작성자 성명
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                소속 기관
              </label>
              <input
                type="text"
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              자료 상세 소개 *
            </label>
            <textarea
              rows={3}
              required
              placeholder="수업에서 어떻게 활용할 수 있는지, 수강생 반응이나 강의 진행 팁을 적어주세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              주요 학습 목표 (줄바꿈으로 구분)
            </label>
            <textarea
              rows={2}
              placeholder="예:&#10;LLM 기본 원리와 프롬프트 5원칙 이해&#10;업무 자동화 템플릿 실습"
              value={goalsText}
              onChange={(e) => setGoalsText(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              차시별 커리큘럼 요약 (줄바꿈으로 구분)
            </label>
            <textarea
              rows={2}
              placeholder="예:&#10;1강: AI 개요 및 프롬프트 기본 문법&#10;2강: 실전 기획서 작성 실습"
              value={curriculumText}
              onChange={(e) => setCurriculumText(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              태그 (쉼표로 구분)
            </label>
            <input
              type="text"
              placeholder="예: 프롬프트, 챗GPT, 청년취업, 그린스타트업"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>자료 등록 완료</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
