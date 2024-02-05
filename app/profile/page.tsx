"use client";
import { DEPLOYED_CONTRACT } from "@/utils/exports";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import LoginImage from "@/assets/login.png";
import Image from "next/image";
import LoadingComponent from "@/components/LoadingComponent";
import { MainButton } from "@/components/Buttons";
import PoolContainer from "@/modules/PoolContainer";
import useDisclosure from "@/hooks/useDisclosure";
import CreatePoolModal from "@/modules/createPool/CreatePoolModal";

const Profile = () => {
    const { isOpen, toggle } = useDisclosure()

    const address = useAddress();
    const [pools, setPools] = useState<PoolData[]>();
    // const { getPools, contract } = useAppContext();
    const { data: contract } = useContract(DEPLOYED_CONTRACT);

    const { data, isLoading } = useContractRead(contract, "getAllPools");

    useEffect(() => {
        const parsedPools = data?.map((pool: any, i: number) => ({
            id: i,
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
            status: pool.status,
        }));

        const ownerPools = parsedPools?.filter(
            (pool: PoolData) => pool.owner === address
        );

        setPools(ownerPools);
    }, [data]);

    return (
        <div>
            {!address && (
                <div className=" flex justify-center items-center flex-col">
                    <Image
                        src={LoginImage}
                        alt="Login"
                        className="w-[50%]"
                        width={20}
                        unoptimized
                    />
                    <header className="heading text-[2rem]">
                        Login to view Profile
                    </header>
                </div>
            )}
            {address &&
                (isLoading ? (
                    <LoadingComponent />
                ) : !pools ? (
                    <div className="nothing-here">
                        <p>
                            You have no Pools, create a pool or participate in a
                            pool
                        </p>
                        <MainButton>Create Pool</MainButton>
                    </div>
                ) : (
                    <div className="owners-profile mt-[2rem]">
                        <div className="top flex items-center space-x-5 mb-[2rem]">
                            <header className="heading text-purp text-[2rem] ">
                                Created Pool
                            </header>
                            <div className="add w-[3rem] h-[3rem] rounded-full bg-main/35 text-dark text-[2rem] flex justify-center items-center cursor-pointer" onClick={toggle}>
                                <FaPlus />
                            </div>
                        </div>
                        <div className="pool-list grid grid-cols-4 gap-4">
                            {data &&
                                (pools as unknown as PoolData[])?.map(
                                    (pool: PoolData, i: number) => {
                                        return (
                                            <PoolContainer
                                                key={pool.id}
                                                id={i + 1}
                                                pool={pool}
                                            />
                                        );
                                    }
                                )}
                        </div>
                    </div>
                ))}

                {/* create pool modal */}
                <CreatePoolModal isOpen={isOpen} toggle={toggle}/>
        </div>
    );
};

export default Profile;
