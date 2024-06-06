import Image from 'next/image';

export function Header() {
    return (
        <div className='w-full overflow-hidden mb-5'>
        <header className="m-2 flex items-center justify-between px-2">
            <div className="font-bold text-xl flex-1 cursor-pointer">ECOMMERCE</div>
            <div className='grow'>
                <nav className="flex items-center justify-end space-x-4 text-sm mr-6">
                    <a href="#" className="text-gray-600">Help</a>
                    <a href="#" className="text-gray-600">Orders & Returns</a>
                    <a href="#" className="text-gray-600">Hi, John</a>
                </nav>
                <nav className="flex items-center justify-between space-x-4 font-semibold text-base">
                    <div className='flex items-center space-x-5 ml-12'>
                        <a href="#" className="text-gray-600">Categories</a>
                        <a href="#" className="text-gray-600">Sale</a>
                        <a href="#" className="text-gray-600">Clearance</a>
                        <a href="#" className="text-gray-600">New stock</a>
                        <a href="#" className="text-gray-600">Trending</a>
                    </div>
                    <div className='flex items-center space-x-4 pr-6 mt-3'>
                        <Image src="/search_icon.svg" alt="Search" width={24} height={24} className="cursor-pointer" />
                        <Image src="/cart_icon.svg" alt="Cart" width={24} height={24} className="cursor-pointer" />
                    </div>
                </nav>
            </div>
        </header>
            <div className="h-9 w-full bg-[#F4F4F4] flex items-center justify-center">
                <div className="flex items-center justify-center">
                <Image src="/left_arrow.png" alt="left arrow" width={9} height={12} className="mr-3 cursor-pointer"/>
                <p className="h-[18px] font-medium leading-4 mx-4">Get 10% off on business sign up</p>
                <Image src="/right_arrow.png" alt="right arrow" width={9} height={9} className="ml-3 rotate-180 cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}
