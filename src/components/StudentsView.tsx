import React, { useState, useMemo } from 'react';
import { Course, Student } from '../types';
import { 
  Users, 
  Search, 
  Plus, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  Edit3, 
  Trash2, 
  FileSpreadsheet,
  Check,
  X
} from 'lucide-react';

interface StudentsViewProps {
  courses: Course[];
  students: Student[];
  selectedCourseId: string;
  onSelectCourseId: (id: string) => void;
  onOpenAddStudent: () => void;
  onOpenAttendanceModal: () => void;
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  courses,
  students,
  selectedCourseId,
  onSelectCourseId,
  onOpenAddStudent,
  onOpenAttendanceModal,
  onUpdateStudent,
  onDeleteStudent
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | '수강중' | '우수' | '주의필요' | '수료'>('all');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const activeCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  // Students of current course
  const courseStudents = useMemo(() => {
    return students.filter((s) => s.classId === activeCourse.id);
  }, [students, activeCourse]);

  // Filtered by search and status
  const filteredStudents = useMemo(() => {
    return courseStudents.filter((s) => {
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.phone.includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.organization.toLowerCase().includes(q);

      return matchStatus && matchQuery;
    });
  }, [courseStudents, statusFilter, searchQuery]);

  // Calculations for KPI strip
  const totalInCourse = courseStudents.length;
  const avgAttendance = totalInCourse > 0
    ? Math.round(courseStudents.reduce((acc, s) => acc + s.attendanceRate, 0) / totalInCourse)
    : 0;
  const avgQuizScore = totalInCourse > 0
    ? Math.round(courseStudents.reduce((acc, s) => acc + s.quizScore, 0) / totalInCourse)
    : 0;
  const excellentCount = courseStudents.filter((s) => s.status === '우수').length;
  const attentionCount = courseStudents.filter((s) => s.status === '주의필요').length;

