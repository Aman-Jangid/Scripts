import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: "Aman-Jangid",
});

try {
  // get all repos of an organization
  const response = await octokit.request("GET /orgs/{org}/repos", {
    org: "KDE",
  });

  const reposWithIssues = [];
  // find repos with open issues
  for (const repo of response.data) {
    if (repo.open_issues_count > 0) {
      reposWithIssues.push(repo);
    }
  }

  console.log(reposWithIssues);
} catch (error) {
  console.log(
    `Error! Status: ${error.status}. Message: ${error.response.data.message}`
  );
}

// needed info:
// - name
// - html_url - repo url on github
// - languages_url - to get languages used in repo
// - issues_url - to get issues in repo
// - pushed_at, created_at, updated_at
// - homepage
// - language
// - has_issues
// - archived ?
// - open_issues_count
// - topics
