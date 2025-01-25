import {z} from "zod"

export const attendanceStatus = z.enum([
    "present",
    "absent",
    "partial"
])


export const attendanceSchema = z.object({
    studentIndex: z
      .string({ required_error: "Please provide student Id" })
      .trim()
      .min(10, "Invalid Index"),
    date: z.preprocess(
      (arg) => {
        if (typeof arg === "string") {
          const parsedDate = new Date(arg);
          console.log("Preprocessed Date:", arg);
          return isNaN(parsedDate.getTime()) ? null : parsedDate;
        }
        return arg;
      },
      z.date({
        required_error: "Please provide a valid date",
      }).min(new Date(2022, 0, 1), "Date cannot be before January 1, 2022")
       .max(new Date(), "Date cannot be in the future")
    ),
    attendanceStatus: attendanceStatus,
    reason: z.string().optional(),
    classId: z.string({ required_error: "Please provide the class Id" }),
    tutorId: z.string({ required_error: "Please provide the tutor Id" }),
  });

  export type attendanceDto = z.infer<typeof attendanceSchema>
  