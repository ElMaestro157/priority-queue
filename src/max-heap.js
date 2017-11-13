const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		const node = new Node(data, priority)
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.root !== null) {
            const oldRoot = this.detachRoot();
            this.restoreRootFromLastInsertedNode(oldRoot);
            if (this.root !== null) {
            	this.shiftNodeDown(this.root);
            }
            return oldRoot.data;
        }
	}

	detachRoot() {
	    const node = this.root;
		this.root = null;
        const place = this.parentNodes.indexOf(node)
		if (place !== -1) {
        	this.parentNodes.splice(place, 1);
		}
		return node;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (!(detached instanceof Node) || this.parentNodes.length === 0) {
			return;
		}
		const lastInserted = this.parentNodes.pop();
		if (lastInserted.parent !== null) {
            if (lastInserted.parent !== detached && this.parentNodes.indexOf(lastInserted.parent) === -1) {
                this.parentNodes.unshift(lastInserted.parent);
            }
			lastInserted.parent.removeChild(lastInserted);
		}

		if (detached.left !== null) {
            lastInserted.appendChild(detached.left);
        }

        detached.right !== null ? lastInserted.appendChild(detached.right) : this.parentNodes.unshift(lastInserted);
        this.root = lastInserted;
	}

	size() {
		return this.goIn(this.root);
	}

	goIn(node) {
		var count = 0;
		if (node !== null) {
            if (node.left !== null) {
                count += this.goIn(node.left);
            }
            if (node.right !== null) {
                count += this.goIn(node.right);
            }
            return count + 1;
		} else {
			return 0;
		}
	}

	isEmpty() {
		return this.size() === 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.root === null) {
            this.root = node;
            this.parentNodes.push(node);
            return;
        }

        this.parentNodes[0].appendChild(node);
		this.parentNodes.push(node);

        if (this.parentNodes[0].right !== null) {
            this.parentNodes.shift();
        }
	}

	shiftNodeUp(node) {
	    if (node.parent !== null) {
	        if (node.parent.priority < node.priority) {
	        	this.swapParentNodes(node, node.parent);
	        	node.swapWithParent();
				this.shiftNodeUp(node);
            }
        } else {
	        this.root = node;
        }

	}

	shiftNodeDown(node) {
		var sideNode;
		if (node.left !== null && node.left.priority > node.priority &&
			((node.right !== null && node.left.priority > node.right.priority) || node.right === null)) {
			sideNode = node.left;
		} else if (node.right !== null && node.right.priority > node.priority &&
            ((node.left !== null && node.right.priority > node.left.priority) || node.left === null)) {
			sideNode = node.right;
		} else {
			return;
		}

		if (node === this.root) {
			this.root = sideNode;
		}

		this.swapParentNodes(node, sideNode);
		sideNode.swapWithParent();
        this.shiftNodeDown(node);
	}

	swapParentNodes(first, second) {
        const firstPlace = this.parentNodes.indexOf(first);
        const secondPlace = this.parentNodes.indexOf(second);

        if (secondPlace !== -1 && firstPlace !== -1) {
            const side = this.parentNodes[secondPlace];
            this.parentNodes[secondPlace] = this.parentNodes[firstPlace];
            this.parentNodes[firstPlace] = side;

        } else if (secondPlace !== -1) {
            this.parentNodes[secondPlace] = first;

        } else if (firstPlace !== -1) {
            this.parentNodes[firstPlace] = second;
        }
	}
}

module.exports = MaxHeap;
