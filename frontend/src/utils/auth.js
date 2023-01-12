export const BASE_URL = 'http://localhost:3000';

class Auth {

//Метод для проверки ответа сервера
  _onResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  register(password, email) {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(password, email)
    })
      .then(res => this._onResponse(res));
  }

  login(password, email) {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(password, email)
    })
      .then(res => this._onResponse(res))
      .then(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          return res;
        }
      });
  }

  checkTokenValid(token) {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => this._onResponse(res));
  }
}

const auth = new Auth();
export default auth;