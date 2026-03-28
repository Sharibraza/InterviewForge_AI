import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

export default function Protected( {children} ) {

    const { loading, user} = useAuth();
    const navigate = useNavigate()

     if (loading) {
        return ( <main><h1>Loading.....</h1></main>)
    }
     if (!user) {
       navigate("/login")
    }

  return children
}
