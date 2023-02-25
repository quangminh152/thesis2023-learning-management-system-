/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Announcements = "announcements",
	Classes = "classes",
	Courses = "courses",
	Departments = "departments",
	Grades = "grades",
	Majors = "majors",
	Schedules = "schedules",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: { [key: string]: any }
}

export type AuthSystemFields = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields

// Record types for each collection

export type AnnouncementsRecord = {
	title: string
	content?: string
	timeCreated: IsoDateString
	timeModified: IsoDateString
}

export type ClassesRecord = {
	name: string
	course: RecordIdString
	room?: string
	lecturerName?: string
	lecturerMail?: string
}

export type CoursesRecord = {
	name: string
	credit: number
	major: RecordIdString
	year?: number
	semester?: number
	isElective?: boolean
	isComplete?: boolean
}

export type DepartmentsRecord = {
	name: string
}

export type GradesRecord = {
	gradeInclass: number
	gradeMid: number
	gradeFinal: number
	gradeOverallNumber: number
	gradeOverallLetter?: string
	course: RecordIdString
}

export type MajorsRecord = {
	name: string
	department: RecordIdString
}

export type SchedulesRecord = {
	session: number
	content?: string
	course: RecordIdString
	classMaterial?: string
	studentNote?: string
}

export type UsersRecord = {
	first_name: string
	avatar?: string
	studentID: string
	last_name: string
	phone?: string
	shcd_dk?: boolean
	shcd_gk1?: boolean
	shcd_gk2?: boolean
	shcd_ck?: boolean
	major: RecordIdString
	englishCertificate?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AnnouncementsResponse = AnnouncementsRecord & BaseSystemFields
export type ClassesResponse = ClassesRecord & BaseSystemFields
export type CoursesResponse = CoursesRecord & BaseSystemFields
export type DepartmentsResponse = DepartmentsRecord & BaseSystemFields
export type GradesResponse = GradesRecord & BaseSystemFields
export type MajorsResponse = MajorsRecord & BaseSystemFields
export type SchedulesResponse = SchedulesRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	announcements: AnnouncementsRecord
	classes: ClassesRecord
	courses: CoursesRecord
	departments: DepartmentsRecord
	grades: GradesRecord
	majors: MajorsRecord
	schedules: SchedulesRecord
	users: UsersRecord
}