export function correctUsername (username) { // username校验，正确的username返回true，否则返回false
  var usernameRegex = /^[a-zA-Z0-9_]{6,16}$/
  if (!usernameRegex.exec(username)) {
    return false
  }
  return true
}
export function correctPassword (password) { // password校验，正确的password返回true，否则返回false
  var passwordRegex = /^[a-zA-Z0-9_]{6,18}$/
  if (!passwordRegex.exec(password)) {

    return false
  }
  return true
}
export function correctEmail (email) { // email校验，正确的email返回true，否则返回false
  var emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  if (!emailRegex.exec(email)) {
    return false
  }
  return true
}
export function correctMobile (mobile) { // mobile校验，正确的mobile返回true，否则返回false
  var mobileRegex =  /^((13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8})$/
  if (!mobileRegex.exec(mobile)) {
    return false
  }
  return true
}
export function correctCode (code) { // mobile校验，正确的mobile返回true，否则返回false
  var codeRegex = /^\w{6}$/
  if (!codeRegex.exec(code)) {
    return false
  }
  return true
}
export default {
  correctUsername,
  correctPassword,
  correctEmail,
  correctMobile,
  correctCode
}
