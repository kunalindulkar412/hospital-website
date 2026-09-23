/* =========================================================
   MAX CARE HOSPITAL
   Premium Healthcare SaaS
   script.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       GLOBAL STATE
    ===================================================== */

    let currentRole = "patient";

    let selectedDoctor = {
        id: "rahul",
        name: "Dr. Rahul Sharma",
        specialty: "Cardiologist",
        experience: "12",
        room: "402",
        fee: "₹800"
    };

    let selectedDate = "15";
    let selectedTime = "10:30 AM";
    let selectedConsultation = "inperson";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const authScreen = document.getElementById("authScreen");
    const appShell = document.getElementById("appShell");

    const loginForm = document.getElementById("loginForm");
    const loginButton = document.getElementById("loginButton");

    const identifier = document.getElementById("identifier");
    const password = document.getElementById("password");

    const identifierLabel = document.getElementById("identifierLabel");

    const passwordToggle = document.getElementById("passwordToggle");

    const appointmentModal =
        document.getElementById("appointmentModal");

    const closeModal =
        document.getElementById("closeModal");

    const modalCancel =
        document.getElementById("modalCancel");

    const confirmBooking =
        document.getElementById("confirmBooking");

    const sidebar =
        document.getElementById("sidebar");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const roleDropdown =
        document.getElementById("roleDropdown");

    const roleDropdownMenu =
        document.getElementById("roleDropdownMenu");

    const logoutButton =
        document.getElementById("logoutButton");

    const toast =
        document.getElementById("toast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");

    const toastClose =
        document.getElementById("toastClose");


    /* =====================================================
       ROLE CONFIGURATION
    ===================================================== */

    const roleConfig = {

        patient: {
            roleName: "Patient Portal",

            loginLabel: "Email / UHID",

            loginPlaceholder:
                "Enter your email or UHID",

            buttonText:
                "Sign In to Patient Portal",

            name: "Aarav Verma",

            shortName: "Aarav",

            initials: "AV",

            status: "Verified Patient",

            uhid: "MC-2026-8941"
        },

        doctor: {
            roleName: "Doctor Portal",

            loginLabel: "Doctor ID / Email",

            loginPlaceholder:
                "Enter your Doctor ID or email",

            buttonText:
                "Sign In to Doctor Portal",

            name: "Dr. Rahul Sharma",

            shortName: "Rahul",

            initials: "RS",

            status: "Verified Specialist",

            uhid: "DOC-MC-1042"
        },

        admin: {
            roleName: "Admin Portal",

            loginLabel: "Admin ID / Email",

            loginPlaceholder:
                "Enter your Admin ID or email",

            buttonText:
                "Sign In to Admin Portal",

            name: "Hospital Administrator",

            shortName: "Administrator",

            initials: "AD",

            status: "System Administrator",

            uhid: "ADM-MC-001"
        }

    };


    /* =====================================================
       DOCTOR DATABASE
    ===================================================== */

    const doctors = {

        rahul: {
            id: "rahul",
            name: "Dr. Rahul Sharma",
            specialty: "Cardiologist",
            experience: "12",
            room: "402",
            fee: "₹800"
        },

        priya: {
            id: "priya",
            name: "Dr. Priya Nair",
            specialty: "Neurologist",
            experience: "15",
            room: "306",
            fee: "₹1000"
        },

        amit: {
            id: "amit",
            name: "Dr. Amit Kulkarni",
            specialty: "Orthopedic Surgeon",
            experience: "10",
            room: "218",
            fee: "₹750"
        },

        sneha: {
            id: "sneha",
            name: "Dr. Sneha Mehta",
            specialty: "Dermatologist",
            experience: "9",
            room: "512",
            fee: "₹700"
        }

    };


    /* =====================================================
       UTILITY — TOAST
    ===================================================== */

    let toastTimer;

    function showToast(title, message) {

        clearTimeout(toastTimer);

        toastTitle.textContent = title;
        toastMessage.textContent = message;

        toast.classList.add("show");

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 4000);
    }


    if (toastClose) {

        toastClose.addEventListener("click", () => {
            toast.classList.remove("show");
        });

    }


    /* =====================================================
       LOGIN ROLE SWITCHING
    ===================================================== */

    const roleTabs =
        document.querySelectorAll(".role-tab");

    roleTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const role =
                tab.dataset.role;

            setLoginRole(role);

        });

    });


    function setLoginRole(role) {

        currentRole = role;

        const config =
            roleConfig[role];

        roleTabs.forEach(tab => {

            tab.classList.toggle(
                "active",
                tab.dataset.role === role
            );

        });

        identifierLabel.textContent =
            config.loginLabel;

        identifier.placeholder =
            config.loginPlaceholder;

        loginButton.querySelector("span").textContent =
            config.buttonText;

        /*
         * Clear existing login values
         * when manually switching role.
         */

        identifier.value = "";
        password.value = "";

        password.type = "password";

        updatePasswordIcon();

    }


    /* =====================================================
       PASSWORD VISIBILITY
    ===================================================== */

    if (passwordToggle) {

        passwordToggle.addEventListener("click", () => {

            if (password.type === "password") {

                password.type = "text";

            } else {

                password.type = "password";

            }

            updatePasswordIcon();

        });

    }


    function updatePasswordIcon() {

        const icon =
            passwordToggle.querySelector("i");

        if (password.type === "password") {

            icon.className =
                "fa-regular fa-eye";

            passwordToggle.setAttribute(
                "aria-label",
                "Show password"
            );

        } else {

            icon.className =
                "fa-regular fa-eye-slash";

            passwordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        }

    }


    /* =====================================================
       DEMO PROFILES
    ===================================================== */

    const demoProfiles =
        document.querySelectorAll(".demo-profile");

    demoProfiles.forEach(profile => {

        profile.addEventListener("click", () => {

            const role =
                profile.dataset.demo;

            const config =
                roleConfig[role];

            setLoginRole(role);

            /*
             * Demo credentials
             */

            if (role === "patient") {

                identifier.value =
                    "aarav.verma@maxcare.in";

                password.value =
                    "Patient@123";

            }

            if (role === "doctor") {

                identifier.value =
                    "DOC-MC-1042";

                password.value =
                    "Doctor@123";

            }

            if (role === "admin") {

                identifier.value =
                    "ADM-MC-001";

                password.value =
                    "Admin@123";

            }

            showToast(
                "Demo Profile Loaded",
                `${config.name} profile is ready to sign in.`
            );

        });

    });


    /* =====================================================
       LOGIN
    ===================================================== */

    loginForm.addEventListener("submit", event => {

        event.preventDefault();

        if (!identifier.value.trim()) {

            showToast(
                "Missing Information",
                "Please enter your email or portal ID."
            );

            identifier.focus();

            return;
        }

        if (!password.value.trim()) {

            showToast(
                "Missing Information",
                "Please enter your password."
            );

            password.focus();

            return;
        }

        const config =
            roleConfig[currentRole];

        /*
         * Button loading state
         */

        const originalButton =
            loginButton.innerHTML;

        loginButton.disabled = true;

        loginButton.innerHTML = `
            <i class="fa-solid fa-circle-notch fa-spin"></i>
            <span>Authenticating...</span>
        `;


        setTimeout(() => {

            loginButton.disabled = false;

            loginButton.innerHTML =
                originalButton;

            openDashboard(currentRole);

        }, 850);

    });


    /* =====================================================
       OPEN DASHBOARD
    ===================================================== */

    function openDashboard(role) {

        currentRole = role;

        const config =
            roleConfig[role];

        authScreen.classList.add("hidden");

        appShell.classList.remove("hidden");

        /*
         * Update user information
         */

        updateUserInterface(config);

        /*
         * Reset dashboard view
         */

        showView("dashboard");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        showToast(
            "Welcome to Max Care",
            `${config.name} — ${config.roleName} is ready.`
        );

    }


    /* =====================================================
       UPDATE USER INTERFACE
    ===================================================== */

    function updateUserInterface(config) {

        const headerRole =
            document.getElementById("headerRole");

        const sidebarPortalName =
            document.getElementById("sidebarPortalName");

        const headerUserName =
            document.getElementById("headerUserName");

        const headerUserStatus =
            document.getElementById("headerUserStatus");

        const sidebarUserName =
            document.getElementById("sidebarUserName");

        const sidebarUserRole =
            document.getElementById("sidebarUserRole");

        const headerAvatar =
            document.getElementById("headerAvatar");

        const sidebarAvatar =
            document.getElementById("sidebarAvatar");

        const welcomeName =
            document.getElementById("welcomeName");

        const uhidValue =
            document.getElementById("uhidValue");


        if (headerRole) {
            headerRole.textContent =
                config.roleName;
        }

        if (sidebarPortalName) {
            sidebarPortalName.textContent =
                config.roleName;
        }

        if (headerUserName) {
            headerUserName.textContent =
                config.name;
        }

        if (headerUserStatus) {
            headerUserStatus.textContent =
                config.status;
        }

        if (sidebarUserName) {
            sidebarUserName.textContent =
                config.name;
        }

        if (sidebarUserRole) {
            sidebarUserRole.textContent =
                config.status;
        }

        if (headerAvatar) {
            headerAvatar.textContent =
                config.initials;
        }

        if (sidebarAvatar) {
            sidebarAvatar.textContent =
                config.initials;
        }

        if (welcomeName) {
            welcomeName.textContent =
                config.shortName;
        }

        if (uhidValue) {
            uhidValue.textContent =
                config.uhid;
        }

    }


    /* =====================================================
       DASHBOARD NAVIGATION
    ===================================================== */

    const navItems =
        document.querySelectorAll(".nav-item");

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const action =
                item.dataset.action;

            const view =
                item.dataset.view;

            if (action === "book") {

                openAppointmentModal();

                closeMobileSidebar();

                return;
            }

            if (view) {

                showView(view);

                closeMobileSidebar();

            }

        });

    });


    /* =====================================================
       ALL DATA-VIEW ELEMENTS
    ===================================================== */

    const viewElements =
        document.querySelectorAll("[data-view]");

    viewElements.forEach(element => {

        /*
         * Avoid duplicate event handling
         * for sidebar nav items.
         */

        if (element.classList.contains("nav-item")) {
            return;
        }

        element.addEventListener("click", () => {

            const view =
                element.dataset.view;

            if (view) {

                showView(view);

                closeMobileSidebar();

            }

        });

    });


    /* =====================================================
       SHOW VIEW
    ===================================================== */

    function showView(viewName) {

        const views =
            document.querySelectorAll(".page-view");

        views.forEach(view => {

            view.classList.remove(
                "active-view"
            );

        });


        const targetView =
            document.getElementById(
                `${viewName}View`
            );

        if (targetView) {

            targetView.classList.add(
                "active-view"
            );

        }


        /*
         * Sidebar active state
         */

        navItems.forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.view === viewName
            );

        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       BOOK APPOINTMENT BUTTONS
    ===================================================== */

    const bookingButtons =
        document.querySelectorAll(
            '[data-action="book"]'
        );

    bookingButtons.forEach(button => {

        button.addEventListener("click", () => {

            openAppointmentModal();

        });

    });


    /* =====================================================
       OPEN MODAL
    ===================================================== */

    function openAppointmentModal() {

        appointmentModal.classList.add("show");

        appointmentModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

        /*
         * Reset default selection
         */

        selectDoctor("rahul");

        selectConsultation("inperson");

        selectDate("15");

        selectTime("10:30 AM");

    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeAppointmentModal() {

        appointmentModal.classList.remove("show");

        appointmentModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    closeModal.addEventListener(
        "click",
        closeAppointmentModal
    );

    modalCancel.addEventListener(
        "click",
        closeAppointmentModal
    );


    /*
     * Click outside modal
     */

    appointmentModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                appointmentModal
            ) {

                closeAppointmentModal();

            }

        }
    );


    /*
     * ESC key
     */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                appointmentModal.classList.contains("show")
            ) {

                closeAppointmentModal();

            }

        }
    );


    /* =====================================================
       DOCTOR SWITCHING
    ===================================================== */

    const doctorSwitches =
        document.querySelectorAll(
            ".doctor-switch"
        );

    doctorSwitches.forEach(button => {

        button.addEventListener("click", () => {

            const doctorId =
                button.dataset.doctor;

            selectDoctor(doctorId);

        });

    });


    function selectDoctor(doctorId) {

        const doctor =
            doctors[doctorId];

        if (!doctor) {
            return;
        }

        selectedDoctor =
            doctor;

        doctorSwitches.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.doctor === doctorId
            );

        });


        document.getElementById(
            "selectedDoctorName"
        ).textContent =
            doctor.name;

        document.getElementById(
            "selectedDoctorSpecialty"
        ).textContent =
            doctor.specialty;

        document.getElementById(
            "selectedDoctorExperience"
        ).textContent =
            doctor.experience;

        document.getElementById(
            "selectedDoctorRoom"
        ).textContent =
            doctor.room;

        document.getElementById(
            "selectedDoctorFee"
        ).textContent =
            doctor.fee;


        updateBookingSummary();

    }


    /* =====================================================
       CONSULTATION TYPE
    ===================================================== */

    const consultationCards =
        document.querySelectorAll(
            ".consultation-card"
        );

    consultationCards.forEach(card => {

        card.addEventListener("click", () => {

            const type =
                card.dataset.consultation;

            selectConsultation(type);

        });

    });


    function selectConsultation(type) {

        selectedConsultation =
            type;

        consultationCards.forEach(card => {

            card.classList.toggle(
                "active",
                card.dataset.consultation === type
            );

        });

        updateBookingSummary();

    }


    /* =====================================================
       DATE SELECTION
    ===================================================== */

    const dateCards =
        document.querySelectorAll(
            ".date-card:not(:disabled)"
        );

    dateCards.forEach(card => {

        card.addEventListener("click", () => {

            const date =
                card.dataset.date;

            selectDate(date);

        });

    });


    function selectDate(date) {

        selectedDate =
            date;

        dateCards.forEach(card => {

            card.classList.toggle(
                "active",
                card.dataset.date === date
            );

        });

        /*
         * Demo logic:
         * selecting a different date can
         * update available slots.
         */

        updateTimeSlotsForDate(date);

        updateBookingSummary();

    }


    /* =====================================================
       TIME SLOT SELECTION
    ===================================================== */

    const timeSlots =
        document.querySelectorAll(
            ".time-slot:not(:disabled)"
        );

    timeSlots.forEach(slot => {

        slot.addEventListener("click", () => {

            const time =
                slot.textContent
                    .replace("✓", "")
                    .trim();

            selectTime(time);

        });

    });


    function selectTime(time) {

        selectedTime =
            time;

        timeSlots.forEach(slot => {

            /*
             * Remove old selected state
             */

            slot.classList.remove(
                "active"
            );

            const check =
                slot.querySelector("i");

            if (check) {
                check.remove();
            }

        });


        /*
         * Find matching slot
         */

        timeSlots.forEach(slot => {

            const slotTime =
                slot.textContent.trim();

            if (slotTime === time) {

                slot.classList.add("active");

                const icon =
                    document.createElement("i");

                icon.className =
                    "fa-solid fa-check";

                slot.appendChild(icon);

            }

        });

        updateBookingSummary();

    }


    /* =====================================================
       DATE → TIME SLOT DEMO
    ===================================================== */

    function updateTimeSlotsForDate(date) {

        /*
         * This is frontend demo logic.
         * Different dates can have different
         * availability patterns.
         */

        const allSlots =
            document.querySelectorAll(
                ".time-slot"
            );

        allSlots.forEach(slot => {

            /*
             * Reset all slots
             */

            slot.disabled = false;

            slot.classList.remove(
                "booked",
                "active"
            );

            const existingIcon =
                slot.querySelector("i");

            if (existingIcon) {
                existingIcon.remove();
            }

        });


        /*
         * Sunday / special date example
         */

        if (date === "14") {

            markSlotBooked("09:30 AM");
            markSlotBooked("11:00 AM");
            markSlotBooked("01:00 PM");

        }


        if (date === "16") {

            markSlotBooked("09:00 AM");
            markSlotBooked("10:30 AM");
            markSlotBooked("04:30 PM");

        }


        if (date === "17") {

            markSlotBooked("10:00 AM");
            markSlotBooked("12:30 PM");
            markSlotBooked("05:30 PM");

        }


        /*
         * Select first available slot
         */

        const availableSlot =
            Array.from(
                document.querySelectorAll(
                    ".time-slot:not(:disabled)"
                )
            )[0];

        if (availableSlot) {

            const firstTime =
                availableSlot.textContent.trim();

            selectTime(firstTime);

        }

    }


    function markSlotBooked(time) {

        document
            .querySelectorAll(".time-slot")
            .forEach(slot => {

                const slotTime =
                    slot.textContent.trim();

                if (slotTime === time) {

                    slot.disabled = true;

                    slot.classList.add(
                        "booked"
                    );

                }

            });

    }


    /* =====================================================
       BOOKING SUMMARY
    ===================================================== */

    function updateBookingSummary() {

        const summary =
            document.getElementById(
                "bookingSummary"
            );

        if (!summary) {
            return;
        }

        const consultationText =
            selectedConsultation === "video"
                ? "Video Consultation"
                : "In-Person";

        summary.textContent =
            `${selectedDoctor.name} · Tue, ${selectedDate} Sep · ${selectedTime} · ${consultationText}`;

    }


    /* =====================================================
       CONFIRM APPOINTMENT
    ===================================================== */

    confirmBooking.addEventListener(
        "click",
        () => {

            const original =
                confirmBooking.innerHTML;

            confirmBooking.disabled = true;

            confirmBooking.innerHTML = `
                <i class="fa-solid fa-circle-notch fa-spin"></i>
                Confirming...
            `;


            setTimeout(() => {

                confirmBooking.disabled = false;

                confirmBooking.innerHTML =
                    original;

                closeAppointmentModal();

                showToast(
                    "Appointment Confirmed",
                    `${selectedDoctor.name} · ${selectedTime} · 15 Sep 2026`
                );

                /*
                 * Update dashboard appointment
                 * with selected doctor.
                 */

                updateDashboardAppointment();

            }, 900);

        }
    );


    /* =====================================================
       UPDATE DASHBOARD APPOINTMENT
    ===================================================== */

    function updateDashboardAppointment() {

        const doctorName =
            document.querySelector(
                ".doctor-main-details h2"
            );

        const specialty =
            document.querySelector(
                ".doctor-speciality"
            );

        const location =
            document.querySelector(
                ".hospital-location"
            );

        if (doctorName) {

            doctorName.textContent =
                selectedDoctor.name;

        }

        if (specialty) {

            specialty.innerHTML = `
                <i class="fa-solid fa-heart-pulse"></i>
                ${selectedDoctor.specialty}
            `;

        }

        if (location) {

            location.innerHTML = `
                <i class="fa-solid fa-location-dot"></i>
                Max Care Hospital, Tower B, Room ${selectedDoctor.room}
            `;

        }

    }


    /* =====================================================
       ROLE DROPDOWN
    ===================================================== */

    roleDropdown.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            roleDropdownMenu.classList.toggle(
                "show"
            );

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                !roleDropdown.contains(event.target) &&
                !roleDropdownMenu.contains(event.target)
            ) {

                roleDropdownMenu.classList.remove(
                    "show"
                );

            }

        }
    );


    /* =====================================================
       SWITCH PORTAL ROLE
    ===================================================== */

    const switchRoleButtons =
        document.querySelectorAll(
            "[data-switch-role]"
        );

    switchRoleButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const role =
                    button.dataset.switchRole;

                roleDropdownMenu.classList.remove(
                    "show"
                );

                currentRole = role;

                updateUserInterface(
                    roleConfig[role]
                );

                showToast(
                    "Portal Switched",
                    `You are now viewing the ${roleConfig[role].roleName}.`
                );

            }
        );

    });


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    mobileMenuBtn.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "mobile-open"
            );

        }
    );


    function closeMobileSidebar() {

        sidebar.classList.remove(
            "mobile-open"
        );

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    logoutButton.addEventListener(
        "click",
        () => {

            appShell.classList.add(
                "hidden"
            );

            authScreen.classList.remove(
                "hidden"
            );

            /*
             * Reset login
             */

            identifier.value = "";
            password.value = "";

            currentRole = "patient";

            setLoginRole("patient");

            closeAppointmentModal();

            closeMobileSidebar();

            showToast(
                "Signed Out",
                "You have been safely signed out of Max Care Hospital."
            );

        }
    );


    /* =====================================================
       FORGOT PASSWORD
    ===================================================== */

    const forgotButton =
        document.querySelector(".forgot-btn");

    if (forgotButton) {

        forgotButton.addEventListener(
            "click",
            () => {

                showToast(
                    "Password Recovery",
                    "A password reset link would be sent to your registered email."
                );

            }
        );

    }


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    const notificationButton =
        document.getElementById(
            "notificationBtn"
        );

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            () => {

                showToast(
                    "Notifications",
                    "You have 3 unread healthcare notifications."
                );

            }
        );

    }


    /* =====================================================
       UHID COPY
    ===================================================== */

    const uhidBadge =
        document.querySelector(".uhid-badge");

    if (uhidBadge) {

        uhidBadge.addEventListener(
            "click",
            async () => {

                const uhid =
                    document.getElementById(
                        "uhidValue"
                    ).textContent;

                try {

                    await navigator.clipboard.writeText(
                        uhid
                    );

                    showToast(
                        "UHID Copied",
                        `${uhid} copied to your clipboard.`
                    );

                } catch {

                    showToast(
                        "UHID",
                        uhid
                    );

                }

            }
        );

    }


    /* =====================================================
       EMERGENCY BUTTON
    ===================================================== */

    const emergencyCard =
        document.querySelector(
            '[data-action="emergency"]'
        );

    if (emergencyCard) {

        emergencyCard.addEventListener(
            "click",
            () => {

                showToast(
                    "Clinical Emergency",
                    "Emergency hotline: +91 1800-123-9999"
                );

            }
        );

    }


    /* =====================================================
       GLOBAL SEARCH
    ===================================================== */

    const globalSearch =
        document.getElementById(
            "globalSearch"
        );

    if (globalSearch) {

        globalSearch.addEventListener(
            "keydown",
            event => {

                if (event.key !== "Enter") {
                    return;
                }

                const query =
                    globalSearch.value.trim();

                if (!query) {
                    return;
                }

                showToast(
                    "Search",
                    `Searching Max Care for "${query}".`
                );

            }
        );

    }


    /* =====================================================
       KEYBOARD SHORTCUT — CMD/CTRL + K
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                if (globalSearch) {

                    globalSearch.focus();

                }

            }

        }
    );


    /* =====================================================
       PROFILE BUTTON
    ===================================================== */

    const headerProfile =
        document.querySelector(
            ".header-profile"
        );

    if (headerProfile) {

        headerProfile.addEventListener(
            "click",
            () => {

                showToast(
                    "Profile",
                    "Profile management is available in the account settings."
                );

            }
        );

    }


    /* =====================================================
       APPOINTMENT ACTION BUTTONS
    ===================================================== */

    const rescheduleButton =
        document.querySelector(
            ".appointment-secondary"
        );

    if (rescheduleButton) {

        rescheduleButton.addEventListener(
            "click",
            () => {

                openAppointmentModal();

            }
        );

    }


    const cancelAppointmentButton =
        document.querySelector(
            ".appointment-danger"
        );

    if (cancelAppointmentButton) {

        cancelAppointmentButton.addEventListener(
            "click",
            () => {

                const confirmed =
                    window.confirm(
                        "Are you sure you want to cancel this appointment?"
                    );

                if (confirmed) {

                    showToast(
                        "Appointment Cancelled",
                        "Your appointment cancellation request has been processed."
                    );

                }

            }
        );

    }


    /* =====================================================
       VIEW DETAILS
    ===================================================== */

    const viewDetailsButton =
        document.querySelector(
            ".appointment-primary"
        );

    if (viewDetailsButton) {

        viewDetailsButton.addEventListener(
            "click",
            () => {

                showToast(
                    "Appointment Details",
                    "Dr. Rahul Sharma · Cardiology · 15 Sep 2026 · 10:30 AM"
                );

            }
        );

    }


    /* =====================================================
       TABLE ACTIONS
    ===================================================== */

    const tableActions =
        document.querySelectorAll(
            ".table-action"
        );

    tableActions.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showToast(
                    "Appointment Details",
                    "Detailed appointment information would open here."
                );

            }
        );

    });


    /* =====================================================
       RECORD DOWNLOAD BUTTONS
    ===================================================== */

    const recordDownloadButtons =
        document.querySelectorAll(
            ".record-card > button"
        );

    recordDownloadButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showToast(
                    "Download Started",
                    "Your medical document is being prepared."
                );

            }
        );

    });


    /* =====================================================
       DOWNLOAD ALL
    ===================================================== */

    const downloadAll =
        document.querySelector(
            ".secondary-header-btn"
        );

    if (downloadAll) {

        downloadAll.addEventListener(
            "click",
            () => {

                showToast(
                    "Preparing Documents",
                    "Your medical records are being prepared for download."
                );

            }
        );

    }


    /* =====================================================
       SERVICE VIEW ALL
    ===================================================== */

    const viewAllButton =
        document.querySelector(
            ".view-all-btn"
        );

    if (viewAllButton) {

        viewAllButton.addEventListener(
            "click",
            () => {

                showView("doctors");

            }
        );

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    setLoginRole("patient");

    updateBookingSummary();

});