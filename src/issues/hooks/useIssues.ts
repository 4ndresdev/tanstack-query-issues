import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions/get-issues.actions";
import { State } from "../interfaces/issue.interface";

interface Props {
  state: State;
  labels: string[];
}

export const useIssues = ({ state, labels }: Props) => {
  const issuesQuery = useQuery({
    queryKey: ["issues", { state, labels }],
    queryFn: () => getIssues(state, labels),
    staleTime: 1000 * 60, // 1 minute
  });

  return { issuesQuery };
};
