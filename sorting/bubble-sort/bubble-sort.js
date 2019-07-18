// 交换
function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// 冒泡排序
function bubbleSort(array) {
  const size = array.length;
  
  let swapped;                  // 标记每趟排序中是否交换过元素
  
  // 需要n-1趟排序
  for (let i = 0; i < size; i++) {
    swapped = false;            // 在一趟排序开始时，初始化swapped变量
    
    // 对于升序排列，每趟只需处理前面乱序部分
    for (let j = 0; j < size - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        swapped = true;         // 此趟排序交换过元素
      }
    }
    
    // 如果此趟排序未交换过元素，则数组已经排好序，无需下一趟排序
    if (!swapped) break;
  }
}

var array = [39, 28, 57, 12, 95, 45, 10, 73];

// 进行选择排序
bubbleSort(array);

// 输出结果
console.log(array);