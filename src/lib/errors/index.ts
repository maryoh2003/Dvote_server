import IError from '@src/interface/IError';

const errors: { [key: string]: IError } = {
  WrongRequest: {
    code: 400,
    message: '검증 오류',
  },
  Forbidden: {
    code: 403,
    message: '권한 없음',
  },
  ServerError: {
    code: 500,
    message: '서버 오류',
  },
  NoUser: {
    code: 404,
    message: '회원 없음',
  },
  NoStudent: {
    code: 404,
    message: '학생 없음'
  },
  NoTeacher: {
    code: 404,
    message: '교사 없음'
  },
  NoAdmin: {
    code: 404,
    message: '관리자 없음'
  },
  NoClassroom: {
    code: 404,
    message: '교실 없음',
  },
  NoPlace: {
    code: 404,
    message: '장소 없음',
  },
  NoBus: {
    code: 404,
    message: '버스 없음',
  },
  NoBusTime: {
    code: 404,
    message: '버스시간 없음',
  },
  NoBusSchedule: {
    code: 404,
    message: '버스운행정보 없음',
  },
  NoBusApplicant: {
    code: 404,
    message: '버스신청 없음',
  },
  NoCounsel: {
    code: 404,
    message: '상담 없음',
  },
  NoLostfound: {
    code: 404,
    message: '게시글 없음',
  },
  NoLostfoundComment: {
    code: 404,
    message: '댓글 없음',
  },
  NoLostfoundFile: {
    code: 404,
    message: '파일 없음',
  },
  NoPermission: {
    code: 404,
    message: '존재하지 않는 권한 코드',
  },
  NoUserPermission: {
    code: 404,
    message: '회원 권한 없음',
  },
  NoRoutine: {
    code: 404,
    message: '시간표 없음',
  },
  NoNotice: {
    code: 404,
    message: '공지사항 없음',
  },
  NoScore: {
    code: 404,
    message: '점수 없음',
  },
  NoScoreReason: {
    code: 404,
    message: '사유 없음',
  }
};

export default errors;
