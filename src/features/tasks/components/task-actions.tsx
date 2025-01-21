import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ExternalLinkIcon, PencilIcon, TrashIcon} from "lucide-react";
import {useConfirm} from "@/hooks/use-confirm";
import {useDeleteTask} from "@/features/tasks/api/use-delete-task";
import {useRouter} from "next/navigation";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspaceId";
import {useEditTaskModal} from "@/features/tasks/hooks/use-edit-task-modal";


interface TaskActionsProps{
  id:string;
  projectId:string;
  children:React.ReactNode;
}

export const TaskActions = ({id,projectId,children}:TaskActionsProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const {open} = useEditTaskModal();
  const [ConfirmDialog,confirm] = useConfirm(
      "Delete Task",
      "This action cannot be undone",
      "destructive"
  );

  const {mutate,isPending} = useDeleteTask();

  const onDelete = async()=>{
    const ok = await confirm();
    if(!ok) return;
    mutate({param:{taskId:id}});
  }

  const onOpenTask = () =>{
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  }
  const onOpenProject = () =>{
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  }
  return(
      <div className="flex justify-end">
        <ConfirmDialog/>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onOpenTask} className="font-medium p-[10px]">
                  <ExternalLinkIcon className="size-4 mr-2"/>
                  Task Details
                </DropdownMenuItem>
              <DropdownMenuItem onClick={onOpenProject} className="font-medium p-[10px]" >
                <ExternalLinkIcon className="size-4 mr-2"/>
                Open Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>open(id)} className="font-medium p-[10px]" >
                <PencilIcon className="size-4 mr-2"/>
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-amber-700 focus:text-amber-700 font-medium p-[10px]" disabled={isPending}>
                <TrashIcon className="size-4 mr-2"/>
                  Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
  )
}