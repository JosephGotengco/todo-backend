
// custom error to check which errors are intentionally thrown
class UserException {
    message: string;
    name: string;
    constructor(message: string) {
        this.message = message;
        this.name = "UserException";
    }
}

export default UserException;
