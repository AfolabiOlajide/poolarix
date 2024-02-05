'use client'
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import LoadingComponent from "./LoadingComponent";

const LoadingScreen = () => {
    const [mounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    let portal;

    if(mounted){
        portal = document.getElementById("loading-screen");
    }


    return mounted ? createPortal(
        <main className={`loadingScreen ${true ? "block" : "hidden"} fixed top-0 right-0 bottom-0 left-0`}>
            <div className="covering absolute z-[1] top-0 bottom-0 right-0 left-0 bg-black/10 backdrop-blur-[2rem]"></div>
            <div className="output min-h-[2rem] rounded-lg p-[2rem] relative z-[2] mt-[5%] md:w-[60%] max-w-[90%] mx-auto">
                <LoadingComponent />
            </div>
        </main>, portal as HTMLElement
    ) : null;
}

export default LoadingScreen