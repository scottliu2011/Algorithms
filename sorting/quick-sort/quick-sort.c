#include <stdio.h>

void swap(int *array, int i, int j);
int partition(int *array, int low, int high);
void quickSort(int *array, int low, int high);

int main(int argc, const char * argv[]) {
    int array[] = {39, 28, 57, 12, 95, 45, 10, 73};
    
    int size = sizeof(array) / sizeof(array[0]);
    
    quickSort(array, 0, size - 1);
    
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    
    return 0;
}

void quickSort(int *array, int low, int high) {
    int index;
    int range = high - low + 1;
    
    if (range > 1) {
        index = partition(array, low, high);
        
        if (low < index - 1) {
            quickSort(array, low, index - 1);
        }
        
        if (index < high) {
            quickSort(array, index, high);
        }
    }
}

int partition(int *array, int low, int high) {
    int mid = (low + high) / 2;
    int pivot = array[mid];
    
    while (low <= high) {
        while (array[low] < pivot) low++;
        while (array[high] > pivot) high--;
        
        if (low <= high) {
            swap(array, low, high);
            
            low++;
            high--;
        }
    }
    
    return low;
}

void swap(int *array, int i, int j) {
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
