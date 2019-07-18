#include <stdio.h>

#define bool int
#define TRUE 1
#define FALSE 0

// 交换
void swap(int *array, int i, int j) {
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

// 冒泡排序
void bubbleSort(int *array, int size) {
    int i, j;
    bool swapped; // 本轮是否发生过交换
    
    for (i = 0; i < size; i++) {
        swapped = FALSE;
        
        for (j = 0; j < size - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                swapped = TRUE;
            }
        }
        
        // 如果本轮没有发生交换 则表示已经排好序了 直接结束
        if (!swapped) break;
    }
}

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