import Loading from "../../../components/Loading";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

export default function Protected({ children }) {

  const { loading, user } = useAuth();

  if (loading) {
    return (
      <main><Loading /></main>
    )
  }
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
