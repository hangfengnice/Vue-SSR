// 第一题
function getLength1(content) {
  return content.length > 140
}
// 第二题
// 将多个空白符合并为一个
function getLength2(content) {
  let str = content.trim().replace(/\s+/g,' ')
  return str.length > 140
}
// 第三题
function getLength3(content) {
  return content.trim().replace(/\s+/g,' ').match(/[\x00-\xff]/g).length
}
// 第四题
// 考虑url地址会常规输入的值界限为一个空白符
function getLength4(content) {
  // 匹配url在文本中间的
  let regx1 = /(http|https):\/\/([\w-]+\.)+[\w-]+([\w-.\?%&=]*)*\s/g
  // 匹配url在文本结尾 由于忽略了空白符所以我单独拿出来
  let regx2 = /(http|https):\/\/([\w-]+\.)+[\w-]+([\w-.\?%&=]*)*$/
  // 这里 11个x 最后一个用来弥补空格
  let str = content.trim()
                  .replace(/[\s]{2,}/,' ')
                  .replace(regx1, 'xxxxxxxxxxx')
                  .replace(regx2, 'xxxxxxxxxx')
  return Math.ceil(str.length / 2) > 140
}

const content = '   123 http://www.baidu.com?a=3&b=4   大家提交回答的时候，注意缩进距离，起始位置从左边缘开始；另外，github自带代码高亮，所以请使用下面示意的格式cccccccccccccccccccccccccccccccccc。    https://www.github.com'
console.log(getLength1(content))
console.log(getLength2(content))
console.log(getLength3(content))
console.log(getLength4(content))