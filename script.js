function goToRoom(roomId) {
  const rooms = document.querySelectorAll('.room');

  rooms.forEach(room => {
    room.classList.add('hidden');
  });

  document.getElementById(roomId).classList.remove('hidden');
}