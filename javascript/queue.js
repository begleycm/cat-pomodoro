import { QueueObject } from './queueObject.js';
// Create a namespace for our queue functions
const QueueFunctions = {
    addStudyToQueue: function () {
        console.log("add study called");
        const newQueueObject = new QueueObject({
            text: "Study",
            time: 25,
        });
        queue_container.appendChild(newQueueObject.getElement());
    },
    addBreakToQueue: function () {
        console.log("add break called");
        const newQueueObject = new QueueObject({
            text: "Break",
            time: 0,
        });
        queue_container.appendChild(newQueueObject.getElement());
    }
};
// Add to window object
window.QueueFunctions = QueueFunctions;
const queue_container = document.querySelector(".queue_objects_container");
if (!queue_container) {
    throw new Error("Could not find .queue_objects_container in the DOM");
}
console.log("creating queue obj");
//# sourceMappingURL=queue.js.map