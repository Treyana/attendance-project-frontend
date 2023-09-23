import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { selectTeacherById } from './teacherSlice';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Decrypt() {

    const { userId } =useParams()
    const emailSentUser = useSelector((state) => selectTeacherById(state,Number(userId)))
    // const [message, setMessage] = useState("");
    const [encryptedMessage, setEncryptedMessage] = useState(emailSentUser.password);
    const [decryptedMessage, setDecryptedMessage] = useState('');

    // const encryptMessage = () => {
    //     const encrypted = CryptoJS.AES.encrypt(message, 'secret_key').toString();
    //     setEncryptedMessage(encrypted);
    // };

    const decryptMessage = () => {
        try {
            const decrypted = CryptoJS.AES.decrypt(encryptedMessage, 'secret_key').toString(CryptoJS.enc.Utf8);
            setDecryptedMessage(decrypted);
        } catch (error) {
            console.error('Error decrypting message:', error);
            setDecryptedMessage('Error decrypting message');
        }
    };

    return (
        <div>
            <h2>Message Encryption/Decryption</h2>
            <div>
                {/* <label>Message:</label> */}
                {/* <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                /> */}
                {/* <button onClick={encryptMessage}>Encrypt</button> */}
            </div>
            <div>
                <label>Encrypted Message:</label>
                <p>{encryptedMessage}</p>
            </div>
            <div>
                <label>Decrypted Message:</label>
                <p>{decryptedMessage}</p>
                <button onClick={decryptMessage}>Decrypt</button>
            </div>
        </div>
    );
}

export default Decrypt;
