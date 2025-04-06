const { Octokit } = require("@octokit/rest");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

exports.handler = async (event) => {
  console.log('Function updatePrice started!'); // הוסף את השורה הזו (לצורך בדיקה)
  try {
    // ... שאר הקוד שמשתמש ב-octokit ...
  } catch (error) {
    // ...
  }
};
