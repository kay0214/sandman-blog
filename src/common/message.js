import ElementUI from 'element-ui'
export function errorMsgBox (title, message) { // 输出错误信息
  ElementUI.MessageBox.alert(message, title, { // 第一个参数是内容，第二个参数是标题
    confirmButtonText: '确定',
    center: true,
    type: 'error',
    closeOnPressEscape: true
  })
}
export function warnMsgBox (title, message) {
  ElementUI.MessageBox.alert(message, title, { // 第一个参数是内容，第二个参数是标题
    confirmButtonText: '确定',
    center: true,
    type: 'warning',
    closeOnPressEscape: true
  })
}
export function infoMsgBox (title, message) {
  ElementUI.MessageBox.alert(message, title, { // 第一个参数是内容，第二个参数是标题
    confirmButtonText: '确定',
    center: true,
    type: 'info',
    closeOnPressEscape: true
  })
}
export function successMsgBox (title, message) {
  ElementUI.MessageBox.alert(message, title, { // 第一个参数是内容，第二个参数是标题
    confirmButtonText: '确定',
    center: true,
    type: 'success',
    closeOnPressEscape: true
  })
}

export function successMsg (message) {
  ElementUI.Message({
    message: message,
    type: 'success',
    center: true
  })
}
export function errorMsg (message) {
  ElementUI.Message({
    message: message,
    type: 'error',
    center: true
  })
}
export function warnMsg (message) {
  ElementUI.Message({
    message: message,
    type: 'warning',
    center: true
  })
}
export function infoMsg (message) {
  ElementUI.Message({
    message: message,
    type: 'info',
    center: true
  })
}
export default {
  successMsgBox,
  infoMsgBox,
  warnMsgBox,
  errorMsgBox,
  successMsg,
  errorMsg,
  warnMsg,
  infoMsg
}
