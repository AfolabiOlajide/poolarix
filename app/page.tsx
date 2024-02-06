import Construction from "@/assets/under-construction.png"
import Image from "next/image";

export default function Home() {

    return (
        <main className="flex items-center justify-center flex-col space-y-5 min-h-[60vh] text-center">
            <Image src={Construction} alt="Contruction" width={20} className="w-[70%] md:w-[50%]" unoptimized/>
            <header className="heading text-[3rem] text-main">We are still building</header>
            <p className="text-main">(Anticipate)</p>
        </main>
    );
}
