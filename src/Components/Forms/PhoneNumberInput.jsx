import { useState } from "react";
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'
import './PhoneNumberValidation.css'
import { isValidPhoneNumber } from 'libphonenumber-js';

function PhoneNumberValidation({ field, form, placeholder, onChangeExtra }) {
  const [valid, setValid] = useState(true);
  const [countryCode, setCountryCode] = useState("eg"); // Default country code

  const handleChange = (value, country) => {
    form.setFieldValue(field.name, value); // ✅ Update Formik value
    setCountryCode(country.countryCode);
    setValid(isValidPhoneNumber(value, country.countryCode.toUpperCase()));
    if (onChangeExtra && typeof onChangeExtra === 'function') {
      onChangeExtra(value);
    }
  };

  return (
    <div className="phoneValidation-container">
      <PhoneInput
        country={countryCode}
        value={field.value}
        onChange={handleChange}
        inputProps={{
          required: true
        }}
        placeholder={"+201121323475" || placeholder}
      />
      {!valid && <p className="error fs-8">Please enter a valid phone number</p>}
    </div>
  );
}
export default PhoneNumberValidation