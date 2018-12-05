上次记录了直接插入排序的算法，这种排序算法需要在每一轮插入操作前，拿待插入元素跟前面排好序的元素逐个进行比较，然后找到合适的位置，这种逐个比较的做法其实是不必要的，因为前面的序列已经是排好序的，我们可以通过折半查找方式快速找到该位置，进而可以节省不少运算成本。

折半查找通过高位和低位来限制数据区间，然后获取中间位和它的元素值，跟待插入元素值比较，如果大于待插入元素，则区间折半为前半部分，相似地，如果小于待插入元素，则区间折半为后半部分，继续获取中间位及其值，跟待插入元素比较。

最终我们可以获取到一个合适的位置，先将这个位置及以后的元素统一向后挪动一位，然后将带插入元素值放入这个位置。

JavaScript 语言描述：

```js
// 获取插入位置
function getInsertPosition(array, keyIndex) {
  var key = array[keyIndex];
  
  var low = 0, high = keyIndex - 1;
  var mid;
  
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
  var i, j, key;
  var size = array.length;
  
  var position;
  
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

var array = [39, 28, 57, 12, 95, 45, 10, 73];

binaryInsertSort(array);

console.log(array);
```

Java 语言描述：

```java
package algorithm;

public class Sorting {

    private static int getInsertPosition(int[] array, int keyIndex) {
        int key = array[keyIndex];

        int low = 0, high = keyIndex - 1;
        int mid;

        while (low <= high) {
            mid = (low + high) / 2;

            if (array[mid] > key) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return high + 1;
    }

    public static void binaryInsertSort(int[] array) {
        int i, j, key;
        int size = array.length;

        int position;

        for (i = 1; i < size; i++) {
            j = i;
            key = array[j];

            position = getInsertPosition(array, j);

            while (j > position) {
                array[j] = array[j - 1];
                j--;
            }

            array[position] = key;
        }
    }

    public static void main(String[] args) {
        int[] array = {39, 28, 57, 12, 95, 45, 10, 73};

        Sorting.binaryInsertSort(array);

        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
}
```

C 语言描述：

```c
#include <stdio.h>

void binaryInsertSort(int *array, int size);
int getInsertPosition(int *array, int keyIndex);

int main(int argc, const char * argv[]) {
    int array[] = {39, 28, 57, 12, 95, 45, 10, 73};
    
    int size = sizeof(array) / sizeof(array[0]);
    
    binaryInsertSort(array, size);
    
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    
    return 0;
}

void binaryInsertSort(int *array, int size) {
    int i, j, key;
    
    int position;
    
    for (i = 1; i < size; i++) {
        j = i;
        key = array[j];
        
        position = getInsertPosition(array, j);
        
        while (j > position) {
            array[j] = array[j - 1];
            j--;
        }
        
        array[position] = key;
    }
}

int getInsertPosition(int *array, int keyIndex) {
    int key = array[keyIndex];
    
    int low = 0, high = keyIndex - 1;
    int mid;
    
    while (low <= high) {
        mid = (low + high) / 2;
        
        if (array[mid] > key) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    
    return high + 1;
}
```