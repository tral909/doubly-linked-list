const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        let node = new Node(data);
        if (!this.isEmpty()) {
            node.prev = this._tail;
            this._tail.next = node;
            this._tail = node;

        } else {
            this._head = node;
            this._tail = node;
        }
        this.length++;
        return this;
    }

    head() {
        return this._head !== null ? this._head.data : null;
    }

    tail() {
        return this._tail !== null ? this._tail.data : null;
    }

    at(index) {
        let node = this.getNodeById(index);
        return node !== null ? node.data : null;
    }

    getNodeById(index) {
        if (!this.isEmpty() && index >= 0 && index < this.length) {
            let curNode = this._head;
            let counter = 0;
            while (counter < index) {
                curNode = curNode.next;
                counter++;
            }
            return curNode;
        }
        return null;
    }

    insertAt(index, data) {
        let node = new Node(data);
        if (index > 0 && index < this.length) {
            node.prev = this.getNodeById(index - 1);
            node.next = this.getNodeById(index);
            this.getNodeById(index - 1).next = node;
            this.getNodeById(index).prev = node;
        } else if (index == 0) {
            node.next = this._head;
            this._head = node;
        } else if (index == this.length) {
            node.prev = this._tail;
            this._tail = node;
        }
        this.length++;
        return this;
    }

    isEmpty() {
        return this.length == 0;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if (index > 0 && index < this.length - 1) {
            this.getNodeById(index + 1).prev = this.getNodeById(index - 1);
            this.getNodeById(index - 1).next = this.getNodeById(index + 1);
        } else if (index == 0) {
            this._head = this.getNodeById(index + 1);
            if (this._head !== null) {
                this._head.prev == null;
            }
        } else if (index == this.length) {
            this._tail = this.getNodeById(index - 1);
            if (this._tail !== null) {
                this._tail.next == null;
            }
        }
        this.length--;
        return this;
    }

    reverse() {
        if (this.length > 1) {
            let counter = 0;
            let curNode = this._head;
            while (counter < this.length) {
                let temp = null;
                temp = curNode.next;
                curNode.next = curNode.prev;
                curNode.prev = temp;
                curNode = curNode.prev;
                counter++;
            }
            curNode = this._head;
            this._head = this._tail;
            this._tail = curNode;
        }
        return this;
    }

    indexOf(data) {
        let counter = 0;
        let curNode = this._head;
        for (let i = 0; i < this.length; i++) {
            if (curNode.data === data) {
                return i;
            }
            curNode = curNode.next;
        }
        return -1;
    }
}

new LinkedList().append(4).reverse().deleteAt(0).clear().insertAt(0, 3);

module.exports = LinkedList;
