export class PublicUser {
    /**
     * @param {number} id
     * @param {string} username
     * @param {string} fullname
     * @param {string} profile_pic
     */
    constructor(id, username, fullname, profile_pic) {
        this.id = id;
        this.username = username;
        this.fullname = fullname;
        this.profile_pic = profile_pic;
    }

    // Add methods or getters if needed
    /*
    getSummary() {
        return `${this.title} has ${this.members} members and ${this.connections} connections.`;
    }
        */
}