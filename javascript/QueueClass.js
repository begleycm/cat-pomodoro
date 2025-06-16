export class QueueClass {
    constructor(length) {
        this.QueueData = [];
        this.maxSize = 0;
        this.maxSize = length;
    }
    isEmpty() {
        let result = this.QueueData.length <= 0;
        return result;
    }
    isFull() {
        let result = this.QueueData.length >= this.maxSize;
        return result;
    }
    enQueue(dataItem) {
        if (this.isFull()) {
            console.log("The queue is full!");
        }
        else {
            this.QueueData.push(dataItem);
        }
    }
    deQueue() {
        if (this.isEmpty()) {
            console.log("The Queue is empty! There is no element to pop-out");
            return;
        }
        else {
            var element = this.QueueData.shift();
            return element;
        }
    }
    size() {
        let len = this.QueueData.length;
        return len;
    }
    printQueue() {
        for (let i = 0; i < this.QueueData.length; i++) {
            console.log(this.QueueData[i]);
        }
    }
}
//# sourceMappingURL=QueueClass.js.map