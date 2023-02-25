import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import Link from "next/link";
import type { ListResult } from "pocketbase";
import type { ClassesResponse, CoursesRecord, CoursesResponse, CurriculumsResponse, DepartmentsResponse, MajorsRecord, MajorsResponse, RegistrationsResponse, UsersResponse } from "server-cheesecake";
import { Collections } from "server-cheesecake";
import MainLayout from "src/components/layouts/MainLayout";
import { User } from "src/contexts/AuthContextProvider";
import { getPBServer } from "src/lib/pb_server";
import SuperJSON from "superjson";
import TableRow from "./components/TableRow";
import Header from "src/components/layouts/header";


interface UsersData {
  users: ListResult<UsersResponse>;
  record: UsersResponse
  // curriculumList: ListResult<CurriculumsResponse>
  courseList: ListResult<CoursesResponse>
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
  )) ?? <p>{"Error when fetching event documents"}</p>;

  const currentUser = dataParse?.record;
  const { username, last_name, first_name, studentID } = currentUser && currentUser
  const major = currentUser.expand?.major as MajorsResponse;
  const department = major.expand?.department as DepartmentsResponse;
  const courseList = dataParse?.courseList as ListResult<CoursesResponse>;

  const headerTableElement = ["Credits",
    "Year",
    "Semester",
    "Elective",
    "Status"]
  // const curriculum = dataParse?.curriculumList as ListResult<CurriculumsResponse>
  // curriculum.map(itemCur => itemCur.items.map(item => console.log(item.content)))
  return (
    <>
      <Header />


      <main className="bg-slate-200 p-8 px-[8vw] mt-20">
        <article className="bg-white rounded-lg px-8 py-8 mb-8">
          <h2 className="font-semibold text-xl leading-8 text-gray-600 pb-6 mb-6 border-b border-gray-400">Personal Information</h2>
          <div className="mb-6 grid grid-cols-[1fr_3fr] gap-x-0 gap-y-0">
            <p className="text-lg font-semibold leading-8 text-gray-600 whitespace-nowrap">
              Name
            </p>
            <p className="text-lg font-bold leading-8 text-gray-800 whitespace-nowrap">
              {last_name} {first_name}
            </p>

            <p className="text-lg font-semibold leading-8 text-gray-600 whitespace-nowrap">
              Student ID
            </p>
            <p className="text-lg font-bold leading-8 text-gray-800 whitespace-nowrap">
              {currentUser?.studentID}
            </p>

            <p className="text-lg font-semibold leading-8 text-gray-600 whitespace-nowrap">
              Major
            </p>
            <p className="text-lg font-bold leading-8 text-gray-800 whitespace-nowrap">
              {major?.name}
            </p>

            <p className="text-lg font-semibold leading-8 text-gray-600 whitespace-nowrap">
              Department
            </p>
            <p className="text-lg font-bold leading-8 text-gray-800 whitespace-nowrap">
              {department?.name}
            </p>

            <p className="text-lg font-semibold leading-8 text-gray-600 whitespace-nowrap">
              Email
            </p>
            <p className="text-lg font-bold leading-8 text-gray-800 whitespace-nowrap">
              {currentUser?.email}
            </p>

          </div>

          <div className="flex items-center space-y-7 bg-white rounded whitespace-nowrap">
            <a className="text-sky-600 flex items-center border border-gray-300 px-10 rounded py-3 font-bold mb-8" href="#">
              Change password
            </a>
          </div>

          <h2 className="font-semibold text-xl leading-8 text-gray-600 pb-6 mb-6 border-b border-gray-400">Curriculum</h2>

          <div className="mb-6 grid grid-cols-[1fr_1fr] gap-x-0 gap-y-0">
            <p className="text-lg font-semibold leading-8 text-gray-600 whitespace-nowrap">
              Total credits completed
            </p>
            <p className="text-lg font-bold leading-8 text-gray-800 whitespace-nowrap text-right">
              xx/150
            </p>
          </div>

          <div className="grid gap-x-0 gap-y-0 grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-sky-600">
            <div className="col-span-2">
              <p className="min-w-fit pl-4 py-2 pr-4 text-lg font-regular leading-8 text-white  whitespace-nowrap">
                Subject
              </p>
            </div>

            {headerTableElement.map((items, index) => {
              return <p key={index} className="pl-4 py-2 pr-4 text-lg font-regular leading-8 text-white whitespace-nowrap text-center">
                {items}
              </p>
            })}
          </div>

          <div className="grid gap-x-0 gap-y-0 grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-slate-50">
            {courseList.items.map(courseList => <TableRow data={
              {
                subjectName: courseList.name,
                subjectCredit: courseList.credit,
                subjectYear: courseList.year,
                subjectSem: courseList.semester,
                isElective: JSON.stringify(courseList.isElective),
                isComplete: courseList.isComplete
              }
            } />)}
          </div>



          <h2 className="font-semibold text-xl leading-8 text-gray-600 pb-6 mb-6 border-b border-gray-400">Graduation needs</h2>
          <div className="mb-6 grid grid-cols-[2fr_3fr] gap-x-0 gap-y-0">
            <p className="text-lg font-semibold leading-8 text-gray-600 whitespace-nowrap">
              Annual Political Education - Entry
            </p>
            <p className="text-lg font-bold leading-8 text-gray-800 whitespace-nowrap">
              {currentUser.shcd_dk == true ? 'Complete' : 'Not Complete'}
            </p>

            <p className="text-lg font-semibold leading-8 text-gray-600 whitespace-nowrap">
              Annual Political Education - Middle 1
            </p>
            <p className="text-lg font-bold leading-8 text-gray-800 whitespace-nowrap">
              {currentUser.shcd_gk1 == true ? 'Complete' : 'Not Complete'}
            </p>

            <p className="text-lg font-semibold leading-8 text-gray-600 whitespace-nowrap">
              Annual Political Education - Middle 2
            </p>
            <p className="text-lg font-bold leading-8 text-gray-800 whitespace-nowrap">
              {currentUser.shcd_gk2 == true ? 'Complete' : 'Not Complete'}
            </p>

            <p className="text-lg font-semibold leading-8 text-gray-600 whitespace-nowrap">
              Annual Political Education - Final
            </p>
            <p className="text-lg font-bold leading-8 text-gray-800 whitespace-nowrap">
              {currentUser.shcd_ck == true ? 'Complete' : 'Not Complete'}
            </p>

            <p className="text-lg font-semibold leading-8 text-gray-600 whitespace-nowrap">
              English Certificate
            </p>
            <p className="text-lg font-bold leading-8 text-gray-800 whitespace-nowrap">
              {currentUser.englishCertificate == true ? 'Complete' : 'Not Complete'}
            </p>

          </div>
        </article>
      </main>

      <Head>
        <title>Users</title>
      </Head>
      <h1>Users</h1>
      {/* <ol>{usersList}</ol> */}
      {/* <p>{ JSON.stringify(dataParse.record) }</p> */}
      <p>Name: {currentUser.last_name} {currentUser.first_name}</p>
      <p>Student ID: {currentUser.studentID}</p>
      <p>Major: {major.name}</p>
      <p>Department: {department.name}</p>
      <p>Email: {currentUser.email}</p>

      {/* <p>Curriculum: { curriculum.map(itemCur => itemCur.items.map(item => item.content)) } </p> */}

      <p>SHCD DK: {JSON.stringify(currentUser.shcd_dk)}</p>
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

  // console.log(temp);

  // const userRegistration = await pbServer
  //   .collection(Collections.Registrations)
  //   .getFirstListItem<RegistrationsResponse>(`student="${user.id}"`)

  // const userRegistrations = await pbServer
  //   .collection(Collections.Registrations)
  //   .getList<RegistrationsResponse>(1, 50, {
  //     filter: `student="${user.id}"`,
  //   })

  const courseList = await pbServer
    .collection(Collections.Courses)
    .getList<CoursesResponse>(1, 50, {
      filter: `major="${user.major}"`,
    })
  console.log(courseList)

  // const curriculumList = await Promise.all(userRegistrations.items.map(item => pbServer
  //   .collection(Collections.Curriculums)
  //   .getList<CurriculumsResponse>(1, 50, {
  //     filter: `class = '${item.class}'`,
  //     $autoCancel: false
  //   })))

  const users = await pbServer
    .collection(Collections.Users)
    .getList<UsersResponse>(1, 50, {
      expand: "major",
    });

  const record = await pbServer
    .collection(Collections.Users)
    .getFirstListItem<UsersResponse>(`id="${user.id}"`, {
      expand: 'major,major.department',
    });

  return {
    props: {
      data: SuperJSON.stringify({ users, record, courseList } as UsersData),
    },
  };
};

Users.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Users;

