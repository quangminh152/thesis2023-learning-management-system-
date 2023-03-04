import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next";
import ErrorPage from "next/error";
import type { ListResult } from "pocketbase";
import type { ClassesResponse, ScheduleAttachmentsResponse, SchedulesResponse } from "server-cheesecake";
import { Collections } from "server-cheesecake";
import MainLayout from "src/components/layouts/MainLayout";
import { getPBServer } from "src/lib/pb_server";
import SuperJSON from "superjson";
import Header from "src/components/layouts/Header";
import { useState } from "react";

import PocketBase from 'pocketbase';
import ScheduleRow from "./components/ScheduleRow";
const pb = new PocketBase('http://127.0.0.1:8090');

interface UsersData {
    classInfo: ClassesResponse;
    classList?: ListResult<ClassesResponse>[];
    scheduleList: ListResult<SchedulesResponse>;
    scheduleAttachment: ListResult<ScheduleAttachmentsResponse>;
}

function Users({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if (!data) {
        return <ErrorPage statusCode={404} />;
    }

    const dataParse = SuperJSON.parse<UsersData>(data);
    const classInfo = dataParse?.classInfo as ClassesResponse;
    const scheduleList = dataParse?.scheduleList as ListResult<SchedulesResponse>;
    const scheduleAttachment = dataParse?.scheduleAttachment as ListResult<ScheduleAttachmentsResponse>;

    const headerScheduleTable = ["Syllabus", "Lecture material", "Student notes"]
    const headerScoreTable = ["Inclass", "Midterm", "Final", "Overall (number)", "Overall (letter)"]

    const [statusComplete, setStatusComplete] = useState(classInfo.expand?.course.isComplete)
    const handleChangeStatus = async () => {
        await pb.collection('courses').update('RECORD_ID', data);
    }
    return (
        <>
            <Header />

            <main className="bg-slate-200 p-8 px-[8vw] h-screen">
                <article className="bg-white rounded-lg px-8 py-8 mb-8">
                    <h2 className="font-semibold text-xl leading-8 text-gray-600 pb-6 mb-6 border-b border-gray-400">Class Information</h2>
                    <div className="mb-6 grid grid-cols-[1fr_3fr] gap-x-0 gap-y-0">
                        <p className="text-lg font-semibold leading-8 text-gray-600 whitespace-nowrap">
                            Subject
                        </p>
                        <p className="text-lg font-bold leading-8 text-gray-800 whitespace-nowrap">
                            {classInfo.expand.course.name}
                        </p>

                        <p className="text-lg font-semibold leading-8 text-gray-600 whitespace-nowrap">
                            Lecturer
                        </p>
                        <p className="text-lg font-bold leading-8 text-gray-800 whitespace-nowrap">
                            {classInfo.lecturerName}
                        </p>

                        <p className="text-lg font-semibold leading-8 text-gray-600 whitespace-nowrap">
                            Email Address
                        </p>
                        <p className="text-lg font-bold leading-8 text-gray-800 whitespace-nowrap">
                            {classInfo.lecturerMail}
                        </p>

                        <p className="text-lg font-semibold leading-8 text-gray-600 whitespace-nowrap">
                            Semester
                        </p>
                        <p className="text-lg font-bold leading-8 text-gray-800 whitespace-nowrap">
                            {classInfo.semesterStudy}
                        </p>

                        <p className="text-lg font-semibold leading-8 text-gray-600 whitespace-nowrap">
                            Status
                        </p>
                        {statusComplete ? <button onClick={() => setStatusComplete(false)} className="text-lg font-bold leading-8 text-gray-800 whitespace-nowrap">
                            Complete
                        </button> : <button onClick={() => setStatusComplete(true)} className="">
                            Incomplete
                        </button>}

                    </div>

                    <h2 className="font-semibold text-xl leading-8 text-gray-600 pb-6 mb-6 border-b border-gray-400">Teaching schedule</h2>


                    <div className="grid gap-x-0 gap-y-0 grid-cols-[1fr_2fr_2fr_2fr] bg-sky-600">
                        <div className="">
                            <p className="min-w-fit pl-4 py-2 pr-4 text-lg font-regular leading-8 text-white whitespace-nowrap text-center">
                                Lectures
                            </p>
                        </div>

                        {headerScheduleTable.map((items, index) => {
                            return <p key={index} className="pl-4 py-2 pr-4 text-lg font-regular leading-8 text-white whitespace-nowrap text-center">
                                {items}
                            </p>
                        })}
                    </div>

                    <div className="grid gap-x-0 gap-y-0 grid-cols-[1fr_2fr_2fr_2fr] bg-gray-50">
                        {scheduleList.items.map(scheduleList => <ScheduleRow data={
                            {
                                session: scheduleList.session,
                                content: scheduleList.content,
                                course: "",
                                // classMaterial: scheduleAttachment,
                                // studentNote: scheduleList.studentNote,
                            }
                        } />)}
                    </div>

                    <h2 className="font-semibold text-xl leading-8 text-gray-600 pb-6 mb-6 border-b border-gray-400">Scores</h2>
                    <div className="grid gap-x-0 gap-y-0 grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] bg-sky-600">
                        {headerScoreTable.map((items, index) => {
                            return <p key={index} className="pl-4 py-2 pr-4 text-lg font-regular leading-8 text-white whitespace-nowrap text-center">
                                {items}
                            </p>
                        })}
                    </div>

                </article>
            </main>

        </>
    );
}

export const getServerSideProps = async ({
    req,
    query,
    res,
}: GetServerSidePropsContext) => {
    const pbServer = await getPBServer(req, res);
    const classID = query.classID as string;

    const classInfo = await pbServer
        .collection(Collections.ClassesInformation)
        .getOne<ClassesResponse>(classID, {
            expand: "course"
        });

    const scheduleList = await pbServer
        .collection(Collections.Schedules)
        .getList<SchedulesResponse>(1, 50, {
            filter: `course="${classInfo.course}"`,
        })

    const scheduleAttachment = await pbServer
        .collection(Collections.ScheduleAttachments)
        .getList<ScheduleAttachmentsResponse>(1, 50, {
            filter: `course="${classInfo.course}"`,
        })


    return {
        props: {
            data: SuperJSON.stringify({ classInfo, scheduleList, scheduleAttachment } as UsersData),
        },
    };
};

Users.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default Users;

