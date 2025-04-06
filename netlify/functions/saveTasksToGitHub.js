const { Octokit } = require("@octokit/rest");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const CSV_FILE_PATH = 'tasks.csv';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    const owner = GITHUB_OWNER;
    const repo = GITHUB_REPO;
    const path = CSV_FILE_PATH;
    const csvData = event.body; // The CSV data will be sent in the request body

    // Get the current commit SHA for the file (required to update)
    const getFileResponse = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });
    const currentSha = getFileResponse.data.sha;

    // Encode the CSV data to base64
    const contentBase64 = Buffer.from(csvData, 'utf-8').toString('base64');

    // Update the file in GitHub
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'Update tasks.csv from Task Manager',
      content: contentBase64,
      sha: currentSha, // Required for updates
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Tasks saved to GitHub successfully!' }),
    };
  } catch (error) {
    console.error('Error saving tasks to GitHub:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to save tasks to GitHub.' }),
    };
  }
};
