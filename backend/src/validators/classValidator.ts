import {z} from "zod"

export const classSchema = z.object({
    className: z.string({required_error: "please provide a class name"})
    .trim()
    .min(1, "class name cannot be empty"),
    capacity: z.string().max(50, "class size cannot exceed 50 student")
})

export type classData = z.infer<typeof classSchema>