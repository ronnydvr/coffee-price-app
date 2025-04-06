const { Octokit } = require("@octokit/rest");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const CSV_FILE_PATH = 'tasks.csv'; // Define the path to your CSV file in the repository

exports.handler = async (event) => {
  try {
    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    const owner = GITHUB_OWNER;
    const repo = GITHUB_REPO;
    const path = CSV_FILE_PATH;

    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });

    // The content is base64 encoded
    const contentBase64 = response.data.content;
    const content = Buffer.from(contentBase64, 'base64').toString('utf-8');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8', // Return as plain text
      },
      body: content,
    };
  } catch (error) {
    console.error('Error fetching tasks.csv from GitHub:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to load tasks from GitHub.' }),
    };
  }
};
