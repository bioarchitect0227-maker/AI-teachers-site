import React, { useState } from 'react';
import { Course, Student } from '../types';
import { X, Calendar, CheckCheck, Save } from 'lucide-react';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCourse: Course;
  students: Student[];
  onBatchUpdateAttendance: (updatedStudents: Student[]) => void;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  onClose,
  activeCourse,
  students,
  onBatchUpdateAttendance
}) => {
  const courseStudents = students.filter((s) => s.classId === activeCourse.id);
  const todayDateStr = new Date().toLocaleDateString('ko-KR', {
    month: '2-digit',
    day: '2-digit'
  }).replace(/\. /g, '.').replace(/\./g, '');

  const [attendanceDate, setAttendanceDate] = useState('03.20');
  const [statuses, setStatuses] = useState<Record<string, 'present' | 'late' | 'absent'>>(() => {
    const initial: Record<string, 'present' | 'late' | 'absent'> = {};
    courseStudents.forEach((s) => {
      initial[s.id] = 'present';
    });
    return initial;
  });

  if (!isOpen) return null;

  const handleMarkAll = (status: 'present' | 'late' | 'absent') => {
    const updated: Record<string, 'present' | 'late' | 'absent'> = {};
    courseStudents.forEach((s) => {
      updated[s.id] = status;
    });
    setStatuses(updated);
  };

  const handleSave = () => {
    const updatedList = courseStudents.map((student) => {
      const currentStatus = statuses[student.id] || 'present';
      
      // Update history or push new entry
      const existingHistoryIndex = student.attendanceHistory.findIndex(
        (h) => h.date === attendanceDate
      );

      let newHistory = [...student.attendanceHistory];
      if (existingHistoryIndex >= 0) {
        newHistory[existingHistoryIndex] = {
          date: attendanceDate,
          status: currentStatus
        };
      } else {
        newHistory.push({
          date: attendanceDate,
          status: currentStatus
        });
      }

      // Recalculate attendance rate: present=1, late=0.5, absent=0
      const totalPoints = newHistory.reduce((acc, h) => {
        if (h.status === 'present') return acc + 1;
        if (h.status === 'late') return acc + 0.5;
        return acc;
      }, 0);

      const calculatedRate = Math.round((totalPoints / newHistory.length) * 100);

      return {
        ...student,
        attendanceHistory: newHistory,
        attendanceRate: calculatedRate,
        status: calculatedRate < 70 ? '주의필요' : calculatedRate >= 95 ? '우수' : student.status
      };
    });

    onBatchUpdateAttendance(updatedList);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl max-h-[85vh] rounded-2xl shadow-xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                수강생 출결 일괄 체크
              </h3>
              <div className="text-xs text-slate-500">
                {activeCourse.title}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Date and Quick buttons */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-700">출결 날짜:</span>
            <input
              type="text"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              placeholder="예: 03.20"
              className="px-2.5 py-1 bg-white border border-slate-300 rounded font-mono text-slate-900 text-xs w-20 text-center"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleMarkAll('present')}
              className="px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded cursor-pointer"
            >
              전원 출석
            </button>
            <button
              onClick={() => handleMarkAll('late')}
              className="px-2.5 py-1 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded cursor-pointer"
            >
              전원 지각
            </button>
          </div>
        </div>

        {/* Student list */}
        <div className="p-5 overflow-y-auto space-y-2.5">
          {courseStudents.map((student) => {
            const current = statuses[student.id] || 'present';

            return (
              <div
                key={student.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-300 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 text-sm mr-2">{student.name}</span>
                  <span className="text-slate-500">{student.organization}</span>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    현재 출석률: <span className="font-mono tabular-nums">{student.attendanceRate}%</span>
                  </div>
                </div>

                {/* 3-State Toggle */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() =>
                      setStatuses({ ...statuses, [student.id]: 'present' })
                    }
                    className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                      current === 'present'
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    출석
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setStatuses({ ...statuses, [student.id]: 'late' })
                    }
                    className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                      current === 'late'
                        ? 'bg-amber-500 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    지각
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setStatuses({ ...statuses, [student.id]: 'absent' })
                    }
                    className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                      current === 'absent'
                        ? 'bg-rose-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    결석
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            총 {courseStudents.length}명 수강생
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-md cursor-pointer"
            >
              닫기
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>출결 저장 및 반영</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
