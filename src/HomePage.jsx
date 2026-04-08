import { useRef, useState } from 'react';
import styles from './HomePage.module.css';

/* ── SVG Icons ── */
function LogoIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="26" cy="30" rx="18" ry="18" fill="#D5006D" />
      <path d="M20 47 Q22 54 26 52 Q30 54 32 47" fill="#D5006D" />
      <circle cx="20" cy="27" r="3" fill="white" opacity="0.9" />
      <circle cx="32" cy="27" r="3" fill="white" opacity="0.9" />
      <path d="M20 35 Q26 40 32 35" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="26" cy="13" rx="10" ry="7" fill="#D5006D" />
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

function ImagePlaceholderIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
    </svg>
  );
}

function InsertImageIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#D5006D" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#9E9E9E" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
  );
}

/* ── Main Component ── */
export default function HomePage({ userName = 'Éder' }) {
  const [activeNav, setActiveNav] = useState('menu');
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  function handleEncrypt() {
    // TODO: integrate with encryption API
    alert('Criptografar: ' + text);
  }

  function handleInsertImage() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: integrate with image upload API
      setSelectedImage(file.name);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Header */}
        <header className={styles.header}>
          <LogoIcon />
          <span className={styles.logoText}>
            face<span className={styles.logoAccent}>secret</span>
          </span>
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

        {/* Welcome card */}
        <div className={styles.welcomeCard}>
          <div className={styles.welcomeImage} aria-hidden="true">
            <ImagePlaceholderIcon />
          </div>
          <div className={styles.welcomeText}>
            <p className={styles.welcomeTitle}>Seja bem vindo, {userName}!</p>
            <p className={styles.welcomeSubtitle}>Vamos trabalhar com mais segurança?</p>
          </div>
        </div>

        {/* Text area */}
        <div className={styles.textAreaWrapper}>
          <textarea
            className={styles.textArea}
            placeholder="Insira aqui o texto que deseja criptografar ou cole a mensagem que deseja decodificar."
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Texto para criptografar ou decodificar"
          />
        </div>

        {/* Bottom section */}
        <div className={styles.bottom}>

          {/* Image insert row */}
          <button className={styles.insertImageRow} onClick={handleInsertImage} aria-label="Inserir um arquivo de imagem">
            <InsertImageIcon />
            <span className={styles.insertImageLabel}>
              {selectedImage ?? 'Inserir um arquivo de imagem'}
            </span>
            <ArrowRightIcon />
          </button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={handleFileChange}
            aria-hidden="true"
            tabIndex={-1}
          />

          {/* Encrypt button */}
          <button className={styles.encryptButton} onClick={handleEncrypt}>
            CRIPTOGRAFAR
          </button>
        </div>

      </div>
    </div>
  );
}
