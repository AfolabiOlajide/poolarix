"use client";

import TruncateAddress from "@/utils/truncateAddress";
import {
    metamaskWallet,
    useAddress,
    useConnect,
    useDisconnect,
} from "@thirdweb-dev/react";
import { useEffect } from "react";
import { toast } from "sonner";

const metamaskConfig = metamaskWallet({
    projectId: process.env.NEXT_PUBLIC_CLIENT_ID,
    connectionMethod: "metamaskBrowser", // or 'metamaskBrowser',
    recommended: true,
});

export const ConnectButton = () => {
    const address = useAddress();
    const disconnect = useDisconnect();
    const connect = useConnect();

    const handleConnectWallet = async () => {
        try {
            const wallet = await connect(metamaskConfig);
            toast.success(`Connected Successfully`);
        } catch (error) {
            toast.error("Error Connectin to metamask");
        }
    };

    const handleDisconnect = () => {
        disconnect()
        toast.warning("Wallet has been disconnected")
    }

    return (
        <div
            className={`heading p-2 bg-main text-dark text-[1.3rem] font-bold rounded-md cursor-pointer trans hover:scale-105 button-shadow
                        flex flex-col items-center justify-center`}
            onClick={address ? handleDisconnect : handleConnectWallet}
        >
            {address ? "Disconnect": "Connect Wallet"}
            <span className="address text-[.8rem]">{address && TruncateAddress(address)}</span>
        </div>
    );
};

export const MainButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <div
            className={`heading p-2 bg-main text-dark text-[1.3rem] font-bold rounded-md cursor-pointer trans hover:scale-105 button-shadow`}
            onClick={onClick}
        >
            Connect Wallet
        </div>
    );
};
