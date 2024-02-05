import { HashLoader } from "react-spinners";

const LoadingComponent = () => {
    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <HashLoader color="#FAF2B1" size={200}/>
        </div>
    );
};

export default LoadingComponent;
