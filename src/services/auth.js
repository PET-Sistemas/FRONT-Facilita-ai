// src/services/auth.js
export const login = async (email, password) => {
    const users = [
      { email: 'test@example.com', password: 'senha123' },
    ];
  
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      return { success: true, token: 'fake-jwt-token' };
    } else {
      throw new Error('Invalid credentials');
    }
  };
  