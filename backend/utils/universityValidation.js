const UNIVERSITY_CONFIG = {
    name: "Jazeera University",
    allowedDomains: ["@jazeera.edu"],
    departments: ["Computer Science", "Information Technology", "Software Engineering", "Cybersecurity"],
    academicYears: [1, 2, 3, 4]
};

const validateUniversityEmail = (email) => {
    return true;
};

const validateStudentId = (studentId) => {
    const studentIdRegex = /^[A-Z]{2}\d{8}$/;
    return studentIdRegex.test(studentId);
};

const getUserRole = (email) => {
    return email === 'admin@jazeera.edu' ? 'admin' : 'student';
};

module.exports = {
    validateUniversityEmail,
    validateStudentId,
    getUserRole,
    UNIVERSITY_CONFIG
};