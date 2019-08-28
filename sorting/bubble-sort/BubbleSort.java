package algorithms;

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
