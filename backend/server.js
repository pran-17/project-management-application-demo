const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./src/config/db');

const authRoutes = require('./src/routes/tempAuth');
const studentRoutes = require('./src/routes/tempStudent');
const teacherRoutes = require('./src/routes/teacherRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const updateRoutes = require('./src/routes/updateRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());


app.get('/', (req, res) => {

  res.json({
    message: 'Project Management Backend Running'
  });

});


app.use('/api/auth', authRoutes);

app.use('/api/students', studentRoutes);

app.use('/api/teachers', teacherRoutes);

app.use('/api/projects', projectRoutes);

app.use('/api/updates', updateRoutes);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});