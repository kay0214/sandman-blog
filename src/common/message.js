import ElementUI from 'element-ui'
export function message (title, message) { // 输出错误信息
  ElementUI.MessageBox.alert(message, title, { // 第一个参数是内容，第二个参数是标题
    confirmButtonText: '确定',
    center: true,
    type: 'error',
    closeOnPressEscape: true
  })
}
export function warnMsg (title, message) {
  ElementUI.MessageBox.alert(message, title, { // 第一个参数是内容，第二个参数是标题
    confirmButtonText: '确定',
    center: true,
    type: 'warning',
    closeOnPressEscape: true
  })
}
export function infoMsg (title, message) {
  ElementUI.MessageBox.alert(message, title, { // 第一个参数是内容，第二个参数是标题
    confirmButtonText: '确定',
    center: true,
    type: 'info',
    closeOnPressEscape: true
  })
}
export function successMsg (title, message) {
  ElementUI.MessageBox.alert(message, title, { // 第一个参数是内容，第二个参数是标题
    confirmButtonText: '确定',
    center: true,
    type: 'success',
    closeOnPressEscape: true
  })
}
export default {
  successMsg,
  infoMsg,
  warnMsg,
  errorMsg: message
}
