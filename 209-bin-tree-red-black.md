上次记录了AVL树的相关内容，其规定节点左右子树高度之差不超过1，在添加或移除多个节点后能够对自身重新建立平衡，使其仍可维持一棵良好的二叉查找树结构，不过AVL树为了维护良好的结构，在添加或删除频繁时，性能也会相应的下降。一种替代的方案是使用红黑树。

红黑树（Red Black Tree） 也是一种自平衡二叉查找树，它是在1972年由Rudolf Bayer发明的，当时被称为平衡二叉B树（symmetric binary B-trees）。后来，在1978年被 Leo J. Guibas 和 Robert Sedgewick 修改为如今的“红黑树”。红黑树并不追求AVL树般的严格平衡，减少了平衡所需的操作，从而提高性能。红黑树的应用非常广泛，Java中的TreeSet和TreeMap，C++ STL中的set、map，以及Linux虚拟内存的管理，都是通过红黑树去实现的，除此之外，Node.js的定时器管理中也有红黑树的存在。

下面是红黑树需要遵循的规则：

1. 节点要么是黑色的，要么是红色的
2. 根节点永远是黑色的
3. 一条路径上不能有两个相邻的红节点，也就是说，红色节点不能有红色父节点或红色子节点
4. 从一个节点到叶子节点的每条路径都应该包含相等数量的黑色节点，称为这条路径的黑高度

从某个节点出发，到达一个叶子节点的任意一条路径上，所有的黑色节点的个数成为该节点的黑高度。红黑树的黑高度定义为其根结点的黑高度。为了方便理解，空的叶子节点（NIL）也视为黑色。

下面是一张红黑树的结构图：

