// 快速排序
function quickSort(array) {
  // 交换数组元素
  let swap = function(i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  },
  // 对指定区间进行划分，使较小的元素都在左边，较大元素都在右边，最后返回分隔位索引
  partition = function(low, high) {
    // 主元素值可以任意选取，这里取当前区间的中间位的元素值
    let mid = Math.floor((low + high) / 2);
    let pivot = array[mid];
    
    // 低位索引<=高位索引时比较和交换
    while (low <= high) {
      // 如果左边元素值小于主元素值，则低位索引递增
      while (array[low] < pivot) low++;
      // 如果右边元素值大于主元素值，则高位索引递减
      while (array[high] > pivot) high--;
      
      // 当高位和低位都停下来时，交换
      if (low <= high) {
        swap(low, high);
        
        // 交换之后，高位索引和低位索引分别向中间靠拢一位，进行下一次的比较
        low++;
        high--;
      }
    }
    
    // 此时低位索引要比高位索引大一位
    
    // 最后返回低位索引
    return low;
  },
  // 对指定区间进行排序
  quickRangeSort = function(low, high) {
    // 区间的大小
    let range = high - low + 1;
    
    // 当区间大于1时，做进一步划分，并对子区间进行排序
    if (range > 1) {
      // 获取分隔位索引
      let index = partition(low, high);
      
      // 对左子区间进行排序
      if (low < index - 1) {
        quickRangeSort(low, index - 1);
      }
      
      // 对右子区间进行排序
      if (index < high) {
        quickRangeSort(index, high);
      }
    }
  };
  
  // 第一次调用，对整个数组区间进行排序
  quickRangeSort(0, array.length - 1);
}

let array = [39, 28, 57, 12, 95, 45, 10, 73];

quickSort(array);

console.log(array);
