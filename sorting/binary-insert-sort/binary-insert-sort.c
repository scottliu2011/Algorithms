#include <stdio.h>

void binaryInsertSort(int *array, int size);
int getInsertPosition(int *array, int keyIndex);

int main(int argc, const char * argv[]) {
    int array[] = {39, 28, 57, 12, 95, 45, 10, 73};
    
    int size = sizeof(array) / sizeof(array[0]);
    
    binaryInsertSort(array, size);
    
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    
    return 0;
}

void binaryInsertSort(int *array, int size) {
    int i, j, key;
    
    int position;
    
    for (i = 1; i < size; i++) {
        j = i;
        key = array[j];
        
        position = getInsertPosition(array, j);
        
        while (j > position) {
            array[j] = array[j - 1];
            j--;
        }
        
        array[position] = key;
    }
}

int getInsertPosition(int *array, int keyIndex) {
    int key = array[keyIndex];
    
    int low = 0, high = keyIndex - 1;
    int mid;
    
    while (low <= high) {
        mid = (low + high) / 2;
        
        if (array[mid] > key) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    
    return high + 1;
}