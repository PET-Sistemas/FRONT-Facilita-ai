export default class ProfileModel {
  constructor(userData) {
    this.user = { ...userData };
    this.originalUser = { ...userData };
  }

  updateUserData(newData) {
    this.user = { ...this.user, ...newData };
  }

  revertChanges() {
    this.user = { ...this.originalUser };
  }

  saveChanges() {
    this.originalUser = { ...this.user };
  }
}
