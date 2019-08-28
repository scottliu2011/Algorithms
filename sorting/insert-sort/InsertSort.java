package algorithms;

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
