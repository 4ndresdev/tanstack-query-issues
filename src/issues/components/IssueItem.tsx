import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { GithubIssue, State } from "../interfaces/issue.interface";
import { useQueryClient } from "@tanstack/react-query";
import { getIssue } from "../actions/get-issue.actions";
import { getComments } from "../actions/get-comments.actions";
import { timeSince } from "../helpers/time-since";

interface Props {
  issue: GithubIssue;
}

export const IssueItem = ({ issue }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const prefetchIssue = () => {
    queryClient.prefetchQuery({
      queryKey: ["issues", issue.number],
      queryFn: () => getIssue(issue.number),
      staleTime: 1000 * 60, // 1 minute
    });

    queryClient.prefetchQuery({
      queryKey: ["comments", issue.number, "comments"],
      queryFn: () => getComments(issue.number || 0),
      staleTime: 1000 * 60, // 1 minute
    });
  };

  // function presetIssue() {
  //   queryClient.setQueryData(["issues", issue.number], issue, {
  //     updatedAt: Date.now() + 1000 * 60, // 1 minute
  //   });
  // }

  return (
    <div
      onMouseEnter={prefetchIssue}
      className="flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800"
    >
      {issue.state === State.Closed ? (
        <FiCheckCircle size={30} color="green" className="min-w-10" />
      ) : (
        <FiInfo size={30} color="red" className="min-w-10" />
      )}

      <div className="flex flex-col flex-grow px-2">
        <a
          onClick={() => navigate(`/issues/issue/${issue.number}`)}
          className="hover:underline cursor-pointer"
        >
          {issue.title}
        </a>
        <span className="text-gray-500">
          #{issue.number} opened {timeSince(issue.created_at)} ago by{" "}
          <span className="font-bold">{issue.user.login}</span>
        </span>
        <div className="flex flex-wrap gap-2 mt-2">
          {issue.labels.map((label) => (
            <span
              key={label.id}
              className="animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              style={{
                border: `1px solid #${label.color}`,
                color: `#${label.color}`,
              }}
            >
              {label.name}
            </span>
          ))}
        </div>
      </div>

      <img
        src={issue.user.avatar_url}
        alt={issue.user.login}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">{issue.comments}</span>
      </div>
    </div>
  );
};
