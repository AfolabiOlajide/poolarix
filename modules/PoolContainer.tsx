import Link from "next/link";
import React from "react";

const PoolContainer = ({ pool, id }: { pool: PoolData, id:number }) => {
    return (
        <Link href={`/pools/${pool.id}`} className="bg-ash rounded-md p-[1.2rem] hover:scale-105 hover:button-shadow trans">
            <div className="">
                <h1 className="heading text-[2rem] text-orang">{`${pool.name}`}</h1>
                <p className="text-purp">{`${pool.description}`}</p>
                <h5>
                    Total Amount in pool:{" "}
                    <span>{pool.totalAmountInPool}</span>
                </h5>
            </div>
        </Link>
    );
};

export default PoolContainer;
