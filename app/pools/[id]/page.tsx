"use client";
import { MainButton } from "@/components/Buttons";
import LoadingScreen from "@/components/LoadingScreen";
import { DEPLOYED_CONTRACT } from "@/utils/exports";
import TruncateAddress from "@/utils/truncateAddress";
import {
    useContract,
    useContractRead,
    useContractWrite,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { FaSlackHash } from "react-icons/fa";

const page = ({ params }: { params: { id: string } }) => {
    const time = Date.now() + 1000 * 60 * 10;

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
    const Completionist = () => <MainButton>Pick Winners</MainButton>;

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

    //
    const { mutateAsync: enterPoolFree, isLoading: enterPoolLoading } =
        useContractWrite(contract, "enterPoolFree");
    const handleEnterFree = async () => {
        try {
            const data = await enterPoolFree({ args: [Number(params.id)] });
            console.log("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    const { mutateAsync: buyTicket, isLoading: buyTicketLoading } =
        useContractWrite(contract, "buyTicket");
    const handleBuyTicket = async () => {
        try {
            const data = await buyTicket({ args: [Number(params.id)] });
            console.log("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
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

    // Pick Single winner
    const {
        mutateAsync: pickSingleWinner,
        isLoading: pickSingleWinnerLoading,
    } = useContractWrite(contract, "pickSingleWinner");
    const pickOneWinner = async () => {
        try {
            const data = await pickSingleWinner({ args: [Number(params.id)] });
            console.log("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    // Pick multiple winners
    const { mutateAsync: pickMultipleWinners, isLoading: pickMultipleWinnersLoading } = useContractWrite(
        contract,
        "pickMultipleWinners"
    );

    const pickManyWinners = async () => {
        try {
            const data = await pickMultipleWinners({ args: [pools && pools[0].numWinners, Number(params.id)] });
            console.log("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    const handlePickWinners = async() => {
        if(pools){
            if(pools[0].numUsers > 1){
                await pickManyWinners();
            }else if(pools[0].numUsers === 1){
                await pickOneWinner();
            }
        }
    }

    return (
        <div className=" mt-[2rem]">
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <div className="pool-details">
                    <Countdown
                        date={pools && new Date(pools[0]?.duration).getTime()}
                        renderer={renderer}
                    />
                    <div className="head flex items-center justify-between">
                        <div className="pool-id flex items-center text-[2rem]">
                            <FaSlackHash className="text-main" />: {params.id}
                        </div>
                        <div className="cta flex items-center space-x-4">
                            {status === "OPEN" && (
                                <MainButton onClick={handleEnterPool}>
                                    Enter Pool
                                </MainButton>
                            )}
                            {pools &&
                            pools[0]?.numUsers === pools[0]?.maxNumTickets ? (
                                <MainButton onClick={handlePickWinners}>
                                    Select Winners
                                </MainButton>
                            ) : null}
                        </div>
                    </div>

                    <div className="name text-[3rem] heading text-main mt-[2]">
                        {pools && pools[0]?.name}
                    </div>
                    <div className="duration text-[1.2rem] mt-[1.2]">
                        {pools && pools[0]?.description}
                    </div>

                    <div className="tickets mt-7">
                        Tickets: {pools && pools[0]?.numUsers}/
                        {pools && pools[0]?.maxNumTickets}
                    </div>

                    <div className="participants">
                        <header className="mt-[2rem] mb-3 heading text-bold text-[1.5rem]">
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
                </div>
            )}
            {enterPoolLoading || (buyTicketLoading && <LoadingScreen />)}
        </div>
    );
};

export default page;
