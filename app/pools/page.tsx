'use client'
import { useAppContext } from "@/context/AppContext"
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers"; 
import LoadingComponent from "@/components/LoadingComponent";
import PoolContainer from "@/modules/PoolContainer";
import { DEPLOYED_CONTRACT } from "@/utils/exports";


const Pool = () => {
    const [pools, setPools] = useState();
    // const { getPools, contract } = useAppContext();
    const { data: contract } = useContract(DEPLOYED_CONTRACT);


    const { data, isLoading } = useContractRead(contract, "getAllPools")

    useEffect(() => {
        const parsedPools = data?.map((pool: any, i: number) => ({
            id: i+1,
            owner: pool.owner,
            name: pool.name,
            description: pool.description,
            totalAmountInPool: pool.totalAmountInPool.toNumber(),
            maxNumTicket: pool.maxNumTickets.toNumber(),
            ticketsSold: pool.ticketsSold.toString(),
            ticketPrice: pool.ticketPrice.toString(),
            duration: pool.duration.toNumber(),
            numUsers: pool.numUsers.toNumber(),
            participants: pool.participants,
            backers: pool.backers,
            amountBacked: pool.amountbacked,
            winners: pool.winners,
            claimedAddresses: pool.claimedAddresses,
            numWinners: pool.numWinners.toNumber(),
            freeEntry: pool.freeEntry,
            status: pool.status
            }));

        setPools(parsedPools);
    }, [data])


    return (
        <div>
            <header className="heading text-[2rem] text-purp text-center">All Pools</header>
            {
                isLoading ? <LoadingComponent /> : (
                    <div className="pool-list grid grid-cols-4 gap-4">
                        {
                            data && (pools as unknown as PoolData[])?.map((pool: PoolData, i: number) => {
                                return <PoolContainer key={pool.id} id={i+1} pool={pool} />
                            })
                        }
                    </div>
                )
            } 
        </div>
    )
}

export default Pool