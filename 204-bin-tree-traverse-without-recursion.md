前几次在创建二叉树时也顺带写了几个二叉树遍历的方法，包括前序、中序和后序遍历，都是递归的方法，今天就记录几个对应的非递归方式。

![](http://img.blog.csdn.net/20160720132333909)

还是这个二叉树，我们需要使用栈结构对其进行非递归方式的前序、中序和后序遍历。

前序思路：

1. 在遍历一棵子树时，首先访问其根节点，然后将其入栈，接着继续探索其左子树，如果左子树不为空，则访问左子树根节点，同样将其入栈，如此进行下去，直到二叉树根节点左边部分的子树根节点全部访问完毕并且入栈（在上图中依次是A, B, C）。

2. 然后将栈顶元素陆续出栈，探索其右子树，如果存在右子树，则按上面步骤继续访问并入栈子树根节点，如果右子树为空，则继续将父节点出栈，探索父节点的右子树，如此进行下去。

3. 进行到整棵树的根节点 A 出栈后，探索根节点 A 的右子树，仍然重复步骤1，对其子树进行入栈操作，然后重复步骤 2。

4. 直到当前探索的节点为空并且栈也为空，程序终止，遍历完成。

中序思路：

中序遍历和前序遍历相似，唯一不同的是，访问节点的操作不是在入栈阶段，而是被放在了出栈阶段，由于左子节点必然先于父节点出栈，所以遍历结果就变成了先访问左子节点，再访问父节点。

后序思路：

后序遍历需要先访问左右子节点，访问完了再访问这个父节点，相比较前序和中序，稍稍有些复杂：

1. 对于一棵子树来说，需要先将根节点入栈。
2. 探索这个根节点的左子节点，如果存在，将左子节点入栈，然后继续探索这个子节点的左子结点。
3. 如果当前左子节点存在，则重复步骤 1 和 2，如果这个左子节点是叶子节点，则开始出栈，并访问该节点，然后再获取栈顶的父节点（不出栈），探索其右子节点。
4. 如果父节点存在右子节点，则重复前面几个步骤，如果右子节点是叶子节点，则将其出栈并访问该节点。
5. 最后再次出栈当前栈顶父节点，并访问该父节点。
6. 对于树中的每一棵子树重复上述过程。


下面使用 JavaScript 语言来描述：

```js
// 二叉树节点结构
function BinTreeNode(data) {
  this.data = data;
  this.leftChild = null;
  this.rightChild = null;
}

// 非递归前序遍历
function preOrderTraverseNonRecursion(node, visitFn) {
  // 模拟栈
  let stack = [];
  let top = -1;

  while (node || top >= 0) {
    while (node) {
      // 访问当前根节点
      visitFn(node);

      //将当前根节点入栈
      stack[++top] = node;
      
      //下一轮遍历左子树
      node = node.leftChild;
    }

    if (top >= 0) {
      // 将栈顶元素出栈
      node = stack[top--];

      // 下一轮遍历右子树
      node = node.rightChild;
    }

  }
}

// 非递归中序遍历
function inOrderTraverseNonRecursion(node, visitFn) {
  let stack = [];
  let top = -1;

  while (node || top >= 0) {
    while (node) {
      // 将当前节点入栈
      stack[++top] = node;
      
      // 下一轮遍历左子树
      node = node.leftChild;
    }

    if (top >= 0) {
      // 将栈顶元素出栈
      node = stack[top--];
      
      // 访问当前节点，不同的是，这里在出栈阶段访问，左子节点必然在父节点之前出栈
      visitFn(node);

      // 下一轮遍历当前节点的右子树
      node = node.rightChild;
    }

  }
}

// 后序遍历
function postOrderTraverseNonRecursion(node, visitFn) {
  if (!node) {
    return;
  }

  let stack = [];
  let top = -1;

  // 上一次遍历的节点
  let prev = null;
  // 当前遍历的节点
  let curr = null;

  let prevIsParent = function () {
    return !prev || prev.leftChild === curr || prev.rightChild === curr;
  };
  let prevIsLeftChild = function () {
    return prev === curr.leftChild;
  };
  let prevIsRightChild = function () {
    return prev === curr.rightChild;
  };

  // 将根节点入栈
  stack[++top] = node;

  while (top >= 0) {
    // 取出栈顶元素作为当前节点
    curr = stack[top];

    if (prevIsParent()) {               // 从根节点向下探索
      if (curr.leftChild) {             // 将当前节点的左子节点入栈
        stack[++top] = curr.leftChild;
      } else if (curr.rightChild) {     // 将当前节点的右子节点入栈
        stack[++top] = curr.rightChild;
      } else {                          // 如果没有左右子节点，则访问
        visitFn(curr);
        top--;   // 栈顶指针减1，模拟出栈
      }
    } else if (prevIsLeftChild()) {     // 从左子树回到根节点
      if (curr.rightChild) {            // 如果当前根节点存在右子节点，则入栈
        stack[++top] = curr.rightChild;
      } else {                          // 如果不存在右子节点，则访问该根节点
        visitFn(curr);
        top--;   // 栈顶指针减1，模拟出栈
      }
    } else if (prevIsRightChild()) {    // 从右子树回到根节点
      visitFn(curr);
      top--;    // 栈顶指针减1，模拟出栈
    }

    // 更新
    prev = curr;
  }
}

// 非递归前序遍历<改进版>
function preOrderTraverseNonRecursionV2(node, visitFn) {
  let stack = [];
  let top = -1;

  stack[++top] = node;

  while (top >= 0) {
    // 取出栈顶元素
    node = stack[top--];

    // 访问当前节点
    visitFn(node);

    // 将右子树根节点入栈
    if (node.rightChild) {
      stack[++top] = node.rightChild;
    }

    // 将左子树根节点入栈
    if (node.leftChild) {
      stack[++top] = node.leftChild;
    }
  }
}
```
