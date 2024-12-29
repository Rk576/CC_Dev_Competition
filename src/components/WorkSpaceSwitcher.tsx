"use client"

import {useGetWorkspaces} from "@/features/workspaces/api/use-get-workspaces";
import {RiAddCircleFill} from "react-icons/ri";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {WorkspaceAvatar} from "@/features/workspaces/components/workspace-avatar";

export const WorkSpaceSwitcher =()=> {
    const {data:workspaces} = useGetWorkspaces();
    return(
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-neutral-500">Workspaces</p>
                <RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"/>
            </div>
            <Select>
                <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
                    <SelectValue placeholder="No workspace selected"/>
                </SelectTrigger>
                <SelectContent>
                    {workspaces?.documents.map((workspaces)=>(
                        <SelectItem value={workspaces.$id} key={workspaces.$id}>
                            <div className="flex justify-start items-center gap-3 font-medium ">
                                <WorkspaceAvatar name={workspaces.name} image={workspaces.imageUrl}/>
                                <span className="truncate">{workspaces.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}