// Grabbed this from https://www.tutorialspoint.com/how-to-create-a-queue-in-typescript-using-an-array
interface queueInterface<Type> {
   enQueue(dataItem: Type): void;
   deQueue(): Type | undefined;
   isEmpty(): boolean;
   isFull(): boolean;
   size(): number;
   printQueue(): void;
}

export class QueueClass<Type> implements queueInterface<Type> {
   private QueueData: Array<Type> = [];
   private maxSize: number = 0;

   constructor(length: number) {
      this.maxSize = length;
   }
   isEmpty(): boolean {
      let result = this.QueueData.length <= 0;
      return result;
   }
   isFull(): boolean {
      let result = this.QueueData.length >= this.maxSize;
      return result;
   }
   enQueue(dataItem: Type): void {
      if (this.isFull()) {
         console.log("The queue is full!");
      } else {
         this.QueueData.push(dataItem);
      }
   }

   deQueue(): Type | undefined {
      if (this.isEmpty()) {
         console.log("The Queue is empty! There is no element to pop-out");
         return;
      } else {
         var element = this.QueueData.shift();
         return element;
      }
   }

   size(): number {
      let len = this.QueueData.length;
      return len;
   }
   printQueue(): void {
      for (let i = 0; i < this.QueueData.length; i++) {
         console.log(this.QueueData[i]);
      }
   }
}
