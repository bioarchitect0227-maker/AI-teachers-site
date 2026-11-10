import React from 'react';
import { Course, Material, Student, LectureDispatch, NavTab } from '../types';
import { 
  Users, 
  FileText, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Download, 
  CheckCircle2, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface DashboardViewProps {
  courses: Course[];
  materials: Material[];
  students: Student[];
  dispatches: LectureDispatch[];
  onNavigate: (tab: NavTab) => void;
  onSelectCourse: (courseId: string) => void;
  onSelectMaterial: (material: Material) => void;
  onOpenUpload: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  courses,
  materials,
  students,
  dispatches,
  onNavigate,
  onSelectCourse,
  onSelectMaterial,
  onOpenUpload
}) => {
  // Aggregate statistics
  const totalStudents = courses.reduce((acc, c) => acc + c.totalStudents, 0);
  const totalDownloads = materials.reduce((acc, m) => acc + m.downloads, 0);
  const activeDispatches = dispatches.filter(d => d.status === '모집중').length;
  
  // Calculate average attendance from all students in database
  const avgAttendance = students.length > 0 
    ? Math.round(students.reduce((acc, s) => acc + s.attendanceRate, 0) / students.length)
    : 92;

  return (
    <div className="space-y-8">
      {/* Hero Banner Section */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 text-white shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center gap-2 text-xs text-indigo-300 font-medium mb-3">
                <span>천안시 인공지능 교육 거점 플랫폼</span>
                <span aria-hidden="true">·</span>
                <span>충남 천안 AI 에듀허브</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3 text-balance">
                천안의 내일을 만드는<br className="hidden sm:inline" /> AI 강사들의 협업 & 교육 공간
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mb-6">
                천안 관내 초·중·고교, 그린스타트업타운, 산학협력단에 출강하는 AI 전문 강사들을 위한 통합 플랫폼입니다. 현장 검증된 실무 교안을 공유하고, 수강생 출결 및 과제를 한곳에서 체계적으로 관리하세요.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('materials')}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>교육자료 둘러보기</span>
              </button>
              <button
                onClick={() => onNavigate('students')}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors border border-white/15 flex items-center gap-1.5 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>수강생 출결·성취도 관리</span>
              </button>
              <button
                onClick={() => onNavigate('ai-assistant')}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-medium rounded-lg transition-colors border border-indigo-500/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>AI 수업 지도안 생성</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
            <img
              src="/src/assets/images/hero_cheonan_ai_edu_1794346161174.jpg"
              alt="천안시 AI 아카데미 및 강사 교육 현장"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-300 bg-slate-900/75 backdrop-blur-sm p-3 rounded-lg border border-white/10">
              <div className="flex items-center gap-1.5 font-semibold text-white mb-0.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>천안 그린스타트업타운 오픈랩 & 관내 교육장 연계</span>
              </div>
              <span>서북구·동남구 28개 교육기관 및 학교 연계 운영 중</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row (Strictly Tabular Numerals) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">운영 중 강좌</span>
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {courses.length}
            </span>
            <span className="text-xs text-slate-500">개 과정 개설</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            천안 서북구 2건 · 동남구 2건
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">관리 수강생</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {totalStudents}
            </span>
            <span className="text-xs text-slate-500">명 수강 중</span>
          </div>
          <div className="mt-2 text-xs text-emerald-600 font-medium">
            평균 출석률 {avgAttendance}% 달성
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">공유된 교육자료</span>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {materials.length}
            </span>
            <span className="text-xs text-slate-500">개 세트</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            누적 다운로드 {totalDownloads.toLocaleString()}회
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">천안 관내 출강모집</span>
            <Sparkles className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-indigo-600 font-mono tabular-nums">
              {activeDispatches}
            </span>
            <span className="text-xs text-slate-500">건 공고 진행</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            초등 늘봄학교 · 스타트업 특강
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Active Cheonan Courses & Quick Student Management */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                현재 운영 중인 천안시 AI 강좌
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                강좌를 선택하여 수강생 명부 및 출결을 즉시 관리할 수 있습니다.
              </p>
            </div>
            <button
              onClick={() => onNavigate('students')}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
            >
              <span>수강생 관리로 이동</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                      <span className="font-medium text-slate-700">{course.region}</span>
                      <span aria-hidden="true">·</span>
                      <span>담당: {course.instructorName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{course.totalStudents}명</span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>
                  </div>

                  <span className={`text-xs px-2.5 py-1 rounded font-medium shrink-0 ${
                    course.status === '진행중' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {course.status}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{course.venue}</span>
                  <span aria-hidden="true">·</span>
                  <span className="shrink-0">{course.scheduleDays}</span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>진도율</span>
                    <span className="font-mono tabular-nums font-semibold">{course.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                      style={{ width: `${course.progressPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    교육기간: <span className="font-mono tabular-nums">{course.period}</span>
                  </span>
                  <button
                    onClick={() => {
                      onSelectCourse(course.id);
                      onNavigate('students');
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors cursor-pointer"
                  >
                    수강생 명부 및 출결
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Latest Shared Materials & Dispatch Highlight */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                인기 교육 자료
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                천안 AI 강사진이 직접 제작하고 공유한 교안입니다.
              </p>
            </div>
            <button
              onClick={onOpenUpload}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer"
            >
              + 자료 공유하기
            </button>
          </div>

          <div className="space-y-3">
            {materials.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectMaterial(item)}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                  <span className="font-semibold text-indigo-700">{item.fileType}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.targetLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>작성자: {item.author.name}</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 line-clamp-2 mb-2 hover:text-indigo-600 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono tabular-nums">{item.fileSize}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono tabular-nums">다운 {item.downloads}</span>
                    <span className="font-mono tabular-nums">추천 {item.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cheonan Dispatch Notice Highlight */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-700">
                천안시 출강 매칭 공고
              </span>
              <button
                onClick={() => onNavigate('network')}
                className="text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
              >
                전체보기 &rarr;
              </button>
            </div>
            {dispatches[0] && (
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-1">
                  {dispatches[0].title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                  {dispatches[0].description}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
                  <span>기관: {dispatches[0].organization}</span>
                  <span className="font-medium text-indigo-600">
                    마감 {dispatches[0].deadline}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
