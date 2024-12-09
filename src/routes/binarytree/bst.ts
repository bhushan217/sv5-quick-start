/* Binary Search Tree Class */
class BinarySearchTree<T> {

  #root: BiNode<T> | null = null;
  // root: BiNode<string>;
  // constructor
  constructor() {
    // this.#root = null;
  }

  getRoot() {
    return this.#root
  }

  // insert
  insert(value: T) {
    if (this.#root == null) {
      this.#root = new BiNode(value);
      this.#root.isRoot = true;
      return true;
    } else {
      return this.#root.insert(new BiNode(value));
    }
  }

  inOrder() {
    const stack = [];
    const result = [];
    let currentNode: BiNode<T> | null = this.#root;

    while (currentNode || stack.length) {
      while (currentNode) {
        stack.push(currentNode);
        currentNode = currentNode.left;
      }

      const node = stack.pop();
      result.push(node!.value);
      currentNode = node!.right;
    }

    return result;
  }

  preOrder() {
    if (!this.#root) return [];

    const stack = [this.#root];
    const result = [];

    while (stack.length) {
      const node = stack.pop()!;
      result.push(node.value);

      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }

    return result;
  }

  postOrder() {
    if (!this.#root) return [];

    const stack = [this.#root];
    const result = [];

    while (stack.length) {
      const node = stack.pop()!;

      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
      result.push(node.value);
    }

    return result;
  }
}

/* BiNode Class */
class BiNode<T> {
  level: number = 0
  isLeft: boolean = false;
  isRoot: boolean = false;
  value: T;
  left: BiNode<T> | null;
  right: BiNode<T> | null;
  parent: BiNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.level = 0;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
  // insert
  insert(node: BiNode<T>): boolean {
    if (node.value == this.value) {
      return false;
      // check left subtree    
    } else if (node.value < this.value) {
      if (this.left != null) {
        return this.left.insert(node);
      } else {
        this.left = node;
        node.parent = this;
        node.level = this.level + 1
        node.isLeft = true;
        return true;
      }
      // check right subtree
    } else {
      if (this.right != null) {
        return this.right.insert(node);
      } else {
        this.right = node;
        node.parent = this;
        node.level = this.level + 1;
        node.isLeft = false;
        return true;
      }
    }
  }
}

export { BinarySearchTree, BiNode };