class QueueObject {
    constructor({ text = "", time = 0, onDelete = () => { } } = {}) {
        this.text = text;
        this.time = time;
        this.onDelete = onDelete;
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
        this.timeField.addEventListener("input", () => {
            this.time = parseFloat(this.timeField.value) || 0;
        });
        this.deleteButton.addEventListener("click", () => {
            this.element.remove();
            this.onDelete(this);
            deleteItem(this);
        });
    }
    getElement() {
        return this.element;
    }
    getData() {
        return { text: this.text, time: this.time };
    }
}
