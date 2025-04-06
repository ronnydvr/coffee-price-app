exports.handler = async (event) => {
  try {
    const { newPrice } = JSON.parse(event.body);

    if (typeof newPrice === 'undefined') {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'יש לספק מחיר חדש.' }),
      };
    }

    // כאן יבוא הקוד האמיתי לעדכון המחיר (לדוגמה, בבסיס נתונים או בקובץ)
    // לעת עתה, נחזיר רק הודעה שהתקבל מחיר חדש
    console.log('התקבל מחיר חדש:', newPrice);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `התקבל מחיר חדש: ${newPrice} שקל (המחיר לא באמת עודכן עדיין).` }),
    };
  } catch (error) {
    console.error('שגיאה בפונקציה updatePrice:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'שגיאה פנימית בשרת.' }),
    };
  }
};
