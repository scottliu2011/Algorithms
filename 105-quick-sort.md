快速排序是对冒泡排序的一种改进。

首先选定数组中任意位置的元素值做分隔值，然后定义两个指针（可以称为低位和高位），从数组起始位置和结束位置同时向中间靠拢，这个过程中获取它们对应的元素值分别和分隔值进行比较，如果低位指针遇到元素比分隔值大，则暂停，同样地，如果高位指针遇到元素比分隔值小，也暂停，然后交换高低位指针对应的值，交换完成后两指针继续向中间靠拢。

一趟下来，比分隔值小的元素都出现在左边，比分隔值大的元素都出现在右边，同时可以获取到分隔位。

然后对分隔位左边和右边的区间进行排序，依此类推，分而治之。

下面是实现代码：

JS描述：

```js
// 快速排序
function quickSort(array) {
  // 交换数组元素
  var swap = function(i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  },
  // 对指定区间进行划分，使较小的元素都在左边，较大元素都在右边，最后返回分隔位索引
  partition = function(low, high) {
    // 主元素值可以任意选取，这里取当前区间的中间位的元素值
    var mid = Math.floor((low + high) / 2);
    var pivot = array[mid];
    
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
    var range = high - low + 1;
    
    // 当区间大于1时，做进一步划分，并对子区间进行排序
    if (range > 1) {
      // 获取分隔位索引
      var index = partition(low, high);
      
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

var array = [39, 28, 57, 12, 95, 45, 10, 73];

quickSort(array);

console.log(array);
```

Java描述：

```java
package algorithm;

public class Sorting {

    private static void swap(int[] array, int i, int j) {
        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    private static int partition(int[] array, int low, int high) {
        int mid = (low + high) / 2;
        int pivot = array[mid];

        while (low <= high) {
            while (array[low] < pivot) low++;
            while (array[high] > pivot) high--;

            if (low <= high) {
                swap(array, low, high);

                low++;
                high--;
            }
        }

        return low;
    }

    private static void quickSort(int[] array, int low, int high) {
        int range = high - low + 1;

        if (range > 1) {
            int index = partition(array, low, high);

            if (low < index - 1) {
                quickSort(array, low, index - 1);
            }

            if (index < high) {
                quickSort(array, index, high);
            }
        }
    }

    public static void quickSort(int[] array) {
        quickSort(array, 0, array.length - 1);
    }

    public static void main(String[] args) {
        int[] array = {39, 28, 57, 12, 95, 45, 10, 73};

        Sorting.quickSort(array);

        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
}
```

C语言描述：

```c
#include <stdio.h>

void quickSort(int *array, int low, int high);
int partition(int *array, int low, int high);
void swap(int *array, int i, int j);

int main(int argc, const char * argv[]) {
    int array[] = {39, 28, 57, 12, 95, 45, 10, 73};
    
    int size = sizeof(array) / sizeof(array[0]);
    
    quickSort(array, 0, size - 1);
    
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    
    return 0;
}

void quickSort(int *array, int low, int high) {
    int index;
    int range = high - low + 1;
    
    if (range > 1) {
        index = partition(array, low, high);
        
        if (low < index - 1) {
            quickSort(array, low, index - 1);
        }
        
        if (index < high) {
            quickSort(array, index, high);
        }
    }
}

int partition(int *array, int low, int high) {
    int mid = (low + high) / 2;
    int pivot = array[mid];
    
    while (low <= high) {
        while (array[low] < pivot) low++;
        while (array[high] > pivot) high--;
        
        if (low <= high) {
            swap(array, low, high);
            
            low++;
            high--;
        }
    }
    
    return low;
}

void swap(int *array, int i, int j) {
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
```
