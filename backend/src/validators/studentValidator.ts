import {z} from "zod"

export const gender = z.enum([
    "male",
    "female"

])
   

export const studentSchema = z.object({
    firstName: z.string({required_error: "First name cannot be empty"})
   .trim()
   .min(1, "First name is required"),
    lastName: z.string({required_error: "Last name cannot be empty"})
    .trim()
    .min(1, "Last name is required"),
    otherName: z.string().optional(),
    gender: gender,  
    dob: z.preprocess(
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
          }).min(new Date(2000, 0, 1), "Date cannot be before January 1, 2000")
           .max(new Date(), "Date cannot be in the future")
        ),
        studentId: z.string({required_error:"Student Id is required"})
   .trim()
   .min(10, "Student Id cannot be empty"),
    password: z.string({required_error:"Password is required"}),
    contact: z.string().optional(),
    parentContact: z.string({required_error:"Parent contact is required"}),
   classId: z.string().optional(),
   adminId: z.string({required_error:"Admin Id is required"}),
});

export type studentData = z.infer<typeof studentSchema>