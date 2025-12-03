export default class ProfileModel {
  constructor(data) {
    this.user = {
      ...data,
      profilePicture: data.fotoPerfil || data.profilePicture || null,
    };

    this.originalUser = structuredClone(this.user);
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
