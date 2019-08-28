package algorithms;

public class Sorting {

    private static void groupsInsertSort(int[] array, int increment) {
        int i, j, key;

        for (i = increment; i < array.length; i++) {
            j = i;
            key = array[j];

            while (j >= increment && array[j - increment] > key) {
                array[j] = array[j - increment];
                j -= increment;
            }

            array[j] = key;
        }
    }

    public static void shellSort(int[] array) {
        int increment = array.length / 2;

        while (increment > 0) {
            groupsInsertSort(array, increment);

            increment /= 2;
        }
    }

    public static void main(String[] args) {
        int[] array = {39, 28, 57, 12, 95, 45, 10, 73};

        Sorting.shellSort(array);

        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
}
