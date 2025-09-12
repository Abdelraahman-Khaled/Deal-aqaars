
import { useField } from 'formik';

const Switch = ({ name, ...props }) => {
    // Only call useField if name is provided, otherwise create default values
    const [field, , helpers] = name ? useField(name) : [{ value: false }, null, { setValue: () => {} }];

    return (
        <div className="form-check form-switch cursor-pointer">
            <input
                className="form-check-input"
                style={{ width: "36px", height: "20px" }}
                type="checkbox"
                role="switch"
                id={name}
                checked={field.value || false}
                onChange={(e) => helpers.setValue(e.target.checked)}
                {...props}
            />
        </div>
    );
};

export default Switch;
