import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";

export default function Header() {
    return (
        <nav style={{ backgroundColor: '#092137', height: 75}} className=" flex w-full justify-center py-4 items-center 
        border-b border-gray-300  backdrop-blur-2xl font-mono text-sm px-4 lg:px-0">
            <div className="max-w-3xl flex w-full items-center justify-between">
                <div className="font-medium text-xl text-indigo-900 flex items-center gap-2">
                    <Link href='/' style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                    <Logo className="w-4 h-4" />
                    <div style={{ color: 'white', marginLeft: 5, fontSize: '14px', marginBottom: -10}}>
                        Radio Station 20.24
                    </div>
                    </Link>
                    <Link href='/' style={{ color: 'white', marginLeft: 15, marginBottom: -7}} className='hover-link'>
                        Create
                    </Link>
                    <Link href='../songs' style={{ color: 'white', marginLeft: 15, marginBottom: -7}} className='hover-link'>
                        Library
                    </Link>
                    <Link href='../autoplay' style={{ color: 'white', marginLeft: 15, marginBottom: -7}} className='hover-link'>
                        Radio
                    </Link>
                </div>
            </div>
        </nav>
    );
}
