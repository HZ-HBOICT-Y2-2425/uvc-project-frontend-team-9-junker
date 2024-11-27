export class Item {
    // @ts-ignore
    constructor(id, userid, name, description, pictures, action, available, views, interested, date) {
      this.id = id;
      this.userid = userid;
      this.name = name;
      this.description = description;
      this.pictures = pictures;
      this.action = action;
      this.available = available;
      this.views = views;
      this.interested = interested;
      this.date = date; //ISO string format
    }

  
    // Add methods or getters if needed
    /*
    getSummary() {
      return `${this.title} has ${this.members} members and ${this.connections} connections.`;
    }
      */
  }