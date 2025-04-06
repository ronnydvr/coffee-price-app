const { Octokit } = require("@octokit/rest");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

exports.handler = async (event) => {
  console.log('Function updatePrice started!');
  try {
    const { newPrice } = JSON.parse(event.body);

    if (typeof newPrice === 'undefined') {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'יש לספק מחיר חדש.' }),
      };
    }

    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    const owner = GITHUB_OWNER;
    const repo = GITHUB_REPO;

    const path = 'price.json';
    const message = `Update coffee price to ${newPrice} NIS`;

    const getFileResponse = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });

    const currentContentBase64 = getFileResponse.data.content;
    const currentContent = Buffer.from(currentContentBase64, 'base64').toString('utf-8');
    const sha = getFileResponse.data.sha;

    const newContent = JSON.stringify({ coffeePrice: parseInt(newPrice) }, null, 2) + '\n';
    const newContentBase64 = Buffer.from(newContent).toString('base64');

    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: newContentBase64,
      sha,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `המחיר עודכן בהצלחה ל-${newPrice} שקל.` }),
    };
  } catch (error) {
    console.error('שגיאה בפונקציה updatePrice:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'שגיאה בעדכון המחיר.' }),
    };
  }
};
