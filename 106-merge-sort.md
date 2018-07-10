归并排序是建立在归并操作上的一种有效的排序算法，简单来讲，就是对一个指定的数据区间进行划分，划分出概念上的左子区间和右子区间，然后对两个子区间进行合并，合并后当前整个区间的数据是顺序存放的。

在一趟归并操作开始时，我们需要先获取中间位，把当前区间划分为左子区间和右子区间，然后定义两个指针，分别指向左子区间和右子区间的起始位置，然后开始比较左右子区间当前指针对应的数据大小，如果左边较小，则将该值放入临时数据区，同时左指针和临时指针分别递增一位，反之，如果右边较小，则同样放入临时数据区，不过这时右指针和临时指针分别递增一位。只要左指针和右指针都不超过各自区间的上限，这个过程一直持续下去。

上面过程结束后，如果左右任一子区间的指针超过了上限，另外一个还没有，那么就需要把未完子区间剩余的元素逐个放入临时区间。因为不能确定是哪个区间，所以需要对左右子区间都加以判断。

最后，临时数据区满，数据是已排序的，我们只需将这些数据再按照顺序复制到源数据区间即可。一趟归并操作结束。

不过，要对当前区间执行归并操作，前提是左右子区间已分别完成了归并操作。

所以，归并操作是递归的，不断的划分左右子区间，对左右子区间再次进行同样的操作，最后合并左右子区间。

下面是实现代码：

JS描述：

```js
// 归并排序
function mergeSort(array) {
  // 合并左右两个区间
  var merge = function(low, mid, high) {
    var tmpArray = [];  // 创建临时数组，用于存放合并结果
    var i = low;        // 左区间指针
    var j = mid + 1;    // 右区间指针
    var k = 0;          // 临时数组指针

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
      var mid = Math.floor((low + high) / 2);
      
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

var array = [39, 28, 57, 12, 95, 45, 10, 73];

mergeSort(array);

console.log(array);
```

Java描述：

```java
package algorithm;

public class Sorting {

    private static void merge(int[] array, int low, int mid, int high) {
        int[] tempArray = new int[high - low + 1];

        int i = low;
        int j = mid + 1;
        int k = 0;

        while (i <= mid && j <= high) {
            if (array[i] < array[j]) {
                tempArray[k++] = array[i++];
            } else {
                tempArray[k++] = array[j++];
            }
        }

        while (i <= mid) {
            tempArray[k++] = array[i++];
        }
        while (j <= high) {
            tempArray[k++] = array[j++];
        }

        k--;

        while (k >= 0) {
            array[low + k] = tempArray[k];
            k--;
        }
    }

    private static void mergeSort(int[] array, int low, int high) {
        if (low < high) {
            int mid = (low + high) / 2;

            mergeSort(array, low, mid);
            mergeSort(array, mid + 1, high);

            merge(array, low, mid, high);
        }
    }

    public static void mergeSort(int[] array) {
        mergeSort(array, 0, array.length - 1);
    }

    public static void main(String[] args) {
        int[] array = {39, 28, 57, 12, 95, 45, 10, 73};

        Sorting.mergeSort(array);

        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
}
```

C语言描述：

```c
#include <stdio.h>
#include <stdlib.h>

void mergeSort(int *array, int low, int high);
void merge(int *array, int low, int mid, int high);

int main(int argc, const char * argv[]) {
    int array[] = {39, 28, 57, 12, 95, 45, 10, 73};
    
    int size = sizeof(array) / sizeof(array[0]);
    
    mergeSort(array, 0, size - 1);
    
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    
    return 0;
}

void mergeSort(int *array, int low, int high) {
    if (low < high) {
        int mid = (low + high) / 2;
        
        mergeSort(array, low, mid);
        mergeSort(array, mid + 1, high);
        
        merge(array, low, mid, high);
    }
}

void merge(int *array, int low, int mid, int high) {
    // 创建临时数组
    int *tempArray = (int *) malloc(sizeof(int) * (high - low + 1));
    
    int i = low;
    int j = mid + 1;
    int k = 0;
    
    while (i <= mid && j <= high) {
        if (array[i] < array[j]) {
            tempArray[k++] = array[i++];
        } else {
            tempArray[k++] = array[j++];
        }
    }
    
    while (i <= mid) {
        tempArray[k++] = array[i++];
    }
    while (j <= high) {
        tempArray[k++] = array[j++];
    }
    
    k--;
    
    while (k >= 0) {
        array[low + k] = tempArray[k];
        k--;
    }
    
    // 释放临时数组
    free(tempArray);
}
```