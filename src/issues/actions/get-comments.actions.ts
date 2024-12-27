import { githubApi } from "../../api/github.api";
import { sleep } from "../helpers/sleep";
import { GithubIssue } from "../interfaces/issue.interface";

export const getComments = async (
  issueNumber: number
): Promise<GithubIssue[]> => {
  await sleep(1000);
  const { data } = await githubApi.get<GithubIssue[]>(
    `/issues/${issueNumber}/comments`
  );
  return data;
};
