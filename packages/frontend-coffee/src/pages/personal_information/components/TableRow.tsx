import React from "react";

interface IRowProps {
  data: any;
}
function ClassSemester({ data }: IRowProps) {
  console.log(data);
  const { subjectName, subjectCredit, subjectYear, subjectSem, isElective, isComplete } = data && data
  return (data && (
    <>

      <div className="col-span-2">
        <p className="min-w-fit pl-4 py-2 pr-4 text-lg font-regular leading-8 text-gray-800 whitespace-nowrap">
          {subjectName}
        </p>
      </div>

      <p className="pl-4 py-2 pr-4 text-lg font-regular leading-8 text-gray-800 whitespace-nowrap text-center">
        {subjectCredit}
      </p>

      <p className="pl-4 py-2 pr-4 text-lg font-regular leading-8 text-gray-800 whitespace-nowrap text-center">
        {subjectYear}
      </p>

      <p className="pl-4 py-2 pr-4 text-lg font-regular leading-8 text-gray-800 whitespace-nowrap text-center">
        {subjectSem}
      </p>

      <p className="pl-4 py-2 pr-4 text-lg font-regular leading-8 text-gray-800 whitespace-nowrap text-center">
        {isElective == true ? "x" : "-"}
      </p>

      <p className="pl-4 py-2 pr-4 text-lg font-regular leading-8 text-gray-800 whitespace-nowrap text-center">
        {isComplete == true ? "Complete" : "Not complete"}
      </p>
    </>

  )

  );
}

export default ClassSemester;
