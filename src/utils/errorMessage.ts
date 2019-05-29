import ErrorCode from '../constants/error'

const getErrorMessage = (errorCode: number | undefined) => {
  switch (errorCode) {
    case ErrorCode.DATA_NOT_FOUND:
      return '데이터가 없습니다.'
    case ErrorCode.NOT_INCLUDE_NECESSARY_PARAMS:
      return '필수 파라미터가 없습니다.'
    case ErrorCode.INVALID_AMOUNT_TYPE:
      return '계좌 종류가 없습니다.'
    case ErrorCode.INVALID_EMAIL_FORMAT:
      return '이메일 형식이 맞지 않습니다.'
    case ErrorCode.ALREADY_REGISTERD_EMAIL:
      return '이미 등록된 이메일 입니다.'
    case ErrorCode.NOT_EXIST_USER:
      return '사용자가 존재하지 않습니다.'
    case ErrorCode.INVALID_PASSWORD:
      return '비밀번호가 일치하지 않습니다.'
    case ErrorCode.TOKEN_EXPIRED:
      return '토큰이 만료되었습니다.'
    case ErrorCode.INVALID_TOKEN:
      return '토큰이 유효하지 않습니다.'
    case ErrorCode.TOKEN_NOT_INCLUDE_HEADER:
      return 'header에 토큰이 없습니다.'
    case ErrorCode.DATABASE_CONNECTION_ERROR:
      return '데이터베이스가 연결되지 않았습니다.'
    case ErrorCode.DATABASE_ERROR:
      return '데이터베이스 에러입니다.'
    case ErrorCode.UNKNOWN_ERROR:
    default:
      return '알수없는 에러입니다.'
  }
}

export default getErrorMessage
