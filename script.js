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
    const gender = document.querySelector('input[name="gender"]:checked');
    const selectedCourse = course.value;
    const selectedSkills = document.querySelectorAll(
        'input[name="skills"]:checked'
    );
    const aboutValue = about.value.trim();
    const photoFile = photo.files[0];

    let isValid = true;

    const nameRegex = /^[A-Za-z ]{3,}$/;
    const phoneRegex = /^\d{10}$/;

    if (!nameRegex.test(nameValue)) {
        document.querySelector("#nameError").textContent =
            "Enter at least 3 letters. Only letters and spaces are allowed.";
        isValid = false;
    }

    if (emailValue === "") {
        document.querySelector("#emailError").textContent =
            "Email is required.";
        isValid = false;
    } else if (!email.checkValidity()) {
        document.querySelector("#emailError").textContent =
            "Enter a valid email address.";
        isValid = false;
    }

    if (!phoneRegex.test(phoneValue)) {
        document.querySelector("#phoneError").textContent =
            "Phone number must contain exactly 10 digits.";
        isValid = false;
    }

    if (dobValue === "") {
        document.querySelector("#dobError").textContent =
            "Date of birth is required.";
        isValid = false;
    } else {
        const selectedDate = new Date(dobValue);
        const today = new Date();

        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            document.querySelector("#dobError").textContent =
                "Future date is not allowed.";
            isValid = false;
        }
    }

    if (!gender) {
        document.querySelector("#genderError").textContent =
            "Please select a gender.";
        isValid = false;
    }

    if (selectedCourse === "") {
        document.querySelector("#courseError").textContent =
            "Please select a course.";
        isValid = false;
    }

    if (selectedSkills.length === 0) {
        document.querySelector("#skillsError").textContent =
            "Select at least one skill.";
        isValid = false;
    }

    if (aboutValue === "") {
        document.querySelector("#aboutError").textContent =
            "About student is required.";
        isValid = false;
    }

    if (!photoFile) {
        document.querySelector("#photoError").textContent =
            "Please select a profile photo.";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const skills = [];

    selectedSkills.forEach(function (skill) {
        skills.push(skill.value);
    });

    const photoUrl = URL.createObjectURL(photoFile);

    const student = {
        id: nextId,
        name: nameValue,
        email: emailValue,
        phone: phoneValue,
        dob: dobValue,
        gender: gender.value,
        course: selectedCourse,
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
    skillsText.textContent = "Skills: " + student.skills.join(", ");

    const aboutText = document.createElement("p");
    aboutText.textContent = "About: " + student.about;

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
    studentCount.textContent = "Total Students: " + students.length;
}

function clearErrors() {
    const errors = document.querySelectorAll(".error");

    errors.forEach(function (error) {
        error.textContent = "";
    });
}

studentContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        const card = event.target.closest(".student-card");
        const studentId = Number(card.dataset.id);

        const studentIndex = students.findIndex(function (student) {
            return student.id === studentId;
        });

        if (studentIndex !== -1) {
            students.splice(studentIndex, 1);
        }

        card.remove();
        updateStudentCount();
    }
});