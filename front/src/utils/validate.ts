type UserInformation = {
    email: string,
    password: string,
  }
  
const validateLogin = (values: UserInformation) => {
    const errors = {
      email: '',
      password: '',
    }
  
    if (!/^[^\s@]+@[^\s@]|\.[^\s@]+$/.test(values.email)) {
      errors.email = '이메일이 유효하지 않습니다.'
    }  
  
    if (!(values.password.length >= 8 && values.password.length < 20)) {
      errors.password = '비밀번호는 8 ~ 20자 사이로 입력해주세요.'
    }
  
    return errors;
}

export {validateLogin};