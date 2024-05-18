import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
async function dashboard() {
    const session = await getServerSession(authOptions);

    return(
        <div>
            <h3>Dashboard</h3>
            <h4>Hola {session?.user?.name}</h4>
        </div>
    )
}
export default dashboard;