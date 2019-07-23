#include <stdio.h>

// 插入排序
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

int main(int argc, const char * argv[]) {
    int array[] = {39, 28, 57, 12, 95, 45, 10, 73};
    
    int size = sizeof(array) / sizeof(array[0]);
    
    insertSort(array, size);
    
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    
    return 0;
}