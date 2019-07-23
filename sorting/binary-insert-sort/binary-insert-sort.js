// 获取插入位置
function getInsertPosition(array, keyIndex) {
  const key = array[keyIndex];
  
  let low = 0, high = keyIndex - 1;
  let mid;
  
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    
    if (array[mid] > key) {
      // 如果中间位置的值大于当前key值，则高位变为mid-1，在前半部分继续比较
      high = mid - 1;
    } else {
      // 如果中间位置的值小于当前key值，则低位变为mid+1，在后边部分继续比较
      low = mid + 1;
    }
  }
  
  // high+1 即是要插入的位置
  return high + 1;
}

// 折半插入排序
function binaryInsertSort(array) {
  let i, j, key;
  const size = array.length;
  
  let position;
  
  for (i = 1; i < size; i++) {  // 从第二个元素开始向前插入
    j = i;
    key = array[j];             // 保存当前位置的值
    
    // 找到合适的插入位置
    position = getInsertPosition(array, j);
    
    while (j > position) {
      array[j] = array[j - 1];  // 逐个向后挪动
      j--;
    }
    
    array[position] = key;      // 插入到正确的位置
  }
}

const array = [39, 28, 57, 12, 95, 45, 10, 73];

binaryInsertSort(array);

console.log(array);