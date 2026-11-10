import React, { useState, useMemo } from 'react';
import { Material, CategoryType, TargetLevel } from '../types';
import { 
  Search, 
  Download, 
  Heart, 
  FileText, 
  Sparkles, 
  Check, 
  Share2, 
  X,
  Upload,
  BookOpen
} from 'lucide-react';

interface MaterialsViewProps {
  materials: Material[];
  selectedMaterial: Material | null;
  onSelectMaterial: (m: Material | null) => void;
  onToggleLike: (materialId: string) => void;
  onDownload: (material: Material) => void;
  onOpenUpload: () => void;
}

export const MaterialsView: React.FC<MaterialsViewProps> = ({
  materials,
  selectedMaterial,
  onSelectMaterial,
  onToggleLike,
  onDownload,
  onOpenUpload
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedTarget, setSelectedTarget] = useState<TargetLevel>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: '전체 자료' },
    { id: 'generative-ai', label: '생성형 AI & 프롬프트' },
    { id: 'school-basic', label: '초·중등 AI 기초 (엔트리)' },
    { id: 'python-data', label: '파이썬 & 데이터 분석' },
    { id: 'physical-robot', label: '피지컬 & 로보틱스 (TinyML)' },
    { id: 'cheonan-industry', label: '천안 스마트제조 AI' }
  ];

  const targetLevels: { id: TargetLevel; label: string }[] = [
    { id: 'all', label: '모든 대상' },
    { id: 'elementary', label: '초등' },
    { id: 'middle-high', label: '중·고등' },
    { id: 'university', label: '대학·청년' },
    { id: 'senior-citizen', label: '시민·시니어' },
    { id: 'corporate', label: '기업·재직자' }
  ];

  // Filtering
  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchTarget = selectedTarget === 'all' || item.targetLevel === selectedTarget;
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.author.name.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query));

      return matchCategory && matchTarget && matchSearch;
    });
  }, [materials, selectedCategory, selectedTarget, searchQuery]);

  const handleShare = (mat: Material) => {
    navigator.clipboard.writeText(`${window.location.origin}?material=${mat.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Upload CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            천안시 AI 교육자료실
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            천안 관내 학교, 스타트업타운, 복지관 및 산업단지에서 실제 활용되는 강의안과 실습 코드를 공유합니다.
          </p>
        </div>
        <button
          onClick={onOpenUpload}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>신규 교육자료 등록</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="자료 제목, 키워드, 강사명, 태그(#프롬프트, #엔트리 등) 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              지우기
            </button>
          )}
        </div>

        {/* Categories (Interactive Filter Buttons) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-semibold text-slate-500 mr-2 shrink-0">분야:</span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Target Audience (Interactive Filter Buttons) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 mr-2 shrink-0">대상:</span>
          {targetLevels.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setSelectedTarget(lvl.id)}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                selectedTarget === lvl.id
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Order Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div>
          총 <span className="font-semibold text-slate-900 font-mono tabular-nums">{filteredMaterials.length}</span>개의 교육자료
        </div>
        <div className="text-slate-400">
          모든 자료는 천안 관내 AI 강사 검증을 마친 실무 자료입니다.
        </div>
      </div>

      {/* Materials Grid */}
      {filteredMaterials.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800">
            조건에 맞는 교육 자료가 없습니다
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            검색어를 변경하거나 필터를 초기화해 보세요. 직접 제작하신 교안을 동료 강사들에게 공유할 수도 있습니다.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedTarget('all');
              setSearchQuery('');
            }}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
          >
            필터 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all hover:shadow-sm flex flex-col justify-between p-5"
            >
              <div>
                {/* Zero-Pill Unboxed Metadata Header */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-bold text-indigo-700">{item.fileType}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{item.fileSize}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.targetLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{item.uploadedAt}</span>
                </div>

                <h3 
                  onClick={() => onSelectMaterial(item)}
                  className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer line-clamp-2 mb-2"
                >
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags (Unboxed text with separators) */}
                <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-500 mb-4">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-slate-500 hover:text-indigo-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Author & Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs">
                  <div className="font-medium text-slate-900">{item.author.name}</div>
                  <div className="text-[11px] text-slate-500 truncate max-w-[120px]">
                    {item.author.affiliation}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onToggleLike(item.id)}
                    aria-label="추천하기"
                    className={`p-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1 text-xs ${
                      item.isLiked 
                        ? 'text-rose-600 bg-rose-50' 
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${item.isLiked ? 'fill-rose-500' : ''}`} />
                    <span className="font-mono tabular-nums">{item.likes}</span>
                  </button>

                  <button
                    onClick={() => onSelectMaterial(item)}
                    className="px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                  >
                    상세보기
                  </button>

                  <button
                    onClick={() => onDownload(item)}
                    title="다운로드"
                    className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-xl flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-bold text-indigo-700">{selectedMaterial.fileType}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{selectedMaterial.fileSize}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedMaterial.targetLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>작성일 <span className="font-mono tabular-nums">{selectedMaterial.uploadedAt}</span></span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 leading-snug">
                  {selectedMaterial.title}
                </h2>
              </div>
              <button
                onClick={() => onSelectMaterial(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Author Info */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-900">
                    {selectedMaterial.author.name} 강사
                  </div>
                  <div className="text-xs text-slate-500">
                    {selectedMaterial.author.role} · {selectedMaterial.author.affiliation}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>누적 다운로드 <strong className="text-slate-900 font-mono tabular-nums">{selectedMaterial.downloads}</strong></span>
                  <span>추천수 <strong className="text-slate-900 font-mono tabular-nums">{selectedMaterial.likes}</strong></span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  자료 소개
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedMaterial.description}
                </p>
              </div>

              {/* Learning Goals */}
              {selectedMaterial.learningGoals && selectedMaterial.learningGoals.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    주요 학습 목표
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedMaterial.learningGoals.map((goal, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Curriculum Outline */}
              {selectedMaterial.curriculumOutline && selectedMaterial.curriculumOutline.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    차시별 커리큘럼 구성
                  </h4>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                    {selectedMaterial.curriculumOutline.map((item, idx) => (
                      <div key={idx} className="text-xs text-slate-800 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px] shrink-0 font-mono">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  관련 태그
                </h4>
                <div className="flex flex-wrap gap-2 text-xs text-indigo-700">
                  {selectedMaterial.tags.map((tag) => (
                    <span key={tag} className="bg-indigo-50 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleLike(selectedMaterial.id)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer border ${
                    selectedMaterial.isLiked
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${selectedMaterial.isLiked ? 'fill-rose-500' : ''}`} />
                  <span>{selectedMaterial.isLiked ? '추천 완료' : '추천하기'} ({selectedMaterial.likes})</span>
                </button>

                <button
                  onClick={() => handleShare(selectedMaterial)}
                  className="px-3 py-2 text-xs font-medium bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? '링크 복사됨' : '공유'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectMaterial(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                  닫기
                </button>
                <button
                  onClick={() => onDownload(selectedMaterial)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>교안 패키지 다운로드</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
