class QueueClass {
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
    deQueueSpecific(item) {
        if (this.isEmpty()) {
            console.log("The Queue is empty! There is no element to pop-out");
            return;
        }
        else {
            const index = this.QueueData.indexOf(item);
            const [element] = this.QueueData.splice(index, 1);
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

const queue = new QueueClass(100); // len limit is 100 for now
// Create a namespace for our queue functions

const QueueFunctions = {
    addStudyToQueue: function () {
        const newQueueObject = new QueueObject({
            text: "study",
            time: 25,
        });
        queue_container.appendChild(newQueueObject.getElement());
        queue.enQueue(newQueueObject); // enqueue new study
        console.log("study added to queue");
    },
    addBreakToQueue: function () {
        const newQueueObject = new QueueObject({
            text: "break",
            time: 5,
        });
        queue_container.appendChild(newQueueObject.getElement());
        queue.enQueue(newQueueObject); // enqueue new break
        console.log("break added to queue");
    }
};

// Add to window object
window.QueueFunctions = QueueFunctions;
const queue_container = document.querySelector(".queue_objects_container");
if (!queue_container) {
    throw new Error("Could not find .queue_objects_container in the DOM");
}
console.log("creating queue obj");

//////////////////////////////////////////////////////// Queue Logic ////////////////////////////////////////////////////////////////////////////////////
// Thinking about queue logic
// If the queue becomes empty, load the opposite of what was last loaded.
// Otherwise, go to the next item in the queue.
// Im using a queue (who would've thought) data structure to represent these things.
// The user is allowed to add like 20 breaks in a row if they desire.

function deleteItem(item) {
    queue.deQueueSpecific(item);
}

let time = 0;
let mode = "none";

function isQueue() {
    if (queue.isEmpty()) {
        console.log("Queue is Empty");
        return false;
    }
    else {
        // dequeue last queue object and use it as the current time
        const nextQueue = queue.deQueue();

        // logic that checks if the last mode was a study, and if so update completed pomodoros
        const studyBtn = document.getElementById("studytab");
        if (studyBtn.classList.contains("active_tab")) {
            updateCompletedPomodoros();
        }

        // logic here that sets the timer to that time
        time = nextQueue.time;
        mode = nextQueue.text;
        setTimer(time, mode);
        console.log("dequeued", time, mode);
        return true;
    }
}


