const queue_container = document.querySelector(".queue_objects_container");

console.log("creating queue obj")

// Add a new queue object dynamically




function addStudyToQueue(){
    const newQueueObject = new QueueObject({
        text: "Study",
        time: studyT,
        onDelete: (obj) => {
            console.log("Deleted:", obj.getData());
        }
    });

    queue_container.appendChild(newQueueObject.getElement());
}


function addBreakToQueue(){
    const newQueueObject = new QueueObject({
        text: "Break",
        time: shortT,
        onDelete: (obj) => {
            console.log("Deleted:", obj.getData());
        }
    });

    queue_container.appendChild(newQueueObject.getElement());
}
