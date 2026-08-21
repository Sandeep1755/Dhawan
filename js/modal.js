/**
 * Dhawan Hospital - Interactive Multi-Step Appointment Booking Wizard
 */

export function initAppointmentModal() {
  const modalBackdrop = document.getElementById("appointment-modal");
  const openButtons = document.querySelectorAll("[data-open-modal='appointment']");
  const closeButtons = document.querySelectorAll("[data-close-modal]");
  
  if (!modalBackdrop) return;

  const steps = modalBackdrop.querySelectorAll(".form-step");
  const bullets = modalBackdrop.querySelectorAll(".wizard-step-bullet");
  const nextBtns = modalBackdrop.querySelectorAll("[data-wizard-next]");
  const prevBtns = modalBackdrop.querySelectorAll("[data-wizard-prev]");
  const form = document.getElementById("appointment-form");
  const deptSelect = document.getElementById("apt-department");
  const doctorSelect = document.getElementById("apt-doctor");

  let currentStep = 1;
  const totalSteps = steps.length;

  const doctorData = {
    "orthopaedics": [
      { id: "dr-rk-dhawan", name: "Dr. R. K. Dhawan (Chief Orthopaedic & Joint Replacement)" },
      { id: "dr-alok-verma", name: "Dr. Alok Verma (Spine & Arthroscopy Specialist)" }
    ],
    "cardiology": [
      { id: "dr-arvind-mehta", name: "Dr. Arvind Mehta (Chief Interventional Cardiologist)" },
      { id: "dr-ritika-kaur", name: "Dr. Ritika Kaur (Consultant Non-Invasive Cardiologist)" }
    ],
    "gynaecology": [
      { id: "dr-sunita-dhawan", name: "Dr. Sunita Dhawan (Senior Obstetrician & Gynaecologist)" },
      { id: "dr-meenakshi-joshi", name: "Dr. Meenakshi Joshi (Infertility & High-Risk Pregnancy)" }
    ],
    "surgery": [
      { id: "dr-priya-sharma", name: "Dr. Priya Sharma (Senior Laparoscopic & GI Surgeon)" },
      { id: "dr-rohit-kapoor", name: "Dr. Rohit Kapoor (General & Hernia Specialist)" }
    ],
    "neurology": [
      { id: "dr-vikram-sen", name: "Dr. Vikramaditya Sen (Consultant Neurologist)" }
    ],
    "critical-care": [
      { id: "dr-ananya-verma", name: "Dr. Ananya Verma (Chief Intensivist)" }
    ]
  };

  function updateDoctorsList(selectedDept, preferredDoctor = "") {
    if (!doctorSelect) return;
    doctorSelect.innerHTML = '<option value="">-- Choose Specialist Doctor --</option>';
    
    if (selectedDept && doctorData[selectedDept]) {
      doctorData[selectedDept].forEach(doc => {
        const opt = document.createElement("option");
        opt.value = doc.id;
        opt.textContent = doc.name;
        if (preferredDoctor && (doc.id === preferredDoctor || doc.name.includes(preferredDoctor))) {
          opt.selected = true;
        }
        doctorSelect.appendChild(opt);
      });
    } else {
      Object.values(doctorData).flat().forEach(doc => {
        const opt = document.createElement("option");
        opt.value = doc.id;
        opt.textContent = doc.name;
        if (preferredDoctor && (doc.id === preferredDoctor || doc.name.includes(preferredDoctor))) {
          opt.selected = true;
        }
        doctorSelect.appendChild(opt);
      });
    }
  }

  if (deptSelect) {
    deptSelect.addEventListener("change", (e) => {
      updateDoctorsList(e.target.value);
    });
  }

  function showStep(stepNumber) {
    currentStep = stepNumber;
    steps.forEach((step, idx) => {
      if (idx + 1 === stepNumber) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });

    bullets.forEach((bullet, idx) => {
      const stepIdx = idx + 1;
      bullet.classList.remove("active", "completed");
      if (stepIdx === stepNumber) {
        bullet.classList.add("active");
      } else if (stepIdx < stepNumber) {
        bullet.classList.add("completed");
      }
    });
  }

  function openModal(prefilledDept = "", prefilledDoctor = "") {
    modalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
    if (prefilledDept && deptSelect) {
      deptSelect.value = prefilledDept;
    }
    updateDoctorsList(deptSelect ? deptSelect.value : "", prefilledDoctor);
    showStep(1);
  }

  function closeModal() {
    modalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
    if (form) form.reset();
  }

  openButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const dept = btn.getAttribute("data-dept") || "";
      const doctor = btn.getAttribute("data-doctor") || "";
      openModal(dept, doctor);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", closeModal);
  });

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("active")) {
      closeModal();
    }
  });

  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
          if (currentStep === 3) {
            generateSummary();
          }
          showStep(currentStep + 1);
        }
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 1) {
        showStep(currentStep - 1);
      }
    });
  });

  function validateStep(step) {
    if (step === 1) {
      const dept = document.getElementById("apt-department");
      if (dept && !dept.value) {
        alert("Please select a medical department.");
        return false;
      }
      return true;
    }
    if (step === 2) {
      const date = document.getElementById("apt-date");
      const time = document.getElementById("apt-time");
      if (date && !date.value) {
        alert("Please choose a preferred appointment date.");
        return false;
      }
      if (time && !time.value) {
        alert("Please select a time slot.");
        return false;
      }
      return true;
    }
    if (step === 3) {
      const name = document.getElementById("apt-name");
      const phone = document.getElementById("apt-phone");
      if (name && !name.value.trim()) {
        alert("Please enter patient name.");
        return false;
      }
      if (phone && !phone.value.trim()) {
        alert("Please enter a valid contact phone number.");
        return false;
      }
      return true;
    }
    return true;
  }

  function generateSummary() {
    const summaryContainer = document.getElementById("apt-confirmation-summary");
    if (!summaryContainer) return;

    const refNum = "DHM-" + Math.floor(100000 + Math.random() * 900000);
    const deptEl = document.getElementById("apt-department");
    const docEl = document.getElementById("apt-doctor");
    const dateEl = document.getElementById("apt-date");
    const timeEl = document.getElementById("apt-time");
    const nameEl = document.getElementById("apt-name");
    const phoneEl = document.getElementById("apt-phone");

    const deptText = deptEl ? deptEl.options[deptEl.selectedIndex].text : "General OPD";
    const docText = docEl && docEl.selectedIndex > 0 ? docEl.options[docEl.selectedIndex].text : "Assigned On-Duty Specialist";
    const dateVal = dateEl ? dateEl.value : "Tomorrow";
    const timeVal = timeEl ? timeEl.value : "Morning Slot";
    const nameVal = nameEl ? nameEl.value : "Patient";
    const phoneVal = phoneEl ? phoneEl.value : "Provided";

    summaryContainer.innerHTML = `
      <div style="background: var(--color-bg-alt); border-radius: var(--radius-2xl); padding: 1.5rem; border: 1px solid var(--border-light); margin-bottom: 1.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px dashed var(--border-medium);">
          <div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase;">Appointment Reference</span>
            <div style="font-family: var(--font-family-display); font-size: 1.25rem; font-weight: 800; color: var(--color-primary-900);">${refNum}</div>
          </div>
          <span style="background: var(--color-success-50); color: var(--color-success-600); font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 999px;">Confirmed</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.875rem;">
          <div><strong style="color: var(--color-primary-950);">Patient:</strong> <span style="color: var(--color-text-secondary);">${nameVal}</span></div>
          <div><strong style="color: var(--color-primary-950);">Contact:</strong> <span style="color: var(--color-text-secondary);">${phoneVal}</span></div>
          <div><strong style="color: var(--color-primary-950);">Department:</strong> <span style="color: var(--color-text-secondary);">${deptText}</span></div>
          <div><strong style="color: var(--color-primary-950);">Doctor:</strong> <span style="color: var(--color-text-secondary);">${docText}</span></div>
          <div><strong style="color: var(--color-primary-950);">Date:</strong> <span style="color: var(--color-text-secondary);">${dateVal}</span></div>
          <div><strong style="color: var(--color-primary-950);">Time:</strong> <span style="color: var(--color-text-secondary);">${timeVal}</span></div>
        </div>
      </div>
      <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
        <button type="button" class="btn btn-primary btn-sm" onclick="alert('Appointment details sent to SMS & WhatsApp.')">
          📲 Receive SMS & WhatsApp Slip
        </button>
        <button type="button" class="btn btn-secondary btn-sm" data-close-modal>
          Done & Return to Site
        </button>
      </div>
    `;

    // attach close listener to the dynamically created Done button
    const doneBtn = summaryContainer.querySelector("[data-close-modal]");
    if (doneBtn) doneBtn.addEventListener("click", closeModal);
  }
}
