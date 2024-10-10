import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <div >

            <section className='contact'>
            <h1>Pagina admin PMS</h1>
            <fieldset>
            <legend>Login</legend>
                <form>
                <div className='input-box'>
                    <div className="input-field">
                    <label>Usuario</label>
                    <input 
                    type="text" 
                    name="user"/>
                    <span className="focus" />
                    </div>
                    <div className="input-field">
                    <label>Contraseña</label>
                    <input type="password" name="password"/>
                    <span className="focus" />
                    </div>
                    </div>
                </form>
                <div className="btn-box btns">
            <Link to="/wall" >
              <button type="submit" className="btn">
                Login
              </button>
            </Link>
          </div>
            </fieldset>
            </section>
        </div>
    );
}

export default Admin;
