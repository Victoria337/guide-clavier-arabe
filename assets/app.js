document.addEventListener('DOMContentLoaded', () => {
  const navBtn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (navBtn && nav) {
    navBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  const filter = document.getElementById('letter-filter');
  if (filter) {
    const rows = document.querySelectorAll('#alphabet-table tbody tr');
    filter.addEventListener('input', () => {
      const q = filter.value.trim().toLowerCase();
      rows.forEach((tr) => {
        const hay = (tr.dataset.search || '').toLowerCase();
        tr.style.display = hay.includes(q) ? '' : 'none';
      });
    });
  }

  const quiz = document.getElementById('quiz');
  if (quiz) {
    const QUESTIONS = [
      { translit: 'salam', answer: 'سلام', options: ['سلام', 'سلم', 'شلام'] },
      { translit: 'kitab', answer: 'كتاب', options: ['كتب', 'كتاب', 'كطاب'] },
      { translit: 'madrasa', answer: 'مدرسة', options: ['مدرسه', 'مضرسة', 'مدرسة'] },
      { translit: 'qalb', answer: 'قلب', options: ['قلب', 'كلب', 'قاب'] },
      { translit: 'nour', answer: 'نور', options: ['نوم', 'نور', 'نوز'] },
      { translit: 'chams', answer: 'شمس', options: ['سمس', 'شمس', 'شمت'] }
    ];
    let index = 0;
    let score = 0;
    const qEl = quiz.querySelector('.q');
    const optsEl = quiz.querySelector('.quiz-options');
    const feedbackEl = quiz.querySelector('.quiz-feedback');
    const scoreEl = quiz.querySelector('.quiz-score');

    function render() {
      if (index >= QUESTIONS.length) {
        qEl.textContent = 'Quiz terminé !';
        optsEl.innerHTML = '';
        feedbackEl.textContent = '';
        scoreEl.textContent = 'Score : ' + score + ' / ' + QUESTIONS.length + '. Rechargez la page pour recommencer.';
        return;
      }
      const item = QUESTIONS[index];
      qEl.innerHTML = 'Quel mot arabe correspond à « ' + item.translit + ' » ?';
      optsEl.innerHTML = '';
      feedbackEl.textContent = '';
      item.options.forEach((opt) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.textContent = opt;
        b.addEventListener('click', () => {
          optsEl.querySelectorAll('button').forEach((x) => (x.disabled = true));
          if (opt === item.answer) {
            b.classList.add('correct');
            feedbackEl.textContent = 'Correct !';
            score += 1;
          } else {
            b.classList.add('wrong');
            const good = Array.from(optsEl.querySelectorAll('button')).find((x) => x.textContent === item.answer);
            if (good) good.classList.add('correct');
            feedbackEl.textContent = 'Non, la bonne réponse est « ' + item.answer + ' ».';
          }
          scoreEl.textContent = 'Score : ' + score + ' / ' + QUESTIONS.length;
          setTimeout(() => {
            index += 1;
            render();
          }, 1200);
        });
        optsEl.appendChild(b);
      });
    }
    render();
  }
});
