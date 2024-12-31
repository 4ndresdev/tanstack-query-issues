import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks/useIssues";
import { State } from "../interfaces/issue.interface";

export const ListView = () => {
  const [state, setState] = useState<State>(State.All);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { issuesQuery } = useIssues({ state, labels: selectedLabels });

  const issues = issuesQuery.data || [];

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
          <IssueList issues={issues} state={state} onStateChange={setState} />
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
