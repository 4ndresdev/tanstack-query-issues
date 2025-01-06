import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssuesInfinite } from "../hooks/useIssuesInfinite";
import { State } from "../interfaces/issue.interface";

export const ListViewInfinite = () => {
  const [state, setState] = useState<State>(State.All);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { issuesQuery } = useIssuesInfinite({
    state,
    labels: selectedLabels,
  });

  const issues = issuesQuery?.data?.pages?.flat() || [];

  function handleSelectLabel(label: string) {
    if (selectedLabels.includes(label)) {
      setSelectedLabels((prev) => prev.filter((l) => l !== label));
    } else {
      setSelectedLabels((prev) => [...prev, label]);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col">
            <IssueList issues={issues} state={state} onStateChange={setState} />
            <div className="flex justify-between items-center ">
              <button
                onClick={() => issuesQuery.fetchNextPage()}
                disabled={
                  !issuesQuery.hasNextPage || issuesQuery.isFetchingNextPage
                }
                className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-all mt-2"
              >
                {issuesQuery.isFetchingNextPage ? "Loading..." : "Load more..."}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          selectedLabels={selectedLabels}
          handleSelectLabel={handleSelectLabel}
        />
      </div>
    </div>
  );
};
