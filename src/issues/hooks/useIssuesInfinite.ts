import { useInfiniteQuery } from "@tanstack/react-query";
import { getIssues } from "../actions/get-issues.actions";
import { State } from "../interfaces/issue.interface";

interface Props {
  state: State;
  labels: string[];
}

export const useIssuesInfinite = ({ state, labels }: Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ["issues", "infinite", { state, labels }],
    queryFn: ({ pageParam }) => {
      return getIssues(state, labels, pageParam);
    },
    staleTime: 1000 * 60, // 1 minute
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length > 0 ? pages.length : undefined,
  });

  return { issuesQuery };
};
