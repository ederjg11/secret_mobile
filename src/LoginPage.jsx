import { useState } from 'react';
import styles from './LoginPage.module.css';

/* ── SVG icons ── */
function LogoIcon() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* body / speech-bubble shape */}
      <ellipse cx="26" cy="30" rx="18" ry="18" fill="#D5006D" />
      {/* drip */}
      <path d="M20 47 Q22 54 26 52 Q30 54 32 47" fill="#D5006D" />
      {/* face highlight */}
      <circle cx="20" cy="27" r="3" fill="white" opacity="0.9" />
      <circle cx="32" cy="27" r="3" fill="white" opacity="0.9" />
      {/* smile */}
      <path d="M20 35 Q26 40 32 35" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* hat / top blob */}
      <ellipse cx="26" cy="13" rx="10" ry="7" fill="#D5006D" />
    </svg>
  );
}

function PersonIcon({ active }) {
  const color = active ? '#D5006D' : '#9E9E9E';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  );
}

function LockIcon({ active }) {
  const color = active ? '#D5006D' : '#9E9E9E';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>
  );
}

function FingerprintIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 6.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-2.43-6.62-2.43-9.49 0-1.36.69-2.5 1.69-3.4 2.95-.08.14-.23.23-.3.23zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.67-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.29.23-2.29.72-3.25 1.33-2.79 4.28-4.6 7.47-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z" />
    </svg>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`${styles.toggle} ${checked ? styles.toggleOn : styles.toggleOff}`}
    >
      <span className={styles.toggleThumb} />
    </button>
  );
}

/* ── CPF mask helper ── */
function maskCpf(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
}

/* ── Main component ── */
export default function LoginPage({ onLogin }) {
  const [activeTab, setActiveTab] = useState('login');
  const [cpf, setCpf] = useState('');
  const [cpfFocused, setCpfFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [biometric, setBiometric] = useState(true);

  function handleCpfChange(e) {
    setCpf(maskCpf(e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: integrate with authentication API
    if (onLogin) onLogin();
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Logo */}
        <div className={styles.logoArea}>
          <LogoIcon />
          <span className={styles.logoText}>
            face<span className={styles.logoAccent}>secret</span>
          </span>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'login' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'register' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Cadastre-se
          </button>
        </div>

        {/* Form */}
        {activeTab === 'login' && (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>

            <div className={`${styles.inputWrapper} ${cpfFocused ? styles.inputWrapperActive : ''}`}>
              <PersonIcon active={cpfFocused || cpf.length > 0} />
              <input
                type="text"
                inputMode="numeric"
                placeholder="CPF"
                value={cpf}
                onChange={handleCpfChange}
                onFocus={() => setCpfFocused(true)}
                onBlur={() => setCpfFocused(false)}
                className={`${styles.input} ${cpfFocused ? styles.inputActive : ''}`}
                aria-label="CPF"
                autoComplete="username"
              />
            </div>

            <div className={`${styles.inputWrapper} ${passwordFocused ? styles.inputWrapperActive : ''}`}>
              <LockIcon active={passwordFocused || password.length > 0} />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className={`${styles.input} ${passwordFocused ? styles.inputActive : ''}`}
                aria-label="Senha"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className={styles.loginButton}>
              FAZER LOGIN
            </button>

            <a href="#forgot" className={styles.forgotLink}>
              Esqueceu sua senha?
            </a>
          </form>
        )}

        {activeTab === 'register' && (
          <div className={styles.form}>
            <p className={styles.registerPlaceholder}>
              Formulário de cadastro em breve.
            </p>
          </div>
        )}

        {/* Biometric section */}
        <div className={styles.biometricSection}>
          <FingerprintIcon />
          <div className={styles.biometricRow}>
            <span className={styles.biometricLabel}>Acessar com a digital?</span>
            <Toggle checked={biometric} onChange={() => setBiometric((v) => !v)} />
          </div>
        </div>

        {/* Footer / version */}
        <div className={styles.footer}>
          v. 1.0
        </div>

      </div>
    </div>
  );
}
