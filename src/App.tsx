/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavTab, Course, Material, Student, LectureDispatch, InstructorProfile } from './types';
import { 
  INITIAL_COURSES, 
  INITIAL_MATERIALS, 
  INITIAL_STUDENTS, 
  INITIAL_DISPATCHES, 
  INITIAL_INSTRUCTORS 
} from './data/mockData';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { MaterialsView } from './components/MaterialsView';
import { StudentsView } from './components/StudentsView';
import { NetworkView } from './components/NetworkView';
import { AIAssistantView } from './components/AIAssistantView';
import { UploadMaterialModal } from './components/UploadMaterialModal';
import { AddStudentModal } from './components/AddStudentModal';
import { AttendanceModal } from './components/AttendanceModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  
  // Persistent state initialized from LocalStorage or mock data
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('cheonan_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [materials, setMaterials] = useState<Material[]>(() => {
    const saved = localStorage.getItem('cheonan_materials');
    return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('cheonan_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [dispatches, setDispatches] = useState<LectureDispatch[]>(() => {
    const saved = localStorage.getItem('cheonan_dispatches');
    return saved ? JSON.parse(saved) : INITIAL_DISPATCHES;
  });

  const [instructors] = useState<InstructorProfile[]>(INITIAL_INSTRUCTORS);

  // Active selections
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || 'course-1');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);

  // Sync to local storage on changes
  useEffect(() => {
    localStorage.setItem('cheonan_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('cheonan_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('cheonan_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('cheonan_dispatches', JSON.stringify(dispatches));
  }, [dispatches]);

  // Material actions
  const handleToggleLike = (materialId: string) => {
    setMaterials((prev) =>
      prev.map((m) => {
        if (m.id === materialId) {
          const isLiked = !m.isLiked;
          return {
            ...m,
            isLiked,
            likes: isLiked ? m.likes + 1 : Math.max(0, m.likes - 1)
          };
        }
        return m;
      })
    );

    if (selectedMaterial && selectedMaterial.id === materialId) {
      setSelectedMaterial((prev) =>
        prev
          ? {
              ...prev,
              isLiked: !prev.isLiked,
              likes: !prev.isLiked ? prev.likes + 1 : Math.max(0, prev.likes - 1)
            }
          : null
      );
    }
  };

  const handleDownloadMaterial = (material: Material) => {
    // Increment download counter
    setMaterials((prev) =>
      prev.map((m) => (m.id === material.id ? { ...m, downloads: m.downloads + 1 } : m))
    );

    // Generate readable syllabus / course guide file
    const content = `
===================================================================
천안시 AI 강사 에듀허브 - 공인 교육자료 패키지
자료명: ${material.title}
분야: ${material.category} | 대상: ${material.targetLabel} | 포맷: ${material.fileType}
작성자: ${material.author.name} (${material.author.role}, ${material.author.affiliation})
배포일자: ${material.uploadedAt}
===================================================================

[1. 자료 소개 및 활용 개요]
${material.description}

[2. 주요 학습 목표]
${material.learningGoals.map((g, i) => `${i + 1}. ${g}`).join('\n')}

[3. 차시별 커리큘럼 구성]
${material.curriculumOutline.map((c, i) => `${i + 1}. ${c}`).join('\n')}

[4. 강사용 현장 지도 팁 및 유의사항]
- 천안 관내 교육시설(컴퓨터실 및 개인 노트북 환경)에서 실습 전 브라우저 및 구글 계정 사전 점검 권장
- 수강생 눈높이에 맞춘 1:1 핸즈온 코칭 시간(최소 30분 이상) 필수 배정
- 생성형 AI 사용 시 개인정보(주민번호, 휴대전화 등) 입력 금지 보안 수칙 사전 교육

[5. 관련 검색 태그]
${material.tags.map((t) => `#${t}`).join(' ')}

-------------------------------------------------------------------
본 자료는 천안시 AI 강사들의 협업 및 공공 교육 혁신을 위해 제공됩니다.
천안 AI 에듀허브 (Cheonan AI EduHub)
    `.trim();

    const ext = material.fileType.toLowerCase() === 'ipynb' ? 'ipynb' : 'txt';
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `[천안AI교육]_${material.title.slice(0, 20)}.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAddMaterial = (newMaterial: Material) => {
    setMaterials((prev) => [newMaterial, ...prev]);
  };

  // Student actions
  const handleAddStudent = (newStudent: Student) => {
    setStudents((prev) => [newStudent, ...prev]);
    // update course total
    setCourses((prev) =>
      prev.map((c) =>
        c.id === newStudent.classId ? { ...c, totalStudents: c.totalStudents + 1 } : c
      )
    );
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  };

  const handleDeleteStudent = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    if (student) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === student.classId
            ? { ...c, totalStudents: Math.max(0, c.totalStudents - 1) }
            : c
        )
      );
    }
  };

  const handleBatchUpdateAttendance = (updatedList: Student[]) => {
    setStudents((prev) =>
      prev.map((s) => {
        const found = updatedList.find((u) => u.id === s.id);
        return found || s;
      })
    );
  };

  // Dispatch actions
  const handleApplyDispatch = (dispatchId: string) => {
    setDispatches((prev) =>
      prev.map((d) =>
        d.id === dispatchId ? { ...d, applicantCount: d.applicantCount + 1 } : d
      )
    );
  };

  const handleAddDispatch = (newDispatch: LectureDispatch) => {
    setDispatches((prev) => [newDispatch, ...prev]);
  };

  const activeCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Top Bar Navigation (Strict 3-zone contract) */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuickUpload={() => setIsUploadModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            courses={courses}
            materials={materials}
            students={students}
            dispatches={dispatches}
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectCourse={(courseId) => {
              setSelectedCourseId(courseId);
              setActiveTab('students');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectMaterial={(material) => setSelectedMaterial(material)}
            onOpenUpload={() => setIsUploadModalOpen(true)}
          />
        )}

        {activeTab === 'materials' && (
          <MaterialsView
            materials={materials}
            selectedMaterial={selectedMaterial}
            onSelectMaterial={(m) => setSelectedMaterial(m)}
            onToggleLike={handleToggleLike}
            onDownload={handleDownloadMaterial}
            onOpenUpload={() => setIsUploadModalOpen(true)}
          />
        )}

        {activeTab === 'students' && (
          <StudentsView
            courses={courses}
            students={students}
            selectedCourseId={selectedCourseId}
            onSelectCourseId={(id) => setSelectedCourseId(id)}
            onOpenAddStudent={() => setIsAddStudentModalOpen(true)}
            onOpenAttendanceModal={() => setIsAttendanceModalOpen(true)}
            onUpdateStudent={handleUpdateStudent}
            onDeleteStudent={handleDeleteStudent}
          />
        )}

        {activeTab === 'network' && (
          <NetworkView
            dispatches={dispatches}
            instructors={instructors}
            onApplyDispatch={handleApplyDispatch}
            onAddDispatch={handleAddDispatch}
          />
        )}

        {activeTab === 'ai-assistant' && (
          <AIAssistantView
            onSaveToMaterials={(newMat) => {
              handleAddMaterial(newMat);
            }}
          />
        )}
      </main>

      {/* Upload Material Modal */}
      <UploadMaterialModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleAddMaterial}
      />

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={isAddStudentModalOpen}
        onClose={() => setIsAddStudentModalOpen(false)}
        courses={courses}
        activeCourseId={selectedCourseId}
        onAddStudent={handleAddStudent}
      />

      {/* Batch Attendance Modal */}
      <AttendanceModal
        isOpen={isAttendanceModalOpen}
        onClose={() => setIsAttendanceModalOpen(false)}
        activeCourse={activeCourse}
        students={students}
        onBatchUpdateAttendance={handleBatchUpdateAttendance}
      />

      {/* Regional Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="font-bold text-slate-900 text-sm mb-1">
                천안 AI 강사 에듀허브 (Cheonan AI EduHub)
              </div>
              <p className="text-slate-500 max-w-xl leading-relaxed">
                천안시 인공지능 교육 발전과 강사진의 전문성 향상을 위한 통합 플랫폼입니다. 관내 초·중·고교 늘봄학교, 천안 그린스타트업타운, 충남정보문화산업진흥원 및 관내 대학 산학협력단과 함께합니다.
              </p>
            </div>
            <div className="text-left md:text-right space-y-1">
              <div>거점 오피스: 충청남도 천안시 서북구 와촌동 천안역 서부 그린스타트업타운 3층</div>
              <div>협의회 문의: <span className="font-mono tabular-nums">041-550-0000</span> · support@cheonan-ai-eduhub.kr</div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400">
            <div>
              © 2026 천안시 AI 강사 협의회 (Cheonan AI Instructors Network). All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-600 cursor-pointer">이용약관</span>
              <span className="hover:text-slate-600 cursor-pointer">개인정보처리방침</span>
              <span className="hover:text-slate-600 cursor-pointer">강사 윤리강령</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
