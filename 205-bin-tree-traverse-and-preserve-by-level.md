前面曾经记录过，给出一个按层次顺序排放的存储数据，进而可以构建出一棵二叉树，今天就来简单记录一下，如何按层次顺序遍历二叉树，最后又如何根据二叉树生成按层次顺序存储的数据，对于满二叉树来讲，这十分有必要。

![](http://img.blog.csdn.net/20160722134453307)

对与这棵二叉树来说，它的层次遍历顺序和层次存储顺序分别为：

> A B E C D F
> A B E C D # F

按层次遍历思路：

1. 首先将根节点放入队列。
2. 取出队首元素并访问该节点，然后探索其左子树，如果左子树不为空，则重复步骤1，之后再探索右子树，如果右子树不为空，则同样重复步骤1。
3. 重复步骤2。

按层次存储思路：

上面的按层次遍历不能用来存储，原因是某些位置的空节点直接被跳过了，如果我们想要生成一份用来存储的数据，这些节点必须使用特殊符号占位的，所以需要在原来基础上稍作改动：

1. 对于一个节点来讲，如果不存在左子节点，则将一个占位节点放入队列，同样，如果不存在右子节点，则将一个占位节点放入队列。
2. 在取出队首元素后，如果这个节点是占位节点，则无需探索左右子节点，直接进行下一轮遍历。
3. 遍历完成后，存储数据的末端会有一些冗余的占位节点，移除即可。

还是先来个JS版的吧，JS中的数组是天然的队列，再方便不过了：

```js
//二叉树节点结构
function BinTreeNode(data) {
  this.data = data;
  this.leftChild = null;
  this.rightChild = null;
}

//按层次遍历
function traverseByLevel(node, visitFn) {
  if (!node) return;

  //队列
  var queue = [];

  //根节点入队
  queue.push(node);

  while (queue.length) {
    //队首元素出队
    node = queue.shift();

    //访问节点
    visitFn(node);

    //如果左子节点存在，则将其入队
    if (node.leftChild) queue.push(node.leftChild);

    //如果右子节点存在，则将其入队
    if (node.rightChild) queue.push(node.rightChild);
  }

}

//按层次存储
function preserveByLevel(node) {
  if (!node) return;

  //队列
  var queue = [];

  //根节点入队
  queue.push(node);

  //顺序存储数据
  var storage = [];

  //占位节点
  var holderNode = new BinTreeNode('#');

  while (queue.length) {
    //队首元素出队
    node = queue.shift();

    //存储当前节点数据
    storage.push(node.data);

    //如果队首的节点为占位节点，则不再继续探索其左右节点了
    if (node.data === '#') continue;

    //将左子节点或占位节点入队
    if (node.leftChild) {
      queue.push(node.leftChild);
    } else {
      queue.push(holderNode);
    }

    //将右子节点或占位节点入队
    if (node.rightChild) {
      queue.push(node.rightChild);
    } else {
      queue.push(holderNode);
    }
  }

  //接下来移除末端多余的占位符

  var data = storage[storage.length - 1];

  while (data === '#') {
    //移除末端占位符
    storage.pop();

    data = storage[storage.length - 1];
  }

  console.log(storage);
}
```