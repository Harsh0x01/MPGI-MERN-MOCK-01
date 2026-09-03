const form = document.querySelector("#studentForm");
const studentName = document.querySelector("#studentName");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const dob = document.querySelector("#dob");
const course = document.querySelector("#course");
const about = document.querySelector("#about");
const photo = document.querySelector("#photo");
const studentContainer = document.querySelector("#studentContainer");
const studentCount = document.querySelector("#studentCount");

const students = [];
let nextId = 1;

form.addEventListener("submit", function (event) {
    event.preventDefault();

    clearErrors();

    const nameValue = studentName.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const dobValue = dob.value;

    const gender = document.querySelector(
        'input[name="gender"]:checked'
    );

    const selectedSkills = document.querySelectorAll(
        'input[name="skills"]:checked'
    );

    const aboutValue = about.value.trim();
    const photoFile = photo.files[0];

    const nameRegex = /^[A-Za-z ]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    let isValid = true;

    if (nameValue.length < 3 || !nameRegex.test(nameValue)) {
        document.querySelector("#nameError").textContent =
            "Enter valid name";
        isValid = false;
    }

    if (emailValue === "") {
        document.querySelector("#emailError").textContent =
            "Email is required";
        isValid = false;
    } else if (!email.checkValidity()) {
        document.querySelector("#emailError").textContent =
            "Enter valid email";
        isValid = false;
    }

    if (!phoneRegex.test(phoneValue)) {
        document.querySelector("#phoneError").textContent =
            "Phone must be 10 digits";
        isValid = false;
    }

    if (dobValue === "") {
        document.querySelector("#dobError").textContent =
            "DOB is required";
        isValid = false;
    } else {
        const selectedDate = new Date(dobValue);
        const today = new Date();

        if (selectedDate > today) {
            document.querySelector("#dobError").textContent =
                "Future date is not allowed";
            isValid = false;
        }
    }

    if (!gender) {
        document.querySelector("#genderError").textContent =
            "Select gender";
        isValid = false;
    }

    if (course.value === "") {
        document.querySelector("#courseError").textContent =
            "Select course";
        isValid = false;
    }

    if (selectedSkills.length === 0) {
        document.querySelector("#skillsError").textContent =
            "Select at least one skill";
        isValid = false;
    }

    if (aboutValue === "") {
        document.querySelector("#aboutError").textContent =
            "About is required";
        isValid = false;
    }

    if (!photoFile) {
        document.querySelector("#photoError").textContent =
            "Select profile photo";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const skills = [];

    for (let i = 0; i < selectedSkills.length; i++) {
        skills.push(selectedSkills[i].value);
    }

    const photoUrl = URL.createObjectURL(photoFile);

    const student = {
        id: nextId,
        name: nameValue,
        email: emailValue,
        phone: phoneValue,
        dob: dobValue,
        gender: gender.value,
        course: course.value,
        skills: skills,
        about: aboutValue,
        photo: photoUrl
    };

    students.push(student);
    nextId++;

    createStudentCard(student);
    updateStudentCount();

    form.reset();
    clearErrors();
});

function createStudentCard(student) {
    const card = document.createElement("div");
    card.classList.add("student-card");
    card.dataset.id = student.id;

    const image = document.createElement("img");
    image.src = student.photo;
    image.alt = student.name;

    const heading = document.createElement("h3");
    heading.textContent = student.name;

    const emailText = document.createElement("p");
    emailText.textContent = "Email: " + student.email;

    const phoneText = document.createElement("p");
    phoneText.textContent = "Phone: " + student.phone;

    const dobText = document.createElement("p");
    dobText.textContent = "DOB: " + student.dob;

    const genderText = document.createElement("p");
    genderText.textContent = "Gender: " + student.gender;

    const courseText = document.createElement("p");
    courseText.textContent = "Course: " + student.course;

    const skillsText = document.createElement("p");
    skillsText.textContent =
        "Skills: " + student.skills.join(", ");

    const aboutText = document.createElement("p");
    aboutText.textContent =
        "About: " + student.about;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    card.appendChild(image);
    card.appendChild(heading);
    card.appendChild(emailText);
    card.appendChild(phoneText);
    card.appendChild(dobText);
    card.appendChild(genderText);
    card.appendChild(courseText);
    card.appendChild(skillsText);
    card.appendChild(aboutText);
    card.appendChild(deleteButton);

    studentContainer.appendChild(card);
}

function updateStudentCount() {
    studentCount.textContent =
        "Total Students: " + students.length;
}

function clearErrors() {
    const errors = document.querySelectorAll(".error");

    for (let i = 0; i < errors.length; i++) {
        errors[i].textContent = "";
    }
}

studentContainer.addEventListener("click", function (event) {

    if (event.target.classList.contains("delete-btn")) {

        const card = event.target.closest(".student-card");
        const studentId = Number(card.dataset.id);

        for (let i = 0; i < students.length; i++) {
            if (students[i].id === studentId) {
                students.splice(i, 1);
                break;
            }
        }

        card.remove();
        updateStudentCount();
    }
});