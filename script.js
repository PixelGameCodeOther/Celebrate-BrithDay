// Marquee: update time left in day
setInterval(() => {
    const now = new Date();
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const ms = end - now;
    const h = String(Math.floor(ms / (1000 * 60 * 60))).padStart(2, '0');
    const m = String(Math.floor((ms / (1000 * 60)) % 60)).padStart(2, '0');
    const s = String(Math.floor((ms / 1000) % 60)).padStart(2, '0');
    document.getElementById("marqueeText").innerText = 
      `This Web Page Has ${h}:${m}:${s} To Lived — Happy Birthday Abby!`;
  }, 1000);
  
  // === LocalStorage Counter ===
  const counterDisplay = document.getElementById('celebrateCounter');
  let count = localStorage.getItem('celebrateCount') || 0;
  counterDisplay.textContent = `Celebrations: ${count}`;
  
  document.getElementById('celebrateBtn').addEventListener('click', () => {
    count++;
    localStorage.setItem('celebrateCount', count);
    counterDisplay.textContent = `Celebrations: ${count}`;
    shootConfetti();
  });
  
  // === Play Song ===
  document.getElementById('playSong').addEventListener('click', () => {
    document.getElementById('happyAudio').play();
  });
  
  // === Sticky Notes ===
  const notesContainer = document.getElementById('notesContainer');
  let notes = JSON.parse(localStorage.getItem('stickyNotes')) || [];
  
  function renderNote(note) {
    const div = document.createElement('div');
    div.className = 'note';
    div.style.top = Math.random() * 80 + 'px';
  
    // Text content
    const text = typeof note === 'string' ? note : note.text;
    div.textContent = text;
  
    // Add image if available
    if (note.image) {
      const img = document.createElement('img');
      img.src = note.image;
      img.style.maxWidth = '80px';
      img.style.display = 'block';
      img.style.marginTop = '5px';
      div.appendChild(img);
    }
  
    notesContainer.appendChild(div);
  }
  
  notes.forEach(renderNote);
  
  document.getElementById('leaveNoteBtn').addEventListener('click', () => {
    const msg = prompt("Leave a note for Abby:");
    if (!msg || !msg.trim()) return;
  
    const imageInput = document.getElementById('noteImageInput');
    imageInput.value = ''; // Clear previous selection
    imageInput.click();
  
    imageInput.onchange = () => {
      const file = imageInput.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const note = {
            text: msg.trim(),
            image: e.target.result
          };
          notes.push(note);
          localStorage.setItem('stickyNotes', JSON.stringify(notes));
          renderNote(note);
        };
        reader.readAsDataURL(file);
      } else {
        const note = {
          text: msg.trim(),
          image: null
        };
        notes.push(note);
        localStorage.setItem('stickyNotes', JSON.stringify(notes));
        renderNote(note);
      }
    };
  }); 
  
  notes.forEach(renderNote);
  
  document.getElementById('leaveNoteBtn').addEventListener('click', () => {
    const msg = prompt("Leave a note for Abby:");
    if (msg && msg.trim()) {
      notes.push(msg.trim());
      localStorage.setItem('stickyNotes', JSON.stringify(notes));
      renderNote(msg.trim());
    }
  });
  
  // === Confetti ===
  function shootConfetti() {
    const colors = ['#b794f4', '#d6bcfa', '#e9d8fd'];
    for (let i = 0; i < 80; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-20px';
      confetti.style.width = '8px';
      confetti.style.height = '8px';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.animation = `fall ${2 + Math.random() * 2}s linear`;
      confetti.style.zIndex = 999;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }
  }
  
  