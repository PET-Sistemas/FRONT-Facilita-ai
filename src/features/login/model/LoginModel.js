export default class LoginModel {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    // Add any necessary methods for the model
    validate() {
        // Example validation logic
        return this.email.includes('@') && this.password.length > 6;
    }
}
