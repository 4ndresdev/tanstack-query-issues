import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions/get-issues.actions";
import { State } from "../interfaces/issue.interface";
import { useEffect, useState } from "react";

interface Props {
  state: State;
  labels: string[];
}

export const useIssues = ({ state, labels }: Props) => {
  const [page, setPage] = useState(1);

  const issuesQuery = useQuery({
    queryKey: ["issues", { state, labels, page }],
    queryFn: () => getIssues(state, labels, page),
    staleTime: 1000 * 60, // 1 minute
  });

  useEffect(() => {
    setPage(1);
  }, [state]);

  useEffect(() => {
    setPage(1);
  }, [labels]);

  function nextPage() {
    if (issuesQuery.data?.length === 0) return;
    setPage((prev) => prev + 1);
  }

  function previousPage() {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  }

  return { issuesQuery, nextPage, previousPage, page };
};
