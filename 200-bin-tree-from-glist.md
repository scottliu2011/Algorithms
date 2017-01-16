使用广义表（generalized lists）来表示二叉树非常方便，假如我们有这么一个二叉树：

![](http://img.blog.csdn.net/20160706121515412)

它可以表示为L = (A (B (C, D), E ( , F) ) )，直观地表达了树中各个节点之间的关系。

今天主要记录如何通过解析这个广义表，构建出真实的树存储结构。

下面是其主要思路：

逐个获取广义表字符串中除空格之外的每个字符，遇到左括号就标记START_LEFT_CHILD，遇到逗号就标记START_RIGHT_CHILD，遇到右括号就返回到父节点层次。当遇到字母时，就创建一个节点，并与父节点进行关联。

1. 遇到左括号时，下一步就要处理左子节点了，此时将当前新创建的节点入栈作为栈顶元素（第一次为空），它是下一个新创建节点的父节点。
2. 遇到字母A时，创建一个节点对象作为根节点；之后再遇到字母时，如果当前标记为START_LEFT_CHILD，就作为父节点的左子节点，如果当前标记为START_RIGHT_CHILD，那就作为父节点的右子节点。
3. 遇到右括号时，返回父节点层次，此时相应元素出栈，栈顶指针退回一位。
4. 继续重复上几个步骤，最终返回根节点。

构建完二叉树后，我们会获取到根节点，然后就可以对二叉树进行各种遍历，来验证其正确性。

下面是实现代码：

JS版：

```js
//二叉树节点结构
function BinTreeNode(data) {
  this.data = data;
  this.leftChild = null;
  this.rightChild = null;
}

//通过广义表创建二叉树
function createBinTreeByGLists(gLists) {
  //根节点和当前节点
  var rootNode = null, currNode = null;

  //数组作为栈结构，top为栈顶指针，模拟入栈出栈
  var stack = [], top = -1;

  //flag标识当前要解析的类型
  var flag = 0;
  var START_LEFT_CHILD = 1, START_RIGHT_CHILD = 2;
  
  //字符串当前索引
  var index = 0;

  while (index < gLists.length) {
    //获取广义表字符串当前要解析的字符
    var c = gLists.charAt(index++);

    switch(c) {
      //遇到'('时，开始解析左子节点，栈顶指针递增一位，当前节点入栈作为新的父节点
      case '(':
        flag = START_LEFT_CHILD;
        stack[++top] = currNode;
        break;
      //遇到',' 开始解析右子节点
      case ',':
        flag = START_RIGHT_CHILD;
        break;
      //遇到')'时，栈顶指针递减一位，返回到父节点层次
      case ')':
        top--;
        break;
      //忽略空格
      case ' ':
        break;
      //处理节点
      default:
        //创建新节点
        currNode = new BinTreeNode(c);

        //第一个节点作为根节点
        if (rootNode === null) {
          rootNode = currNode;
        } else {
          //当前栈顶存放父节点，根据flag处理与父节点的关系
          switch(flag) {
            case START_LEFT_CHILD:
              stack[top].leftChild = currNode;
              break;
            case START_RIGHT_CHILD:
              stack[top].rightChild = currNode;
              break;
          }
        }
    }
  }

  //返回树的根节点
  return rootNode;
}

//前序遍历
function preOrderTraverse(node, orderArray) {
  if (node) {
    orderArray.push(node.data);
    preOrderTraverse(node.leftChild, orderArray);
    preOrderTraverse(node.rightChild, orderArray);
  }
}

//中序遍历
function inOrderTraverse(node, orderArray) {
  if (node) {
    inOrderTraverse(node.leftChild, orderArray);
    orderArray.push(node.data);
    inOrderTraverse(node.rightChild, orderArray);
  }
}

//后序遍历
function postOrderTraverse(node, orderArray) {
  if (node) {
    postOrderTraverse(node.leftChild, orderArray);
    postOrderTraverse(node.rightChild, orderArray);
    orderArray.push(node.data);
  }
}

//广义表序列
var gLists = '(A (B (C, D), E ( , F)) )';

//根据广义表创建二叉树
var binTree = createBinTreeByGLists(gLists);

//用于存放节点遍历序列
var orderArray = [];

preOrderTraverse(binTree, orderArray);
console.log(orderArray.join(' '));

//清空遍历序列数组
orderArray.length = 0;

inOrderTraverse(binTree, orderArray);
console.log(orderArray.join(' '));

orderArray.length = 0;

postOrderTraverse(binTree, orderArray);
console.log(orderArray.join(' '));
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
	
	//根据广义表创建二叉树
    public static BinTreeNode createBinTreeByGLists(String gLists, int nodeQuantity) {
        BinTreeNode rootNode = null;
        BinTreeNode currNode = null;

        BinTreeNode[] stack = new BinTreeNode[nodeQuantity];
        int top = -1;

        int flag = 0;
        final int START_LEFT_CHILD = 1, START_RIGHT_CHILD = 2;

        int index = 0;

        while (index < gLists.length()) {
            char c = gLists.charAt(index++);

            switch (c) {
                case '(':
                    flag = START_LEFT_CHILD;
                    stack[++top] = currNode;
                    break;
                case ',':
                    flag = START_RIGHT_CHILD;
                    break;
                case ')':
                    top--;
                    break;
                case ' ':
                    break;
                default:
                    currNode = new BinTreeNode(c);

                    if (rootNode == null) {
                        rootNode = currNode;
                    } else {
                        switch (flag) {
                            case START_LEFT_CHILD:
                                stack[top].setLeftChild(currNode);
                                break;
                            case START_RIGHT_CHILD:
                                stack[top].setRightChild(currNode);
                                break;
                        }
                    }
            }
        }

        return rootNode;
    }
	
	//前序遍历
    public static void preOrderTraverse(BinTreeNode node) {
        if (node != null) {
            System.out.print(node.getData());
            preOrderTraverse(node.getLeftChild());
            preOrderTraverse(node.getRightChild());
        }
    }
	
	//中序遍历
    public static void inOrderTraverse(BinTreeNode node) {
        if (node != null) {
            inOrderTraverse(node.getLeftChild());
            System.out.print(node.getData());
            inOrderTraverse(node.getRightChild());
        }
    }
	
	//后序遍历
    public static void postOrderTraverse(BinTreeNode node) {
        if (node != null) {
            postOrderTraverse(node.getLeftChild());
            postOrderTraverse(node.getRightChild());
            System.out.print(node.getData());
        }
    }

    public static void main(String[] args) {
        String gLists = "(A (B (C, D), E ( , F)) )";
        BinTreeNode rootNode = BinTreeCreator.createBinTreeByGLists(gLists, 6);

        System.out.print("pre order: ");
        BinTreeCreator.preOrderTraverse(rootNode);

        System.out.print(System.lineSeparator() + "in order: ");
        BinTreeCreator.inOrderTraverse(rootNode);

        System.out.print(System.lineSeparator() + "post order: ");
        BinTreeCreator.postOrderTraverse(rootNode);
    }
}
```

C语言版：

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    char data;
    struct node *lchild, *rchild;
} BinTreeNode;

