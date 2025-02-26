import {TasksStatus} from "@/features/tasks/types";
import {number} from "zod";
import {snakeCaseToTitleCase} from "@/lib/utils";
import {CircleCheckIcon, CircleDashedIcon, CircleDotDashedIcon, CircleDotIcon, CircleIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "@radix-ui/react-icons";
import {useCreateTaskModal} from "@/features/tasks/hooks/use-create-task-modal";

interface KanbanColumHeaderProps {
  board:TasksStatus;
  taskCount: number;
}

const statusIconMap: Record<TasksStatus,React.ReactNode> = {
  [TasksStatus.BACKLOG]:(
      <CircleDashedIcon className="size-[18px] text-pink-400"/>
  ),
  [TasksStatus.TODO]:(
      <CircleIcon className="size-[18px] text-red-400"/>
  ),
  [TasksStatus.IN_PROGRESS]:(
      <CircleDotDashedIcon className="size-[18px] text-yellow-400"/>
  ),
  [TasksStatus.IN_REVIEW]:(
      <CircleDotIcon className="size-[18px] text-blue-400"/>
  ),
  [TasksStatus.DONE]:(
      <CircleCheckIcon className="size-[18px] text-emerald-400"/>
  ),


}

export const KanbanColumnHeader = ({board,taskCount}:KanbanColumHeaderProps) => {

  const {open} = useCreateTaskModal();
  const icon = statusIconMap[board]
  return (
      <div className="px-2 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          {icon}
          <h2 className="text-sm font-medium ">
            {snakeCaseToTitleCase(board)}
          </h2>
          <div className="size-5 flex items-center justify-center rounded-md bg-neutral-200 text-xs text-neutral-700 font-medium">
            {taskCount}
          </div>

        </div>
        <Button onClick={open} variant="ghost" size="icon" className="size-5">
          <PlusIcon className="size-4 text-neutral-500"/>
        </Button>
      </div>
  )
}