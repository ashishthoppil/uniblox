import { LogInIcon, ShoppingBasket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const Header = () => {
    return (
        <div className="flex justify-between py-5 px-10 w-full">
            <div className="flex items-end justify-center gap-2">
                <Image
                    src="/logo.svg"
                    alt="Uniblox logo"
                    width={25}
                    height={25}
                    priority
                />
                <span className="font-bold text-[18px] text-zinc-800">Uniblox Market</span>
            </div>
            <div className="flex items-center gap-10">
                <div title="Cart" className="flex items-start">
                    <Link className="flex gap-1" href={'#'}><ShoppingBasket className="text-teal-600" /></Link>
                    <span className="bg-red-500 rounded-full py-[1px] px-[6px] text-white font-thin text-xs">1</span>
                </div>
                <button className="flex gap-1 items-center py-1 pl-1 pr-3 bg-teal-500 hover:bg-teal-600 text-white text-[14px] font-semibold rounded-md cursor-pointer">
                    <LogInIcon className="h-4" /> Login
                </button>
            </div>
        </div>
    )
}