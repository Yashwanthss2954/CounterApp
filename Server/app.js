// // express-server/app.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5001;

// app.use(express.json());
// app.use(cors());

// // MongoDB Connection
// mongoose.connect('mongodb+srv://yashwanthss2954:Satya21405@cluster0.c0eieqa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('Error connecting to MongoDB:', err));

// // Define counter schema and model
// const counterSchema = new mongoose.Schema({
//     count: { type: Number, default: 0 },
//     mycount:{type:Number,default:0}
// },{ collection: 'counters' });
// const Counter = mongoose.model('Counter', counterSchema);

// // Routes
// app.get('/api/counter', async (req, res) => {
//     console.log("Reached GET method")
//     try {
        
//         const counter = await Counter.findOne();
//         console.log(counter);
//         res.json(counter);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// app.post('/api/counter/increment', async (req, res) => {
//     try {
//         let counter = await Counter.findOne();
//         if (!counter) {
//             counter = new Counter();
//         }
//         counter.count++;
//         await counter.save();
//         res.json(counter);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// app.post('/api/counter/decrement', async (req, res) => {
//     try {
//         let counter = await Counter.findOne();
//         if (!counter) {
//             counter = new Counter();
//         }
//         counter.count--;
//         await counter.save();
//         res.json(counter);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// app.post('/api/mycounter/increment', async (req, res) => {
//     try {
//         let counter = await Counter.findOne();
//         if (!counter) {
//             counter = new Counter();
//         }
//         counter.mycount++;
//         await counter.save();
//         res.json(counter);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });
// app.post('/api/mycounter/decrement', async (req, res) => {
//     try {
//         let counter = await Counter.findOne();
//         if (!counter) {
//             counter = new Counter();
//         }
//         counter.mycount--;
//         await counter.save();
//         res.json(counter);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoUri = 'mongodb+srv://yashwanthss2954:Satya21405@cluster0.c0eieqa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Counter Schema and Model
const counterSchema = new mongoose.Schema({
  count: { type: Number, default: 0 },
  mycount: { type: Number, default: 0 },
}, { collection: 'counters' });

const Counter = mongoose.model('Counter', counterSchema);

// Routes
app.get('/api/counter', async (req, res) => {
  try {
    const counter = await Counter.findOne();
    if (!counter) {
      return res.status(404).json({ message: 'Counter not found' });
    }
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/counter/increment', async (req, res) => {
  try {
    let counter = await Counter.findOne() || new Counter();
    counter.count += 1;
    await counter.save();
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/counter/decrement', async (req, res) => {
  try {
    let counter = await Counter.findOne() || new Counter();
    counter.count -= 1;
    await counter.save();
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
