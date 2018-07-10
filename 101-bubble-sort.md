冒泡排序是一种相邻元素之间比较和交换的排序算法，n个元素的数组从小到大排序时，每一轮比较都会使较大的元素冒泡到数组的末尾，然后这个过程会执行n-1趟。

由于第一趟比较之后，最大的元素冒泡到了数组末尾，下一次再比较时，待排序区间就减去一个元素的位置，依次类推，每次新的待排序区间等于原数组区间减去已排序次数。

由于每一趟排序都需要比较相邻元素的大小，如果数组待排序区域剩余的元素已经是排好序了，那么再进行下一轮比较就很多余，我们可以增加一个标志位标识一趟比较中是否发生了交换操作，如果交换没有发生，证明已排序完毕，直接结束程序。

下面是代码实现：

JS描述：

```js
// 交换
function swap(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// 冒泡排序
function bubbleSort(array) {
  var i, j;
  var size = array.length;
  
  var swapped;                  // 标记每趟排序中是否交换过元素
  
  // 需要n-1趟排序
  for (i = 0; i < size; i++) {
    swapped = false;            // 在一趟排序开始时，初始化swapped变量
    
    // 对于升序排列，每趟只需处理前面乱序部分
    for (j = 0; j < size - 1 - i; j++) {
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
```

Java描述：

```java
package algorithm;

public class Sorting {
    // 交换
    private static void swap(int[] array, int i, int j) {
        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    // 冒泡排序
    public static void bubbleSort(int[] array) {
        int i, j;
        int size = array.length;

        boolean swapped;

        for (i = 0; i < array.length; i++) {

            swapped = false;

            for (j = 0; j < array.length - 1 - i; j++) {
                if (array[j] > array[j + 1]) {
                    swap(array, j, j + 1);
                    swapped = true;
                }
            }

            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] array = {39, 28, 57, 12, 95, 45, 10, 73};
        
        // 进行冒泡排序
        Sorting.bubbleSort(array);
        
        // 输出结果
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
}
```

C语言描述：

```c
#include <stdio.h>

#define Bool int
#define TRUE 1
#define FALSE 0

// 交换
void swap(int *array, int i, int j);
// 冒泡排序
void bubbleSort(int *array, int size);

int main(int argc, const char * argv[]) {
    
    int array[] = {39, 28, 57, 12, 95, 45, 10, 73};
    
    int size = sizeof(array) / sizeof(array[0]);
    
    // 进行冒泡排序
    bubbleSort(array, size);
    
    // 输出结果
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    
    return 0;
}

// 冒泡排序
void bubbleSort(int *array, int size) {
    int i, j;
    Bool swapped;
    
    for (i = 0; i < size; i++) {
        swapped = FALSE;
        
        for (j = 0; j < size - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                swapped = TRUE;
            }
        }
        
        if (!swapped) break;
    }
}

// 交换
void swap(int *array, int i, int j) {
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
```