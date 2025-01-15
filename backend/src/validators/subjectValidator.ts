import {z} from "zod"

export const subjectSchema = z.object({
    subjectName: z.string({required_error: "Provide the subject name"})
    .trim()
    .min(3, "Name is too less")
})

export type subjectData = z.infer<typeof subjectSchema>