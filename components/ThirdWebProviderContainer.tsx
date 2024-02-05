'use client'
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

const ThirdWebProviderContainer = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <ThirdwebProvider activeChain={ChainId.Mumbai} clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
            {children}
        </ThirdwebProvider>
    );
};

export default ThirdWebProviderContainer;