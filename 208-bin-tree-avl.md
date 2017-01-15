前面记录了二叉查找树，它在搜索方面的效率显而易见，可它也存在某种缺陷，假设我们连续插入较小或较大的数据，那么二叉查找树将会逐渐退变为一个线性结构，从而搜索就变为了线性查找，效率将会大打折扣。所以，我们需要一棵这样的树，它在插入新节点后，能够重新调整自己的结构，使左右恢复平衡。AVL树就符合这个条件。

AVL树是最先发明的自平衡二叉查找树，其得名于它的发明者 G.M. Adelson-Velsky 和 E.M. Landis，他们在 1962 年的论文 "An algorithm for the organization of information" 中发表了它。

在AVL树中任何节点的两个子树的高度最大差别为一，所以它也被称为高度平衡树，其查找、插入和删除在平均和最坏情况下都是O(logN)。

首先是创建AVL树：

我们可以从一个排序后的数组来初始化AVL树，这个过程不难，只需找到数组区间的中间元素，这个将作为树的根节点，同时这个节点将数组划分两个子区间，然后分别再取左右子区间中间元素，创建左右子树的根节点，同时继续划分子区间，如此进行下去。过程如下图所示：

![](http://img.blog.csdn.net/20160810133337047)

然后是插入和移除节点，基本操作跟二叉查找树相似，不同的是这两个操作都需要重新平衡子树结构。

要使一棵树重新恢复平衡，我们需要对子树节点进行旋转操作，而旋转操作需要应对4种不同的情况，它们分别是：

LL: 即左左情况，此时需要对节点进行右旋转操作
RR: 即右右情况，此时需要对节点进行左旋转操作

以上这两种情况的旋转操作如下图所示：

![](http://img.blog.csdn.net/20160810162725249)

还有两种相对复杂的情况：

LR: 即左右情况，此时需要先进行一次RR型旋转，再进行一次LL型旋转
RL: 即右做情况，此时需要先进行一次LL行旋转，再进行一次RR型旋转

下面两张图分别拆解了这两种情况的步骤：

![](http://img.blog.csdn.net/20160810163007891)

![](http://img.blog.csdn.net/20160810163222262)

下面分别是JS和C语言的实现代码：

JS描述：

```js
//AVL树节点结构
function AVLTreeNode(data) {
  this.data = data;
  this.leftChild = null;
  this.rightChild = null;
  this.height = 0;
}

var AVLTreeUtil = {
  //由排序数组创建AVL树
  createAVLTree: function(array, low, high) {
    if (high < low) return null;

    var mid = Math.floor((low + high) / 2);

    var newNode = new AVLTreeNode(array[mid]);

    newNode.leftChild = this.createAVLTree(array, low, mid - 1);
    newNode.rightChild = this.createAVLTree(array, mid + 1, high);

    this.updateHeight(newNode);

    return newNode;
  },
  //前序遍历子树
  preOrderTraverse: function(node, visitFn) {
    if (node) {
      visitFn(node);

      this.preOrderTraverse(node.leftChild, visitFn);
      this.preOrderTraverse(node.rightChild, visitFn);
    }
  },
  //中序遍历子树
  inOrderTraverse: function(node, visitFn) {
    if (node) {
      this.inOrderTraverse(node.leftChild, visitFn);

      visitFn(node);

      this.inOrderTraverse(node.rightChild, visitFn);
    }
  },
  //插入节点并保持树平衡
  insertNodeWithBalance: function(node, key) {
    if (!node) {
      return new AVLTreeNode(key);
    }

    if (key < node.data) {
      node.leftChild = this.insertNodeWithBalance(node.leftChild, key);

      //平衡当前节点和左子树
      node = this.balanceLeft(node, key);
    } else {
      node.rightChild = this.insertNodeWithBalance(node.rightChild, key);

      //平衡当前节点和右子树
      node = this.balanceRight(node, key);
    }

    this.updateHeight(node);

    return node;
  },
  //移除子树中指定值的节点
  removeNodeWithBalance: function(node, key) {
    if (!node) return null;

    if (key < node.data) {
      node.leftChild = this.removeNodeWithBalance(node.leftChild, key);

      //平衡当前节点和左子树
      node = this.balanceLeft(node, key);

      this.updateHeight(node);

      return node;
    }

    if (key > node.data) {
      node.rightChild = this.removeNodeWithBalance(node.rightChild, key);

      //平衡当前节点和右子树
      node = this.balanceRight(node, key);

      this.updateHeight(node);

      return node;
    }

    //叶子节点
    if (!node.leftChild && !node.rightChild) {
      return null;
    }

    //仅左子树不存在，但存在右子树
    if (!node.leftChild) {
      return node.rightChild;
    }

    //仅右子树不存在，但存在右子树
    if (!node.rightChild) {
      return node.leftChild;
    }

    //下面处理左右子树均不为空的情况

    //查找右子树中最小节点
    var minNode = this.findMinNode(node.rightChild);

    //替换
    node.data = minNode.data;

    //在右子树中移除最小节点
    node.rightChild = this.removeNodeWithBalance(node.rightChild, minNode.data);

    //平衡当前节点和右子树
    node = this.balanceRight(node, key);

    this.updateHeight(node);

    return node;
  },
  //查找指定子树中最小节点
  findMinNode: function(node) {
    while (node && node.leftChild) {
      node = node.leftChild;
    }

    return node;
  },
  //获取节点树高
  getHeight: function(node) {
    if (!node) return -1;

    return node.height;
  },
  //更新节点树高
  updateHeight: function(node) {
    node.height = Math.max(this.getHeight(node.leftChild), this.getHeight(node.rightChild)) + 1;
  },
  //LL型右旋操作
  rightRotateLL: function(node) {
    var pivot = node.leftChild;

    node.leftChild = pivot.rightChild;

    pivot.rightChild = node;

    this.updateHeight(node);
    this.updateHeight(pivot);

    return pivot;
  },
  //RR型左旋操作
  leftRotateRR: function(node) {
    var pivot = node.rightChild;

    node.rightChild = pivot.leftChild;

    pivot.leftChild = node;

    this.updateHeight(node);
    this.updateHeight(pivot);

    return pivot;
  },
  //LR型双旋操作
  doubleRotateLR: function(node) {
    node.leftChild = this.leftRotateRR(node.leftChild);

    return this.rightRotateLL(node);
  },
  //RL型双旋操作
  doubleRotateRL: function(node) {
    node.rightChild = this.rightRotateLL(node.rightChild);

    return this.leftRotateRR(node);
  },
  //平衡左边
  balanceLeft: function(node, key) {
    if (this.lostBalance(node)) {
      if (key < node.leftChild.data) {
        node = this.rightRotateLL(node);  //LL
      } else {
        node = this.doubleRotateLR(node); //LR
      }
    }

    return node;
  },
  //平衡右边
  balanceRight: function(node, key) {
    if (this.lostBalance(node)) {
      if (key > node.rightChild.data) {
        node = this.leftRotateRR(node);   //RR
      } else {
        node = this.doubleRotateRL(node); //RL
      }
    }

    return node;
  },
  //是否失去平衡
  lostBalance: function(node) {
    //左右树高之差大于1就失去了平衡
    return Math.abs(this.getHeight(node.leftChild) - this.getHeight(node.rightChild)) > 1;
  }
};

//已排序数据
var array = [1, 3, 4, 6, 7, 8, 10, 13, 15];

var rootNode = AVLTreeUtil.createAVLTree(array, 0, array.length - 1);

//用于存放节点遍历序列
var orderArray = [];

var visitFn = function(node) {
  orderArray.push(node.data);
};

var printInAndPre = function() {
  orderArray.length = 0;

  AVLTreeUtil.inOrderTraverse(rootNode, visitFn);
  console.log('in order:', orderArray.join(' '));

  orderArray.length = 0;

  AVLTreeUtil.preOrderTraverse(rootNode, visitFn);
  console.log('pre order:', orderArray.join(' '));
};

console.log('--- after init ---');
printInAndPre();

//插入节点14并使树平衡
rootNode = AVLTreeUtil.insertNodeWithBalance(rootNode, 14);

console.log('--- after 14 inserted ---');
printInAndPre();

rootNode = AVLTreeUtil.removeNodeWithBalance(rootNode, 14);

console.log('--- after 14 removed ---');
printInAndPre();

rootNode = AVLTreeUtil.insertNodeWithBalance(rootNode, 0);
rootNode = AVLTreeUtil.insertNodeWithBalance(rootNode, -1);

console.log('--- after 0 and -1 inserted ---');
printInAndPre();
```

C语言描述：

```c

#include <stdio.h>
#include <stdlib.h>

#define max(a,b) (a > b ? a : b)

//AVL树节点结构体
typedef struct node {
    int data;
    struct node *lchild, *rchild;
    int height;
} AVLTreeNode;

AVLTreeNode * createAVLTree(int *array, int low, int high);

void preOrderTraverse(AVLTreeNode *node);
void inOrderTraverse(AVLTreeNode *node);

AVLTreeNode * findMinNode(AVLTreeNode *node);

int getHeight(AVLTreeNode *node);
void updateHeight(AVLTreeNode *node);

AVLTreeNode * insertNodeWithBalance(AVLTreeNode *node, int key);
AVLTreeNode * removeNodeWithBalance(AVLTreeNode *node, int key);

AVLTreeNode * rightRotateLL(AVLTreeNode *node);
AVLTreeNode * doubleRotateLR(AVLTreeNode *node);
AVLTreeNode * leftRotateRR(AVLTreeNode *node);
AVLTreeNode * doubleRotateRL(AVLTreeNode *node);

void balanceLeft(AVLTreeNode **node, int key);
void balanceRight(AVLTreeNode **node, int key);

int main(int argc, const char * argv[]) {
    
    //已排序数据
    int array[] = {1, 3, 4, 6, 7, 8, 10, 13, 15};
    int size = 9;
    
    AVLTreeNode *rootNode = createAVLTree(array, 0, size - 1);
    
    printf("---after init ---\nin: ");
    
    inOrderTraverse(rootNode);
    
    printf("\npre: ");
    preOrderTraverse(rootNode);
    
    rootNode = insertNodeWithBalance(rootNode, 14);
    
    printf("\n--- after 14 inserted ---\nin: ");
    inOrderTraverse(rootNode);
    
    printf("\npre: ");
    preOrderTraverse(rootNode);
    
    rootNode = removeNodeWithBalance(rootNode, 14);
    
    printf("\n--- after 14 removed ---\nin: ");
    inOrderTraverse(rootNode);
    
    printf("\npre: ");
    preOrderTraverse(rootNode);
    
    rootNode = insertNodeWithBalance(rootNode, 0);
    rootNode = insertNodeWithBalance(rootNode, -1);
    
    printf("\n--- after 14 removed ---\nin: ");
    inOrderTraverse(rootNode);
    
    printf("\npre: ");
    preOrderTraverse(rootNode);
    
    return 0;
}

//初始化AVL树
AVLTreeNode * createAVLTree(int *array, int low, int high) {
    if(high < low) return NULL;
    
    //取出子树根节点值
    int mid = (low + high) / 2;
    
    //创建子树根节点
    AVLTreeNode *newNode = (AVLTreeNode *) malloc(sizeof(AVLTreeNode));
    newNode->data = array[mid];
    newNode->height = 0;
    
    //创建左右子树
    newNode->lchild = createAVLTree(array, low, mid - 1);
    newNode->rchild = createAVLTree(array, mid + 1, high);
    
    //更新根节点树高
    updateHeight(newNode);
    
    return newNode;
}

//先序遍历，用来验证平衡后的二叉树
void preOrderTraverse(AVLTreeNode *node) {
    if (node != NULL) {
        printf("%d ", node->data);

        preOrderTraverse(node->lchild);

        preOrderTraverse(node->rchild);
    }
}

//中序遍历
void inOrderTraverse(AVLTreeNode *node) {
    if (node != NULL) {
        inOrderTraverse(node->lchild);
        
        printf("%d ", node->data);
        
        inOrderTraverse(node->rchild);
    }
}

//查找指定子树中最小节点
AVLTreeNode * findMinNode(AVLTreeNode *node) {
    
    while (node != NULL && node->lchild != NULL) {
        node = node->lchild;
    }
    
    return node;
}

//插入节点并保持平衡
AVLTreeNode * insertNodeWithBalance(AVLTreeNode *node, int key) {
    
    //新增叶子节点，并返回该节点，父节点会与其建立关联
    if (node == NULL) {
        node = (AVLTreeNode *) malloc(sizeof(AVLTreeNode));
        node->data = key;
        node->height = 0;
        node->lchild = node->rchild = NULL;
        
        return node;
    }
    
    if (key < node->data) {
        node->lchild = insertNodeWithBalance(node->lchild, key);
        
        //平衡当前节点和左子树
        balanceLeft(&node, key);
        
    } else {
        node->rchild = insertNodeWithBalance(node->rchild, key);
        
        //平衡当前节点和右子树
        balanceRight(&node, key);
    }
    
    updateHeight(node);
    
    return node;
}

//在子树中移除值为key的节点并保持平衡
AVLTreeNode * removeNodeWithBalance(AVLTreeNode *node, int key) {
    
    if (node == NULL) return NULL;
    
    //向左子树继续
    if (key < node->data) {
        node->lchild = removeNodeWithBalance(node->lchild, key);
        
        //平衡当前节点和左子树
        balanceLeft(&node, key);
        
        updateHeight(node);
        
        return node;
    }
    
    //向右子树继续
    if (key > node->data) {
        node->rchild = removeNodeWithBalance(node->rchild, key);
        
        //平衡当前节点和右子树
        balanceRight(&node, key);
        
        updateHeight(node);
        
        return node;
    }
    
    //以下是匹配到节点后的几个不同的情况
    
    //移除叶子节点
    if (node->lchild == NULL && node->rchild == NULL) {
        //释放
        free(node);
        
        return NULL;
    }
    
    //仅左子树不存在
    if (node->lchild == NULL) {
        AVLTreeNode *rchild = node->rchild;
        
        //释放
        free(node);
        
        return rchild;
    }
    
    //仅右子树不存在
    if (node->rchild == NULL) {
        AVLTreeNode *lchild = node->lchild;
        
        //释放
        free(node);
        
        return lchild;
    }
    
    //-----最后如果左右子节点均存在，则先找到右子树最小子节点，替换其值，然后将最小节点删除-----
    
    //查找右子树最小节点
    AVLTreeNode *minNode = findMinNode(node->rchild);
    
    //替换其值
    node->data = minNode->data;
    
    //在右子树中移除最小节点
    node->rchild = removeNodeWithBalance(node->rchild, minNode->data);
    
    //平衡当前节点和右子树
    balanceRight(&node, key);
    
    updateHeight(node);
    
    return node;
}

//获取子树根节点高度
int getHeight(AVLTreeNode *node) {
    if (node == NULL) return -1;
    
    return node->height;
}

//更新节点树高
void updateHeight(AVLTreeNode *node) {
    node->height = max(getHeight(node->lchild), getHeight(node->rchild)) + 1;
}

//对LL类型做右旋转操作
AVLTreeNode * rightRotateLL(AVLTreeNode *node) {
    
    //获取左子节点作为轴点
    AVLTreeNode *pivot = node->lchild;
    
    node->lchild = pivot->rchild;
    
    pivot->rchild = node;
    
    updateHeight(node);
    updateHeight(pivot);
    
    return pivot;
};

//对RR类型做左旋转操作
AVLTreeNode * leftRotateRR(AVLTreeNode *node) {
    
    //获取右子节点作为轴点
    AVLTreeNode *pivot = node->rchild;
    
    node->rchild = pivot->lchild;
    
    pivot->lchild = node;
    
    updateHeight(node);
    updateHeight(pivot);
    
    return pivot;
};

//对于LR类型，先对左子节点进行一次RR类型的左旋转操作，然后再对根节点进行一次LL类型的右旋转操作
AVLTreeNode * doubleRotateLR(AVLTreeNode *node) {
    
    node->lchild = leftRotateRR(node->lchild);
    
    return rightRotateLL(node);
};

//对于RL类型，先对右子树进行一次LL类型的右旋转操作，然后再对根节点进行一次RR类型的左旋转操作
AVLTreeNode * doubleRotateRL(AVLTreeNode *node) {
    
    node->rchild = rightRotateLL(node->rchild);
    
    return leftRotateRR(node);
};

//平衡LL或LR类型
void balanceLeft(AVLTreeNode **node, int key) {
    
    AVLTreeNode *p = *node;
    
    if (getHeight(p->lchild) - getHeight(p->rchild) > 1) {
        if (key < p->lchild->data) {    //LL
            *node = rightRotateLL(p);
        } else {                        //LR
            *node = doubleRotateLR(p);
        }
    }
}

//平衡RR或RL类型
void balanceRight(AVLTreeNode **node, int key) {
    
    AVLTreeNode *p = *node;
    
    if (getHeight(p->rchild) - getHeight(p->lchild) > 1) {
        if (key > p->rchild->data) {    //RR
            *node = leftRotateRR(p);
        } else {                        //RL
            *node = doubleRotateRL(p);
        }
    }
}
```