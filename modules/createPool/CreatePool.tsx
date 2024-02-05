import { MainButton } from "@/components/Buttons";
import LoadingScreen from "@/components/LoadingScreen";
import { DEPLOYED_CONTRACT } from "@/utils/exports";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CreatePool = ({toggle}: {toggle?: () => void}) => {
    // Use states
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [numberOfTickets, setnumberOfTickets] = useState<number>();
    const [ticketPrice, setTicketPrice] = useState<string>();
    const [numberOfWinner, setNumberOfWinners] = useState<number>();
    const [endDate, setEndDate] = useState<number>();
    const [freeEntry, setFreeEntry] = useState<boolean>(false);

    const canCreate = Boolean(name) && Boolean(description)  && Boolean(numberOfTickets)  && Boolean(ticketPrice)  && Boolean(numberOfWinner); 

    const { contract } = useContract(DEPLOYED_CONTRACT);
    const { mutateAsync: createPool, isLoading } = useContractWrite(
        contract,
        "createPool"
    );

    const call = async () => {
        if(!canCreate){
            toast.warning("Please Complete the form");
            return
        }
        try {
            const data = await createPool({
                args: [
                    name,
                    description,
                    numberOfTickets,
                    parseInt(ticketPrice as string),
                    numberOfWinner,
                    freeEntry,
                ],
            });
            toast.success("Pool creation successful");
            toggle;
            console.log("contract call successs", data);
            setName('')
            setDescription("")
            setnumberOfTickets(0)
            setTicketPrice("")
            setNumberOfWinners(0);
            setEndDate(0)
        } catch (err) {
            toast.error("Error Creating pool");
            console.error("contract call failure", err);
        }
    };

    return (
        <div>
            {/* loading screen */}
            {
                isLoading && <LoadingScreen />
            }
            <div className="head flex items-center justify-center">
                <header className="bg-main px-[2.3rem] py-[1rem] rounded-md text-dark heading text-[2rem] font-bold">
                    Create Pool
                </header>
            </div>

            <form className="mt-[2rem] space-y-[1rem]">
                {/* name */}
                <div className="form-control">
                    <input
                        value={name}
                        type="text"
                        name="name"
                        placeholder="name"
                        className="input-control"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                {/* descrtiption */}
                <div className="form-control">
                    <textarea
                        rows={3}
                        name="name"
                        placeholder="description"
                        className="input-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                {/* number of tickets */}
                <div className="form-control">
                    <input
                        type="number"
                        name="name"
                        placeholder="Max number of tickets"
                        className="input-control"
                        value={numberOfTickets}
                        onChange={(e) =>
                            setnumberOfTickets(parseInt(e.target.value))
                        }
                    />
                </div>
                {/* number of winners */}
                <div className="form-control">
                    <input
                        type="number"
                        name="name"
                        placeholder="Number of winners"
                        className="input-control"
                        value={numberOfWinner}
                        onChange={(e) =>
                            setNumberOfWinners(parseInt(e.target.value))
                        }
                    />
                </div>
                {/* ticket price */}
                <div className="form-control">
                    <input
                        type="text"
                        name="name"
                        placeholder="Ticket  (If Pool is free put 0)"
                        className="input-control"
                        value={ticketPrice}
                        onChange={(e) =>
                            setTicketPrice(e.target.value)
                        }
                    />
                </div>
                {/* End Date */}
                <div className="form-control">
                    <input
                        type="datetime-local"
                        name="name"
                        placeholder="Ticket Price (If Pool is free put 0)"
                        className="input-control"
                        value={endDate && new Date(endDate as number)
                            .toISOString()
                            .slice(0, 16)}
                        onChange={(e) => {
                            const date = new Date(e.target.value).getTime();
                            setEndDate(date);
                        }}
                    />
                </div>
            </form>
            <h2 className="heading mt-[2rem]">Is Pool free?</h2>
            <div className="set-entry flex items-center space-x-3 mt-[1.3rem]">
                <span onClick={() => setFreeEntry(true)} className={`${freeEntry ? "bg-main text-dark" :  "bg-gray-600 text-main"} p-[1.2rem] cursor-pointer rounded-md heading block`}>Yes</span>
                <span onClick={() => setFreeEntry(false)} className={`${freeEntry ? "bg-gray-600 text-main" :  "bg-main text-dark"} p-[1.2rem] cursor-pointer rounded-md heading block`}>No</span>
            </div>

            <div className="cta mt-[1.4rem]">
                <MainButton onClick={call}>Create</MainButton>
            </div>
        </div>
    );
};

export default CreatePool;
