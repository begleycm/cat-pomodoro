// TO COMPILE THE TYPESCRIPT FILES, RUN "npm run build" ON THE COMMAND LINE
import { QueueObject } from './queueObject.js';
import { QueueClass } from './QueueClass.js';
const queue = new QueueClass(100); // len limit is 100 for now
// Create a namespace for our queue functions
const QueueFunctions = {
    addStudyToQueue: function () {
        console.log("add study called");
        const newQueueObject = new QueueObject({
            text: "Study",
            time: 25,
        });
        queue_container.appendChild(newQueueObject.getElement());
        queue.enQueue(newQueueObject); // enqueue new study
    },
    addBreakToQueue: function () {
        console.log("add break called");
        const newQueueObject = new QueueObject({
            text: "Break",
            time: 0,
        });
        queue_container.appendChild(newQueueObject.getElement());
        queue.enQueue(newQueueObject); // enqueue new break
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
if (queue.isEmpty()) {
    // proceed normally
}
else {
    // dequeue last queue object and use it as the current time
    const nextQueue = queue.deQueue();
    // logic here that sets the timer to that time
}
//# sourceMappingURL=queue.js.map