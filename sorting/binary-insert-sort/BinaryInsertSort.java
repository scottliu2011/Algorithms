package algorithms;

public class Sorting {

    private static int getInsertPosition(int[] array, int keyIndex) {
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

    public static void binaryInsertSort(int[] array) {
        int i, j, key;
        int size = array.length;

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

    public static void main(String[] args) {
        int[] array = {39, 28, 57, 12, 95, 45, 10, 73};

        Sorting.binaryInsertSort(array);

        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
}
