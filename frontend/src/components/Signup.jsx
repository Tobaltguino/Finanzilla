import { Link } from 'react-router-dom';
import { MdPerson, MdEmail, MdLock } from 'react-icons/md';
import '../styles/Login.css';
import { useState } from 'react';
import { useAuth } from '../context/useAuth';

function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, SetCPassword] = useState('')

  const { register_user } = useAuth();

  const handleRegister = () => {
    register_user(username, email, password, cpassword)
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Crear Cuenta</h2>
        <form>
          <div className="input-group">
            <label>Nombre de usuario</label>
            <div className="input-with-icon">
              <MdPerson className="input-icon" />
              <input type="text" 
              placeholder="Tu nombre de usuario" 
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email</label>
            <div className="input-with-icon">
              <MdEmail className="input-icon" />
              <input type="email" 
              placeholder="tucorreo@ejemplo.com" 
              required 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <div className="input-with-icon">
              <MdLock className="input-icon" />
              <input type="password" 
              placeholder="••••••••" 
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Confirmar Contraseña</label>
            <div className="input-with-icon">
              <MdLock className="input-icon" />
              <input type="password" 
              placeholder="••••••••" 
              required 
              onChange={(e) => SetCPassword(e.target.value)}
              value={cpassword}
              />
            </div>
          </div>

          <button type="submit" onClick={handleRegister}>Registrarse</button>
          <p className="signup-text">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
