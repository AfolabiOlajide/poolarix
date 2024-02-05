enum PoolStatus {
    CLOSED = "CLOSED",
    OPEN = "OPEN",
    FINISHED = "FINISHED"
}

interface PoolData {
    owner : string;
    name: string;
    description: string;
    totalAmountInPool: number;
    maxNumTickets: number;
    ticketsSold: string;
    ticketPrice: string;
    duration: number;
    numUsers: number;
    participants: string[];
    backers: string[];
    amountbacked: string[];
    winners: string[];
    claimedAddresses: string[];
    numWinners:  number;
    freeEntry: boolean;
    status: PoolStatus;
    id: number
}