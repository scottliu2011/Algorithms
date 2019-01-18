二叉树是一个相对较为复杂的非线性结构，所以在遍历节点时，一个节点只能获取其左右子节点，不能直接获取遍历序列中的后继节点，所以只提供一个指定的节点，我们没办法求出在整棵树范围内此节点之后的序列。线索化二叉树就可以很好地解决这个问题，将遍历过程中的前驱和后继节点串联起来，这样一来我们在遍历二叉树时，就能像线性表一样方便快捷。

今天就来记录一下：中序线索化二叉树和遍历线索二叉树。

![](http://img.blog.csdn.net/20160729121833058)

对上图的二叉树进行中序线索化，思路如下：

1. 由于中序遍历的特点，要想访问 A 节点，首先要访问 B 节点，然后递归的方式遍历其左子树。
2. 由于中序序列的起始节点是 C，所以递归地找到最左子树叶子节点 C。然后判断其左子节点为空，所以左指针为线索指针，指向前驱节点（这时前驱节点为空）；再判断其右子节点为空，先标记其右指针为线索指针。最后，更新前驱节点为 C。
3. 处理完 C 节点，递归栈回到 B 节点，这时其左右子节点都存在，所以左右指针都为节点指针，由于前驱节点 C 的右指针为线索指针，只需将 C 的右指针指向B即可。最后，更新前驱节点为 B。
4. 然后处理B的右子节点 D，其左子节点为空，所以左指针为线索指针，指向前驱节点 B；由于其右子节点为空，先标记右指针为线索指针。最后，更新前驱节点为 D。
5. 递归栈回到 A 节点，此时只需将前驱节点 D 的右指针指向A即可。最后，更新前驱节点为 A。
6. 继续遍历 A 的右子树。

在线索化完成后，我们需要进行树的遍历，下面是中序遍历的思路：

首先找到 C 节点并访问，然后判断 C 节点无右子节点，此时右指针为线索指针，故根据右指针找到线索节点 B，由于 B 存在右子节点 D，找到 D 即可，对于 D 节点，没有右子节点，所以这时根据右线索指针找到 A，最后继续遍历 A 的右子树，如此进行。

下面是 JavaScript 语言描述。

二叉树节点结构及创建二叉树：

```js
// bin-tree-creator.js

// 二叉树节点结构
function BinTreeNode(data) {
  this.data = data;

  this.leftChild = null;
  this.rightChild = null;

  // 左子指针是否为线索指针
  this.leftChildIsThread = false;
  // 右子指针是否为线索指针
  this.rightChildIsThread = false;
}

// 改进版：根据顺序存储序列创建二叉树
function createBinTreeByArray(array) {
  // 节点数组，用于放置新建的节点
  var nodeArray = [];

  // 父节点指针
  var parent = 0;
  // 当前节点指针
  var current = 0;

  while (current < array.length) {
    var node = null;

    if (array[current] != '#') {
      node = new BinTreeNode(array[current]);
      nodeArray.push(node);
    }

    // 当前节点指针至少为1时，即至少是第二层节点，才开始跟父节点关联
    if (current > 0) { 
      if (current % 2 !== 0) {
        // 作为左子节点
        nodeArray[parent].leftChild = node;
      } else {
        // 作为右子节点
        nodeArray[parent].rightChild = node;

        // 父节点指针推进一个位置
        parent++;
      }
    }

    // 每遍历一个节点，当前节点指针推进一个位置
    current++;
  }
  
  // 返回根节点
  return nodeArray[0];
}

exports.createBinTreeByArray = createBinTreeByArray;
```

中序线索化及中序遍历：

```js
// 引入bin-tree-creator.js
var binTreeCreator = require('./bin-tree-creator');

// 线索化二叉树工具类
var BinTreeThreading = {

  // 线索二叉树时前一个遍历的节点
  prevNode: null,

  // 中序线索化二叉树
  threadBinTreeByInOrder: function(node) {
    if (!node) {
      return;
    }

    // 线索化左子树
    this.threadBinTreeByInOrder(node.leftChild);

    // 如果左子节点不存在，则标记左指针为线索指针，并将左指针指向前驱节点
    if (!node.leftChild) {
      node.leftChildIsThread = true;
      node.leftChild = this.prevNode;
    }

    // 如果右子节点不存在，先标记右指针为线索指针
    if (!node.rightChild) {
      node.rightIsThread = true;
    }

    // 如果前驱节点不为空且其右指针为线索指针，则将前驱节点指向当前节点
    if (this.prevNode && this.prevNode.rightIsThread) {
      this.prevNode.rightChild = node;
    }

    // 更新前驱节点为当前节点
    this.prevNode = node;

    // 线索化右子树
    this.threadBinTreeByInOrder(node.rightChild);
  },

  // 获取中序遍历时当前节点的下一个线索节点
  getNextNodeOfInOrder: function(node) {
    // 如果下一个是线索节点，则指向该节点
    if (node.rightIsThread) {
      node = node.rightChild;
    } else {
      // 否则先指向右子节点
      node = node.rightChild;

      // 获取右子树的最底层的一个左子节点
      while (!node.leftChildIsThread) {
        node = node.leftChild;
      }
    }

    return node;
  },

  // 根据中序线索遍历二叉树
  traverseThreadedBinTreeByInOrder: function(node, visitFn) {
    if (!node) return;

    // 找到最左子树的左叶子节点
    while (!node.leftChildIsThread) {
      node = node.leftChild;
    }

    // 开始线性遍历
    while (node) {
      // 访问当前节点
      visitFn(node);

      // 直接获取下一个节点
      node = this.getNextNodeOfInOrder(node);
    }
  }
}

var array = ['A', 'B', 'E', 'C', 'D', '#', 'F'];

// 根据顺序存储序列创建二叉树
var rootNode = binTreeCreator.createBinTreeByArray(array);

// 中序线索化二叉树
BinTreeThreading.threadBinTreeByInOrder(rootNode);

var orderArray = [];

// 中序遍历线索化过的二叉树
BinTreeThreading.traverseThreadedBinTreeByInOrder(rootNode, function(node) {
  orderArray.push(node.data);
});

console.log(orderArray.join(' '));
```

关于前序和后序线索化，以后有时间会再补充。