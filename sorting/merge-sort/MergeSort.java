package algorithms;

public class Sorting {

    private static void merge(int[] array, int low, int mid, int high) {
        int[] tempArray = new int[high - low + 1];

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
    }

    private static void mergeSort(int[] array, int low, int high) {
        if (low < high) {
            int mid = (low + high) / 2;

            mergeSort(array, low, mid);
            mergeSort(array, mid + 1, high);

            merge(array, low, mid, high);
        }
    }

    public static void mergeSort(int[] array) {
        mergeSort(array, 0, array.length - 1);
    }

    public static void main(String[] args) {
        int[] array = {39, 28, 57, 12, 95, 45, 10, 73};

        Sorting.mergeSort(array);

        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
}
