
document.addEventListener('DOMContentLoaded', function () {
  const motionForm = document.getElementById('motion-quiz');
  const mpicForm = document.getElementById('mpic-quiz');

  if (motionForm) {
    motionForm.addEventListener('submit', function (e) {
      e.preventDefault();
      finishQuiz();
    });
  }

  if (mpicForm) {
    mpicForm.addEventListener('submit', function (e) {
      e.preventDefault();
      finishInterfaceQuiz();
    });
  }

  function calculateScore(form, correctAnswers) {
    let score = 0;
    let total = 0;

    for (const [key, correct] of Object.entries(correctAnswers)) {
      const elements = form.querySelectorAll(`[name='${key}']`);
      const selected = form.querySelector(`[name='${key}']:checked`);
      const selectedVals = [...form.querySelectorAll(`[name='${key}']:checked`)].map(x => x.value);

      if (!elements.length) continue;
      total++;

      if (Array.isArray(correct)) {
        if (selectedVals.sort().toString() === correct.sort().toString()) {
          score++;
        }
      } else if (selected && selected.value === correct) {
        score++;
      }
    }

    return { score, total };
  }

  function showFeedback(form, correctAnswers) {
    for (const [key, correct] of Object.entries(correctAnswers)) {
      const options = form.querySelectorAll(`[name='${key}']`);
      options.forEach(opt => {
        const label = opt.parentElement;
        if (Array.isArray(correct)) {
          const selectedVals = [...form.querySelectorAll(`[name='${key}']:checked`)].map(x => x.value);
          if (correct.includes(opt.value)) {
            label.style.color = 'green';
            label.style.fontWeight = 'bold';
          } else if (opt.checked && !correct.includes(opt.value)) {
            label.style.color = 'red';
            label.style.fontWeight = 'bold';
          }
        } else {
          if (opt.value === correct) {
            label.style.color = 'green';
            label.style.fontWeight = 'bold';
          } else if (opt.checked && opt.value !== correct) {
            label.style.color = 'red';
            label.style.fontWeight = 'bold';
          }
        }
      });
    }
  }

  window.finishInterfaceQuiz = function () {
    const form = document.getElementById("mpic-quiz");
    const correctAnswers = {
      'q1': '0', 'q2': '0', 'q3': '1', 'q4': '1', 'q5': '0',
      'q6': '0', 'q7': '2', 'q8': '0', 'q9': '1', 'q10': '2',
      'q11': '3', 'q12': ['0','1','2','3','4']
    };

    const result = calculateScore(form, correctAnswers);
    localStorage.setItem('interfaceScore', result.score);
    localStorage.setItem('interfaceTotal', result.total);

    showFeedback(form, correctAnswers);

    if (result.score === result.total) {
      localStorage.setItem('interfaceUnlocked', 'true');
      setTimeout(() => window.location.href = 'motion.html', 1500);
    } else {
      alert('Incorrect answers detected. Restarting Interface Quiz now...');
      setTimeout(() => window.location.href = 'mpic.html', 1500);
    }
  }

  window.finishQuiz = function () {
    const form = document.getElementById("motion-quiz");
    const correctAnswers = {
      'm1': 'c', 'm2': 'c', 'm4': 'true', 'm5': 'c', 'm6': 'b',
      'm7': 'b', 'm8': 'true', 'm9': 'b', 'm10': 'c', 'm11': 'b',
      'm12': 'b', 'm13': 'true', 'm14': 'b', 'm15': 'b', 'm16': 'b'
    };
    const result = calculateScore(form, correctAnswers);
    localStorage.setItem('motionScore', result.score);
    localStorage.setItem('motionTotal', result.total);
    showFeedback(form, correctAnswers);
    setTimeout(() => {
      window.location.href = 'summary.html';
    }, 3000);
  }
});

    if (typeof finishQuiz === 'function') {
      const oldFinishQuiz = finishQuiz;
      finishQuiz = function () {
        oldFinishQuiz();
        setTimeout(() => window.location.href = 'summary.html', 1500);
      }
    }
    