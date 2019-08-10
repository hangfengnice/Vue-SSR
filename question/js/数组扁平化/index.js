// 方法一  es6
// function flatten(arr){
//   while(arr.some(item => Array.isArray(item))){
//     arr = [].concat(...arr)
//   }
//   return arr
// }

// 方法2 数组循环
// function flatten(arr){
//   let result = [], len = arr.length;

//   for(var i = 0; i< len;  i ++){
//     if(Object.prototype.toString.call(arr[i]) == '[object Array]'){
//       result = result.concat(flatten(arr[i]))
//     }else{
//       result.push(arr[i])
//     }
//   }
//   return result
// }

let arr = [1,1,2,[2,2]]

function flatten(arr) {
  return arr.toString().split(',').map(function(item){
      return +item
  })
}
console.log(arr.toString().split(','),flatten(arr))



