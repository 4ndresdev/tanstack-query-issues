import { useQuery } from "@tanstack/react-query";
import { getIssue } from "../actions/get-issue.actions";
import { getComments } from "../actions/get-comments.actions";

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ["issues", issueNumber],
    queryFn: () => getIssue(issueNumber),
    staleTime: 1000 * 60, // 1 minute
  });

  const commentsQuery = useQuery({
    queryKey: ["comments", issueQuery.data?.number, "comments"],
    queryFn: () => getComments(issueQuery.data?.number || 0),
    staleTime: 1000 * 60, // 1 minute
    enabled: !!issueQuery.data,
  });

  return { issueQuery, commentsQuery };
};
