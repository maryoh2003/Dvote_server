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
  NoMember: {
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
  NoVote: {
    code: 404,
    message: '설문 없음'
  },
};

export default errors;
