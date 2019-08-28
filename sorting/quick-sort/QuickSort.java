package algorithms;

public class Sorting {

    private static void swap(int[] array, int i, int j) {
        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    private static int partition(int[] array, int low, int high) {
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

    private static void quickSort(int[] array, int low, int high) {
        int range = high - low + 1;

        if (range > 1) {
            int index = partition(array, low, high);

            if (low < index - 1) {
                quickSort(array, low, index - 1);
            }

            if (index < high) {
                quickSort(array, index, high);
            }
        }
    }

    public static void quickSort(int[] array) {
        quickSort(array, 0, array.length - 1);
    }

    public static void main(String[] args) {
        int[] array = {39, 28, 57, 12, 95, 45, 10, 73};

        Sorting.quickSort(array);

        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
}
