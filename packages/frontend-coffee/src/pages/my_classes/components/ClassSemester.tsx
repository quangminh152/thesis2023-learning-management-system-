import React from "react";
import Image from "next/image";
import Image1 from "/packages/frontend-coffee/public/thumbnail.jpg";

interface IClassProps {
    dataSubjects: any;
}
function ClassSemester({ dataSubjects }: IClassProps) {
    console.log(dataSubjects)
    return (
        <div>
            <div className="flex justify-between">
                <p className="font-regular flex pb-4 text-xl leading-8 text-gray-700">
                    {/* {dataSubjects.items[1].seme} */}
                </p>

                <p className="font-regular flex pb-4 text-right text-xl leading-8 text-blue-700">
                    Add class
                </p>
            </div>

            {dataSubjects && (
                <div className="grid grid-cols-4 gap-8">
                    {dataSubjects.items.map((data) => (
                        <div className="relative flex flex-col rounded-lg border border-gray-300">
                            {/* <Image width={500}
                                height={500} className="rounded-t-lg object-cover brightness-75" src={Image1} alt="Course Cover" /> */}
                            <h3 className="pl-4 pt-2 pr-4 text-lg font-semibold leading-8 text-gray-800">
                                {data.name}
                            </h3>
                            <h3 className="pt-0 pr-4 pb-2 pl-4 text-lg font-semibold leading-8 text-gray-800">
                                {data.lecturerName}
                            </h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ClassSemester;
