#include <stdio.h>

// 交换函数
void swap(int *array, int i, int j) {
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

// 选择排序
void selectSort(int *array, int size) {
    int i, j;
    int targetIndex; // 当前一轮的交换目标索引
    
    for (i = 0; i < size - 1; i++) {
        targetIndex = i; // 初始化为当前索引
        
        for (j = i + 1; j < size; j++) {
            // 发现新目标 更新索引
            if (array[j] < array[targetIndex]) {
                targetIndex = j;
            }
        }
        
        // 本轮结束后 如果发现目标 则交换
        if (i != targetIndex) {
            swap(array, i, targetIndex);
        }
    }
}

int main(int argc, const char * argv[]) {
    int array[] = {39, 28, 57, 12, 95, 45, 10, 73};
    
    int size = sizeof(array) / sizeof(array[0]);
    
    selectSort(array, size);
    
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    
    return 0;
}