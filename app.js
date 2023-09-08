const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Sample data for the highest alphabet calculation
// const ALPHABET_SCORES = {
//   a: 1, b: 2, c: 3, d: 4, e:5,f:6,g:7,h:8,i:9,j:10,k:11,l:12,m:13,n:14,o:15,p:16,q:17,r:18,s:19,t:20,u:21,v:22,w:23,x:24,y:225,z:26/* Add more letters and scores as needed */
// };

// Route for POST requests
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      throw new Error('Invalid data format. Expected an array.');
    }

    // Extract numbers and alphabets from the data array
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    // Calculate the highest alphabet in the input array
    // const highestAlphabet = alphabets.reduce((max, current) => {
    //   const maxScore = ALPHABET_SCORES[max] || 0;
    //   const currentScore = ALPHABET_SCORES[current] || 0;
    //   return currentScore > maxScore ? current : max;
    // }, '');

    function getAlphabetScore(alphabet) {
        return alphabet.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
      }



      let highestAlphabet = '';
    let highestScore = 0;

    for (const alphabet of alphabets) {
      const score = getAlphabetScore(alphabet.toLowerCase());
      if (score > highestScore) {
        highestScore = score;
        highestAlphabet = alphabet;
      }
    }

    const response = {
      user_id: `SiddhantSaxena_15092002`,
      is_success: true,
      college_email_id: `ss6076@srmist.edu.in`,
      college_roll_number: `RA2011003030097`,
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highestAlphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route for GET requests
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
