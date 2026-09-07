// Get the form and result section
const studentForm = document.getElementById("studentForm");
const resultSection = document.getElementById("resultSection");
const alertBox = document.getElementById("alertBox");

// Subject information
const subjects = [
    { id: "htmlMarks", name: "HTML" },
    { id: "bootstrapMarks", name: "Bootstrap" },
    { id: "javascriptMarks", name: "JavaScript" },
    { id: "cssMarks", name: "CSS3" },
    { id: "dsaMarks", name: "DSA" },
    { id: "dbmsMarks", name: "DBMS" }
];

// Form submit event
studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Remove old validation state
    studentForm.classList.remove("was-validated");

    // Validate normal HTML required fields
    if (!studentForm.checkValidity()) {
        studentForm.classList.add("was-validated");
        showAlert("Please fill in all required fields correctly.", "danger");
        return;
    }

    // Get marks and validate range
    const marks = subjects.map(subject => Number(document.getElementById(subject.id).value));

    const invalidMarks = marks.some(mark => Number.isNaN(mark) || mark < 0 || mark > 100);

    if (invalidMarks) {
        studentForm.classList.add("was-validated");
        showAlert("Marks must be between 0 and 100.", "danger");
        return;
    }

    // Calculate total and percentage
    const total = marks.reduce((sum, mark) => sum + mark, 0);
    const percentage = (total / 600) * 100;

    // Pass rule: minimum 40 marks in every subject
    const passedAllSubjects = marks.every(mark => mark >= 40);
    const status = passedAllSubjects ? "PASS" : "FAIL";

    // Display student details
    document.getElementById("resultName").textContent =
        document.getElementById("studentName").value.trim();

    document.getElementById("resultRoll").textContent =
        document.getElementById("rollNumber").value.trim();

    document.getElementById("resultEmail").textContent =
        document.getElementById("email").value.trim();

    document.getElementById("resultCourse").textContent =
        document.getElementById("course").value;

    // Create marks table dynamically
    const tableBody = document.getElementById("marksTableBody");
    tableBody.innerHTML = "";

    subjects.forEach((subject, index) => {
        const subjectResult = marks[index] >= 40 ? "PASS" : "FAIL";
        const resultClass = subjectResult === "PASS" ? "pass" : "fail";

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${subject.name}</td>
            <td>${marks[index]}</td>
            <td class="${resultClass}">${subjectResult}</td>
        `;

        tableBody.appendChild(row);
    });

    // Display summary
    document.getElementById("totalMarks").textContent = total;
    document.getElementById("percentage").textContent = percentage.toFixed(2) + "%";

    const finalStatus = document.getElementById("finalStatus");
    finalStatus.textContent = status;
    finalStatus.className = status === "PASS" ? "pass" : "fail";

    // Change result card color depending on status
    const resultHeader = resultSection.querySelector(".card-header");

    if (status === "PASS") {
        resultHeader.className = "card-header bg-success text-white";
    } else {
        resultHeader.className = "card-header bg-danger text-white";
    }

    // Show result section
    resultSection.classList.remove("d-none");

    // Scroll to result
    resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    showAlert("Result calculated successfully!", "success");
});

// Reset button
document.getElementById("resetBtn").addEventListener("click", function () {
    studentForm.classList.remove("was-validated");
    resultSection.classList.add("d-none");
    alertBox.innerHTML = "";
});

// Function to display Bootstrap alert
function showAlert(message, type) {
    alertBox.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}