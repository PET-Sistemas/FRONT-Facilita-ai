export default class ProfileModel {
  constructor(data) {
    // mantém todos os dados vindos do backend
    this.user = { ...data };

    // salva backup pra poder reverter
    this.originalUser = structuredClone(data);
  }

  updateUserData(newData) {
    Object.assign(this.user, newData);
  }

  revertChanges() {
    this.user = structuredClone(this.originalUser);
  }

  saveChanges() {
    this.originalUser = structuredClone(this.user);
  }
}
