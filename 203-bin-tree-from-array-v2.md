上次记录了如何根据二叉树层次顺序存储结构来构建一颗二叉树，其思路是求出每一层的节点个数，然后根据当前节点层的指针遍历每个节点，并与父层节点指针指向的节点建立关联，逐层进行。

不过这种思路显得不够开阔，算法不够精简，代码也有些冗余，所以今天记录一个改进版的构建函数。

![](http://img.blog.csdn.net/20160715152758744)

还是同样一张图，还是同样的存储结构：

	['A', 'B', 'E', 'C', 'D', '#', 'F']

这次我们的思路如下：

在满二叉树中，每一层的节点树必定是上一层的2倍，如果我们记录父节点的指针（从0开始，即根节点）和当前子节点的指针（从1开始，即第二层第一个子节点），当前层每遍历2个节点，父层节点遍历1个，如果当前层遍历完成并开始下一层时，父层的节点必然也遍历完了，并且父节点指针也指向了下一层的第一个节点。

所以逐个遍历存储结构中的数据，当前节点遍历2个，父节点指针增1，即可完成整个构建的过程。

下面是实现代码：

JS版：

```js
//二叉树节点结构
function BinTreeNode(data) {
  this.data = data;
  this.leftChild = null;
  this.rightChild = null;
}

//改进版：根据顺序存储序列创建二叉树
function createBinTreeByArrayV2(array) {

  //节点数组，用于放置新建的节点
  var nodeArray = [];

  //父节点指针
  var parent = 0;
  //当前节点指针
  var current = 0;

  while (current < array.length) {
    var node = null;

    if (array[current] != '#') {
      node = new BinTreeNode(array[current]);
      nodeArray.push(node);
    }

    //当前节点指针至少为1时，即至少是第二层节点，才开始跟父节点关联
    if (current > 0) {
      
      if (current % 2 !== 0) {
        //作为左子节点
        nodeArray[parent].leftChild = node;
      } else {
        //作为右子节点
        nodeArray[parent].rightChild = node;

        //父节点指针推进一个位置
        parent++;
      }

    }

    //每遍历一个节点，当前节点指针推进一个位置
    current++;
  }
  
  //返回根节点
  return nodeArray[0];
}
```

Java版：

```java
//BinTreeNode.java

package algorithm;

//二叉树节点结构
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


//BinTreeCreator.java

package algorithm;

public class BinTreeCreator {

    //改进版：根据顺序存储序列创建二叉树
    public static BinTreeNode createBinTreeByArrayV2(char[] array) {

        BinTreeNode[] nodeArray = new BinTreeNode[array.length];

        int parent = 0;
        int current = 0;

        while (current < array.length) {
            BinTreeNode node = null;

            if (array[current] != '#') {
                node = new BinTreeNode(array[current]);
                nodeArray[current] = node;
            }

            if (current > 0) {
                if (current % 2 != 0) {
                    nodeArray[parent].setLeftChild(node);
                } else {
                    nodeArray[parent].setRightChild(node);

                    parent++;
                }
            }

            current++;
        }

        return nodeArray[0];
    }
}
```

C语言版：

```c
//二叉树节点结构体
typedef struct node {
    char data;
    struct node *lchild, *rchild;
} BinTreeNode;

//改进版：根据顺序存储序列创建二叉树
BinTreeNode * createBinTreeByArrayV2(char *array, int size) {
    
    BinTreeNode **nodeArray = (BinTreeNode **) malloc(sizeof(BinTreeNode *) * size);
    
    int parent = 0;
    int current = 0;
    
    while (current < size) {
        BinTreeNode *node = NULL;
        
        if (array[current] != '#') {
            node = (BinTreeNode *) malloc(sizeof(BinTreeNode));
            node->data = array[current];
            node->lchild = NULL;
            node->rchild = NULL;
            
            nodeArray[current] = node;
        }
        
        if (current > 0) {
            
            if (current % 2 != 0) {
                nodeArray[parent]->lchild = node;
            } else {
                nodeArray[parent]->rchild = node;
                
                parent++;
            }
        }
        
        current++;
    }
    
    BinTreeNode *rootNode = nodeArray[0];
    
    free(nodeArray);
    
    return rootNode;
}
```