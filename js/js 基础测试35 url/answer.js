// 1 encodeURI() 函数假设参数是完整的 URIs ，encodeURIComponent() 函数假设参数是 URI 中单独的一部分
// 因为这两种假设差异，encodeURI 不会将 URI 保留字符编码，encodeURIComponent 会忽略保留字符，把这些代码当作普通字符编码


console.log(encodeURI("https://www.bilibili.com/video/av60953633?a=你好"))
console.log(encodeURIComponent("https://www.bilibili.com/video/av60953633?a=你好"))

// https://www.bilibili.com/video/av60953633?a=%E4%BD%A0%E5%A5%BD
// https%3A%2F%2Fwww.bilibili.com%2Fvideo%2Fav60953633%3Fa%3D%E4%BD%A0%E5%A5%BD

// 2 
const object1 = {
  userid: 123,
  username: '王二',
  tel: '13208033621'
}

const query = Object.keys(object1).map(v => `${v}=${encodeURIComponent(object1[v])}`).join('&')

console.log(query)
console.log(Object.entries(object1))
console.log(new URLSearchParams(object1).toString())

// 3
// console.log(location.search)

// 4 
const obj = {}
for (var [key, value] of new URLSearchParams(location.search).entries()){
 obj[key]=value
};

// 5
const obj1 = {}
const myParams = new URLSearchParams(location.search)
for (var p of myParams.keys()){
obj[p]=myParams.getAll(p).length > 1 ? myParams.getAll(p) : myParams.get(p);
};
