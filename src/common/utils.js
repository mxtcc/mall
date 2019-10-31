/*
* 防抖函数    减少执行频率较高的函数，新生成函数并不会非常频繁调用
* */
export function debounce(func,delay){
  let timer=null
  return function(...args){
    if(timer) clearTimeout(timer)
    timer=setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

/*
* 日期格式化
* */
export function formatDate(oldDate, fmt) {
  let date = new Date()
  // 可以接收String、number、Date类型，前两种当时间戳来处理
  if (typeof oldDate === 'string' || typeof oldDate === 'number') {
    date = new Date(+oldDate)
  } else {
    date = oldDate
  }

  // 匹配格式化的时间是否有年份
  if (/(y+)/.test(fmt)) {
    // RegExp.$1得到匹配有多少个y
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  // 月、日、时分秒 补0
  function padLeftZero(str) {
    return ('00' + str).substr(str.length)
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      // 判断要显示多少位
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}


/*
*知识点的复习
*
* 1.string.substr(start,length) 可在字符串中抽取从 start 下标开始的指定数目的字符。
*       start	必需。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
*       length	可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。
*
*       substr() 的参数指定的是子串的开始位置和长度，因此它可以替代 substring() 和 slice() 来使用。
*        重要事项：ECMAscript 没有对该方法进行标准化，因此反对使用它。
*        重要事项：在 IE 4 中，参数 start 的值无效。在这个 BUG 中，start 规定的是第 0 个字符的位置。在之后的版本中，此 BUG 已被修正。
*
*2.replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
*        stringObject.replace(regexp/substr,replacement)
*         $1,$2...$9,$&,$`,$',$$
*         RegExp.$1
*        https://www.w3school.com.cn/jsref/jsref_replace.asp
* */
