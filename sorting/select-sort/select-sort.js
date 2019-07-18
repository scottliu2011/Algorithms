// 交换函数
function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// 选择排序
function selectSort(array) {
  let indexOfMin;           // 用于标识每趟比较中最小值的索引
  const size = array.length;
  
  for (let i = 0; i < size - 1; i++) {
    indexOfMin = i;         // 每次初始化最小值的索引为第一个
    
    for (let j = i + 1; j < size; j++) {
      if (array[j] < array[indexOfMin]) {
        indexOfMin = j;     // 如果找到更小的值则更新indexOfMin
      }
    }
    
    // 交换
    if (i !== indexOfMin) {
      swap(array, i, indexOfMin);
    }
  }
}

let array = [39, 28, 57, 12, 95, 45, 10, 73];

selectSort(array);

console.log(array);