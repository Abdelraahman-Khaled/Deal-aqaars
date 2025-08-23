import React, { useState } from 'react';
import InputFiled from './InputField';

const TestPasswordToggle = () => {
    const [inputType, setInputType] = useState('password');
    const [password, setPassword] = useState('');
    
    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="container mt-5">
            <h3>Password Input Test</h3>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <p className="b-11 pb-2">Password with toggle <span>*</span></p>
                    <InputFiled
                        name="testPassword"
                        type={inputType}
                        placeholder={"• • • • • • • •"}
                        success
                        setInputType={setInputType}
                        showPasswordToggle={true}
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6 mb-4">
                    <p className="b-11 pb-2">Regular input (no toggle) <span>*</span></p>
                    <InputFiled
                        name="regularInput"
                        type="text"
                        placeholder={"Regular input"}
                        success
                    />
                </div>
            </div>
        </div>
    );
};

export default TestPasswordToggle;