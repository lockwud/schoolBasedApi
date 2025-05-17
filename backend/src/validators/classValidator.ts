import {z} from "zod"

export const classSchema = z.object({
    className: z.string({required_error: "please provide a class name"})
    .trim()
    .min(1, "class name cannot be empty"),
    capacity: z.string().max(100, "class size cannot exceed 50 student"),
    schoolId: z.string({required_error: "Provide the school code"})
})

export type classData = z.infer<typeof classSchema>