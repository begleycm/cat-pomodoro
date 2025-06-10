class QueueObject {
    // Generic QueueObject constructor
    constructor({ text = "", time = 0, onDelete = () => {} } = {}) {
        // assign instance variables
        this.text = text;
        this.time = time;

        // not fully sure what the purpose of this onDelete is, i think err prevention.
        this.onDelete = onDelete;

        // formatting and inserting the inner HTML
        this.element = document.createElement("div");
        this.element.className = "queue_object";
        this.element.innerHTML = `
            <div class="queue_object_text">${this.text}</div>
            <div class="queue_object_delete_button">Delete</div>
            <input class="queue_object_time_field" type="number" value="${this.time}">
            <div class="queue_object_handle"></div>
        `;

        this.textField = this.element.querySelector(".queue_object_text");
        this.timeField = this.element.querySelector(".queue_object_time_field");
        this.deleteButton = this.element.querySelector(".queue_object_delete_button");

        // listen for changes to the text input.
        // this.textField.addEventListener("input", () => {
        //     this.text = this.textField.value;
        // });

        // listen for changes to the time input
        this.timeField.addEventListener("input", () => {
            this.time = parseFloat(this.timeField.value) || 0;
        });

        // listen for delete button
        this.deleteButton.addEventListener("click", () => {
            this.element.remove();
            this.onDelete(this);
        });
    }

    getElement() {
        return this.element;
    }

    getData() {
        return { text: this.text, time: this.time };
    }
}