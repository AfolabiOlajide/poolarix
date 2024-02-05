'use client'
import { useState } from "react"

const useDisclosure = () => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const toggle = () => setIsOpen(prev => !prev);

    return { isOpen, toggle }
}

export default useDisclosure