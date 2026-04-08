import { Fragment, useState } from 'react';
import styles from './RegisterFlow.module.css';

/* ── Helper masks ── */
function maskCpf(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
}

function maskPhone(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/\((\d{2})\) (\d)(\d{4})/, '($1) $2 $3')
    .replace(/\((\d{2})\) (\d) (\d{4})(\d+)/, '($1) $2 $3-$4');
}

/* ── Icons ── */
function LogoIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="26" cy="30" rx="18" ry="18" fill="#D5006D" />
      <path d="M20 47 Q22 54 26 52 Q30 54 32 47" fill="#D5006D" />
      <circle cx="20" cy="27" r="3" fill="white" opacity="0.9" />
      <circle cx="32" cy="27" r="3" fill="white" opacity="0.9" />
      <path d="M20 35 Q26 40 32 35" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="26" cy="13" rx="10" ry="7" fill="#D5006D" />
    </svg>
  );
}

function LogoIconWhite() {
  return (
    <svg width="110" height="110" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="26" cy="30" rx="18" ry="18" fill="white" />
      <path d="M20 47 Q22 54 26 52 Q30 54 32 47" fill="white" />
      <circle cx="20" cy="27" r="3" fill="#D5006D" opacity="0.7" />
      <circle cx="32" cy="27" r="3" fill="#D5006D" opacity="0.7" />
      <path d="M20 35 Q26 40 32 35" stroke="#D5006D" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      <ellipse cx="26" cy="13" rx="10" ry="7" fill="white" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#212121" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
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

function EmailIcon({ active }) {
  const color = active ? '#D5006D' : '#9E9E9E';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function PhoneIcon({ active }) {
  const color = active ? '#D5006D' : '#9E9E9E';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#9E9E9E" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#9E9E9E" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
    </svg>
  );
}

function ValidInputIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#4CAF50" />
      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ErrorInputIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#E53935" />
      <path d="M12 8v5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.2" fill="white" />
    </svg>
  );
}

function RuleCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#4CAF50" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  );
}

function RuleBulletIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#9E9E9E" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function StepCheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  );
}

