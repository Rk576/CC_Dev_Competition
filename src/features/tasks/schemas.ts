import {z} from "zod";
import {TasksStatus} from "@/features/tasks/types";

export const createTaskSchema = z.object({
    name:z.string().min(1,"Required"),
    status:z.nativeEnum(TasksStatus,{required_error:"Required"}),
    workspaceId:z.string().trim().min(1,"Required"),
    projectId:z.string().trim().min(1,"Required"),
    dueDate:z.coerce.date(),
    assigneeId:z.string().trim().min(1,"Required"),
    description:z.string().optional(),
})