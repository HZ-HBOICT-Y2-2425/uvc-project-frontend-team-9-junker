export class Item {
    // @ts-ignore
    constructor(id, userid, name, description, picture, action, available, views, interested) {
      this.id = id;
      this.userid = userid;
      this.name = name;
      this.description = description;
      this.picture = picture;
      this.action = action;
      this.available = available;
      this.views = views;
      this.interested = interested;
    }
  
    // Add methods or getters if needed
    /*
    getSummary() {
      return `${this.title} has ${this.members} members and ${this.connections} connections.`;
    }
      */
  }