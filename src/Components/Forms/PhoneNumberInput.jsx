import React from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import './PhoneInput.css';

const PhoneNumberInput = ({ value, onChange }) => {
  return (
    <div className="PhoneInputContainer">
      <label className="PhoneInputLabel">
        Phone Number:
      </label>
      <PhoneInput
        placeholder="Enter phone number"
        value={value}
        onChange={onChange}
        defaultCountry="EG"
        international
        countryCallingCodeEditable={false}
        className="PhoneInput"
        inputClassName="PhoneInputInput"
      />
    </div>
  );
};

export default PhoneNumberInput;
