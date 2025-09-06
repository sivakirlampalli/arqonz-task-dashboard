const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const mentorRoutes = require('./routes/mentorRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://sivakirlampalli:Siva2004@cluster0.7lmi6xv.mongodb.net/dashboardDB?retryWrites=true&w=majority&appName=Cluster0'); // Update as needed

app.use('/api/tasks', taskRoutes);
app.use('/api/mentors', mentorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
