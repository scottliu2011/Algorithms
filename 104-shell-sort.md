希尔排序是直接插入排序的增强版。

直接插入排序以单个元素为单位进行比较和插入，与之不同的是，希尔排序设定一个增量，初始增量小于数组长度，然后以增量为单位对数组进行分组划分，进而对每个分组内的序列进行直接插入排序。

在对所有分组进行一次插入排序之后，增量递减，然后进行下一轮的排序过程，以此类推。

最后一轮时，增量已经变为1，等同于一次直接插入排序，不过这时数组元素已趋于有序状态。

下面是实现代码：

JS描述：

```js
// 根据当前增量对分组进行直接插入排序
function groupsInsertSort(array, increment) {
  var i, j, key;
  
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
  var increment = Math.floor(array.length / 2);
  
  // 最小增量为1，是最后一轮
  while (increment > 0) {
  	// 以当前增量进行分组直接插入排序
  	groupsInsertSort(array, increment);
    
    // 增量每次折半
    increment = Math.floor(increment / 2);
  }
}

var array = [39, 28, 57, 12, 95, 45, 10, 73];

shellSort(array);

console.log(array);
```

Java描述：

```java
package algorithm;

public class Sorting {

    private static void groupsInsertSort(int[] array, int increment) {
        int i, j, key;

        for (i = increment; i < array.length; i++) {
            j = i;
            key = array[j];

            while (j >= increment && array[j - increment] > key) {
                array[j] = array[j - increment];
                j -= increment;
            }

            array[j] = key;
        }
    }

    public static void shellSort(int[] array) {
        int increment = array.length / 2;

        while (increment > 0) {
            groupsInsertSort(array, increment);

            increment /= 2;
        }
    }

    public static void main(String[] args) {
        int[] array = {39, 28, 57, 12, 95, 45, 10, 73};

        Sorting.shellSort(array);

        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
}
```

C语言描述：

```c
#include <stdio.h>

void shellSort(int *array, int size);
void groupsInsertSort(int *array, int size, int increment);

int main(int argc, const char * argv[]) {
    
    int array[] = {39, 28, 57, 12, 95, 45, 10, 73};
    
    int size = sizeof(array) / sizeof(array[0]);
    
    shellSort(array, size);
    
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    
    return 0;
}

void shellSort(int *array, int size) {
    int increment = size / 2;
    
    while (increment > 0) {
        groupsInsertSort(array, size, increment);
        
        increment /= 2;
    }
}

void groupsInsertSort(int *array, int size, int increment) {
    
    int i, j, key;
    
    for (i = increment; i < size; i++) {
        j = i;
        key = array[j];
        
        while (j >= increment && array[j - increment] > key) {
            array[j] = array[j - increment];
            j -= increment;
        }
        
        array[j] = key;
    }
}
```