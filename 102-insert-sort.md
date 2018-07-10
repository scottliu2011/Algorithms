插入排序把待排序序列看成是一手扑克牌，刚开始是没有顺序的，我们想要排成一个顺子出来，就从后面逐个抽出较大的牌，在前面找到合适的位置，然后插入进去，若干次之后，这手扑克牌就会按照从小到大的顺序排列好，排出一个顺子。

而直接插入排序是和前面有序序列的元素逐个进行比较，直至找到合适的位置，然后插入。

我们还是对n个元素数组从小到大来排序，下面是直接插入排序的实现代码：

JS描述：

```js
// 直接插入排序
function insertSort(array) {
  var i, j, key;
  var size = array.length;
  
  for (i = 1; i < size; i++) {  // 从第二个元素开始向前插入
    j = i;
    key = array[j];             // 保存当前位置的值
    
    // 从后向前逐个比较
    while (j > 0 && array[j - 1] > key) {
      array[j] = array[j - 1];  // 较大的值逐个向后挪动
      j--;
    }
    
    array[j] = key;             // 插入到正确的位置
  }
}

var array = [39, 28, 57, 12, 95, 45, 10, 73];

insertSort(array);

console.log(array);
```

Java描述：

```java
package algorithm;

public class Sorting {

    public static void insertSort(int[] array) {
        int i, j, key;
        int size = array.length;

        for (i = 1; i < size; i++) {
            j = i;
            key = array[j];

            while (j > 0 && array[j - 1] > key) {
                array[j] = array[j - 1];
                j--;
            }

            array[j] = key;
        }
    }

    public static void main(String[] args) {
        int[] array = {39, 28, 57, 12, 95, 45, 10, 73};

        Sorting.insertSort(array);

        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
}
```

C语言描述：

```c
#include <stdio.h>

void insertSort(int *array, int size);

int main(int argc, const char * argv[]) {
    
    int array[] = {39, 28, 57, 12, 95, 45, 10, 73};
    
    int size = sizeof(array) / sizeof(array[0]);
    
    insertSort(array, size);
    
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    
    return 0;
}

void insertSort(int *array, int size) {
    
    int i, j, key;
    
    for (i = 1; i < size; i++) {
        j = i;
        key = array[j];
        
        while (j > 0 && array[j - 1] > key) {
            array[j] = array[j - 1];
            j--;
        }
        
        array[j] = key;
    }
}
```