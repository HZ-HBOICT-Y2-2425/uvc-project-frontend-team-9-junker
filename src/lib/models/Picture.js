export class Picture {
    /**
   * @param {number} id
   * @param {number} userid
   * @param {number} itemid
   * @param {number} communityid
   * @param {string} name
   * @param {string} data
   */
    constructor(id, userid, itemid, communityid, name, data) {
      this.id = id;
      this.userid = userid;
      this.itemid = itemid;
      this.communityid = communityid;
      this.name = name;
      this.data = data;
    }

  
    // Add methods or getters if needed
    /*
    getSummary() {
      return `${this.title} has ${this.members} members and ${this.connections} connections.`;
    }
      */
  }