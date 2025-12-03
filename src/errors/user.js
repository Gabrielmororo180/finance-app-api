export class EmailInUseError extends Error {
    constructor(message) {
        super(message)
        this.name = 'EmailInUseError'
    }
}
