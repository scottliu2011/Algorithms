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