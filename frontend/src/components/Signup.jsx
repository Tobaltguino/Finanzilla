import { Link } from 'react-router-dom';
import { MdPerson, MdEmail, MdLock } from 'react-icons/md';
import '../styles/Login.css';

function Signup() {
  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Crear Cuenta</h2>
        <form>
          <div className="input-group">
            <label>Nombre de usuario</label>
            <div className="input-with-icon">
              <MdPerson className="input-icon" />
              <input type="text" placeholder="Tu nombre de usuario" required />
            </div>
          </div>

          <div className="input-group">
            <label>Email</label>
            <div className="input-with-icon">
              <MdEmail className="input-icon" />
              <input type="email" placeholder="tucorreo@ejemplo.com" required />
            </div>
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <div className="input-with-icon">
              <MdLock className="input-icon" />
              <input type="password" placeholder="••••••••" required />
            </div>
          </div>

          <div className="input-group">
            <label>Confirmar Contraseña</label>
            <div className="input-with-icon">
              <MdLock className="input-icon" />
              <input type="password" placeholder="••••••••" required />
            </div>
          </div>

          <button type="submit">Registrarse</button>
          <p className="signup-text">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
