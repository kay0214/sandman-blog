export function formatResSize (resSize) {
  let sizeMap = {
    0: 'B',
    1: 'KB',
    2: 'MB',
    3: 'GB'
  }
  let sizeUnit = ''
  let mapKey = 0
  var size = resSize
  while (size > 1) { // size>1，进入循环，得到下一个数量级,例如1025MB = 1GB
    mapKey++
    size = size / 1024
  }
  // size<1，则跳出循环。此时数量级为 0.999GB，稍后进行处理
  sizeUnit = sizeMap[ mapKey - 1 ] // 获取到静态代码块中put进去的值。
  size *= 1024 // 进入上一个数量级，得到一个合适的数量级，999MB 而非0.999GB
  size = size.toFixed(2) // js的四舍五入，保留两位小数
  return size + sizeUnit
}
export default {
  formatResSize
}
