// 直接插入排序
function insertSort(array) {
  let i, j, key;
  const size = array.length;
  
  for (i = 1; i < size; i++) {  // 从第二个元素开始向前插入
    j = i;
    key = array[j];             // 保存当前位置的值
    
    // 从后向前逐个比较
    while (j > 0 && array[j - 1] > key) {
      array[j] = array[j - 1];  // 较大的值逐个向后挪动
      j--;
    }
    
    array[j] = key;             // 插入到正确的位置
  }
}

const array = [39, 28, 57, 12, 95, 45, 10, 73];

insertSort(array);

console.log(array);