快速排序是对冒泡排序的一种改进。

首先选定数组中任意位置的元素值做分隔值，然后定义两个指针（可以称为低位和高位），从数组起始位置和结束位置同时向中间靠拢，这个过程中获取它们对应的元素值分别和分隔值进行比较，如果低位指针遇到元素比分隔值大，则暂停，同样地，如果高位指针遇到元素比分隔值小，也暂停，然后交换高低位指针对应的值，交换完成后两指针继续向中间靠拢。

一趟下来，比分隔值小的元素都出现在左边，比分隔值大的元素都出现在右边，同时可以获取到分隔位。

然后对分隔位左边和右边的区间进行排序，依此类推，分而治之。
