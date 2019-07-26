// 根据当前增量对分组进行直接插入排序
function groupsInsertSort(array, increment) {
  let i, j, key;
  
  // 从分组基本单位'增量'开始向后扫描，会出现若干个分组
  for (i = increment; i < array.length; i++) {
    j = i;
    key = array[j];
    
    // 与直接插入排序中的逐个比较不同，这里以'增量'为单位
    while (j >= increment && array[j - increment] > key) {
      array[j] = array[j - increment];
      j -= increment;
    }
    
    array[j] = key;
  }
}

// 希尔排序
function shellSort(array) {
  // 增量初始值设定为数组长度的一半
  let increment = Math.floor(array.length / 2);
  
  // 最小增量为1，是最后一轮
  while (increment > 0) {
    // 以当前增量进行分组直接插入排序
    groupsInsertSort(array, increment);
    
    // 增量每次折半
    increment = Math.floor(increment / 2);
  }
}

let array = [39, 28, 57, 12, 95, 45, 10, 73];

shellSort(array);

console.log(array);