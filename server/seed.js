const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://sivakirlampalli:Siva2004@cluster0.7lmi6xv.mongodb.net/dashboardDB?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ Connection error:", err));

const Task = require('./models/Task');

async function seed() {
  await Task.deleteMany({}); // clear the collection
  await Task.insertMany([
    {
      title: "Frontend Developer",
      job: "Frontend Developer",
      progress: 40,
      status: "running",
      avatars: ["/assets/user1.jpg"],
      image: "/assets/task1.jpg",
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      daysLeft: 2,
      url: "https://example.com/frontend",
      details: ["UI work", "React components"]
    },
    {
      title: "Backend Engineer",
      job: "Backend Engineer",
      progress: 50,
      status: "running",
      avatars: ["/assets/user2.jpg"],
      image: "/assets/task2.jpg",
      deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      daysLeft: 4,
      url: "https://example.com/backend",
      details: ["API build", "Database"]
    },
    {
      title: "QA Tester",
      job: "QA Engineer",
      progress: 60,
      status: "running",
      avatars: ["/assets/user3.jpg"],
      image: "/assets/task3.jpg",
      deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      daysLeft: 6,
      url: "https://example.com/qa",
      details: ["Test cases", "Bug reporting"]
    },

    {
  title: "API Integration Sprint",
  job: "Full Stack Developer",
  progress: 35,
  status: "running",
  avatars: ["/assets/user2.jpg"],
  image: "/assets/api_sprint.jpg",
  deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
  daysLeft: 8,
  url: "https://example.com/api-integration",
  details: [
    "Connect third-party services",
    "Optimize request flows",
    "Implement RESTful endpoints"
  ]
},
{
  title: "Security Audit Review",
  job: "Cybersecurity Analyst",
  progress: 75,
  status: "running",
  avatars: ["/assets/user3.jpg"],
  image: "/assets/security_audit.jpg",
  deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
  daysLeft: 12,
  url: "https://example.com/security-audit",
  details: [
    "Assess system vulnerabilities",
    "Update security documentation",
    "Review compliance checklist"
  ]
},


    {
      title: "Daily Standup Meeting Website",
      job: "Scrum Master",
      progress: 55,
      status: "running",
      avatars: ["/assets/user3.jpg"],
      image: "/assets/standup.jpg",
      deadline: new Date("2022-07-14T00:00:00Z"), // Use start of day UTC to match date query
      daysLeft: 7,
      url: "https://example.com/standup",
      details: ["Discuss progress", "Review blockers", "Have to submit this task by 14 sept"]
    }
  ]);
  console.log("✅ Multiple tasks seeded!");
  mongoose.disconnect();
}

seed();
