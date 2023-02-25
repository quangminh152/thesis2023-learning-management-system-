import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import Link from "next/link";
import type { ListResult } from "pocketbase";
import type {
  ClassesResponse,
  CoursesRecord,
  CoursesResponse,
  DepartmentsResponse,
  MajorsRecord,
  MajorsResponse,
  UsersResponse,
} from "server-cheesecake";
import { Collections } from "server-cheesecake";
import MainLayout from "src/components/layouts/MainLayout";
import { User } from "src/contexts/AuthContextProvider";
import { getPBServer } from "src/lib/pb_server";
import SuperJSON from "superjson";
import logo from "/Users/doquangminh/Desktop/learning-management-system-for-it-department/packages/frontend-coffee/public/logo.png";
import ClassSemester from "./components/ClassSemester";

interface UsersData {
  users: ListResult<UsersResponse>;
  record: UsersResponse;
  courseList: ListResult<CoursesResponse>;
  classList: ListResult<ClassesResponse>;
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
  const { username, last_name, first_name, studentID } =
    currentUser && currentUser;
  const major = currentUser.expand?.major as MajorsResponse;
  const department = major.expand?.department as DepartmentsResponse;
  const courseList = dataParse?.courseList as ListResult<CoursesResponse>;
  const classList = dataParse?.classList as ListResult<ClassesResponse>;
  // const curriculum = dataParse?.curriculumList as ListResult<CurriculumsResponse>
  // curriculum.map(itemCur => itemCur.items.map(item => console.log(item.content)))

  // const dataSubjects = [
  //   {
  //     imageLink:
  //       "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwarmgun.com%2Fphotoshop-ai-ung-dung-thiet-ke-do-hoa-nao-tot%2F&psig=AOvVaw1K7MT9plyVREinBHFkcVCU&ust=1676174965740000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLjOjb3MjP0CFQAAAAAdAAAAABAE",
  //     subjectTitle: "Digital Logic Design",
  //     lecturer: "Tu",
  //   },
  // ];

  return (
    <>
      <div
        className={
          "container mx-auto flex h-24 items-center border-b-2 px-6 py-2"
        }
      >
        <h1 className="font-bold">Learning Management System</h1>
        <div className="grow ">
          <div className="flex items-center justify-center gap-2 md:gap-8">
            <Link href="#">My Classes</Link>
            <Link href="#">My Classes</Link>
          </div>
        </div>
        <nav className="ml-auto">
          <ul className="m-0 flex list-none items-center justify-center p-0">
            <li className="ml-8">
              <div className="relative flex cursor-pointer items-center">
                <p>
                  <b>Do Quang Minh</b>
                  <br />
                  ITITIU19028
                </p>
                <div className="ml-16 flex h-12 items-center justify-center space-y-7 whitespace-nowrap rounded bg-white">
                  <a
                    className="flex items-center font-bold text-red-600"
                    href="#"
                  >
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
        <article className="mb-8 rounded-lg bg-white px-8 py-8">
          <h2 className="mb-6 border-b border-gray-400 pb-6 text-xl font-semibold leading-8 text-gray-600">
            My classes
          </h2>
          <ClassSemester
            dataSubjects={classList}
          />

          {/* {courseList.items.map(courseList => <ClassSemester data={
            {
              subjectName: courseList.name,
              subjectCredit: courseList.credit,
              subjectYear: courseList.year,
              subjectSem: courseList.semester,
              isElective: JSON.stringify(courseList.isElective),
              isComplete: courseList.isComplete
            }
          } />)} */}
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

  // console.log(temp);

  // const userRegistration = await pbServer
  //   .collection(Collections.Registrations)
  //   .getFirstListItem<RegistrationsResponse>(`student="${user.id}"`);

  // const userRegistrations = await pbServer
  //   .collection(Collections.Registrations)
  //   .getList<RegistrationsResponse>(1, 50, {
  //     filter: `student="${user.id}"`,
  //   });

  const courseList = await pbServer
    .collection(Collections.Courses)
    .getList<CoursesResponse>(1, 50, {
      filter: `major="${user.major}"`,
    });
  console.log(courseList);

  // const classList = await pbServer
  //   .collection(Collections.Classes)
  //   .getList<ClassesResponse>(1, 50, {
  //     filter: `course="${item.course}"`,
  //   });
  // console.log(classList);

  const classList = await Promise.all(
    courseList.items.map((item) =>
      pbServer
        .collection(Collections.Classes)
        .getList<ClassesResponse>(1, 50, {
          filter: `course = '${item.id}'`,
          $autoCancel: false,
        })
    )
  );
  console.log(classList);

  // const curriculumList = await Promise.all(
  //   userRegistrations.items.map((item) =>
  //     pbServer
  //       .collection(Collections.Curriculums)
  //       .getList<CurriculumsResponse>(1, 50, {
  //         filter: `class = '${item.class}'`,
  //         $autoCancel: false,
  //       })
  //   )
  // );

  const users = await pbServer
    .collection(Collections.Users)
    .getList<UsersResponse>(1, 50, {
      expand: "major",
    });

  const record = await pbServer
    .collection(Collections.Users)
    .getFirstListItem<UsersResponse>(`id="${user.id}"`, {
      expand: "major,major.department",
    });

  return {
    props: {
      data: SuperJSON.stringify({ users, record, courseList, classList } as UsersData),
    },
  };
};

Users.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Users;
