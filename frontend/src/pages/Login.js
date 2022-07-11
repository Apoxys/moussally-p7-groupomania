import React from 'react';

const Login = () => {
    return (
        <div>
            This is a login page
            <label for='userMail'>
                E-mail
                <input type="text" name="userMail" />
            </label>
            <label for="userPassword">
                Password
                <input type='text' name="userPassword" />
            </label>
            <input type='button' value="Log in!" />
        </div>
    );
};

export default Login;