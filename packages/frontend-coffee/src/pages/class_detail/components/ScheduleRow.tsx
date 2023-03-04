import React from "react";
import { SchedulesResponse } from "server-cheesecake";

interface IRowProps {
    data: SchedulesResponse;
}
function ScheduleRow({ data }: IRowProps) {
    console.log("Data Schedule Row", data);
    const { session, content, classMaterial, studentNote } = data && data
    return data && (
        <>
            {/* <div className="grid gap-x-0 gap-y-0 grid-cols-[1fr_2fr_2fr_2fr] bg-gray-100"> */}
            <div className="">
                <p className="min-w-fit pl-4 py-2 pr-4 text-lg font-regular leading-8 text-black whitespace-nowrap text-center">
                    {data.session}
                </p>
            </div>
            <div className="">
                <p className="min-w-fit pl-4 py-2 pr-4 text-lg font-regular leading-8 text-black whitespace-nowrap text-center">
                    {data.content}
                </p>
            </div>
            <div className="">
                <p className="min-w-fit pl-4 py-2 pr-4 text-lg font-regular leading-8 text-black whitespace-nowrap text-center">
                    {data.classMaterial}
                </p>
            </div>
            <div className="">
                <p className="min-w-fit pl-4 py-2 pr-4 text-lg font-regular leading-8 text-black whitespace-nowrap text-center">
                    {data.studentNote}
                </p>
            </div>
            {/* </div> */}
        </>

    )
}

export default ScheduleRow;