  // Real CSV Export with Korean BOM (\uFEFF)
  const handleExportCSV = () => {
    if (courseStudents.length === 0) {
      alert('내보낼 수강생 데이터가 없습니다.');
      return;
    }

    const headers = ['이름', '소속/학교', '연락처', '이메일', '출석률(%)', '과제제출', '퀴즈점수', '상태', '강사메모'];
    const rows = courseStudents.map((s) => [
      s.name,
      `"${s.organization.replace(/"/g, '""')}"`,
      s.phone,
      s.email,
      s.attendanceRate,
      `${s.completedAssignments}/${s.totalAssignments}`,
      s.quizScore,
      s.status,
      `"${s.notes.replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `천안_AI강좌_수강생명부_${activeCourse.title.slice(0, 15)}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveStudentMemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      onUpdateStudent(editingStudent);
      setEditingStudent(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Course Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            수강생 및 출결 관리
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            천안시 교육기관 및 학교에 개설된 강좌별 수강생 출결, 과제 수행률, 피드백을 기록합니다.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenAttendanceModal}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>오늘 출결 체크</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>엑셀/CSV 다운로드</span>
          </button>

          <button
            onClick={onOpenAddStudent}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>수강생 등록</span>
          </button>
        </div>
      </div>

      {/* Course Selection Tabs */}
      <div className="bg-slate-100 p-1.5 rounded-xl flex items-center gap-1 overflow-x-auto">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => onSelectCourseId(course.id)}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              selectedCourseId === course.id
                ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            {course.title}
          </button>
        ))}
      </div>

      {/* Active Course Info Strip */}
      <div className="bg-white p-5 rounded-xl border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-indigo-700">{activeCourse.region}</span>
              <span aria-hidden="true">·</span>
              <span>강의장: {activeCourse.venue}</span>
              <span aria-hidden="true">·</span>
              <span>시간: {activeCourse.scheduleDays}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {activeCourse.title}
            </h2>
            <div className="text-xs text-slate-500 mt-1">
              대상: {activeCourse.target} · 담당: {activeCourse.instructorName}
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="text-right">
              <div className="text-xs text-slate-500">전체 등록 인원</div>
              <div className="text-xl font-bold text-slate-900 font-mono tabular-nums">
                {totalInCourse}명
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">평균 출석률</div>
              <div className="text-xl font-bold text-emerald-600 font-mono tabular-nums">
                {avgAttendance}%
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">평균 퀴즈점수</div>
              <div className="text-xl font-bold text-indigo-600 font-mono tabular-nums">
                {avgQuizScore}점
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="수강생 이름, 전화번호, 소속 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900"
            />
          </div>

          {/* Status filter buttons */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-500 mr-1 font-medium">상태:</span>
            {(['all', '수강중', '우수', '주의필요', '수료'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st === 'all' ? '전체' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold">
                <th className="py-3 px-4">수강생명</th>
                <th className="py-3 px-4">소속 / 학교</th>
                <th className="py-3 px-4">연락처</th>
                <th className="py-3 px-4 text-center">출석률</th>
                <th className="py-3 px-4 text-center">과제 수행</th>
                <th className="py-3 px-4 text-center">퀴즈 성취도</th>
                <th className="py-3 px-4 text-center">상태</th>
                <th className="py-3 px-4">강사 피드백 및 메모</th>
                <th className="py-3 px-4 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    등록된 수강생이 없거나 검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Name */}
                    <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      {student.name}
                    </td>

                    {/* Organization */}
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap max-w-[180px] truncate">
                      {student.organization}
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-4 text-slate-600 font-mono tabular-nums whitespace-nowrap">
                      <div>{student.phone}</div>
                      <div className="text-[11px] text-slate-400 font-sans">{student.email}</div>
                    </td>

                    {/* Attendance */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="font-mono tabular-nums font-semibold text-slate-900">
                        {student.attendanceRate}%
                      </div>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full mx-auto mt-1 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            student.attendanceRate >= 90
                              ? 'bg-emerald-500'
                              : student.attendanceRate >= 75
                              ? 'bg-indigo-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${student.attendanceRate}%` }}
                        />
                      </div>
                    </td>

                    {/* Assignments */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap font-mono tabular-nums">
                      <span className="font-semibold text-slate-900">{student.completedAssignments}</span>
                      <span className="text-slate-400">/{student.totalAssignments}</span>
                    </td>

                    {/* Quiz */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap font-mono tabular-nums">
                      <span className={`font-semibold ${
                        student.quizScore >= 90 ? 'text-indigo-600' : 'text-slate-800'
                      }`}>
                        {student.quizScore}점
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        student.status === '우수'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : student.status === '수강중'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : student.status === '주의필요'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {student.status}
                      </span>
                    </td>

                    {/* Notes */}
                    <td className="py-3.5 px-4 text-slate-600 max-w-[220px]">
                      <div className="truncate" title={student.notes}>
                        {student.notes || <span className="text-slate-400">메모 없음</span>}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditingStudent(student)}
                          title="피드백 및 메모 작성"
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`${student.name} 수강생을 삭제하시겠습니까?`)) {
                              onDeleteStudent(student.id);
                            }
                          }}
                          title="삭제"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Student Memo Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingStudent.name} 수강생 관리 및 피드백
                </h3>
                <div className="text-xs text-slate-500">
                  {editingStudent.organization} · {editingStudent.phone}
                </div>
              </div>
              <button
                onClick={() => setEditingStudent(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudentMemo} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  수강 상태
                </label>
                <select
                  value={editingStudent.status}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      status: e.target.value as any
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                >
                  <option value="수강중">수강중</option>
                  <option value="우수">우수</option>
                  <option value="주의필요">주의필요</option>
                  <option value="수료">수료</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    출석률 (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingStudent.attendanceRate}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        attendanceRate: Number(e.target.value)
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    퀴즈 성취도 점수
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingStudent.quizScore}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        quizScore: Number(e.target.value)
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  과제 제출 완료 수 (총 {editingStudent.totalAssignments}건 중)
                </label>
                <input
                  type="number"
                  min="0"
                  max={editingStudent.totalAssignments}
                  value={editingStudent.completedAssignments}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      completedAssignments: Number(e.target.value)
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  강사 피드백 및 수업 메모
                </label>
                <textarea
                  rows={4}
                  value={editingStudent.notes}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      notes: e.target.value
                    })
                  }
                  placeholder="수업 태도, 과제 완성도, 지도 조언 사항을 기록하세요..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-md"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-xs cursor-pointer"
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
