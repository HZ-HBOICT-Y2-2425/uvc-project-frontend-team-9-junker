export class User {
    /**
     * @param {number} id
     * @param {string} name
     * @param {string} pfp
     */
    constructor(id, name, pfp) {
        this.id = id;
        this.name = name;
        this.pfp = pfp;
    }

    // Add methods or getters if needed
    /*
    getSummary() {
        return `${this.title} has ${this.members} members and ${this.connections} connections.`;
    }
        */
}