import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions/get-issues.actions";

export const useIssues = () => {
  const issuesQuery = useQuery({
    queryKey: ["issues"],
    queryFn: getIssues,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return { issuesQuery };
};
