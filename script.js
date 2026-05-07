// ===== COUNTDOWN (smooth + สีเปลี่ยน) =====
let time = 300;
const timeEl = document.getElementById('time');

const countdown = setInterval(()=>{
  if(time > 0){
    time--;

    const m = Math.floor(time/60);
    const s = time % 60;

    if(timeEl){
      timeEl.innerText = `${m}:${s<10?'0'+s:s}`;

      // 🔥 ใกล้หมด = สีแดง
      if(time < 60){
        timeEl.style.color = "#ff4d6d";
      }
    }
  }else{
    clearInterval(countdown);
  }
},1000);


// ===== POPUP (animate + random จริงขึ้น) =====
const servicesList = ['อาบน้ำ','ตัดขน','อาบน้ำ+ตัดขน'];
const names = ['ลูกค้าใหม่','ลูกค้า VIP','ลูกค้าใกล้คุณ'];

setInterval(()=>{
  const popup = document.getElementById('popup');
  if(!popup) return;

  const service = servicesList[Math.floor(Math.random()*servicesList.length)];
  const name = names[Math.floor(Math.random()*names.length)];

  popup.innerHTML = `✨ ${name} จอง ${service}`;
  popup.style.display = 'block';

  setTimeout(()=>{
    popup.style.display = 'none';
  },3000);

},7000);


// ===== BOOK (UX โปรมากขึ้น) =====
function bookNow(){

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const breed = document.getElementById('breed').value;
  const service = document.getElementById('service').value;

  if(!name || !phone){
    showToast("กรอกข้อมูลก่อนนะ");
    return;
  }

  if(phone.length < 9){
    showToast("เบอร์ไม่ถูกต้อง");
    return;
  }

  const btn = document.querySelector(".btn");

  btn.classList.add("loading");
  btn.innerText = "⏳ กำลังจอง...";

  fetch("YOUR_SCRIPT_URL",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      name,phone,breed,service,
      status:"รอคิว",
      time:new Date().toLocaleString()
    })
  })
  .then(()=>{
    btn.innerText = "✅ สำเร็จ";

    navigator.vibrate?.(100);

    showToast("จองเรียบร้อย 🎉");

    setTimeout(()=>{
      btn.innerText = "ยืนยันจอง";
      btn.classList.remove("loading");
    },2000);

    const msg = `จอง\n${name}\n${phone}\n${breed}\n${service}`;
    window.location.href =
      `https://line.me/R/msg/text/?${encodeURIComponent(msg)}`;

  })
  .catch(()=>{
    showToast("❌ ลองใหม่อีกครั้ง");

    btn.innerText = "ยืนยันจอง";
    btn.classList.remove("loading");
  });
}


// ===== TOAST (ใหม่ ล้ำกว่า alert) =====
function showToast(text){
  const toast = document.createElement("div");

  toast.innerText = text;
  toast.style.position = "fixed";
  toast.style.bottom = "100px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#111";
  toast.style.color = "white";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "30px";
  toast.style.zIndex = "9999";

  document.body.appendChild(toast);

  setTimeout(()=>toast.remove(),2000);
}
// ===== EXIT POPUP =====
let shown = false;

document.addEventListener("mouseleave", function(e){
  if(e.clientY < 0 && !shown){
    document.getElementById("exitPopup").style.display = "block";
    shown = true;
  }
});


// ===== GO LINE =====
function goLine(){
  window.location.href = "https://line.me/R/ti/p/@groomingspa";
}


// ===== FAKE QUEUE =====
let slot = 4;

setInterval(()=>{
  if(slot > 1){
    slot--;
    document.getElementById("slot").innerText = slot;
  }
},15000);


// ===== AUTO LINE (หน่วง 20 วิ) =====
setTimeout(()=>{
  document.querySelector(".sticky-cta").classList.add("shake");
},20000);


// ===== SCROLL TRIGGER (เลื่อนแล้วเร่งขาย) =====
window.addEventListener("scroll",()=>{
  if(window.scrollY > 300){
    document.querySelector(".sticky-cta").style.background = "#ff4d6d";
  }
});