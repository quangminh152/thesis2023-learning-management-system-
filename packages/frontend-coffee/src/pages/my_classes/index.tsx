import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import ErrorPage from "next/error";
import type { ListResult } from "pocketbase";
import type {
  ClassesInformationResponse,
  CoursesResponse,
  MajorsResponse,
  UsersResponse,
} from "server-cheesecake";
import { Collections } from "server-cheesecake";
import Header from "src/components/layouts/Header";
import MainLayout from "src/components/layouts/MainLayout";
import { User } from "src/contexts/AuthContextProvider";
import { getPBServer } from "src/lib/pb_server";
import SuperJSON from "superjson";
import ClassSemester from "./components/ClassSemester";

interface UsersData {
  users: ListResult<UsersResponse>;
  record: UsersResponse;
  courseList: ListResult<CoursesResponse>;
  classList: ListResult<ClassesInformationResponse>[];
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
  const courseList = dataParse?.courseList as ListResult<CoursesResponse>;
  const classList = dataParse?.classList as ListResult<ClassesInformationResponse>[];

  return (
    <>
      <Header></Header>

      <main className="bg-slate-200 p-8 px-[8vw] py-11 h-screen">
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

  const courseList = await pbServer
    .collection(Collections.Courses)
    .getList<CoursesResponse>(1, 50, {
      filter: `major="${user.major}"`,
    });
  console.log(courseList);

  const classList = await Promise.all(
    courseList.items.map((item) =>
      pbServer
        .collection(Collections.ClassesInformation)
        .getList<ClassesInformationResponse>(1, 50, {
          filter: `course = '${item.id}'`,
          $autoCancel: false,
        })
    )
  );
  console.log(classList);

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
