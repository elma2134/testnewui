
function scrollToBooking(){
  document.getElementById('booking').scrollIntoView({
    behavior:'smooth'
  });
}

document.getElementById('bookingForm').addEventListener('submit',function(e){
  e.preventDefault();

  document.getElementById('successMsg').innerHTML =
  '<h3 style="margin-top:20px;color:green;">✅ จองคิวสำเร็จ!</h3>';

  this.reset();
});
