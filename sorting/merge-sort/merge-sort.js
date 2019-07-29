// 归并排序
function mergeSort(array) {
  // 合并左右两个区间
  let merge = function(low, mid, high) {
    let tmpArray = [];  // 创建临时数组，用于存放合并结果
    let i = low;        // 左区间指针
    let j = mid + 1;    // 右区间指针
    let k = 0;          // 临时数组指针

    // 逐个将左半区间和右半区间按顺序放入临时数组
    while (i <= mid && j <= high) {
      // 将较小的元素存入临时数组，对应区间的指针和临时数组指针各推进一位
      if (array[i] < array[j]) {
        tmpArray[k++] = array[i++];
      } else {
        tmpArray[k++] = array[j++];
      }
    }

    // 将左半区间剩余元素放入临时数组
    while (i <= mid) {
      tmpArray[k++] = array[i++];
    }
    // 将右半区间剩余元素放入临时数组
    while (j <= high) {
      tmpArray[k++] = array[j++];
    }

    k--;  // 退后一位，指向临时数组最后一个元素

    // 复制临时数组元素到源数组
    while (k >= 0) {
      array[low + k] = tmpArray[k];
      k--;
    }
  },
  // 对指定区间进行合并
  mergeRange = function(low, high) {
    if (low < high) {
      // 获取中间位
      let mid = Math.floor((low + high) / 2);
      
      // 对左半区间进行合并
      mergeRange(low, mid);
      // 对右半区间进行合并
      mergeRange(mid + 1, high);
    
      // 左右子区间合并完成后，进行当前区间的合并
      merge(low, mid, high);
    }
  };
  
  // 对数组整个区间合并
  mergeRange(0, array.length - 1);
}

let array = [39, 28, 57, 12, 95, 45, 10, 73];

mergeSort(array);

console.log(array);
