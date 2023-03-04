/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Announcements = "announcements",
	ClassesInformation = "classesInformation",
	Courses = "courses",
	EnrollmentYears = "enrollmentYears",
	Grades = "grades",
	Majors = "majors",
	ScheduleAttachments = "scheduleAttachments",
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

export enum ClassesInformationSemesterStudyOptions {
	"Year 1 - Semester 1" = "Year 1 - Semester 1",
	"Year 1 - Semester 2" = "Year 1 - Semester 2",
	"Year 2 - Semester 1" = "Year 2 - Semester 1",
	"Year 2 - Semester 2" = "Year 2 - Semester 2",
	"Year 3 - Semester 1" = "Year 3 - Semester 1",
	"Year 3 - Semester 2" = "Year 3 - Semester 2",
	"Year 4 - Semester 1" = "Year 4 - Semester 1",
	"Year 4 - Semester 2" = "Year 4 - Semester 2",
}
export type ClassesInformationRecord = {
	course: RecordIdString
	room?: string
	lecturerName?: string
	lecturerMail?: string
	semesterStudy?: ClassesInformationSemesterStudyOptions
	student: RecordIdString
	isCompleted?: boolean
}

export type CoursesRecord = {
	name: string
	credit: number
	major: RecordIdString[]
	yearCurri?: number
	semesterCurri?: number
	isElective?: boolean
	enrollmentYear: RecordIdString
}

export type EnrollmentYearsRecord = {
	enrollmentYear: string
}

export type GradesRecord = {
	gradeInclass: number
	gradeMid: number
	gradeFinal: number
	gradeOverallNumber: number
	gradeOverallLetter?: string
	course: RecordIdString
	student: RecordIdString
}

export type MajorsRecord = {
	name: string
}

export type ScheduleAttachmentsRecord = {
	slide?: string[]
	note?: string[]
	student: RecordIdString
	schedule: RecordIdString
}

export type SchedulesRecord = {
	session: number
	content?: string
	course: RecordIdString
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
	enrollmentYear: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type AnnouncementsResponse = AnnouncementsRecord & BaseSystemFields
export type ClassesInformationResponse = ClassesInformationRecord & BaseSystemFields
export type CoursesResponse = CoursesRecord & BaseSystemFields
export type EnrollmentYearsResponse = EnrollmentYearsRecord & BaseSystemFields
export type GradesResponse = GradesRecord & BaseSystemFields
export type MajorsResponse = MajorsRecord & BaseSystemFields
export type ScheduleAttachmentsResponse = ScheduleAttachmentsRecord & BaseSystemFields
export type SchedulesResponse = SchedulesRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	announcements: AnnouncementsRecord
	classesInformation: ClassesInformationRecord
	courses: CoursesRecord
	enrollmentYears: EnrollmentYearsRecord
	grades: GradesRecord
	majors: MajorsRecord
	scheduleAttachments: ScheduleAttachmentsRecord
	schedules: SchedulesRecord
	users: UsersRecord
}