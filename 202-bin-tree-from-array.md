在存储满二叉树或近似满二叉树时，按节点层次顺序存储是个不错的主意，我们从根节点开始，逐层由左到右扫描各个节点，依次将节点数据存放到指定的数组中，如果偶尔遇到空的子节点，就用特殊符号来表示。


![image.png | left | 330x268](https://cdn.nlark.com/yuque/0/2018/png/106385/1545952038347-0e88430e-f7f3-4b15-92c8-ee316fd03193.png "")


这个树结构已接近满二叉树了，如果使用按层次顺序存储，将会更简单，更节省空间。按照上面的方法，这棵树所对应的存储结构应该是：

```
['A', 'B', 'E', 'C', 'D', '#', 'F']
```

其中空的子节点，我们使用 # 号来占位。

根据这个存储结构，我们就可以构建出一棵二叉树，还原它本来的面目。

思路如下：

1. 我们知道，根节点起始位置 array[0]，节点个数为 1，第二层起始位置 array[1]，节点个数为 2；依次类推，每一层起始位置的索引都是前面节点的总个数，我们需要记录父层起始位置和当前层的起始位置。
2. 根据满二叉树的结构，可以得出当前层节点的个数：pow(2, level -1)，即 2 的 level - 1 次方，其中 level 即为当前层数，从 1 开始。
3. 遍历当前层的节点，规则是：每遍历两个节点（左右子节点），父层遍历一个，在遍历过程中，创建相应的节点对象，并与父节点进行关联。
4. 遍历完成后，当前层将成为下一轮的父层，重新计算下一层的起始位置和节点个数。然后开始下一轮。

上面提到，这种存储顺序适用于满二叉树或接近满二叉树的情况，所以这里我们只考虑极少数的空叶子节点，对于最后一层空的叶子节点，如果它们是连续排在最后面的，则也可以省略，以节省存储空间。

JavaScript 语言描述：

```js
// 二叉树节点结构
function BinTreeNode(data) {
  this.data = data;
  this.leftChild = null;
  this.rightChild = null;
}

// 根据顺序存储序列创建二叉树
function createBinTreeByArray(array) {
  // 初始化树的层次，每层存储pow(2, currLevel - 1)个节点数据
  let currLevel = 1;

  // 初始化当前节点层和父层起始位置
  let currLevelBegin = 0;
  let parentLevelBegin = 0;

  // 节点数组，用于放置新建的节点
  let nodeArray = [];

  // 循环遍历每一层
  while (currLevelBegin < array.length) {
    // 每一层的节点数量
    let levelNumber = Math.pow(2, currLevel - 1);

    // 记录父层的step，初始值0
    let parentStep = 0;

    // 遍历当前节点层每个节点数据
    for (let step = 0; step < levelNumber; step++) {
      // 计算在数组中的索引
      let index = currLevelBegin + step;

      if (index >= array.length) break;

      let node = null;

      // 创建节点对象，并放进节点数组中
      if (array[index] !== '#') {
        node = new BinTreeNode(array[index]);
        nodeArray.push(node);
      }

      // 如果不是根节点层，则需要与父节点做关联
      if (currLevelBegin > 0) {
        // 获取父节点
        let parentNode = nodeArray[parentLevelBegin + parentStep];

        // step是从0开始的，如果是偶数则成为左子节点，奇数则成为右子节点
        if (step % 2 === 0) {
          parentNode.leftChild = node;
        } else {
          parentNode.rightChild = node;
          // 父层的step递增一位，指向下一个
          parentStep++;
        }
      }
    }

    // 更新父层和当前层的起始位置
    parentLevelBegin = currLevelBegin;
    
    currLevelBegin += levelNumber;

    // 层数加1
    currLevel++;
  }
  
  // 返回根节点
  return nodeArray[0];
}

// 前序遍历
function preOrderTraverse(node, orderArray) {
  if (node) {
    orderArray.push(node.data);
    preOrderTraverse(node.leftChild, orderArray);
    preOrderTraverse(node.rightChild, orderArray);
  }
}

// 中序遍历
function inOrderTraverse(node, orderArray) {
  if (node) {
    inOrderTraverse(node.leftChild, orderArray);
    orderArray.push(node.data);
    inOrderTraverse(node.rightChild, orderArray);
  }
}

// 后序遍历
function postOrderTraverse(node, orderArray) {
  if (node) {
    postOrderTraverse(node.leftChild, orderArray);
    postOrderTraverse(node.rightChild, orderArray);
    orderArray.push(node.data);
  }
}

let array = ['A', 'B', 'E', 'C', 'D', '#', 'F'];

// 根据顺序存储序列创建二叉树
let binTree = createBinTreeByArray(array);

// 用于存放节点遍历序列
let orderArray = [];

// 前序遍历
preOrderTraverse(binTree, orderArray);
console.log('pre order: ', orderArray.join(' '));

// 清空遍历序列数组
orderArray.length = 0;

// 后序遍历
inOrderTraverse(binTree, orderArray);
console.log('in order: ', orderArray.join(' '));

orderArray.length = 0;

// 后序遍历
postOrderTraverse(binTree, orderArray);
console.log('post order: ', orderArray.join(' '));
```

Java 语言描述：

```java
// BinTreeNode.java

package algorithm;

// 二叉树节点结构
public class BinTreeNode {
    private char data;
    private BinTreeNode leftChild;
    private BinTreeNode rightChild;

    public BinTreeNode(char data) {
        this.data = data;
    }

    public char getData() {
        return data;
    }

    public void setData(char data) {
        this.data = data;
    }

    public BinTreeNode getLeftChild() {
        return leftChild;
    }

    public void setLeftChild(BinTreeNode leftChild) {
        this.leftChild = leftChild;
    }

    public BinTreeNode getRightChild() {
        return rightChild;
    }

    public void setRightChild(BinTreeNode rightChild) {
        this.rightChild = rightChild;
    }
}

// BinTreeCreator.java

package algorithm;

public class BinTreeCreator {

    // 根据顺序存储序列创建二叉树
    public static BinTreeNode createBinTreeByArray(char[] array) {
        int currLevel = 1;

        int currLevelBegin = 0, parentLevelBegin = 0;

        BinTreeNode[] nodeArray = new BinTreeNode[array.length];

        while (currLevelBegin < array.length) {
            int levelNumber = (int) Math.pow(2, currLevel - 1);

            int parentStep = 0;

            for (int step = 0; step < levelNumber; step++) {
                int index = currLevelBegin + step;

                if (index >= array.length) break;

                BinTreeNode node = null;

                if (array[index] != '#') {
                    node = new BinTreeNode(array[index]);
                    nodeArray[index] = node;
                }

                if (currLevelBegin > 0) {
                    BinTreeNode parentNode = nodeArray[parentLevelBegin + parentStep];

                    if (step % 2 == 0) {
                        parentNode.setLeftChild(node);
                    } else {
                        parentNode.setRightChild(node);
                        parentStep++;
                    }
                }
            }

            parentLevelBegin = currLevelBegin;

            currLevelBegin += levelNumber;

            currLevel++;
        }

        return nodeArray[0];
    }

    // 前序遍历
    public static void preOrderTraverse(BinTreeNode node) {
        if (node != null) {
            System.out.print(node.getData());
            preOrderTraverse(node.getLeftChild());
            preOrderTraverse(node.getRightChild());
        }
    }
    
    // 中序遍历
    public static void inOrderTraverse(BinTreeNode node) {
        if (node != null) {
            inOrderTraverse(node.getLeftChild());
            System.out.print(node.getData());
            inOrderTraverse(node.getRightChild());
        }
    }

    // 后序遍历
    public static void postOrderTraverse(BinTreeNode node) {
        if (node != null) {
            postOrderTraverse(node.getLeftChild());
            postOrderTraverse(node.getRightChild());
            System.out.print(node.getData());
        }
    }

    public static void main(String[] args) {
        char[] array = {'A', 'B', 'E', 'C', 'D', '#', 'F'};

        BinTreeNode rootNode = BinTreeCreator.createBinTreeByArray(array);

        System.out.print("pre order: ");
        BinTreeCreator.preOrderTraverse(rootNode);

        System.out.print(System.lineSeparator() + "in order: ");
        BinTreeCreator0.inOrderTraverse(rootNode);

        System.out.print(System.lineSeparator() + "post order: ");
        BinTreeCreator.postOrderTraverse(rootNode);
    }
}
```

C 语言描述：

```c
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

typedef struct node {
    char data;
    struct node *lchild, *rchild;
} BinTreeNode;

BinTreeNode * createBinTreeByArray(char *array, int size);

void preOrderTraverse(BinTreeNode *node);
void inOrderTraverse(BinTreeNode *node);
void postOrderTraverse(BinTreeNode *node);

int main(int argc, const char * argv[]) {
    char array[] = {'A', 'B', 'E', 'C', 'D', '#', 'F'};
    
    BinTreeNode *rootNode = createBinTreeByArray(array, sizeof(array));
    
    printf("pre order: ");
    preOrderTraverse(rootNode);
    printf("\nin order: ");
    inOrderTraverse(rootNode);
    printf("\npost order: ");
    postOrderTraverse(rootNode);
    
    return 0;
}

// 根据顺序存储序列创建二叉树
BinTreeNode * createBinTreeByArray(char *array, int size) {
    int currLevel = 1;
    
    int currLevelBegin = 0;
    int parentLevelBegin = 0;
    
    BinTreeNode **nodeArray = (BinTreeNode **) malloc(sizeof(BinTreeNode *) * size);
    
    while (currLevelBegin < size) {
        int levelNumber = pow(2, currLevel - 1);
        
        int parentStep = 0;
        
        for (int step = 0; step < levelNumber; step++) {
            int index = currLevelBegin + step;
            
            if (index >= size) break;
            
            BinTreeNode *node = NULL;
            
            if (array[index] != '#') {
                node = (BinTreeNode *) malloc(sizeof(BinTreeNode));
                
                node->data = array[index];
                node->lchild = NULL;
                node->rchild = NULL;
                
                nodeArray[index] = node;
            }
            
            if (currLevelBegin > 0) {
                BinTreeNode *parentNode = nodeArray[parentLevelBegin + parentStep];
                
                if (step % 2 == 0) {
                    parentNode->lchild = node;
                } else {
                    parentNode->rchild = node;
                    parentStep++;
                }
            }
        }
        
        parentLevelBegin = currLevelBegin;
        
        currLevelBegin += levelNumber;
        
        currLevel++;
    }

    BinTreeNode *rootNode = nodeArray[0];
        
    free(nodeArray);
    
    return rootNode;
}

// 前序遍历
void preOrderTraverse(BinTreeNode *node) {
    if (node != NULL) {
        printf("%c", node->data);
        preOrderTraverse(node->lchild);
        preOrderTraverse(node->rchild);
    }
}

// 中序遍历
void inOrderTraverse(BinTreeNode *node) {
    if (node != NULL) {
        inOrderTraverse(node->lchild);
        printf("%c", node->data);
        inOrderTraverse(node->rchild);
    }
}

// 后序遍历
void postOrderTraverse(BinTreeNode *node) {
    if (node != NULL) {
        postOrderTraverse(node->lchild);
        postOrderTraverse(node->rchild);
        printf("%c", node->data);
    }
}
```
