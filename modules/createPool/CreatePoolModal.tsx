'use client'
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import CreatePool from "./CreatePool";

const CreatePoolModal = ({isOpen, toggle}: {isOpen: boolean, toggle?: () => void}) => {
    const [mounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    let portal;

    if(mounted){
        portal = document.getElementById("create-pool-modal");
    }


    return mounted ? createPortal(
        <main className={`createPoolModal ${isOpen ? "block" : "hidden"} fixed top-0 right-0 bottom-0 left-0`}>
            <div className="covering absolute z-[1] top-0 bottom-0 right-0 left-0 bg-black/10 backdrop-blur-[2rem]" onClick={toggle}></div>
            <div className="output min-h-[2rem] rounded-lg bg-slate-200 p-[2rem] relative z-[2] mt-[5%] max-w-[90%] mx-auto">
                <CreatePool />
            </div>
        </main>, portal as HTMLElement
    ) : null;
}

export default CreatePoolModal