export class Item {
    /**
   * @param {number} id
   * @param {number} userid
   * @param {string} name
   * @param {string} description
   * @param {string} pictures
   * @param {string} action
   * @param {boolean} available
   * @param {number} views
   * @param {number} interested
   * @param {string | undefined} [date]
   * @param {string | undefined} [categories]
   * @param {string | undefined} [communities]
   */
    constructor(id, userid, name, description, pictures, action, available, views, interested, date, categories, communities) {
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
      this.categories = categories;
      this.communities = communities;
    }

  
    // Add methods or getters if needed
    /*
    getSummary() {
      return `${this.title} has ${this.members} members and ${this.connections} connections.`;
    }
      */
  }