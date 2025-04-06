const { Octokit } = require("@octokit/rest");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

exports.handler = async (event) => {
  try {
    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    const owner = GITHUB_OWNER;
    const repo = GITHUB_REPO;
    const path = 'price.json';

    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });

    const contentBase64 = response.data.content;
    const content = Buffer.from(contentBase64, 'base64').toString('utf-8');
    const priceData = JSON.parse(content);

    return {
      statusCode: 200,
      body: JSON.stringify(priceData),
    };
  } catch (error) {
    console.error('שגיאה בפונקציה getPrice:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'שגיאה בקבלת המחיר.' }),
    };
  }
};
