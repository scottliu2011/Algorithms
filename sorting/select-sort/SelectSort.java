package algorithms;

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
