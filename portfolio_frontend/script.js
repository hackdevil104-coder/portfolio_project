// -------------------- Navbar Menu --------------------
const menubar = document.querySelector('#menu');
const Navbar = document.querySelector('.navbar');

menubar.onclick = () => {
    menubar.classList.toggle('bx-x');
    Navbar.classList.toggle('active');
};

// -------------------- Scroll Active Link + Animation --------------------
const sections = document.querySelectorAll('section');
const navlink = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {

    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {

            // ✅ animation trigger
            sec.classList.add('start-animation');

            // active nav link
            navlink.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(
                `header nav a[href*="${id}"]`
            );
            if (activeLink) activeLink.classList.add('active');
        }
    });

    document.querySelector('.header')
        .classList.toggle('sticky', window.scrollY > 100);

    menubar.classList.remove('bx-x');
    Navbar.classList.remove('active');
});

// -------------------- Projects Fetch + Animation Fix --------------------
document.addEventListener("DOMContentLoaded", () => {

    fetch("http://16.176.155.129:8080/projects")
        .then(res => res.json())
        .then(data => {

            const projectList = document.getElementById("projectList");
            if (!projectList) return;

            projectList.innerHTML = "";

            data.forEach((project, index) => {

                const div = document.createElement("div");

                // 🔥 IMPORTANT: animation class ready
                div.classList.add("project-box");

                div.innerHTML = `
                    <div class="education-content">
                        <div class="content">
                            <h3>${project.projectName}</h3>
                            <p>${project.description}</p>

                            <div class="project-links">
                                <a href="${project.liveUrl}"
                                   target="_blank"
                                   class="btn">Live</a>

                                <a href="${project.githubUrl}"
                                   target="_blank"
                                   class="btn">GitHub</a>
                            </div>
                        </div>
                    </div>
                `;

                projectList.appendChild(div);
            });

            // ✅ force animation check after load
            triggerProjectAnimation();
        })
        .catch(err => console.error("Projects Fetch Error:", err));
});

// -------------------- FORCE PROJECT ANIMATION --------------------
function triggerProjectAnimation() {
    const projectSection = document.getElementById("projects");
    const top = window.scrollY;
    const offset = projectSection.offsetTop - 150;
    const height = projectSection.offsetHeight;

    if (top >= offset && top < offset + height) {
        projectSection.classList.add("start-animation");
    }
}

// -------------------- Contact Form Validation --------------------
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = contactForm.fullName.value.trim();
        const email = contactForm.email.value.trim();
        const mobile = contactForm.mobile.value.trim();
        const subject = contactForm.subject.value.trim();
        const message = contactForm.message.value.trim();

        if (name === "") return alert("Name is required");

        if (!/^[0-9]{10}$/.test(mobile))
            return alert("Phone number must be 10 digits");

        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail\.com$/.test(email))
            return alert("Enter valid Gmail");

        if (!/^[A-Za-z\s]+$/.test(subject))
            return alert("Subject must contain letters only");

        if (message === "") return alert("Message cannot be empty");

        fetch("http://16.176.155.129:8080/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, mobile, subject, message })
        })
        .then(() => {
            alert("Message sent successfully ✅");
            contactForm.reset();
        })
        .catch(() => alert("Error sending message ❌"));
    });
}
