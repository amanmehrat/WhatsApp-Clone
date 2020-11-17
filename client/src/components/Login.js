import Modal from 'react-modal';
import React, { useState } from 'react'
import './Login.css'



Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
const Login = ({ setUser }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        setIsOpen(false);
        const RegisterUser = { name, password };
        setUser(RegisterUser);
        localStorage.setItem('auth_user', JSON.stringify(RegisterUser))
    }

    return (
        <Modal
            isOpen={isOpen}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="login">
                <div className="login__heading">WhatsApp Clone</div>
                <p><em>You can LoggedIn with any name & password(Testing purpose)</em></p>
            </div>
            <form>
                <div className="login__formGroup">
                    <label className="login__formGroupLabel"><b>Name</b></label>
                    <input className="login__formGroupInput" type="text" required onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div className="login__formGroup">
                    <label className="login__formGroupLabel"><b>Password</b></label>
                    <input className="login__formGroupInput" type="password" required onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <button type="submit" onClick={onSubmit}>Login</button>
            </form>
        </Modal>)
}

export default Login;
