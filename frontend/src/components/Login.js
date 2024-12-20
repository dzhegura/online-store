import React from 'react';

function Login() {
    function Log() {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const data = { login, password };

        console.log('Отправляемые данные:', data);

        const api = 'http://localhost:9001/login';

        fetch(api, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (!res.ok) throw new Error('Ошибка авторизации');
                return res.json();
            })
            .then((result) => {
                console.log('Ответ сервера:', result);
                if (result.token) {
                    localStorage.setItem('token', result.token);
                    console.log('Токен сохранен в localStorage:', result.token);
                } else {
                    console.error('Токен не получен');
                }
            })
            .catch((err) => console.error('Ошибка запроса:', err.message));
    }

    return (
        <>
            <h1>Логин</h1>
            <input id="login" type="text" placeholder="Логин" />
            <input id="password" type="password" placeholder="Пароль" />
            <button onClick={Log}>Войти</button>
        </>
    );
}

export default Login;