![](http://img.blog.csdn.net/20160814120544395)

我们构建红黑树的过程是通过逐个插入新节点来完成的，在插入节点时，初始化根节点为黑节点，随后插入子节点时，初始为红色，然后通过**修改颜色**和**旋转节点**来完成平衡，最终使一棵子树完成平衡操作。

插入新节点时平衡操作如下：

标记新插入的节点为参考节点，如果参考节点的父节点和叔父节点都是红色的，只需将父节点和叔父节点改为黑色，再将祖父节点改为由黑色改为红色（根据上面的第4条可知，如果叔父节点是红色，那么祖父节点必为黑色），然后将祖父节点变为新的参考节点：

![](http://img.blog.csdn.net/20160813150430491)

如果参考节点的父节点是红色，而叔父节点是黑色（空节点也视为黑色），我们需要对参考节点的祖父节点进行旋转操作，这个过程跟AVL树相似，几种类型如下：

如果参考节点的父节点是祖父节点的左子节点，则是LR或LL类型。

如果参考节点是其父节点的右子节点，则是LR类型，应对其父节点进行左旋，然后令父节点成为新的参考节点，变成LL类型：

![](http://img.blog.csdn.net/20160813151233104)

如果参考节点是其父节点的左子节点，则是LL类型，应对其祖父节点进行右旋，然后交换父节点和祖父节点的颜色，最后父节点成为新的参考节点：

![](http://img.blog.csdn.net/20160813151052885)

如果参考节点的父节点是祖父节点的右子节点，则是RL或RR类型。

如果参考节点是其父节点的左子节点，则是RL类型，应对其父节点进行右旋，然后令父节点成为新的参考节点，变成RR类型：

![](http://img.blog.csdn.net/20160813151439870)

如果参考节点是其父节点的右子节点，则是RR类型，应对其祖父节点进行左旋，然后交换父节点和祖父节点的颜色，最后父节点成为新的参考节点：

![](http://img.blog.csdn.net/20160813151353932)

以上图示参考自：<a href="http://www.geeksforgeeks.org/red-black-tree-set-2-insert/" target="_blank">http://www.geeksforgeeks.org/red-black-tree-set-2-insert/</a>

下面是创建红黑树插入节点过程的实现（关于删除节点的图示和实现代码，有时间会再更新）：

```c
#include <stdio.h>
#include <stdlib.h>

#define RED 1
#define BLACK 0

//红黑树树节点结构体
typedef struct node {
    int data;
    struct node *lchild, *rchild, *parent;
    int color;
} RBTreeNode;

//红黑树结构体
typedef struct tree {
    RBTreeNode *root;
} RBTree;

//初始化红黑树
RBTree * initRBTree();

//插入指定值的节点并保持平衡
void insertNodeWithBalance(RBTree *tree, int key);
//插入一个新节点
RBTreeNode * insertNode(RBTreeNode *root, RBTreeNode *node);
//插入新节点后恢复平衡
void balanceAfterInsertion(RBTree *tree, RBTreeNode *node);

//空节点视为黑色，否则返回节点颜色
int isRed(RBTreeNode *node);
int isBlack(RBTreeNode *node); //!isRed
void swapColor(RBTreeNode *node1, RBTreeNode *node2);

void rotateLeft(RBTree *tree, RBTreeNode *node);
void rotateRight(RBTree *tree, RBTreeNode *node);

void inOrderTraverse(RBTreeNode *node);
void preOrderTraverse(RBTreeNode *node);

int main(int argc, const char * argv[]) {
    
    int array[] = {11, 2, 14, 1, 7, 15, 5, 8};
    
    RBTree *tree = initRBTree();
    
    int size = 8;
    for (int i = 0; i < size; i++) {
        insertNodeWithBalance(tree, array[i]);
    }
    
    printf("in: ");
    inOrderTraverse(tree->root);
    printf("\npre: ");
    preOrderTraverse(tree->root);
    
    return 0;
}

//初始化红黑树
RBTree * initRBTree() {
    RBTree *tree = (RBTree *) malloc(sizeof(RBTree));
    tree->root = NULL;
    
    return tree;
}

//中序遍历
void inOrderTraverse(RBTreeNode *node) {
    if (node != NULL) {
        inOrderTraverse(node->lchild);
        
        printf("(%d:%c) ", node->data, node->color == RED ? 'R' : 'B');
        
        inOrderTraverse(node->rchild);
    }
}

//前序遍历
void preOrderTraverse(RBTreeNode *node) {
    if (node != NULL) {
        
        printf("(%d:%c) ", node->data, node->color == RED ? 'R' : 'B');
        
        preOrderTraverse(node->lchild);
        preOrderTraverse(node->rchild);
    }
}

//插入节点并保持平衡
void insertNodeWithBalance(RBTree *tree, int key) {
    
    RBTreeNode *newNode = (RBTreeNode *) malloc(sizeof(RBTreeNode));
    newNode->data = key;
    newNode->lchild = newNode->rchild = NULL;
    newNode->parent = NULL;
    newNode->color = RED;
    
    //插入节点
    tree->root = insertNode(tree->root, newNode);
    
    //恢复平衡
    balanceAfterInsertion(tree, newNode);
}

//插入节点
RBTreeNode * insertNode(RBTreeNode *root, RBTreeNode *node) {
    if (root == NULL) {
        return node;
    }
    
    if (node->data < root->data) {
        root->lchild = insertNode(root->lchild, node);
        root->lchild->parent = root;
    } else {
        root->rchild = insertNode(root->rchild, node);
        root->rchild->parent = root;
    }
    
    return root;
}

//恢复平衡
void balanceAfterInsertion(RBTree *tree, RBTreeNode *node) {
    
    RBTreeNode *parent = NULL;
    RBTreeNode *grandpa = NULL;
    
    //当前节点不是根节点，并且它和父节点同为红色
    while (node != tree->root && isRed(node) && isRed(node->parent)) {
        
        parent = node->parent;
        grandpa = parent->parent;
        
        /**
         * Case : A
         * 父节点是祖父节点的左子节点，LR或LL型
         **/
        if (grandpa->lchild == parent) {
            
            RBTreeNode *uncle = grandpa->rchild;
            
            /**
             * Case : 1
             * 叔父节点也是红色，只需重新染色
             **/
            if (isRed(uncle)) {
                
                uncle->color = BLACK;
                parent->color = BLACK;
                grandpa->color = RED;
                
                //更新当前节点为祖父节点
                node = grandpa;
                
            } else {
                
                /**
                 * Case : 2
                 * 当前节点是父节点的右子节点，LR型，需要先对父节点左旋，旋转后变为LL型
                 **/
                if (parent->rchild == node) {
                    //父节点左旋
                    rotateLeft(tree, parent);
                    
                    node = parent;
                    parent = node->parent;
                }
                
                /**
                 * Case : 3
                 * 当前节点是父节点的左子节点，LL型，需要对祖父节点右旋
                 **/
                rotateRight(tree, grandpa);
                
                //祖父节点右旋后，父节点成为根节点，需交换颜色
                swapColor(parent, grandpa);
                
                //更新当前根节点为父节点
                node = parent;
                
            }
            
        }
        
        /**
         * Case : B
         * 父节点是祖父节点的右子节点，RL或RR型
         **/
        
        else {
            
            RBTreeNode *uncle = grandpa->lchild;
            
            /**
             * Case : 1
             * 叔父节点也是红色，只需重新染色
             **/
            if (isRed(uncle)) {
                
                uncle->color = BLACK;
                parent->color = BLACK;
                grandpa->color = RED;
                
                //更新当前节点为祖父节点
                node = grandpa;
                
            } else {
                
                /**
                 * Case : 2
                 * 当前节点是父节点的左子节点，RL型，需要先对父节点右旋，旋转后变为RR型
                 **/
                if (parent->lchild == node) {
                    rotateRight(tree, parent);
                    
                    node = parent;
                    parent = node->parent;
                }
                
                /**
                 * Case : 3
                 * 当前节点是父节点的右子节点，RR型，需要对祖父节点左旋
                 **/
                rotateLeft(tree, grandpa);
                
                swapColor(parent, grandpa);
                
                node = parent;
                
            }
            
        }
        
    }
    
    //最后须将树的根节点置为黑色
    tree->root->color = BLACK;
}

//右旋
void rotateRight(RBTree *tree, RBTreeNode *node) {
    
    RBTreeNode *pivot = node->lchild;
    
    //和轴点右子节点建立关联
    node->lchild = pivot->rchild;
    if (node->lchild != NULL) {
        node->lchild->parent = node;
    }
    
    //轴点和原祖父节点建立关联
    pivot->parent = node->parent;
    if (node->parent != NULL) {
        
        if (node->parent->lchild == node) {
            node->parent->lchild = pivot;
        } else {
            node->parent->rchild = pivot;
        }
        
    }
    
    //轴点与原父节点建立关联
    pivot->rchild = node;
    node->parent = pivot;
    
    if (pivot->parent == NULL) {
        tree->root = pivot;
    }
}

//左旋
void rotateLeft(RBTree *tree, RBTreeNode *node) {
    
    RBTreeNode *pivot = node->rchild;
    
    //和轴点左子节点建立关联
    node->rchild = pivot->lchild;
    if (node->rchild != NULL) {
        node->parent->rchild = pivot;
    }
    
    //轴点和原祖父节点建立关联
    pivot->parent = node->parent;
    if (node->parent != NULL) {
        
        if (node->parent->lchild == node) {
            node->parent->lchild = pivot;
        } else {
            node->parent->rchild = pivot;
        }
        
    }
    
    //轴点和原父节点建立关联
    pivot->lchild = node;
    node->parent = pivot;
    
    if (pivot->parent == NULL) {
        tree->root = pivot;
    }
}

//节点是否为红色
int isRed(RBTreeNode *node) {
    //空的叶子节点视为黑节点
    if (node == NULL) return BLACK;
    
    return node->color;
}

//节点是否为黑色
int isBlack(RBTreeNode *node) {
    return !isRed(node);
}

//交换节点颜色
void swapColor(RBTreeNode *node1, RBTreeNode *node2) {
    int color = node1->color;
    node1->color = node2->color;
    node2->color = color;
}
```