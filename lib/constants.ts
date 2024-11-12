export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/;
export const PASSWORD_ERROR_MESSAGE = "비밀번호는 최소 1개의 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.";