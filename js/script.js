function scrollBooking(){
  document.getElementById('booking').scrollIntoView({
    behavior:'smooth'
  });
}

document.getElementById('bookingForm').addEventListener('submit', function(e){

  e.preventDefault();

  document.getElementById('success').innerHTML =
  '<h3 style="margin-top:20px;color:green;">✅ จองคิวสำเร็จแล้ว</h3>';

  this.reset();
});
