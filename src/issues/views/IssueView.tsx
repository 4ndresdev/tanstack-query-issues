import { Navigate, useNavigate, useParams } from "react-router-dom";
import { IssueComment } from "../components/IssueComment";
import { FiSkipBack } from "react-icons/fi";
import { useIssue } from "../hooks/useIssue";

export const IssueView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const issueNumber = Number(params.issueNumber);
  const { issueQuery, commentsQuery } = useIssue(issueNumber);

  if (issueQuery.isLoading) {
    return <div className="mt-4">loading...</div>;
  }

  if (issueQuery.error) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="mb-5">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="hover:underline text-blue-400 flex items-center mt-2"
        >
          <FiSkipBack />
          Regresar
        </button>
      </div>

      {/* Primer comentario */}
      {issueQuery.data && <IssueComment issue={issueQuery.data} />}
      {commentsQuery.data ? (
        commentsQuery.data.map((comment) => (
          <IssueComment key={comment.id} issue={comment} />
        ))
      ) : (
        <div className="mt-4">loading...</div>
      )}
    </div>
  );
};
