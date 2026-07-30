// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
// =============================================================================

const readlineSync = require('readline-sync');

// -----------------------------------------------------------------------------
// Helper — Calculate average score for a single student
// -----------------------------------------------------------------------------

function calculateAverage(student) {
    if (student.scores.length === 0) {
        return 0;
    }

    let sum = 0;
    for (let i = 0; i < student.scores.length; i++) {
        sum += student.scores[i];
    }
    return sum / student.scores.length;
}

// -----------------------------------------------------------------------------
// Feature 1 — Add a Student
// -----------------------------------------------------------------------------

function addStudent(students) {
    const name = readlineSync.question("Student name: ");
    const id = readlineSync.questionInt("Student ID: ");
    const numScores = readlineSync.questionInt("How many scores? ");

    if (numScores <= 0) {
        console.log("Error: Number of scores must be positive. Student not added.");
        return;
    }

    const scores = [];
    for (let i = 0; i < numScores; i++) {
        const score = readlineSync.questionFloat(`Enter score ${i + 1}: `);
        scores.push(score);
    }

    students.push({ name, id, scores });
    console.log(`Student "${name}" added successfully.`);
}

// -----------------------------------------------------------------------------
// Feature 2 — Display All Students
// -----------------------------------------------------------------------------

function displayAllStudents(students) {
    if (students.length === 0) {
        console.log("No students have been added yet.");
        return;
    }

    for (const student of students) {
        console.log();
        console.log(`Name:    ${student.name}`);
        console.log(`ID:      ${student.id}`);
        console.log(`Scores:  ${student.scores.join(', ')}`);
        console.log(`Average: ${calculateAverage(student).toFixed(2)}`);
    }
}

// -----------------------------------------------------------------------------
// Feature 3 — Calculate Average Score for a Specific Student
// -----------------------------------------------------------------------------

function findStudentAverage(students) {
    const id = readlineSync.questionInt("Enter student ID: ");

    for (const student of students) {
        if (student.id === id) {
            console.log(`${student.name}'s average score: ${calculateAverage(student).toFixed(2)}`);
            return;
        }
    }

    console.log(`Error: No student found with ID ${id}.`);
}

// -----------------------------------------------------------------------------
// Main program: menu loop
// -----------------------------------------------------------------------------

function main() {
    let students = [];
    let running = true;

    while (running) {
        console.log();
        console.log("================================");
        console.log("   STUDENT RECORD SYSTEM MENU");
        console.log("================================");
        console.log("1. Add student");
        console.log("2. Display all students");
        console.log("3. Calculate average score");
        console.log("4. Quit");
        const choice = readlineSync.questionInt("Enter your choice (1-4): ");

        switch (choice) {
            case 1:
                addStudent(students);
                break;
            case 2:
                displayAllStudents(students);
                break;
            case 3:
                findStudentAverage(students);
                break;
            case 4:
                console.log("Goodbye!");
                running = false;
                break;
            default:
                console.log("Error: Invalid choice. Please enter 1-4.");
                break;
        }
    }
}

main();