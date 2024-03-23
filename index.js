  const express = require('express');
  const mongoose = require('mongoose');
  const path = require('path'); 
  const chatTranscript = require('./models/chatTranscript ');

  const app = express();
  const port = 4000;
  mongoose.connect('mongodb://localhost:27017/chatTranscript', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  app.use(express.json());

  // app.use(express.static(path.join(__dirname, 'path_to_your_build_folder')));
  // app.get('/admin', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'path_to_your_build_folder/index.html'));
  // });
  
  app.get('/admin', async (req, res) => {
    try {
        const transcripts = await chatTranscript.find();
        const formattedTranscripts = transcripts.map(({ userId, timestamp, para, resolved }) => ({ userId, timestamp, para, resolved }));
        res.send(formattedTranscripts);
    } catch (err) {
        console.error('Error fetching chat transcripts', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const userTranscripts = await chatTranscript.find({ userId });

    res.json(userTranscripts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/storeData', async (req, res) => {
try {
 const jsonData = req.body;
 const { userId, timestamp, para, resolved } = jsonData;
 const newchatTranscript= new chatTranscript({ userId, timestamp, para, resolved });
 await newchatTranscript.save();
 res.status(201).json(newchatTranscript);
} catch (err) {
 res.status(400).json({ message: err.message });
}
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


app.get('/', (req, res) =>{
  res.send("hi");
});


// app.get('/admin', async (req, res) => {
//   try {
//       const transcripts = await chatTranscript.find();
//       res.render('index.ejs', { transcripts });
//   } catch (err) {
//       console.error('Error fetching chat transcripts', err);
//       res.status(500).send('Internal Server Error');
//   }
// });

// app.get('/bigpara', async (req, res) => {
//   try {
//     const bigParas = await chatTranscript.find();
//     res.json(bigParas);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
