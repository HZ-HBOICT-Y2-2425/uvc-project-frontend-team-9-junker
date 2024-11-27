export class Community {
    // @ts-ignore
    constructor(id, title, image, members, connections, tag, itemIds) {
      this.id = id;
      this.title = title;
      this.image = image;
      this.members = members;
      this.connections = connections;
      this.tag = tag;
      this.itemIds = itemIds;
    }
  
    // Add methods or getters if needed
    /*
    getSummary() {
      return `${this.title} has ${this.members} members and ${this.connections} connections.`;
    }
      */
  }