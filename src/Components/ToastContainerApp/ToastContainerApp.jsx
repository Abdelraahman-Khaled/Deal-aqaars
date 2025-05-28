import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerApp = () => {
    return (
        <>
            <div className="toast-One">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
        </>
    );
};

export default ToastContainerApp;
