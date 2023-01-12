import {apiConfig} from './data';

class Api {
  constructor(options) {
    this._options = options;
    this._headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
  }

//Метод для проверки ответа сервера
  _onResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка запроса. Код ошибки: ${res.status}`);
    }
  }

//Запрос данных пользователя
  requestUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => this._onResponse(res));
  }

//Изменение данных пользоваьеля
  patchUserInfo(name, about) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(name, about)
    })
      .then(res => this._onResponse(res));
  }

  patchUserAvatar(link) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => this._onResponse(res));
  }

  //Запрос списка карточек
  requestCardList() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(res => this._onResponse(res));
  }

  //Отправка новой корточки на сервер
  postCard(name, link) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(name, link)
    })
      .then(res => this._onResponse(res));
  }

  //Удаление карточки с сервера
  removeCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(res => this._onResponse(res));
  }

  //Поставить/снять лайк
  toggleLike(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then(res => this._onResponse(res));
    } else {
      return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then(res => this._onResponse(res));
    }
  }
}

const api = new Api(apiConfig);
export default api;
