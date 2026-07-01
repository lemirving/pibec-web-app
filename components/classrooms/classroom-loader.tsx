import { getAllClassrooms } from "@/lib/classrooms/get-classrooms";
import { SubmitForm } from "../submit/submit-form";


export default async function ClassroomLoader (){ // isso não parece correto mas logo logo eu arrumo
    
    const classrooms = await getAllClassrooms();

    return <SubmitForm classrooms={classrooms}/>


}