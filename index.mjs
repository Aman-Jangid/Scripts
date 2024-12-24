import { Octokit } from "octokit";
import fs from "fs";
import { orgs } from "./orgs.mjs"; // Import organization names
import { parse } from "json2csv"; // Import json2csv for CSV conversion

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: "Aman-Jangid",
});

// filter the data for each repo
const filterRepoData = (repo) => {
  const {
    name,
    html_url,
    languages_url,
    pushed_at,
    created_at,
    updated_at,
    language,
    has_issues,
    archived,
    open_issues_count,
    topics,
  } = repo;

  return {
    name,
    html_url,
    languages_url,
    pushed_at,
    created_at,
    updated_at,
    language,
    has_issues,
    archived,
    open_issues_count,
    topics,
  };
};

// get all repos of an organization
const getRepos = async (org) => {
  try {
    const response = await octokit.request("GET /orgs/{org}/repos", {
      org,
    });

    return response.data;
  } catch (error) {
    console.log(
      `Error! Status: ${error.status}. Message: ${error.response.data.message}`
    );
  }
};

// filter repos with open issues
const getReposWithIssues = async (org) => {
  const repos = await getRepos(org);
  return repos.filter((repo) => repo.open_issues_count > 0);
};

// create table for each organization and write to file
const createFiles = (org, repos) => {
  const jsonContent = JSON.stringify([`Organization: ${org}`, repos], null, 2);
  const csvContent = parse(repos);

  fs.appendFileSync("output.json", `${jsonContent},\n`);
  fs.appendFileSync("output.csv", `Organization: ${org}\n${csvContent}\n\n`);
};

// entry point
(async () => {
  fs.writeFileSync("output.json", "[\n"); // Initialize JSON array
  for (const org of orgs) {
    const repos = await getReposWithIssues(org);
    const filteredRepos = repos.map((repo) => filterRepoData(repo));
    createFiles(org, filteredRepos);
  }
  fs.appendFileSync("output.json", "]\n"); // Close JSON array
})();
