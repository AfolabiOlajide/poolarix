'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ConnectButton } from "./Buttons";
import { useAddress, useNetworkMismatch } from "@thirdweb-dev/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { mainNetwork } from "@/utils/exports";

const NavigationHeader = () => {
    const isMismatched = useNetworkMismatch();
    const pathName = usePathname();

    const address = useAddress();

    useEffect(() => {
        if(isMismatched){
            toast.warning(`please switch to the ${mainNetwork} Network`)
        }

    }, [address, isMismatched])

    return (
        <div className="flex items-center justify-between py-[2rem]">
            <div className="logo heading text-[3rem] text-main font-bold">Poolarix</div>
            <div className="nav-links flex items-center gap-6">
                <Link href={`/pools`}>
                    <span className={`heading text-[2rem] ${pathName === "/pools" && "bg-main text-dark"} p-2 rounded-md`}>Pools</span>
                </Link>
                <Link href={`/profile`}>
                    <span className={`heading text-[2rem] ${pathName === "/profile" && "bg-main text-dark"} p-2 rounded-md`}>profile</span>
                </Link>
            </div>
            <div className="connect-button">
                <ConnectButton />
            </div>
        </div>
    );
};

export default NavigationHeader;
