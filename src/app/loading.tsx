import { Spinner } from "@/components/bootstrap";

export default async function Loading() {
    return(
        <Spinner animation="border" className="d-block m-auto" />
    )
}