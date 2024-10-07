import ApplicationPageModule from "@/modules/ApplicationPage";
import { useParams } from "react-router-dom";

function ApplicationPage() {
    const { id } = useParams()
    return (
        <ApplicationPageModule id={id || '0'} />
    );
}

export default ApplicationPage