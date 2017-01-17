最近把数据结构与算法方面的书又温习了一遍，觉得有必要在这里做个备忘记录，以后就算是生疏了，也可以很方便查阅。

今天就来简明扼要地总结一下选择排序的要点，拿n个元素的数组升序排列举例：

1. 先以数组第一个位置做参照，然后遍历后续元素，遍历过程中会跟第一个的元素进行比较，如果其值小于第一个元素，则交换；
2. 一趟下来，最小值被交换到了第一个位置，然后，数组的第二个位置将作为新的参照，开始新一轮的比较和交换。
3. 排序将会持续n-1轮，也就是说，最后一趟排序，将会是倒数第二个元素和最后一个元素进行比较。

以上过程在每轮比较中，存在多次交换，比较高效的做法是，在每一轮比较中，找到这一轮中最小的那个元素，然后与此轮参照元素进行交换，只执行一次交换即可。

下面是实现代码：

JS描述：

```js
// 交换函数
function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

// 选择排序
function selectSort(array) {
    var i, j;
    var indexOfMin;                 // 用于标识每趟比较中最小值的索引
    var size = array.length;
  
    for (i = 0; i < size - 1; i++) {
        indexOfMin = i;             // 每次初始化最小值的索引为第一个
    
        for (j = i + 1; j < size; j++) {
            if (array[j] < array[indexOfMin]) {
                indexOfMin = j;     // 如果找到更小的值则更新indexOfMin
            }
        }
    
        // 交换
        if (i != indexOfMin) {
            swap(array, i, indexOfMin);
        }
    }
}

var array = [39, 28, 57, 12, 95, 45, 10, 73];

selectSort(array);

console.log(array);     // 输出：[10, 12, 28, 39, 45, 57, 73, 95]
```

Java描述：

```java
package algorithm;

public class Sorting {

    // 交换方法
    private static void swap(int[] array, int i, int j) {
        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    // 选择排序
    public static void selectSort(int[] array) {
        int i, j, indexOfMin;
        int size = array.length;

        for (i = 0; i < size - 1; i++) {
            indexOfMin = i;

            for (j = i + 1; j < size; j++) {
                if (array[j] < array[indexOfMin]) {
                    indexOfMin = j;
                }
            }

            if (i != indexOfMin) {
                swap(array, i, indexOfMin);
            }
        }
    }

    public static void main(String[] args) {
        int[] array = {39, 28, 57, 12, 95, 45, 10, 73};

        Sorting.selectSort(array);

        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
}
```

C语言描述：

```c
#include <stdio.h>

// 交换函数
void swap(int *array, int i, int j);
// 选择排序
void selectSort(int *array, int size);

int main(int argc, const char * argv[]) {
    
    int array[] = {39, 28, 57, 12, 95, 45, 10, 73};
    
    int size = sizeof(array) / sizeof(array[0]);
    
    selectSort(array, size);
    
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    
    return 0;
}

// 交换函数
void swap(int *array, int i, int j) {
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

// 选择排序
void selectSort(int *array, int size) {
    
    int i, j;
    int indexOfMin;
    
    for (i = 0; i < size - 1; i++) {
        
        indexOfMin = i;
        
        for (j = i + 1; j < size; j++) {
            
            if (array[j] < array[indexOfMin]) {
                indexOfMin = j;
            }
        }
        
        if (i != indexOfMin) {
            swap(array, i, indexOfMin);
        }
    }
}
```