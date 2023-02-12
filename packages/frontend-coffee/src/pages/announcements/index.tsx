import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import Link from "next/link";
import type { ListResult } from "pocketbase";
import type { CurriculumsResponse, DepartmentsResponse, MajorsRecord, MajorsResponse, RegistrationsResponse, UsersResponse } from "server-cheesecake";
import { Collections } from "server-cheesecake";
import MainLayout from "src/components/layouts/MainLayout";
import { User } from "src/contexts/AuthContextProvider";
import { getPBServer } from "src/lib/pb_server";
import SuperJSON from "superjson";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from "next/image";
import Image1 from '/Users/doquangminh/Desktop/learning-management-system-for-it-department/packages/frontend-coffee/public/thumbnail.jpg'

interface UsersData {
    users: ListResult<UsersResponse>;
    record: UsersResponse
    curriculum: ListResult<CurriculumsResponse>
}

function Users({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if (!data) {
        return <ErrorPage statusCode={404} />;
    }

    const dataParse = SuperJSON.parse<UsersData>(data);

    const usersList = dataParse.users.items.map((user) => (
        <li key={user.id}>{JSON.stringify(user)}</li>
    )) ?? <p>{"Error when fetching event documents :<"}</p>;

    const currentUser = dataParse.record;
    const major = currentUser.expand?.major as MajorsResponse;
    const department = major.expand?.department as DepartmentsResponse;
    const curriculum = dataParse.curriculum;

    return (
        <>

            <div className={"container mx-auto flex items-center border-b-2 px-6 py-2 h-24"}>
                <h1 className="font-bold">Learning Management System</h1>
                <div className="grow ">
                    <div className="flex items-center justify-center gap-2 md:gap-8">
                        <Link href="#">My Classes</Link>
                        <Link href="#">My Classes</Link>
                    </div>
                </div>
                <nav className="ml-auto">
                    <ul className="flex items-center justify-center p-0 m-0 list-none">
                        <li className="ml-8">
                            <div className="relative flex items-center cursor-pointer">
                                <p>
                                    <b>Do Quang Minh</b>
                                    <br />
                                    ITITIU19028
                                </p>
                                <div className="ml-16 flex justify-center items-center h-12 space-y-7 bg-white rounded whitespace-nowrap">
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

            <main className="bg-slate-200 p-8 px-[8vw]">
                <article className="bg-white rounded-lg px-8 py-8 mb-8">
                    <h2 className="font-semibold text-xl leading-8 text-gray-600 pb-6 mb-6 border-b border-gray-400">Announcements</h2>
                    <article className="relative flex flex-wrap items-center">
                        <a className="text-xl text-indigo-600 w-3/4" href="#">
                            <h3>
                                THÔNG BÁO VỀ KHẢO SÁT SINH VIÊN TỐT NGHIỆP_HỌC KỲ 1 NĂM HỌC
                                2020-2021
                            </h3>
                        </a>
                        <footer className="text-l w-1/4 py-4 text-gray-400 text-right">
                            <time dateTime="2021-05-16 19:00">16/05/2021</time>
                        </footer>
                    </article>

                    <article className="relative flex flex-wrap items-center">
                        <a className="text-xl text-indigo-600 w-3/4" href="#">
                            <h3>
                                THÔNG BÁO VỀ KHẢO SÁT SINH VIÊN TỐT NGHIỆP_HỌC KỲ 1 NĂM HỌC
                                2020-2021
                            </h3>
                        </a>
                        <footer className="text-l w-1/4 py-4 text-gray-400 text-right">
                            <time dateTime="2021-05-16 19:00">16/05/2021</time>
                        </footer>
                    </article>

                    <div className="flex items-center justify-between bg-white py-6 ">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <a
                                href="#"
                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Previous
                            </a>
                            <a
                                href="#"
                                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Next
                            </a>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                                    <span className="font-medium">97</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                    {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                                    <a
                                        href="#"
                                        aria-current="page"
                                        className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                                    >
                                        1
                                    </a>
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                                    >
                                        2
                                    </a>
                                    <a
                                        href="#"
                                        className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                                    >
                                        3
                                    </a>
                                    <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                                        ...
                                    </span>
                                    <a
                                        href="#"
                                        className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                                    >
                                        8
                                    </a>
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                                    >
                                        9
                                    </a>
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                                    >
                                        10
                                    </a>
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                                    >
                                        <span className="sr-only">Next</span>
                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </article>

                <article className="bg-white rounded-lg px-8 py-8 mb-8">
                    <h2 className="font-semibold text-xl leading-8 text-gray-600 pb-6 mb-6 border-b border-gray-400">My classes</h2>
                    <div className="grid grid-cols-4 gap-8">
                        <div className="relative flex flex-col rounded-lg border border-gray-300">
                            <Image className="rounded-t-lg object-cover brightness-75" src={Image1} alt="Course Cover" />
                            <h3 className="pt-2 pr-4 pl-4 text-lg font-semibold leading-8 text-gray-800">Digital Logic Design</h3>
                            <h3 className="pt-0 pr-4 pb-2 pl-4 text-lg font-semibold leading-8 text-gray-800">Lecturer: Huynh Kha Tu</h3>
                        </div>

                        <div className="relative flex flex-col rounded-lg border border-gray-300">
                            <Image className="rounded-t-lg object-cover brightness-75" src={Image1} alt="Course Cover" />
                            <h3 className="pt-2 pr-4 pl-4 text-lg font-semibold leading-8 text-gray-800">Digital Logic Design</h3>
                            <h3 className="pt-0 pr-4 pb-2 pl-4 text-lg font-semibold leading-8 text-gray-800">Lecturer: Huynh Kha Tu</h3>
                        </div>

                        <div className="relative flex flex-col rounded-lg border border-gray-300">
                            <Image className="rounded-t-lg object-cover brightness-75" src={Image1} alt="Course Cover" />
                            <h3 className="pt-2 pr-4 pl-4 text-lg font-semibold leading-8 text-gray-800">Digital Logic Design</h3>
                            <h3 className="pt-0 pr-4 pb-2 pl-4 text-lg font-semibold leading-8 text-gray-800">Lecturer: Huynh Kha Tu</h3>
                        </div>

                        <div className="relative flex flex-col rounded-lg border border-gray-300">
                            <Image className="rounded-t-lg object-cover brightness-75" src={Image1} alt="Course Cover" />
                            <h3 className="pt-2 pr-4 pl-4 text-lg font-semibold leading-8 text-gray-800">Digital Logic Design</h3>
                            <h3 className="pt-0 pr-4 pb-2 pl-4 text-lg font-semibold leading-8 text-gray-800">Lecturer: Huynh Kha Tu</h3>
                        </div>

                        <div className="relative flex flex-col rounded-lg border border-gray-300">
                            <Image className="rounded-t-lg object-cover brightness-75" src={Image1} alt="Course Cover" />
                            <h3 className="pt-2 pr-4 pl-4 text-lg font-semibold leading-8 text-gray-800">Digital Logic Design</h3>
                            <h3 className="pt-0 pr-4 pb-2 pl-4 text-lg font-semibold leading-8 text-gray-800">Lecturer: Huynh Kha Tu</h3>
                        </div>

                        <div className="relative flex flex-col rounded-lg border border-gray-300">
                            <Image className="rounded-t-lg object-cover brightness-75" src={Image1} alt="Course Cover" />
                            <h3 className="pt-2 pr-4 pl-4 text-lg font-semibold leading-8 text-gray-800">Digital Logic Design</h3>
                            <h3 className="pt-0 pr-4 pb-2 pl-4 text-lg font-semibold leading-8 text-gray-800">Lecturer: Huynh Kha Tu</h3>
                        </div>

                        <div className="relative flex flex-col rounded-lg border border-gray-300">
                            <Image className="rounded-t-lg object-cover brightness-75" src={Image1} alt="Course Cover" />
                            <h3 className="pt-2 pr-4 pl-4 text-lg font-semibold leading-8 text-gray-800">Digital Logic Design</h3>
                            <h3 className="pt-0 pr-4 pb-2 pl-4 text-lg font-semibold leading-8 text-gray-800">Lecturer: Huynh Kha Tu</h3>
                        </div>

                    </div>
                </article>
            </main>


        </>
    );
}

export const getServerSideProps = async ({
    req,
    res,
}: GetServerSidePropsContext) => {
    const pbServer = await getPBServer(req, res);
    const user = pbServer.authStore.model as User;

    const temp = await pbServer
        .collection(Collections.Users)
        .getList<UsersResponse>(1, 50, {
            expand: "registrations(user).class",
        });

    console.log(temp);

    const userRegistration = await pbServer
        .collection(Collections.Registrations)
        .getFirstListItem<RegistrationsResponse>(`student="${user.id}"`)

    const userRegistrations = await pbServer
        .collection(Collections.Registrations)
        .getList<RegistrationsResponse>(1, 50, {
            filter: `student="${user.id}"`,
        })

    // for (const userRegistration of userRegistrations) {
    const curriculum = await pbServer.collection(Collections.Curriculums).getList<CurriculumsResponse>(1, 50, {
        filter: `class = "${userRegistration.class}"`,
    });

    const users = await pbServer
        .collection(Collections.Users)
        .getList<UsersResponse>(1, 50, {
            expand: "major",
        });

    const record = await pbServer.collection(Collections.Users).getFirstListItem<UsersResponse>(`id="${user.id}"`, {
        expand: 'major,major.department',
    });

    return {
        props: {
            data: SuperJSON.stringify({ users, record, curriculum }),
        },
    };
};

Users.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default Users;

