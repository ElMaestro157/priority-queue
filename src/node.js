class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;

		this.left = null;
		this.right = null;
		this.parent = null;
	}

	appendChild(node) {
		if (this.left === null) {
			this.left = node;
			node.parent = this;
		}
		else if (this.right === null) {
            this.right = node;
            node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left === node) {
            this.left.parent = null;
            this.left = null;
        }
		else if (this.right === node) {
            this.right.parent = null;
            this.right = null;
        } else throw new Error();
	}

	remove() {
		if (this.parent !== null) {
			this.parent.removeChild(this);
            this.parent = null;
		}
	}

	swapWithParent() {
		if (this.parent !== null) {

			if (this.parent.parent !== null) {
                if (this.parent.parent.left === this.parent)
                    this.parent.parent.left = this;
                else
                    this.parent.parent.right = this;
            }


			if (this.parent.left === this) {
				this.parent.left = this.left;

				if (this.left !== null)
					this.left.parent = this.parent;

				const side = this.parent.right;

				this.parent.right = this.right;
				if (this.right !== null)
					this.right.parent = this.parent;

				this.right = side;
				if (this.right !== null)
					this.right.parent = this;

				this.left = this.parent;
                this.parent = this.parent.parent;
				this.left.parent = this;
			} else {
				this.parent.right = this.right;

                if (this.right !== null)
                	this.right.parent = this.parent;

                const side = this.parent.left;

                this.parent.left = this.left;
                if (this.left !== null)
                	this.left.parent = this.parent;

                this.left = side;
                if (this.left !== null)
                	this.left.parent = this;

                this.right = this.parent;
                this.parent = this.parent.parent;
                this.right.parent = this;
			}
		}
	}
}

module.exports = Node;
