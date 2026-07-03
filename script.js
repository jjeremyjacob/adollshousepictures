function goToRoom(roomNumber) {
  const rooms = document.querySelectorAll(".room");

  rooms.forEach(room => {
    room.classList.remove("active");
  });

  document.getElementById("room" + roomNumber)
    .classList.add("active");
}