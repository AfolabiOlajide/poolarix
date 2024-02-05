'use client'
import { useAppContext } from "@/context/AppContext"
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers"; 
import LoadingComponent from "@/components/LoadingComponent";
import PoolContainer from "@/modules/PoolContainer";


const Pool = () => {
    const [pools, setPools] = useState();
    // const { getPools, contract } = useAppContext();
    const { data: contract } = useContract("0xAD27748d2605F9C06CE9C2b3C738c1262acc565A");


    const { data, isLoading } = useContractRead(contract, "getAllPools")

    const { data: fundsCollected, } = useContractRead(contract, "TotalFundsCollected")

    useEffect(() => {
        const parsedPools = data?.map((pool: any, i: number) => ({
            id: i+1,
            owner: pool.owner,
            name: pool.name,
            description: pool.description,
            amountInPool: pool.totalAmountInPool.toNumber(),
            maxNumTicket: pool.maxNumTickets.toNumber(),
            ticketsSold: pool.ticketsSold.toString(),
            ticketPrice: pool.ticketPrice.toString(),
            duration: pool.duration.toNumber(),
            numUser: pool.numUsers.toNumber(),
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

    console.log(pools)


    return (
        <div>
            <header className="heading text-[2rem] text-purp text-center">All Pools</header>
            {
                isLoading ? <LoadingComponent /> : (
                    <div className="pool-list grid grid-cols-4 gap-4">
                        {
                            data && data.map((pool: PoolData, i: number) => {
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