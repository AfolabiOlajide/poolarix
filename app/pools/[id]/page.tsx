"use client";
import { MainButton } from "@/components/Buttons";
import LoadingScreen from "@/components/LoadingScreen";
import { DEPLOYED_CONTRACT } from "@/utils/exports";
import TruncateAddress from "@/utils/truncateAddress";
import {
    useAddress,
    useContract,
    useContractRead,
    useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { FaSlackHash } from "react-icons/fa";

const page = ({ params }: { params: { id: string } }) => {
    const address = useAddress();

    const [fundAmount, setFundAmount] = useState<string>("");
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
            maxNumTickets: pool.maxNumTickets.toNumber(),
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
            (pool: PoolData) => pool.id === Number(params.id)
        );

        setPools(ownerPools);
    }, [data]);

    console.log(pools);

    // Random component
    const Completionist = () => {
        return (
            <div className="mb-[2rem] flex items-center justify-center">
                <header className="heading text-main text-[1.7rem] md:text-[2rem] lg:text-[3rem]">
                    POOL HAS ENDED
                </header>
                {/* <MainButton>Pick Winners</MainButton> */}
            </div>
        );
    };

    // Renderer callback with condition
    const renderer = ({
        hours,
        minutes,
        seconds,
        completed,
    }: {
        hours: any;
        minutes: any;
        seconds: any;
        completed: boolean;
    }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return (
                <div className="flex justify-center items-center space-x-3">
                    <div className="hours heading text-main text-[4rem]">
                        {hours}
                    </div>
                    <span className="text-main text-[4rem]">:</span>
                    <div className="minutes heading text-main text-[4rem]">
                        {minutes}
                    </div>
                    <span className="text-main text-[4rem]">:</span>
                    <div className="seconds heading text-main text-[4rem]">
                        {seconds}
                    </div>
                </div>
            );
        }
    };

    const status =
        pools && pools[0]?.status === 0
            ? "OPEN"
            : pools && pools[0]?.status === 1
            ? "CLOSED"
            : pools && pools[0].status === 2
            ? "FINISHED"
            : null;

    // Enter Pool Free
    const { mutateAsync: enterPoolFree, isLoading: enterPoolLoading } =
        useContractWrite(contract, "enterPoolFree");
    const handleEnterFree = async () => {
        try {
            const data = await enterPoolFree({
                args: [Number(params.id)],
                overrides: { gasPrice: 0},
            });
            console.log("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    // Buy Ticket
    const { mutateAsync: buyTicket, isLoading: buyTicketLoading } =
        useContractWrite(contract, "buyTicket");
    const handleBuyTicket = async () => {
        if (pools) {
            try {
                const data = await buyTicket({
                    args: [
                        Number(params.id),
                        ethers.utils.parseEther(pools[0].ticketPrice),
                    ],
                    overrides: {
                        value: ethers.utils.formatEther(pools[0].ticketPrice),
                        gasPrice: 0
                    },
                });
                console.log("contract call successs", data);
            } catch (err) {
                console.error("contract call failure", err);
            }
        }
    };

    // Function to handle enter pool
    const handleEnterPool = async () => {
        if (pools) {
            if (pools[0].freeEntry === true) {
                await handleEnterFree();
            } else {
                await handleBuyTicket();
            }
        }
    };

    //
    // Fund Pool
    const { mutateAsync: fundPool, isLoading: fundPoolLoading } =
        useContractWrite(contract, "fundPool");

    const handleFundPool = async () => {
        try {
            const data = await fundPool({
                args: [params.id, ethers.utils.parseEther(fundAmount)],
                overrides: { value: ethers.utils.parseEther(fundAmount), gasPrice: 0 },
            });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    // Pick Single winner
    const { mutateAsync: makeRequestUint256, isLoading: pickOneWinnerLoading } =
        useContractWrite(contract, "makeRequestUint256");

    const pickOneWinner = async () => {
        try {
            const data = await makeRequestUint256({
                args: [Number(params.id)],
                overrides: { gasPrice: 0}
            });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    // Pick multiple winners
    const {
        mutateAsync: makeRequestUint256Array,
        isLoading: pickMultipleWinnersLoading,
    } = useContractWrite(contract, "makeRequestUint256Array");

    const pickManyWinners = async () => {
        try {
            const data = await makeRequestUint256Array({
                args: [pools && pools[0].numWinners, Number(params.id)],
                overrides: { gasPrice: 0}
            });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    const handlePickWinners = async () => {
        if (pools) {
            if (pools[0].numUsers > 1) {
                await pickManyWinners();
            } else if (pools[0].numUsers === 1) {
                await pickOneWinner();
            }
        }
    };

    // Claim reward
    const { mutateAsync: claimWinnings, isLoading: claimIsLoading } =
        useContractWrite(contract, "claimWinnings");
    const claim = async () => {
        try {
            const data = await claimWinnings({ args: [Number(params.id)] });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    return (
        <div className=" mt-[2rem] mb-[3rem]">
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <div className="pool-details">
                    {pools && (
                        <Countdown
                            date={pools[0]?.duration}
                            renderer={renderer}
                        />
                    )}
                    <div className="head flex items-center justify-between">
                        <div className="pool-id flex items-center text-[2rem]">
                            <FaSlackHash className="text-main" />: {params.id}
                        </div>
                        <div className="cta flex items-center space-x-4">
                            {status === "OPEN" &&
                                pools &&
                                Date.now() < pools[0].duration && (
                                    <MainButton onClick={handleEnterPool}>
                                        Enter Pool
                                    </MainButton>
                                )}
                            {pools &&
                            Date.now() > pools[0].duration &&
                            pools[0].winners.length === 0 ? (
                                <MainButton onClick={handlePickWinners}>
                                    Select Winners
                                </MainButton>
                            ) : null}
                            {pools &&
                                pools[0].winners.includes(
                                    address as string
                                ) && (
                                    <MainButton onClick={claim}>
                                        Claim
                                    </MainButton>
                                )}
                        </div>
                    </div>

                    <div className="name text-[2rem] lg:text-[3rem] heading text-main mt-[2]">
                        {pools && pools[0]?.name}
                    </div>
                    <div className="duration text-[1.2rem] mt-[1.2]">
                        {pools && pools[0]?.description}
                    </div>

                    {/* How Much in pool */}
                    <div className="tickets mt-7 text-[1.2rem]">
                        Amount In Pool: {pools && pools[0]?.totalAmountInPool}
                    </div>

                    {/* tickets */}
                    <div className="tickets mt-7">
                        Tickets: {pools && pools[0]?.numUsers}/
                        {pools && pools[0]?.maxNumTickets}
                    </div>

                    {/* fund pool */}
                    <div className="back-pool flex flex-col space-y-3 justify-center items-center">
                        <h2 className="heading text-[2rem]">Back Pool</h2>
                        <div className="form flex items-center justify-center space-x-5">
                            <input
                                type="text"
                                name="name"
                                placeholder="Amount"
                                className="input-control"
                                value={fundAmount}
                                onChange={(e) => setFundAmount(e.target.value)}
                            />
                        </div>
                        <MainButton onClick={handleFundPool}>
                            Fund Pool
                        </MainButton>
                    </div>

                    <div className="list flex items-start justify-between mt-[3rem]">
                        <div className="participants">
                            <header className="mt-[2rem] mb-3 heading text-bold text-blu text-[1.5rem]">
                                List of participants
                            </header>
                            {pools &&
                                pools[0]?.participants.map((user) => {
                                    return (
                                        <span key={user} className="block mb-2">
                                            {TruncateAddress(user)}
                                        </span>
                                    );
                                })}
                        </div>
                        <div className="winners">
                            <header className="mt-[2rem] mb-3 heading text-bold text-blu text-[1.5rem]">
                                Winner(s) List
                            </header>
                            {pools &&
                                pools[0]?.winners.map((user) => {
                                    return (
                                        <span key={user} className="block mb-2">
                                            {TruncateAddress(user)}
                                        </span>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            )}
            {enterPoolLoading || (buyTicketLoading && <LoadingScreen />)}
        </div>
    );
};

export default page;