BinTreeNode * createBinTreeByGLists(char *gLists, int nodeQuantity);
void preOrderTraverse(BinTreeNode *node);
void inOrderTraverse(BinTreeNode *node);
void postOrderTraverse(BinTreeNode *node);

int main(int argc, const char * argv[]) {
    
    char *gLists = "(A (B (C, D), E ( , F)) )";
    
    BinTreeNode *rootNode = createBinTreeByGLists(gLists, 6);
    
    printf("pre order: ");
    preOrderTraverse(rootNode);
    printf("\nin order: ");
    inOrderTraverse(rootNode);
    printf("\npost order: ");
    postOrderTraverse(rootNode);
    
    return 0;
}

//根据广义表创建二叉树
BinTreeNode * createBinTreeByGLists(char *gLists, int nodeQuantity) {
    BinTreeNode *rootNode = NULL;
    BinTreeNode *currNode = NULL;
    
    //创建指针数组作为栈结构
    BinTreeNode **stack = (BinTreeNode **) malloc(sizeof(BinTreeNode *) * nodeQuantity);
    int top = -1;
    
    int flag = 0;
    const int START_LEFT_CHILD = 1, START_RIGHT_CHILD = 2;
    
    int index = 0;
    
    char c = gLists[index];
    
    while (c != '\0') {
        
        switch (c) {
            case '(':
                stack[++top] = currNode;
                flag = START_LEFT_CHILD;
                break;
            case ',':
                flag = START_RIGHT_CHILD;
                break;
            case ')':
                top--;
                break;
            case ' ':
                break;
            default:
                currNode = (BinTreeNode *) malloc(sizeof(BinTreeNode));
                currNode->data = c;
                currNode->lchild = currNode->rchild = NULL;
                
                if (rootNode == NULL) {
                    rootNode = currNode;
                } else {
                    switch (flag) {
                        case START_LEFT_CHILD:
                            stack[top]->lchild = currNode;
                            break;
                        case START_RIGHT_CHILD:
                            stack[top]->rchild = currNode;
                            break;
                    }
                }
        }
        
        c = gLists[++index];
    }
    
    //释放
    free(stack);
    
    return rootNode;
}

//前序遍历
void preOrderTraverse(BinTreeNode *node) {
    if (node != NULL) {
        printf("%c", node->data);
        
        preOrderTraverse(node->lchild);
        
        preOrderTraverse(node->rchild);
    }
}

//中序遍历
void inOrderTraverse(BinTreeNode *node) {
    if (node != NULL) {
        inOrderTraverse(node->lchild);
        
        printf("%c", node->data);
        
        inOrderTraverse(node->rchild);
    }
}

//后序遍历
void postOrderTraverse(BinTreeNode *node) {
    if (node != NULL) {
        postOrderTraverse(node->lchild);
        
        postOrderTraverse(node->rchild);
        
        printf("%c", node->data);
    }
}
```