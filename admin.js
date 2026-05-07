/* ===================================
   ULTRA DASHBOARD SYSTEM
=================================== */

const API_URL = "https://script.google.com/macros/s/AKfycbyyEZicL7DsHEwoG1krHKKw04E4ggpJcT4ay1G41WUc8gOf55v_5R2tufrmaZCvIVk/exec";

const table = document.getElementById("data");


/* ===================================
   LOAD DATA
=================================== */

async function loadData(){

  showLoading();

  try{

    const response = await fetch(API_URL);
    const data = await response.json();

    table.innerHTML = "";

    // ล่าสุดขึ้นก่อน
    data.reverse();

    // UPDATE STATS
    updateStats(data);

    // EMPTY STATE
    if(data.length === 0){

      table.innerHTML = `
        <tr>

          <td colspan="5">

            <div class="empty-state">

              <div class="empty-icon">
                🐶
              </div>

              <h2>ยังไม่มีคิววันนี้</h2>

              <p>
                เมื่อลูกค้าจองคิว
                รายการจะขึ้นที่นี่
              </p>

            </div>

          </td>

        </tr>
      `;

      return;
    }

    // RENDER TABLE
    data.forEach((item,index)=>{

      const statusClass =
        item.status === "รอคิว"
        ? "wait"
        : item.status === "กำลังทำ"
        ? "doing"
        : "done";

      table.innerHTML += `

        <tr
          style="
            animation:
            fadeUp .4s ease ${index * .05}s both
          "
        >

          <!-- TIME -->
          <td>
            <div class="time-box">

              <span class="time-icon">
                🕒
              </span>

              <strong>
                ${item.time}
              </strong>

            </div>
          </td>

          <!-- USER -->
          <td>

            <div class="user-cell">

              <div class="avatar-circle">

                ${item.name.charAt(0)}

              </div>

              <div>

                <h4>
                  ${item.name}
                </h4>

                <p>
                  ${item.phone}
                </p>

              </div>

            </div>

          </td>

          <!-- SERVICE -->
          <td>

            <span class="service-tag">

              ✂️ ${item.service}

            </span>

          </td>

          <!-- STATUS -->
          <td>

            <span class="badge ${statusClass}">

              ${getStatusEmoji(item.status)}

              ${item.status}

            </span>

          </td>

          <!-- ACTION -->
          <td>

            <div class="action-group">

              <button
                class="btn-doing glow-blue"
                onclick="
                  updateStatus(
                    '${item.id}',
                    'กำลังทำ'
                  )
                "
              >
                🟡
              </button>

              <button
                class="btn-done glow-green"
                onclick="
                  updateStatus(
                    '${item.id}',
                    'เสร็จแล้ว'
                  )
                "
              >
                🟢
              </button>

              <button
                class="btn-delete glow-red"
                onclick="
                  deleteRow(
                    '${item.id}'
                  )
                "
              >
                ❌
              </button>

            </div>

          </td>

        </tr>

      `;
    });

  }catch(error){

    console.error(error);

    table.innerHTML = `

      <tr>

        <td colspan="5">

          <div class="error-box">

            <div class="error-icon">
              ⚠️
            </div>

            <h2>
              โหลดข้อมูลไม่สำเร็จ
            </h2>

            <p>
              กรุณาลองใหม่อีกครั้ง
            </p>

          </div>

        </td>

      </tr>

    `;
  }
}

/* ===================================
   STATUS ICON
=================================== */

function getStatusEmoji(status){

  if(status === "รอคิว"){
    return "🕒";
  }

  if(status === "กำลังทำ"){
    return "✂️";
  }

  return "✅";
}

/* ===================================
   UPDATE STATS
=================================== */

function updateStats(data){

  const waiting =
    data.filter(
      item => item.status === "รอคิว"
    ).length;

  const doing =
    data.filter(
      item => item.status === "กำลังทำ"
    ).length;

  const done =
    data.filter(
      item => item.status === "เสร็จแล้ว"
    ).length;

  const total = data.length;

  // COUNTERS
  document.getElementById(
    "waitingCount"
  ).innerText = waiting;

  document.getElementById(
    "doingCount"
  ).innerText = doing;

  document.getElementById(
    "doneCount"
  ).innerText = done;

  document.getElementById(
    "totalCount"
  ).innerText = total;

  // ANIMATION
  animateCounter("waitingCount",waiting);
  animateCounter("doingCount",doing);
  animateCounter("doneCount",done);
  animateCounter("totalCount",total);
}

/* ===================================
   COUNTER ANIMATION
=================================== */

function animateCounter(id,target){

  let el = document.getElementById(id);

  let current = 0;

  const increment =
    Math.ceil(target / 20);

  const interval = setInterval(()=>{

    current += increment;

    if(current >= target){

      current = target;

      clearInterval(interval);
    }

    el.innerText = current;

  },20);
}

/* ===================================
   LOADING
=================================== */

function showLoading(){

  table.innerHTML = `

    <tr>

      <td colspan="5">

        <div class="loading-box">

          <div class="loader"></div>

          <h3>
            กำลังโหลดข้อมูล...
          </h3>

        </div>

      </td>

    </tr>

  `;
}

/* =========================
   DARK MODE SWITCH
========================= */

const themeToggle =
  document.getElementById("themeToggle");

// LOAD SAVED THEME
const savedTheme =
  localStorage.getItem("theme");

if(savedTheme === "dark"){

  document.body.classList.add("dark");

  themeToggle.checked = true;

}else{

  document.body.classList.remove("dark");

  themeToggle.checked = false;
}

// SWITCH EVENT
themeToggle.addEventListener(
  "change",
  () => {

    if(themeToggle.checked){

      document.body.classList.add("dark");

      localStorage.setItem(
        "theme",
        "dark"
      );

    }else{

      document.body.classList.remove("dark");

      localStorage.setItem(
        "theme",
        "light"
      );
    }

  }
);


/* ===================================
   DELETE
=================================== */

async function deleteRow(id){

  const confirmDelete =
    confirm("ต้องการลบคิวนี้ ?");

  if(!confirmDelete) return;

  try{

    await fetch(API_URL,{

      method:"POST",

      body:JSON.stringify({

        action:"delete",
        id

      })

    });

    toast(
      "ลบข้อมูลสำเร็จ",
      "success"
    );

    loadData();

  }catch(error){

    console.error(error);

    toast(
      "ลบข้อมูลไม่สำเร็จ",
      "error"
    );
  }
}

/* ===================================
   TOAST
=================================== */

function toast(message,type){

  const toast = document.createElement("div");

  toast.className =
    `toast ${type}`;

  toast.innerHTML = `
    <span>
      ${
        type === "success"
        ? "✅"
        : "❌"
      }
    </span>

    ${message}
  `;

  document.body.appendChild(toast);

  setTimeout(()=>{

    toast.classList.add("show");

  },100);

  setTimeout(()=>{

    toast.classList.remove("show");

    setTimeout(()=>{

      toast.remove();

    },300);

  },2500);
}

/* ===================================
   AUTO REFRESH
=================================== */

setInterval(()=>{

  loadData();

},10000);

/* ===================================
   START
=================================== */

loadData();