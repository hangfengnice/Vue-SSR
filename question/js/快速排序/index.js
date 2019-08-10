// function qStart(arr){
//   if(arr.length == 0){
//     return []
//   }
//   var left = [], right = [], pivot = arr[0], len = arr.length;
//   for(let i =1; i < len; i ++){
//     if(arr[i] < pivot){
//       left.push((arr[i]))
//     }else{
//       right.push((arr[i]))
//     }
//   }
//   return qStart(left).concat(pivot, qStart(right))
// }



let arr = [3,4,5,3,2,2,4,4,2,2,2,2,1,2,1,1,]

console.log(qStart(arr))
