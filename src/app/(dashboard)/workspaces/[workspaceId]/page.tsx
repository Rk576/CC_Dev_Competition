import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";

const WorkspaceIdPage = async()=>{
    const user = await getCurrent();

    if(!user) {redirect("/sign-in")}
    return (
        <div>
            WorkspaceID
        </div>
    )
}
export default WorkspaceIdPage;