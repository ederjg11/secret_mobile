import { useState } from 'react';
import styles from './AddFriendPage.module.css';

/* ── SVG Icons ── */
function ArrowLeftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#212121" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
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

function PersonAddIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#D5006D" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
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

function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
    </svg>
  );
}

/* ── Mock search results ── */
const ALL_USERS = [
  { id: 10, name: 'Ana Paula Silva', phone: '(00) 00000-0000' },
  { id: 11, name: 'Bruno Carvalho', phone: '(00) 00000-0000' },
  { id: 12, name: 'Carla Mendes', phone: '(00) 00000-0000' },
  { id: 13, name: 'Diego Rocha', phone: '(00) 00000-0000' },
  { id: 14, name: 'Elisa Ferreira', phone: '(00) 00000-0000' },
];

/* ── Main Component ── */
export default function AddFriendPage({ onBack }) {
  const [search, setSearch] = useState('');
  const [addedIds, setAddedIds] = useState([]);

  const results =
    search.trim().length > 0
      ? ALL_USERS.filter((u) =>
          u.name.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  function handleAdd(id) {
    setAddedIds((prev) => [...prev, id]);
  }

  function handleShare() {
    // TODO: integrate with native share / messaging API
    alert('Compartilhar link de convite');
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Header */}
        <header className={styles.header}>
          <button className={styles.backBtn} onClick={onBack} aria-label="Voltar">
            <ArrowLeftIcon />
          </button>
          <h1 className={styles.title}>Adicionar Amigo</h1>
        </header>

        {/* Search bar */}
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Pesquisar usuário..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Pesquisar usuário"
            autoFocus
          />
        </div>

        {/* Hint text */}
        {search.trim().length === 0 && (
          <p className={styles.hint}>
            Digite o nome de um amigo para encontrá-lo no sistema.
          </p>
        )}

        {/* Search results */}
        {search.trim().length > 0 && results.length === 0 && (
          <p className={styles.noResults}>Nenhum usuário encontrado.</p>
        )}

        {results.length > 0 && (
          <ul className={styles.resultsList} aria-label="Resultados da pesquisa">
            {results.map((user) => {
              const added = addedIds.includes(user.id);
              return (
                <li key={user.id} className={styles.resultItem}>
                  <div className={styles.avatar}>
                    <PersonAvatarIcon />
                  </div>
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.userPhone}>{user.phone}</span>
                  </div>
                  <button
                    className={`${styles.addBtn} ${added ? styles.addBtnAdded : ''}`}
                    onClick={() => !added && handleAdd(user.id)}
                    aria-label={added ? `${user.name} já adicionado` : `Adicionar ${user.name}`}
                    disabled={added}
                  >
                    {added ? 'Adicionado' : (
                      <>
                        <PersonAddIcon />
                        <span>Adicionar</span>
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* Share section */}
        <div className={styles.shareSection}>
          <p className={styles.shareText}>
            Seu amigo ainda não tem cadastro?
          </p>
          <button className={styles.shareBtn} onClick={handleShare}>
            <ShareIcon />
            <span>Compartilhar Convite</span>
          </button>
        </div>

      </div>
    </div>
  );
}
