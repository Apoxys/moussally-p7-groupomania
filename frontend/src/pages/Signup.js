import React from 'react';

const Signup = () => {
    return (
        <div>
            This is a Signup page
            <label for='userMail'>
                E-mail
                <input type="text" name="userMail" />
            </label>
            <label for="userPassword">
                Password
                <input type='text' name="userPassword" />
            </label>
            <input type='button' value="Sign up!" />
        </div>
    );
};

export default Signup;