/* ── Progress Dots ── */
function ProgressDots({ step }) {
  return (
    <div className={styles.progressBar} aria-label={`Passo ${step} de 4`}>
      {[1, 2, 3, 4].map((i, idx) => (
        <Fragment key={i}>
          {idx > 0 && (
            <div
              className={`${styles.progressLine} ${step > idx ? styles.progressLineFilled : ''}`}
            />
          )}
          <div
            className={`${styles.progressDot} ${
              step === i
                ? styles.progressDotActive
                : step > i
                ? styles.progressDotCompleted
                : ''
            }`}
          >
            {step > i && <StepCheckIcon />}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

/* ── Success Screen ── */
function SuccessPage({ onSuccess }) {
  return (
    <div className={styles.successPage}>
      <LogoIconWhite />
      <div className={styles.successTextArea}>
        <p className={styles.successTitle}>Seja bem-vindo ao</p>
        <p className={styles.successTitleBold}>facesecret</p>
        <p className={styles.successSubtitle}>
          Comece a compartilhar dados{'\n'}de maneira muito mais segura!
        </p>
      </div>
      <button className={styles.successButton} onClick={onSuccess}>
        FAZER LOGIN
      </button>
    </div>
  );
}

/* ── Main Component ── */
export default function RegisterFlow({ onCancel, onSuccess }) {
  const [step, setStep] = useState(1);

  /* Form data */
  const [cpf, setCpf] = useState('');
  const [cpfFocused, setCpfFocused] = useState(false);

  const [name, setName] = useState('');
  const [nameFocused, setNameFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneFocused, setPhoneFocused] = useState(false);

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const [token, setToken] = useState('');
  const [tokenFocused, setTokenFocused] = useState(false);

  /* Password validation rules */
  const hasSpecialChar = /[!@#$%^&*()\-_=+[\]{};:'",.<>?/\\|`~]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasMinLength = password.length >= 8;
  const passwordValid = hasSpecialChar && hasUppercase && hasMinLength;
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  function handleBack() {
    setStep((s) => s - 1);
  }

  function handleNext() {
    setStep((s) => s + 1);
  }

  /* Step 1 can advance if CPF is complete */
  const step1Valid = cpf.replace(/\D/g, '').length === 11;

  /* Step 2 can advance if all fields are filled and email is valid */
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const step2Valid = name.trim().length > 0 && emailValid && phone.replace(/\D/g, '').length >= 10;

  /* Step 3 can advance if password is valid and matches confirm */
  const step3Valid = passwordValid && passwordsMatch;

  /* Step 4 can advance if token is filled */
  const step4Valid = token.trim().length > 0;

  /* ── Success screen ── */
  if (step === 5) {
    return <SuccessPage onSuccess={onSuccess} />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Logo / Header */}
        <div className={styles.logoArea}>
          {step > 1 && (
            <button className={styles.backBtn} onClick={handleBack} aria-label="Voltar">
              <ArrowLeftIcon />
            </button>
          )}
          <div className={styles.logoContent}>
            <LogoIcon />
            <span className={styles.logoText}>
              face<span className={styles.logoAccent}>secret</span>
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button className={styles.tab} onClick={onCancel}>
            Login
          </button>
          <button className={`${styles.tab} ${styles.tabActive}`}>
            Cadastre-se
          </button>
        </div>

        {/* Progress dots */}
        <ProgressDots step={step} />

        {/* ── Step 1: CPF ── */}
        {step === 1 && (
          <div className={styles.form}>
            <h2 className={styles.stepTitle}>Bem vindo ao Face Secret!</h2>
            <p className={styles.stepDesc}>
              Você está a alguns passos de poder começar a mandar mensagens criptografadas.
              Para garantir total segurança, entre com o seu CPF:
            </p>

            <div className={`${styles.inputWrapper} ${cpfFocused ? styles.inputWrapperActive : ''}`}>
              <PersonIcon active={cpfFocused || cpf.length > 0} />
              <input
                type="text"
                inputMode="numeric"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(maskCpf(e.target.value))}
                onFocus={() => setCpfFocused(true)}
                onBlur={() => setCpfFocused(false)}
                className={styles.input}
                aria-label="CPF"
                autoComplete="off"
              />
            </div>

            <button
              className={styles.primaryButton}
              onClick={handleNext}
              disabled={!step1Valid}
            >
              AVANÇAR
            </button>
          </div>
        )}

        {/* ── Step 2: Personal Info ── */}
        {step === 2 && (
          <div className={styles.form}>
            <h2 className={styles.stepTitle}>Queremos te conhecer</h2>
            <p className={styles.stepDesc}>
              Agora precisamos de algumas informações básicas sobre você:
            </p>

            <div className={`${styles.inputWrapper} ${nameFocused ? styles.inputWrapperActive : ''}`}>
              <PersonIcon active={nameFocused || name.length > 0} />
              <span className={styles.inputLabel}>Nome</span>
              <input
                type="text"
                placeholder="Éder Gonçalves"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                className={styles.input}
                aria-label="Nome"
                autoComplete="name"
              />
            </div>

            <div className={`${styles.inputWrapper} ${emailFocused ? styles.inputWrapperActive : ''}`}>
              <EmailIcon active={emailFocused || email.length > 0} />
              <span className={styles.inputLabel}>E-mail</span>
              <input
                type="email"
                placeholder="contato@dominio.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className={styles.input}
                aria-label="E-mail"
                autoComplete="email"
              />
            </div>

            <div className={`${styles.inputWrapper} ${phoneFocused ? styles.inputWrapperActive : ''}`}>
              <PhoneIcon active={phoneFocused || phone.length > 0} />
              <span className={styles.inputLabel}>Celular</span>
              <input
                type="tel"
                placeholder="(00) 0 0000-0000"
                value={phone}
                onChange={(e) => setPhone(maskPhone(e.target.value))}
                onFocus={() => setPhoneFocused(true)}
                onBlur={() => setPhoneFocused(false)}
                className={styles.input}
                aria-label="Celular"
                autoComplete="tel"
              />
            </div>

            <button
              className={styles.primaryButton}
              onClick={handleNext}
              disabled={!step2Valid}
            >
              AVANÇAR
            </button>
          </div>
        )}

        {/* ── Step 3: Password ── */}
        {step === 3 && (
          <div className={styles.form}>
            <h2 className={styles.stepTitle}>Escolha uma senha</h2>
            <p className={styles.stepDesc}>
              Para garantir a segurança dos seus dados, a sua senha precisa ter:
            </p>

            <ul className={styles.passwordRules} aria-label="Requisitos de senha">
              <li className={styles.ruleItem}>
                {hasSpecialChar ? <RuleCheckIcon /> : <RuleBulletIcon />}
                <span className={`${styles.ruleText} ${hasSpecialChar ? styles.ruleTextValid : ''}`}>
                  01 caractere especial
                </span>
              </li>
              <li className={styles.ruleItem}>
                {hasUppercase ? <RuleCheckIcon /> : <RuleBulletIcon />}
                <span className={`${styles.ruleText} ${hasUppercase ? styles.ruleTextValid : ''}`}>
                  01 letra maiúscula
                </span>
              </li>
              <li className={styles.ruleItem}>
                {hasMinLength ? <RuleCheckIcon /> : <RuleBulletIcon />}
                <span className={`${styles.ruleText} ${hasMinLength ? styles.ruleTextValid : ''}`}>
                  Pelo menos 08 caracteres
                </span>
              </li>
            </ul>

            {/* Password input */}
            <div>
              <div
                className={`${styles.inputWrapper} ${
                  passwordTouched && !passwordValid
                    ? styles.inputWrapperError
                    : passwordTouched && passwordValid
                    ? styles.inputWrapperValid
                    : ''
                }`}
              >
                {passwordTouched && !passwordValid ? (
                  <ErrorInputIcon />
                ) : passwordTouched && passwordValid ? (
                  <ValidInputIcon />
                ) : (
                  <PersonIcon active={false} />
                )}
                <span className={styles.inputLabel}>Senha:</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordTouched(true);
                  }}
                  className={styles.input}
                  aria-label="Senha"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {passwordTouched && !hasMinLength && (
                <p className={styles.inputError}>Insira pelo menos 8 caracteres</p>
              )}
              {passwordTouched && hasMinLength && !hasUppercase && (
                <p className={styles.inputError}>Insira pelo menos uma letra maiúscula</p>
              )}
              {passwordTouched && hasMinLength && hasUppercase && !hasSpecialChar && (
                <p className={styles.inputError}>Insira pelo menos um caractere especial</p>
              )}
            </div>

            {/* Confirm password input */}
            <div>
              <div
                className={`${styles.inputWrapper} ${
                  confirmTouched && !passwordsMatch
                    ? styles.inputWrapperError
                    : confirmTouched && passwordsMatch
                    ? styles.inputWrapperValid
                    : ''
                }`}
              >
                {confirmTouched && !passwordsMatch ? (
                  <ErrorInputIcon />
                ) : confirmTouched && passwordsMatch ? (
                  <ValidInputIcon />
                ) : (
                  <PersonIcon active={false} />
                )}
                <span className={styles.inputLabel}>Confirmar:</span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmTouched(true);
                  }}
                  className={styles.input}
                  aria-label="Confirmar senha"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={showConfirmPassword ? 'Ocultar confirmação' : 'Mostrar confirmação'}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {confirmTouched && confirmPassword.length > 0 && !passwordsMatch && (
                <p className={styles.inputError}>As senhas não coincidem</p>
              )}
            </div>

            <button
              className={styles.primaryButton}
              onClick={handleNext}
              disabled={!step3Valid}
            >
              AVANÇAR
            </button>
          </div>
        )}

        {/* ── Step 4: Token ── */}
        {step === 4 && (
          <div className={styles.form}>
            <h2 className={styles.stepTitle}>Token de segurança</h2>
            <p className={styles.stepDesc}>
              Você acabou de receber um e-mail com um código de segurança. Digite-o abaixo para
              garantir que apenas este aparelho possua acesso ao Face Secret. Dessa forma evitamos
              possíveis invasões e garantimos mais segurança para os seus dados.
            </p>

            <div className={`${styles.inputWrapper} ${tokenFocused ? styles.inputWrapperActive : ''}`}>
              <span className={styles.inputLabel}>Código recebido:</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="00000000"
                value={token}
                onChange={(e) => setToken(e.target.value.replace(/\D/g, '').slice(0, 8))}
                onFocus={() => setTokenFocused(true)}
                onBlur={() => setTokenFocused(false)}
                className={styles.input}
                aria-label="Código de segurança"
                autoComplete="one-time-code"
              />
            </div>

            <button
              className={styles.primaryButton}
              onClick={handleNext}
              disabled={!step4Valid}
            >
              CONCLUIR
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
