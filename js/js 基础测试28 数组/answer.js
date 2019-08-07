let arr = [0,1,2,3,4,5]

// 1 

// function indexPreOne(index, arr){
//   if(index == 0 || index > arr.length - 1){
//     return arr
//   }
//    arr.splice(index - 1, 2, arr[index],arr[index-1])
//    return arr
// }

// console.log(indexPreOne(5, arr))

// 2

// function indexGoFirst(index, arr){
//   if(index == 0 || index > arr.length - 1){
//         return arr
//     }
//  const res = arr.splice(index, 1)
// //  arr.unshift(res)
//  return res.concat(arr)
// }

// console.log(indexGoFirst(4, arr))

// 3

// function indexGoLast(index, arr){
//   if(index == 0 || index > arr.length - 1){
//         return arr
//     }
//  const res = arr.splice(index, 1)
// //  arr.unshift(res)
//  return arr.concat(res)
// }

// console.log(indexGoLast(4, arr))

// 4 

// function indexRepalce(idx1, idx2, arr){
//   if((idx1 == 0 || idx1 > arr.length - 1) && (idx2 == 0 || idx2 > arr.length - 1)){
//     return arr
//   }
//   if(idx1 < idx2){
//     var small = idx1
//     var large = idx2
//   }else{
//     var small = idx2
//     var large = idx1
//   }

//   let smalldetail = arr[small]
//   let largedetail = arr[large]

//   arr.splice(small, 1, largedetail)
//   arr.splice(large, 1, smalldetail)
//   return arr

// }

function indexRepalce(idx1, idx2, arr){
  
  [arr[idx1],arr[idx2]] = [arr[idx2], arr[idx1]]
  return arr
}

console.log(indexRepalce(0,2,arr))

// 要点: 索引可以为负