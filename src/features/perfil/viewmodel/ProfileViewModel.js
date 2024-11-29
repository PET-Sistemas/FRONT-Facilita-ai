import ProfileModel from '../model/ProfileModel';
import axios from 'axios';

export default class ProfileViewModel {
  constructor(userData) {
    this.profileModel = new ProfileModel(userData);
    this.isEditing = false;
    this.images = [
      "https://via.placeholder.com/800x400",
      "https://via.placeholder.com/800x400",
      "https://via.placeholder.com/800x400"
    ];
    this.currentIndex = 0;
  }

  getUser() {
    return this.profileModel.user;
  }

  getImages() {
    return this.images;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }

  toggleEdit() {
    if (this.isEditing) {
      this.profileModel.saveChanges();
    }
    this.isEditing = !this.isEditing;
  }

  cancelEdit() {
    this.profileModel.revertChanges();
    this.isEditing = false;
  }

  async saveData() {
    try {
      const response = await axios.put('http://localhost:3000/user', this.profileModel.user);
      this.profileModel.saveChanges();
      this.isEditing = false;
      alert(response.data.message);
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
      alert('Erro ao salvar os dados.');
    }
  }

  updateUserData(newData) {
    this.profileModel.updateUserData(newData);
  }

  nextSlide() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  uploadProfilePicture(file) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.updateUserData({ profilePicture: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }
}
