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
