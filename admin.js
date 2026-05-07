const API_URL = "YOUR_SCRIPT_URL";

function loadData(){
  fetch(API_URL)
  .then(res => res.json())
  .then(data => {

    const table = document.getElementById("data");
    table.innerHTML = "";

    data.reverse().forEach(item => {

      const statusClass = 
        item.status === "รอคิว" ? "wait" :
        item.status === "กำลังทำ" ? "doing" :
        "done";

      table.innerHTML += `
        <tr>
          <td>${item.time}</td>
          <td>${item.name}</td>
          <td>${item.phone}</td>
          <td>${item.service}</td>
          <td><span class="badge ${statusClass}">${item.status}</span></td>
          <td>
            <button class="btn-doing" onclick="updateStatus('${item.id}','กำลังทำ')">🟡</button>
            <button class="btn-done" onclick="updateStatus('${item.id}','เสร็จแล้ว')">🟢</button>
            <button class="btn-delete" onclick="deleteRow('${item.id}')">❌</button>
          </td>
        </tr>
      `;
    });

  });
}

loadData();

// 🌗 DARK MODE
function toggleDark(){
  document.body.classList.toggle("dark");
}

// UPDATE
function updateStatus(id,status){
  fetch(API_URL,{
    method:"POST",
    body: JSON.stringify({action:"update",id,status})
  }).then(()=>loadData());
}

// DELETE
function deleteRow(id){
  fetch(API_URL,{
    method:"POST",
    body: JSON.stringify({action:"delete",id})
  }).then(()=>loadData());
}
const darkToggle = document.getElementById('darkToggle');

if(localStorage.getItem('theme') === 'dark'){
  document.body.classList.add('dark');
}

darkToggle.addEventListener('click',()=>{
  document.body.classList.toggle('dark');

  if(document.body.classList.contains('dark')){
    localStorage.setItem('theme','dark');
  }else{
    localStorage.setItem('theme','light');
  }
});