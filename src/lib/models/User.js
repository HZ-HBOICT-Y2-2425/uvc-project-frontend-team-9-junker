export class User {
    /**
     * @param {number} id
     * @param {string} fullname
     * @param {string} username
     * @param {string} profile_pic
     */
    constructor(id, fullname, username, profile_pic) {
        this.id = id;
        this.fullname = fullname;
        this.username = username;
        this.profile_pic = profile_pic;
    }

    // Add methods or getters if needed
    /*
    getSummary() {
        return `${this.title} has ${this.members} members and ${this.connections} connections.`;
    }
        */
}