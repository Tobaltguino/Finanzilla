import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdError,
} from 'react-icons/md';
import '../styles/Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpiar errores
    setEmailError('');
    setPasswordError('');
    let hasError = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación de email
    if (!emailRegex.test(email)) {
      setEmailError('Formato de correo no válido');
      hasError = true;
    } else if (email !== 'a@gmail.com') {
      setEmailError('Correo incorrecto');
      hasError = true;
    }

    // Validación de contraseña
    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      hasError = true;
    } else if (password !== '123456') {
      setPasswordError('Contraseña incorrecta');
      hasError = true;
    }

    if (!hasError) {
      console.log('✅ Iniciando sesión...');
      navigate('/transacciones');
      console.log('➡️ Redirigiendo...');
    } else {
      console.log('❌ Credenciales inválidas');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <div className="input-with-icon">
              <MdEmail className="input-icon" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                className={emailError ? 'error' : ''}
              />
            </div>
            {emailError && (
              <p className="error-text">
                <MdError className="error-icon" /> {emailError}
              </p>
            )}
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <div className="input-with-icon">
              <MdLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={passwordError ? 'error' : ''}
              />
              <button
                type="button"
                className="show-icon-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <MdVisibilityOff className="eye-icon" />
                ) : (
                  <MdVisibility className="eye-icon" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="error-text">
                <MdError className="error-icon" /> {passwordError}
              </p>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Entrar
          </button>
          <p className="signup-text">
            ¿No tienes cuenta? <Link to="/signup">Regístrate</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
