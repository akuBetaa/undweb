// Fungsi untuk mengambil nilai parameter dari URL
function getQueryParameter(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Ambil nama tamu dari URL
const namaTamu = getQueryParameter("tamu");

// Tampilkan nama tamu pada bagian cover, jika ada
if (namaTamu) {
  document.getElementById("nama-tamu").textContent = `${namaTamu}`;
}

const urlBase = "https://api.flexation.id/api/v0";
const undanganId = 9;
localStorage.setItem("undanganId", undanganId);

// Mengambil Token
async function getToken() {
  const id = localStorage.getItem("undanganId");
  const url = `${urlBase}/undangan/${id}/public-token`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Gagal ambil token");

    const data = await response.json();
    const token = data.data.token;

    localStorage.setItem("token", token);
    getComment(token, id);
  } catch (error) {
    console.error("Token error:", error);
  }
}

async function getComment(token, undanganId) {
  const url = `${urlBase}/comment/public/${undanganId}/list`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-token": `${token}`,
      },
    });

    const result = await response.json();
    const comments = result.data.comments;
    const container = document.getElementById("comments");
    container.innerHTML = "";

    comments.forEach((comment) => {
      const createdAt = new Date(comment.utc_created_at);
      const formattedDate = createdAt.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      const formattedTime = createdAt.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const commentEl = document.createElement("div");
      commentEl.classList.add("comment");

      commentEl.innerHTML = `
          <div class="flex items-start gap-2.5 my-2 mr-5">
            <div class="w-8 h-8 rounded-full bg-white text-center">
                <h1 class="font-bold text-primary200 p-1 text-xl font-cinzeldecorative">${comment.name.charAt(
                  0
                )}</h1>
            </div>
            <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-white rounded-e-xl rounded-es-xl">
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                    <span class="text-sm font-semibold text-primary200">${
                      comment.name
                    }</span>
                    <span class="text-xs font-semibold ${
                      comment.presense === "hadir"
                        ? "text-green-600"
                        : "text-red-600"
                    }">
                      ${comment.presense === "hadir" ? "Hadir" : "Tidak Hadir"}
                    </span>
                </div>
                <p class="text-sm font-normal py-2.5 text-gray-900">${
                  comment.comment_text
                }</p>
                <span class="text-xs font-normal text-gray-500">${formattedDate}, ${formattedTime}</span>
            </div>  
          </div>
        `;

      container.appendChild(commentEl);
    });
  } catch (error) {
    console.error("Comment error:", error);
  }
}

window.onload = getToken;

document
  .getElementById("postComment")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("author").value.trim();
    const presense = document.getElementById("hadir").value;
    const commentText = document.getElementById("content").value.trim();
    const undanganId = parseInt(localStorage.getItem("undanganId"), 10);
    const token = localStorage.getItem("token");

    const bodyData = {
      name,
      comment_text: commentText,
      presense,
      undangan_id: undanganId,
    };

    try {
      const response = await fetch(`${urlBase}/comment/public/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": token,
        },
        body: JSON.stringify(bodyData),
      });
      if (response.ok) {
        alert("Komentar berhasil dikirim!");
        document.getElementById("postComment").reset();
        getComment(token, undanganId);
      } else {
        alert("Gagal mengirim komentar.");
      }
    } catch (error) {
      console.error("Post comment error:", error);
    }
  });
