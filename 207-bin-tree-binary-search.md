二叉查找树（Binary Search Tree）又称或二叉搜索树或二叉排序树，它满足下面的条件：

1. 如果左子树不为空，则左子树上的所有节点值都小于根节点
2. 如果右子树不为空，则右子树上的所有节点值都大于根节点
3. 所有子树都遵循以上规则

所以二叉查找树从整体看来，是按中序序列从小到大排序的一棵二叉树，如下图所示：

![](http://img.blog.csdn.net/20160803124448370)

二叉查找树有常用的几个基本操作，包括：向树中插入一个指定值的节点，查找指定值的节点，查找最小最大值节点，删除指定节点。

下面是上面几种操作相对应的思路。

插入节点：

先从根节点开始，与要插入节点的值进行比较，如果这个值小于根节点，则试图插入到根节点的左子树中，如果这个值大于根节点，则试图插入到根节点的右子树中；在与子树根节点比较时，也遵循这样的规则，直到子树根节点的左子树或右子树为空，将这个新节点放到合适的位置即可。

在创建二叉查找树时，可先创建根节点，然后按照以上规则将剩余的节点逐个插入即可。

查找节点：

从根节点开始，如果要查找的节点值小于根节点，则继续向左子树查找，反之，如果要查找的节点值大于根节点，则继续向右子树查找，由于每次节点查找朝单一方向进行，所以查找操作呈线性结构，一般使用非递归方式更为方便。

查找最小最大值也是按照类似的方式进行，最小节点是最左节点，最大节点是最右节点。

删除节点：

删除操作相对比较复杂，有三种情况需要考虑：

1. 删除叶子节点。只需解除父节点与此节点的关系即可。
2. 删除只有一个子节点的子树根节点。如果只存左子节点，则先解除父节点与根节点的关系，然后再将父节点与左子节点建立关系。如果只存在右子节点，则同样先与父节点解除关系，然后将父节点与右子节点建立关系即可。
3. 删除一个左右子节点均存在的子树根节点。此时采用替换操作，从右子树中查找到最小节点（也就是最左节点），将要删除的这个节点的值替换为个最小节点的值（由中序遍历序列可知，这两个值是相邻的），之后再将这个最小节点从树中删除即可。

下面是实现代码：

JS版：

```js
//二叉树节点结构
function BSTNode(data, parentNode) {
  this.data = data;

  //父节点
  this.parentNode = parentNode;

  this.leftChild = null;
  this.rightChild = null;
}

var BSTUtil = {
  
  //向指定子树中插入一个新节点
  insertNode: function(node, key) {
    if (key < node.data) {
      //新节点须插入到子树根节点左子树中

      if (node.leftChild) {
        this.insertNode(node.leftChild, key);
      } else {
        //创建新节点并建立关联
        node.leftChild = new BSTNode(key, node);
      }

    } else {
      //新节点须插入到子树根节点左子树中

      if (node.rightChild) {
        this.insertNode(node.rightChild, key);
      } else {
        //创建新节点并建立关联
        node.rightChild = new BSTNode(key, node);
      }

    }
  },

  //创建一棵二叉查找树
  createBST: function(array) {
    //先创建根节点，根节点没有父节点
    var rootNode = new BSTNode(array[0], null);

    //从第二个节点开始逐个插入
    for (var i = 1; i < array.length; i++) {
      this.insertNode(rootNode, array[i]);
    }

    return rootNode;
  },

  //中序遍历
  inOrderTraverse: function(node, visitFn) {
    if (node) {
      this.inOrderTraverse(node.leftChild, visitFn);

      visitFn(node);
      
      this.inOrderTraverse(node.rightChild, visitFn);
    }
  },

  //在子树中查找指定节点
  searchNode: function(node, key) {
    //由于查找是一条路线，所以使用非递归方式较为方便
    while (node && node.data !== key) {
      if (key < node.data) {
        node = node.leftChild;
      } else {
        node = node.rightChild;
      }
    }

    return node;
  },

  //查找指定子树中值最小的节点
  findMinNode: function(node) {
    
    while (node && node.leftChild) {
      node = node.leftChild;
    }

    return node;
  },

  //查找指定子树中值最大的节点
  findMaxNode: function(node) {
    
    while (node && node.rightChild) {
      node = node.rightChild;
    }

    return node;
  },

  //移除指定节点
  removeNode: function(targetNode) {
    if (!targetNode) return false;

    //要移除的节点是叶子节点
    if (!targetNode.leftChild && !targetNode.rightChild) {
      var parentNode = targetNode.parentNode;

      //解除关系
      if (targetNode === parentNode.leftChild) {
        parentNode.leftChild = null;
      } else {
        parentNode.rightChild = null;
      }

      return true;
    }

    //要移除的节点没有右子节点，但有左子节点
    if (!targetNode.rightChild) {
      var parentNode = targetNode.parentNode;
      var leftChild = targetNode.leftChild;

      //父节点与左子节点建立关系
      if (targetNode === parentNode.leftChild) {
        parentNode.leftChild = leftChild;
      } else {
        parentNode.rightChild = leftChild;
      }

      //左子节点重置父节点
      leftChild.parentNode = parentNode;

      return true;
    }

    //要移除的节点没有左子节点，但有右子节点
    if (!targetNode.leftChild) {
      var parentNode = targetNode.parentNode;
      var rightChild = targetNode.rightChild;

      //父节点与左子节点建立关系
      if (targetNode === parentNode.leftChild) {
        parentNode.leftChild = rightChild;
      } else {
        parentNode.rightChild = rightChild;
      }

      //右子节点重置父节点
      rightChild.parentNode = parentNode;

      return true;
    }
    
    //找到右子树中最小节点
    var minNode = this.findMinNode(targetNode.rightChild);

    //更新值为右子树最小节点的值
    targetNode.data = minNode.data;

    //删除右子树中最小节点
    return this.removeNode(minNode);
  }
};

var array = [8, 3, 10, 1, 6, 14, 4, 7, 13];

var rootNode = BSTUtil.createBST(array);

var orderArray = [];
var visitFn = function(node) {
  orderArray.push(node.data);
};

BSTUtil.inOrderTraverse(rootNode, visitFn);

console.log(orderArray.join(' '));  //1 3 4 6 7 8 10 13 14

var targetNode = BSTUtil.searchNode(rootNode, 3);

console.log(targetNode.data); //3

var success = BSTUtil.removeNode(targetNode);

if (success) {
  orderArray.length = 0;

  BSTUtil.inOrderTraverse(rootNode, visitFn);

  console.log(orderArray.join(' '));  //1 4 6 7 8 10 13 14
}
```

C语言版：

```c
#include <stdio.h>
#include <stdlib.h>

//二叉树节点结构
typedef struct node {
    int data;
    struct node *parent;
    struct node *lchild, *rchild;
} BSTNode;

void insertNode(BSTNode *node, int key);
void inOrderTraverse(BSTNode *node);
int removeNode(BSTNode *targetNode);
BSTNode * findMinNode(BSTNode *node);
BSTNode * findMaxNode(BSTNode *node);
BSTNode * createBST(int *array, int size);
BSTNode * searchNode(BSTNode *node, int key);

int main(int argc, const char * argv[]) {
    
    int array[] = {8, 3, 10, 1, 6, 14, 4, 7, 13};
    
    BSTNode *rootNode = createBST(array, 9);
    
    inOrderTraverse(rootNode);
    
    BSTNode *targetNode = searchNode(rootNode, 3);
    
    printf("\ndata: %d\n", targetNode->data);
    
    int result = removeNode(targetNode);
    
    if (result != -1) {
        inOrderTraverse(rootNode);
    }
    
    return 0;
}

//在指定子树中查找指定节点
BSTNode * searchNode(BSTNode *node, int key) {
    
    while (node != NULL && node->data != key) {
        if (key < node->data) {
            node = node->lchild;
        } else {
            node = node->rchild;
        }
    }
    
    return node;
}

//查找指定子树中最小节点
BSTNode * findMinNode(BSTNode *node) {
    
    while (node != NULL && node->lchild != NULL) {
        node = node->lchild;
    }
    
    return node;
}

//搜索指定子树中最大节点
BSTNode * findMaxNode(BSTNode *node) {
    
    while (node != NULL && node->rchild != NULL) {
        node = node->rchild;
    }
    
    return node;
}

//以子树根节点为基准插入一个新节点
void insertNode(BSTNode *node, int key) {
    if (key < node->data) {
        //如果节点值小于子树根节点的值，则一定是插入到左子树中
        
        if (node->lchild != NULL) {
            //如果左子树不为空，则试图将新节点插入左子树中
            insertNode(node->lchild, key);
        } else {
            BSTNode *newNode = (BSTNode *) malloc(sizeof(BSTNode));
            newNode->data = key;
            newNode->parent = node;
            newNode->lchild = NULL;
            newNode->rchild = NULL;
            
            //插入新节点，作为当前节点的左子节点
            node->lchild = newNode;
        }
        
    } else {
        //反之，如果节点值大于子树根节点的值，则一定是插入到右子树中
        
        if (node->rchild != NULL) {
            //如果右子树不为空，则试图将新节点插入右子树中
            insertNode(node->rchild, key);
        } else {
            BSTNode *newNode = (BSTNode *) malloc(sizeof(BSTNode));
            newNode->data = key;
            newNode->parent = node;
            newNode->lchild = NULL;
            newNode->rchild = NULL;
            
            //插入新节点，作为当前节点的右子节点
            node->rchild = newNode;
        }
    }
}

//移除指定节点
int removeNode(BSTNode *targetNode) {
    
    if (targetNode == NULL) {
        return -1;
    }
    
    //要移除的节点是叶子节点
    if (targetNode->lchild == NULL && targetNode->rchild == NULL) {
        BSTNode *parent = targetNode->parent;
        
        //解除关系
        if (targetNode == parent->lchild) {
            parent->lchild = NULL;
        } else {
            parent->rchild = NULL;
        }
        
        //释放移除的节点
        free(targetNode);
        
        return 0;
    }
    
    //要移除的节点没有右子节点，但有左子节点
    if (targetNode->rchild == NULL) {
        BSTNode *parent = targetNode->parent;
        //获取左子节点
        BSTNode *lchild = targetNode->lchild;
        
        //父节点与左子节点建立关系
        if (targetNode == parent->lchild) {
            parent->lchild = lchild;
        } else {
            parent->rchild = lchild;
        }
        lchild->parent = parent;
        
        //释放移除的节点
        free(targetNode);
        
        return 0;
    }
    
    //要移除的节点没有左子节点，但有右子节点
    if (targetNode->lchild == NULL) {
        BSTNode *parent = targetNode->parent;
        //获取右子节点
        BSTNode *rchild = targetNode->rchild;
        
        //父节点与右子节点建立关系
        if (targetNode == parent->lchild) {
            parent->lchild = rchild;
        } else {
            parent->rchild = rchild;
        }
        rchild->parent = parent;
        
        free(targetNode);
        
        return 0;
    }
    
    //找到右子树中最小节点
    BSTNode *minNode = findMinNode(targetNode->rchild);
    
    //替换值
    targetNode->data = minNode->data;
    
    //删除子树中最小节点
    return removeNode(minNode);
}

//创建二叉搜索树
BSTNode * createBST(int *array, int size) {
    //创建树的根节点
    BSTNode *rootNode = (BSTNode *) malloc(sizeof(BSTNode));
    rootNode->data = array[0];
    rootNode->parent = NULL;
    rootNode->lchild = NULL;
    rootNode->rchild = NULL;
    
    //从第二个节点开始逐个插入
    for (int i = 1; i < size; i++) {
        insertNode(rootNode, array[i]);
    }
    
    return rootNode;
}

//中序遍历
void inOrderTraverse(BSTNode *node) {
    if (node != NULL) {
        inOrderTraverse(node->lchild);

        printf("%d ", node->data);

        inOrderTraverse(node->rchild);
    }
}
```