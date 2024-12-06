export default class Message {
  /**
   * @param {string} sender - The sender's username
   * @param {string} recipient - The recipient's username
   * @param {string} content - The content of the message
   * @param {number} timestamp - The timestamp of when the message was sent
   */
  constructor(sender, recipient, content, timestamp = Date.now()) {
    this.sender = sender;
    this.recipient = recipient;
    this.content = content;
    this.timestamp = timestamp;
  }

  /**
   * Create a `Message` instance from a plain object.
   * @param {{ sender: string, recipient: string, content: string, timestamp: number }} data - The plain object containing message data
   * @returns {Message} - The created `Message` instance
   */
  static fromJSON(data) {
    if (
      typeof data.sender !== "string" ||
      typeof data.recipient !== "string" ||
      typeof data.content !== "string" ||
      typeof data.timestamp !== "number"
    ) {
      throw new Error("Invalid data structure for Message.fromJSON");
    }
    return new Message(data.sender, data.recipient, data.content, data.timestamp);
  }

  /**
   * Convert the `Message` instance into a plain object.
   * @returns {{ sender: string, recipient: string, content: string, timestamp: number }} - The plain object representation
   */
  toJSON() {
    return {
      sender: this.sender,
      recipient: this.recipient,
      content: this.content,
      timestamp: this.timestamp,
    };
  }
}