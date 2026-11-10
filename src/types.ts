export type NavTab = 'dashboard' | 'materials' | 'students' | 'network' | 'ai-assistant';

export type CategoryType = 
  | 'all'
  | 'generative-ai'
  | 'school-basic'
  | 'python-data'
  | 'physical-robot'
  | 'cheonan-industry';

export type TargetLevel = 'all' | 'elementary' | 'middle-high' | 'university' | 'senior-citizen' | 'corporate';

export interface Material {
  id: string;
  title: string;
  category: CategoryType;
  targetLevel: TargetLevel;
  targetLabel: string;
  fileType: 'PPTX' | 'PDF' | 'IPYNB' | 'ZIP' | 'DOCX';
  fileSize: string;
  author: {
    name: string;
    role: string;
    affiliation: string;
    avatarUrl?: string;
  };
  downloads: number;
  likes: number;
  isLiked?: boolean;
  uploadedAt: string;
  description: string;
  learningGoals: string[];
  curriculumOutline: string[];
  tags: string[];
  previewSnippet?: string;
}

export interface Student {
  id: string;
  classId: string;
  name: string;
  phone: string;
  email: string;
  organization: string; // e.g., '천안불당중학교 2학년', '천안시민', '백석대 컴퓨터공학과'
  attendanceRate: number; // 0-100%
  completedAssignments: number;
  totalAssignments: number;
  quizScore: number; // 0-100
  status: '수강중' | '우수' | '주의필요' | '수료';
  joinedDate: string;
  notes: string;
  attendanceHistory: {
    date: string;
    status: 'present' | 'late' | 'absent';
  }[];
}

export interface Course {
  id: string;
  title: string;
  region: '천안 서북구' | '천안 동남구' | '천안 전역';
  venue: string;
  target: string;
  period: string;
  instructorName: string;
  totalStudents: number;
  status: '모집중' | '진행중' | '수료완료';
  progressPercentage: number;
  scheduleDays: string;
}

export interface LectureDispatch {
  id: string;
  title: string;
  organization: string;
  region: '서북구' | '동남구' | '온라인/병행';
  venue: string;
  dates: string;
  hours: number;
  targetAudience: string;
  hourlyRate: string;
  requiredSkills: string[];
  deadline: string;
  status: '모집중' | '마감임박' | '선발완료';
  applicantCount: number;
  description: string;
}

export interface InstructorProfile {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  location: string;
  totalHours: number;
  rating: number;
  bio: string;
  certifications: string[];
}

export interface GeneratedLessonPlan {
  title: string;
  target: string;
  duration: string;
  topic: string;
  objectives: string[];
  timeline: {
    phase: string;
    durationMinutes: number;
    activity: string;
    toolsUsed: string;
  }[];
  exercises: string[];
  quizQuestions: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  }[];
}
