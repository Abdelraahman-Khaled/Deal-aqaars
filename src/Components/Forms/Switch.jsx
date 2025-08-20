
const Switch = ({ checked }) => {


    return (
        <div class="form-check form-switch cursor-pointer" >
            <input class="form-check-input " style={{ width: "36px", height: "20px" }}
                type="checkbox" role="switch" id="flexSwitchCheckDefault"
                checked={checked}
            />
        </div>
    );
};

export default Switch;
