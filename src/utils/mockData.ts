
// Faculty bio data
export const facultyBioData = {
  personalInfo: {
    name: "Dr. Rajesh Kumar",
    employeeId: "FAC20150023",
    department: "Computer Science and Engineering",
    designation: "Associate Professor",
    joiningDate: "June 15, 2015",
    email: "rajesh.kumar@kalasalingam.ac.in",
    phone: "+91 9876543210",
    officeLocation: "CSE Block, Room 204",
    imageUrl: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  education: [
    {
      degree: "Ph.D. in Computer Science",
      institution: "Indian Institute of Technology, Madras",
      year: "2012"
    },
    {
      degree: "M.Tech in Computer Science",
      institution: "National Institute of Technology, Trichy",
      year: "2008"
    },
    {
      degree: "B.Tech in Information Technology",
      institution: "Anna University, Chennai",
      year: "2006"
    }
  ],
  research: {
    interests: ["Machine Learning", "Artificial Intelligence", "Data Mining", "Cloud Computing"],
    publications: 42,
    projects: 15,
    patents: 3
  },
  achievements: [
    "Best Faculty Award, Kalasalingam University, 2019",
    "Research Excellence Award, 2018",
    "Outstanding Teacher Award, 2017"
  ]
};

// Faculty classes
export const facultyClasses = [
  {
    id: "CS1001",
    code: "CS301",
    name: "Data Structures and Algorithms",
    semester: "3rd",
    batch: "2023-27",
    students: 45,
    schedule: "Mon, Wed, Fri 10:00-11:00",
    room: "CSE-201"
  },
  {
    id: "CS1002",
    code: "CS401",
    name: "Database Management Systems",
    semester: "4th",
    batch: "2022-26",
    students: 52,
    schedule: "Tue, Thu 9:00-11:00",
    room: "CSE-301"
  },
  {
    id: "CS1003",
    code: "CS505",
    name: "Machine Learning",
    semester: "5th",
    batch: "2021-25",
    students: 38,
    schedule: "Mon, Wed 14:00-15:30",
    room: "CSE-Lab-2"
  },
  {
    id: "CS1004",
    code: "CS602",
    name: "Cloud Computing",
    semester: "6th",
    batch: "2021-25",
    students: 41,
    schedule: "Tue, Thu 13:00-14:30",
    room: "CSE-401"
  }
];

// Faculty timetable
export const facultyTimetable = {
  Monday: [
    { time: "09:00-10:00", activity: "Department Meeting", location: "Meeting Room 101" },
    { time: "10:00-11:00", activity: "CS301: Data Structures and Algorithms", location: "CSE-201", batch: "3rd Sem" },
    { time: "11:15-12:15", activity: "Office Hours", location: "Faculty Office" },
    { time: "13:00-14:00", activity: "Lunch Break", location: "" },
    { time: "14:00-15:30", activity: "CS505: Machine Learning", location: "CSE-Lab-2", batch: "5th Sem" },
    { time: "16:00-17:00", activity: "Research Work", location: "Research Lab" }
  ],
  Tuesday: [
    { time: "09:00-11:00", activity: "CS401: Database Management Systems", location: "CSE-301", batch: "4th Sem" },
    { time: "11:15-12:15", activity: "Student Project Supervision", location: "Project Lab" },
    { time: "13:00-14:30", activity: "CS602: Cloud Computing", location: "CSE-401", batch: "6th Sem" },
    { time: "14:45-16:00", activity: "Faculty Training", location: "Training Hall" },
    { time: "16:00-17:00", activity: "Research Work", location: "Research Lab" }
  ],
  Wednesday: [
    { time: "09:00-10:00", activity: "Office Hours", location: "Faculty Office" },
    { time: "10:00-11:00", activity: "CS301: Data Structures and Algorithms", location: "CSE-201", batch: "3rd Sem" },
    { time: "11:15-13:00", activity: "Ph.D. Student Mentoring", location: "Research Lab" },
    { time: "13:00-14:00", activity: "Lunch Break", location: "" },
    { time: "14:00-15:30", activity: "CS505: Machine Learning", location: "CSE-Lab-2", batch: "5th Sem" },
    { time: "15:45-17:00", activity: "Department Committee", location: "Meeting Room 203" }
  ],
  Thursday: [
    { time: "09:00-11:00", activity: "CS401: Database Management Systems", location: "CSE-301", batch: "4th Sem" },
    { time: "11:15-12:15", activity: "Research Work", location: "Research Lab" },
    { time: "13:00-14:30", activity: "CS602: Cloud Computing", location: "CSE-401", batch: "6th Sem" },
    { time: "14:45-17:00", activity: "Student Project Evaluation", location: "Conference Hall" }
  ],
  Friday: [
    { time: "09:00-10:00", activity: "Administrative Work", location: "Faculty Office" },
    { time: "10:00-11:00", activity: "CS301: Data Structures and Algorithms", location: "CSE-201", batch: "3rd Sem" },
    { time: "11:15-13:00", activity: "Research Collaboration Meeting", location: "Online" },
    { time: "13:00-14:00", activity: "Lunch Break", location: "" },
    { time: "14:00-16:00", activity: "Lab Supervision", location: "CS Lab 3" },
    { time: "16:00-17:00", activity: "Department Review", location: "HOD Office" }
  ]
};

// Student attendance
export const courseAttendance = {
  "CS301": {
    courseName: "Data Structures and Algorithms",
    totalClasses: 32,
    students: [
      { id: "2023001", name: "Aarav Patel", attended: 30, percentage: 93.75 },
      { id: "2023002", name: "Diya Sharma", attended: 29, percentage: 90.63 },
      { id: "2023003", name: "Arjun Singh", attended: 27, percentage: 84.38 },
      { id: "2023004", name: "Ananya Gupta", attended: 32, percentage: 100 },
      { id: "2023005", name: "Vihaan Mehta", attended: 26, percentage: 81.25 },
      { id: "2023006", name: "Ishaan Kumar", attended: 28, percentage: 87.5 },
      { id: "2023007", name: "Aditi Verma", attended: 31, percentage: 96.88 },
      { id: "2023008", name: "Rehan Khan", attended: 25, percentage: 78.13 },
      { id: "2023009", name: "Saanvi Reddy", attended: 30, percentage: 93.75 },
      { id: "2023010", name: "Advait Joshi", attended: 32, percentage: 100 }
    ],
    dates: ["2023-10-02", "2023-10-04", "2023-10-06", "2023-10-09", "2023-10-11"]
  },
  "CS401": {
    courseName: "Database Management Systems",
    totalClasses: 30,
    students: [
      { id: "2022001", name: "Arnav Desai", attended: 28, percentage: 93.33 },
      { id: "2022002", name: "Zara Ahmed", attended: 27, percentage: 90 },
      { id: "2022003", name: "Kabir Malhotra", attended: 25, percentage: 83.33 },
      { id: "2022004", name: "Kyra Iyer", attended: 30, percentage: 100 },
      { id: "2022005", name: "Vivaan Nair", attended: 26, percentage: 86.67 },
      { id: "2022006", name: "Aisha Bose", attended: 29, percentage: 96.67 },
      { id: "2022007", name: "Dev Rao", attended: 24, percentage: 80 },
      { id: "2022008", name: "Myra Shah", attended: 26, percentage: 86.67 },
      { id: "2022009", name: "Krish Trivedi", attended: 28, percentage: 93.33 },
      { id: "2022010", name: "Anika Kapoor", attended: 29, percentage: 96.67 }
    ],
    dates: ["2023-10-03", "2023-10-05", "2023-10-10", "2023-10-12"]
  },
  "CS505": {
    courseName: "Machine Learning",
    totalClasses: 28,
    students: [
      { id: "2021001", name: "Rohan Khanna", attended: 25, percentage: 89.29 },
      { id: "2021002", name: "Navya Sharma", attended: 26, percentage: 92.86 },
      { id: "2021003", name: "Aryan Choudhury", attended: 24, percentage: 85.71 },
      { id: "2021004", name: "Isha Patel", attended: 28, percentage: 100 },
      { id: "2021005", name: "Dhruv Mehra", attended: 22, percentage: 78.57 },
      { id: "2021006", name: "Riya Singh", attended: 25, percentage: 89.29 },
      { id: "2021007", name: "Arush Kapoor", attended: 27, percentage: 96.43 },
      { id: "2021008", name: "Anvi Das", attended: 23, percentage: 82.14 },
      { id: "2021009", name: "Yuvan Raj", attended: 26, percentage: 92.86 },
      { id: "2021010", name: "Mishka Gupta", attended: 24, percentage: 85.71 }
    ],
    dates: ["2023-10-02", "2023-10-04", "2023-10-09", "2023-10-11"]
  },
  "CS602": {
    courseName: "Cloud Computing",
    totalClasses: 26,
    students: [
      { id: "2021001", name: "Rohan Khanna", attended: 24, percentage: 92.31 },
      { id: "2021002", name: "Navya Sharma", attended: 25, percentage: 96.15 },
      { id: "2021003", name: "Aryan Choudhury", attended: 22, percentage: 84.62 },
      { id: "2021004", name: "Isha Patel", attended: 26, percentage: 100 },
      { id: "2021005", name: "Dhruv Mehra", attended: 20, percentage: 76.92 },
      { id: "2021006", name: "Riya Singh", attended: 23, percentage: 88.46 },
      { id: "2021007", name: "Arush Kapoor", attended: 25, percentage: 96.15 },
      { id: "2021008", name: "Anvi Das", attended: 21, percentage: 80.77 },
      { id: "2021009", name: "Yuvan Raj", attended: 24, percentage: 92.31 },
      { id: "2021010", name: "Mishka Gupta", attended: 22, percentage: 84.62 }
    ],
    dates: ["2023-10-03", "2023-10-05", "2023-10-10", "2023-10-12"]
  }
};

// Today's attendance status for taking attendance
export const todaysAttendance = {
  "CS301": {
    courseName: "Data Structures and Algorithms",
    date: new Date().toISOString().split('T')[0],
    students: [
      { id: "2023001", name: "Aarav Patel", present: true },
      { id: "2023002", name: "Diya Sharma", present: true },
      { id: "2023003", name: "Arjun Singh", present: false },
      { id: "2023004", name: "Ananya Gupta", present: true },
      { id: "2023005", name: "Vihaan Mehta", present: true },
      { id: "2023006", name: "Ishaan Kumar", present: true },
      { id: "2023007", name: "Aditi Verma", present: true },
      { id: "2023008", name: "Rehan Khan", present: false },
      { id: "2023009", name: "Saanvi Reddy", present: true },
      { id: "2023010", name: "Advait Joshi", present: true }
    ]
  }
};
