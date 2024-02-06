'use client'
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { LightlinkPegasusTestnet } from "@thirdweb-dev/chains";

const ThirdWebProviderContainer = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <ThirdwebProvider activeChain={LightlinkPegasusTestnet } clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
            {children}
        </ThirdwebProvider>
    );
};

export default ThirdWebProviderContainer;