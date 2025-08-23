
const Switch = ({ checked, onChange }) => {
    return (
        <div className="form-check form-switch cursor-pointer">
            <input className="form-check-input" style={{ width: "36px", height: "20px" }}
                type="checkbox" role="switch" id="flexSwitchCheckDefault"
                checked={checked}
                onChange={onChange || (() => {})}
            />
        </div>
    );
};

export default Switch;
