import React from "react";
import Image from "next/image";
import Image1 from "/Users/doquangminh/Desktop/learning-management-system-for-it-department/packages/frontend-coffee/public/thumbnail.jpg";

interface IClassProps {
    semester: string;
    dataSubjects: any;
}
function ClassSemester({ semester, dataSubjects }: IClassProps) {
    return (
        <div>
            <div className="flex justify-between">
                <p className="font-regular flex pb-4 text-xl leading-8 text-gray-700">
                    {semester}
                </p>

                <p className="font-regular flex pb-4 text-right text-xl leading-8 text-blue-700">
                    Add class
                </p>
            </div>

            {dataSubjects && (
                <div className="grid grid-cols-4 gap-8">
                    {dataSubjects.map((data) => (
                        <div className="relative flex flex-col rounded-lg border border-gray-300">
                            {/* <Image width={500}
                                    height={500} className="rounded-t-lg object-cover brightness-75" src={data.imageLink} alt="Course Cover" /> */}
                            <h3 className="pl-4 pt-2 pr-4 text-lg font-semibold leading-8 text-gray-800">
                                {data.subjectTitle}
                            </h3>
                            <h3 className="pt-0 pr-4 pb-2 pl-4 text-lg font-semibold leading-8 text-gray-800">
                                {data.lecturer}
                            </h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ClassSemester;
