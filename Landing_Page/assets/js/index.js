const modal = document.getElementById("waitlistModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");
const form = document.getElementById("waitlistForm");
const submitBtn = document.getElementById("waitlistBtn");
const btnText = submitBtn.querySelector(".btn-text");
const loader = submitBtn.querySelector(".loader");

window.API_URL = "https://waitlist.bopadi.app/api";

if (openBtn) openBtn.onclick = () => (modal.style.display = "flex");
closeBtn.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

const showToast = (message, icon = "success") => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#1a1a1a",
    color: "#fff",
  });
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  btnText.style.display = "none";
  loader.style.display = "inline-block";
  submitBtn.disabled = true;

  try {
    const res = await axios.post(`${window.API_URL}/waitlist/join`, {
      name,
      email,
      phone,
    });

    modal.style.display = "none";

    
    form.reset();

    
    showToast("🎉 You’ve joined the waitlist!", "success");
  } catch (err) {
    console.error(err);
    const status = err.response?.status;
    const msg =
      err.response?.data?.message ||
      "Something went wrong. Try again!";

    if (status === 409) {
      Swal.fire({
        toast: true,
        position: "top-end",
        title: "👋 You're already on the list!",
        icon: "info",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#1a1a1a",
        color: "#fff",
      });

      modal.style.display = "none";

      form.reset();
    } else {
      showToast(msg, "error");

      modal.style.display = "none";

      form.reset();
    }
  } finally {
    btnText.style.display = "inline";
    loader.style.display = "none";
    submitBtn.disabled = false;
  }
});
