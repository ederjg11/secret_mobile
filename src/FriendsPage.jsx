import { useState } from 'react';
import styles from './FriendsPage.module.css';

/* ── SVG Icons ── */
function ArrowLeftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#212121" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
  );
}

function NavMenuIcon({ active }) {
  const color = active ? '#D5006D' : '#9E9E9E';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    </svg>
  );
}

function NavPersonIcon({ active }) {
  const color = active ? '#D5006D' : '#9E9E9E';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  );
}

function NavPersonAddIcon({ active }) {
  const color = active ? '#D5006D' : '#9E9E9E';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function NavSettingsIcon({ active }) {
  const color = active ? '#D5006D' : '#9E9E9E';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </svg>
  );
}

function NavBellIcon({ active }) {
  const color = active ? '#D5006D' : '#9E9E9E';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#9E9E9E" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#9E9E9E" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}

function PersonAvatarIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#BDBDBD" />
      <path d="M20 20c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6zm0 3c-4.01 0-12 2.01-12 6v3h24v-3c0-3.99-7.99-6-12-6z" fill="#ffffff" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
}

/* ── Mock data ── */
const MOCK_FRIENDS = [
  { id: 1, name: 'Gustavo Almeida', phone: '(00) 00000-0000' },
  { id: 2, name: 'Amanda Finotti', phone: '(00) 00000-0000' },
  { id: 3, name: 'Augusto Fonseca', phone: '(00) 00000-0000' },
  { id: 4, name: 'Mariana Calixto', phone: '(00) 00000-0000' },
  { id: 5, name: 'Carlos Young', phone: '(00) 00000-0000' },
  { id: 6, name: 'Rita Teixeira', phone: '(00) 00000-0000' },
];

/* ── Main Component ── */
export default function FriendsPage({ onBack, onAddFriend }) {
  const [activeNav, setActiveNav] = useState('contacts');
  const [search, setSearch] = useState('');

  const filteredFriends = MOCK_FRIENDS.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Header */}
        <header className={styles.header}>
          <button className={styles.backBtn} onClick={onBack} aria-label="Voltar">
            <ArrowLeftIcon />
          </button>
          <h1 className={styles.title}>Amigos</h1>
        </header>

        {/* Navigation bar */}
        <nav className={styles.navbar} aria-label="Navegação principal">
          <button
            className={`${styles.navBtn} ${activeNav === 'menu' ? styles.navBtnActive : ''}`}
            onClick={() => setActiveNav('menu')}
            aria-label="Menu"
            aria-current={activeNav === 'menu' ? 'page' : undefined}
          >
            <NavMenuIcon active={activeNav === 'menu'} />
          </button>
          <button
            className={`${styles.navBtn} ${activeNav === 'contacts' ? styles.navBtnActive : ''}`}
            onClick={() => setActiveNav('contacts')}
            aria-label="Contatos"
            aria-current={activeNav === 'contacts' ? 'page' : undefined}
          >
            <NavPersonIcon active={activeNav === 'contacts'} />
          </button>
          <button
            className={`${styles.navBtn} ${activeNav === 'addContact' ? styles.navBtnActive : ''}`}
            onClick={() => setActiveNav('addContact')}
            aria-label="Adicionar contato"
            aria-current={activeNav === 'addContact' ? 'page' : undefined}
          >
            <NavPersonAddIcon active={activeNav === 'addContact'} />
          </button>
          <button
            className={`${styles.navBtn} ${activeNav === 'settings' ? styles.navBtnActive : ''}`}
            onClick={() => setActiveNav('settings')}
            aria-label="Configurações"
            aria-current={activeNav === 'settings' ? 'page' : undefined}
          >
            <NavSettingsIcon active={activeNav === 'settings'} />
          </button>
          <button
            className={`${styles.navBtn} ${activeNav === 'notifications' ? styles.navBtnActive : ''}`}
            onClick={() => setActiveNav('notifications')}
            aria-label="Notificações"
            aria-current={activeNav === 'notifications' ? 'page' : undefined}
          >
            <NavBellIcon active={activeNav === 'notifications'} />
          </button>
        </nav>

        {/* Search bar */}
        <div className={styles.searchWrapper}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Busque por um amigo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar amigo"
          />
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
        </div>

        {/* Total count */}
        <p className={styles.totalCount}>
          Total: <strong>{filteredFriends.length}</strong>
        </p>

        {/* Friends list */}
        <ul className={styles.friendsList} aria-label="Lista de amigos">
          {filteredFriends.map((friend) => (
            <li key={friend.id} className={styles.friendItem}>
              <div className={styles.avatar}>
                <PersonAvatarIcon />
              </div>
              <div className={styles.friendInfo}>
                <span className={styles.friendName}>{friend.name}</span>
                <span className={styles.friendPhone}>{friend.phone}</span>
              </div>
              <button className={styles.dotsBtn} aria-label={`Opções para ${friend.name}`}>
                <DotsIcon />
              </button>
            </li>
          ))}
        </ul>

        {/* FAB — Add friend */}
        <button
          className={styles.fab}
          onClick={onAddFriend}
          aria-label="Adicionar novo amigo"
        >
          <PlusIcon />
        </button>

      </div>
    </div>
  );
}
