import Link from "next/link";
import Image from "next/image";
import logo from "/Users/doquangminh/Desktop/Thesis 2023/thesis2023-learning-management-system-/packages/frontend-coffee/public/logo.png"

export default function Header() {
    return (

        <div className="fixed inset-x-0 top-0 flex items-center px-[8vw] py-2 h-24 bg-sky-600">
            <div className="flex items-center">
                <Image className="pr-2"
                    src={logo}
                    alt="Logo"
                    width={70}
                    height={70}
                />
                <h1 className="font-bold text-white">Learning Management System</h1>
            </div>

            <div className="grow ">
                <div className="flex items-center justify-center gap-2 md:gap-8 text-white">
                    <Link href="#">Home</Link>
                    <Link href="#">My Classes</Link>
                    <Link href="#">Personal Information</Link>
                </div>
            </div>
            <nav className="ml-auto">
                <ul className="flex items-center justify-center p-0 m-0 list-none">
                    <li className="ml-8">
                        <div className="relative flex items-center cursor-pointer">
                            <p className="text-white">
                                <b>Do Quang Minh</b>
                                <br />
                                ITITIU19028
                            </p>
                            <div className=" px-2 ml-16 flex justify-center items-center h-12 space-y-7 bg-white rounded whitespace-nowrap">
                                <a className="text-red-600 flex items-center font-bold" href="#">
                                    <svg
                                        width="25"
                                        height="24"
                                        viewBox="0 0 25 24"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g id="logout-icon-svg">
                                            <path
                                                id="Icon color"
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M5.15234 19H10.6523C10.9285 19 11.1523 19.2239 11.1523 19.5V20.5C11.1523 20.7761 10.9285 21 10.6523 21H5.15234C4.04777 21 3.15234 20.1046 3.15234 19V5C3.15234 3.89543 4.04777 3 5.15234 3H10.6523C10.9285 3 11.1523 3.22386 11.1523 3.5V4.5C11.1523 4.77614 10.9285 5 10.6523 5H5.15234V19ZM15.7923 6.15L20.9323 11.28C21.0712 11.4217 21.15 11.6116 21.1523 11.81V12.19C21.1522 12.3888 21.073 12.5795 20.9323 12.72L15.7923 17.85C15.6985 17.9447 15.5707 17.9979 15.4373 17.9979C15.304 17.9979 15.1762 17.9447 15.0823 17.85L14.3723 17.15C14.2777 17.0561 14.2244 16.9283 14.2244 16.795C14.2244 16.6617 14.2777 16.5339 14.3723 16.44L17.8223 13H7.65234C7.3762 13 7.15234 12.7761 7.15234 12.5V11.5C7.15234 11.2239 7.3762 11 7.65234 11H17.8223L14.3723 7.56C14.2783 7.46784 14.2253 7.34169 14.2253 7.21C14.2253 7.07831 14.2783 6.95216 14.3723 6.86L15.0823 6.15C15.1762 6.05534 15.304 6.0021 15.4373 6.0021C15.5707 6.0021 15.6985 6.05534 15.7923 6.15Z"
                                                fill="currentColor"
                                            />
                                        </g>
                                    </svg>
                                    Log out
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>

    )
}
