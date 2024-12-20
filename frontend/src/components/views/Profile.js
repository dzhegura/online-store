import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      console.log('Токен перед отправкой:', token);

      try {
        const res = await fetch('http://localhost:9001/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Ошибка авторизации');
        const data = await res.json();
        console.log('Данные профиля:', data);
        setUserData(data);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке профиля:', err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:9001/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newEmail, newPassword }),
      });

      if (!res.ok) throw new Error('Ошибка обновления данных');

      alert('Данные успешно обновлены!');

      setNewEmail('');
      setNewPassword('');
    } catch (err) {
      console.error('Ошибка при обновлении данных:', err.message);
      setError(err.message);
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile">
      <h1>Профиль</h1>
      <p>Логин: {userData.login}</p>
      <p>Email: {userData.email}</p>
      <div>
        <input
          placeholder="Новый Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          autoComplete="email"
        />
      </div>
      <div>
        <input
          placeholder="Новый Пароль"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <button onClick={updateProfile}>Обновить</button>
    </div>
  );
}

export default Profile;
