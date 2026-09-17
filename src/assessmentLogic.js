// Person 2's Assessment + Skill Gap Logic

export const questionBank = [
  {
    id: "q1",
    sub_skill: "Variables",
    question: "Which keyword is used to declare a constant variable in JavaScript?",
    options: ["var", "let", "const", "def"],
    correct_answer: "const",
  },
  {
    id: "q2",
    sub_skill: "Loops",
    question: "Which loop executes a block of code at least once before checking the condition?",
    options: ["for", "while", "do...while", "forEach"],
    correct_answer: "do...while",
  },
  {
    id: "q3",
    sub_skill: "Arrays",
    question: "Which array method adds a new element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correct_answer: "push()",
  },
  {
    id: "q4",
    sub_skill: "Functions",
    question: "Which of the following represents a valid ES6 Arrow Function syntactically?",
    options: [
      "function myFunc() {}",
      "const myFunc = () => {}",
      "def myFunc():",
      "void myFunc() {}",
    ],
    correct_answer: "const myFunc = () => {}",
  },
  {
    id: "q5",
    sub_skill: "Data Types",
    question: "What does the 'typeof' operator return when executed on 'null'?",
    options: ["'null'", "'undefined'", "'object'", "'boolean'"],
    correct_answer: "'object'",
  },
  {
    id: "q6",
    sub_skill: "Conditionals",
    question:
      "Which operator checks for both strictly equal value and strictly equal data type?",
    options: ["==", "=", "===", "!="],
    correct_answer: "===",
  },
  {
    id: "q7",
    sub_skill: "Objects",
    question:
      "Which method returns an array containing all key names of a given object?",
    options: [
      "Object.keys()",
      "Object.values()",
      "Object.entries()",
      "Object.get()",
    ],
    correct_answer: "Object.keys()",
  },
  {
    id: "q8",
    sub_skill: "Array Methods",
    question:
      "Which method creates a new array by applying a function to every element?",
    options: ["filter()", "forEach()", "map()", "reduce()"],
    correct_answer: "map()",
  },
  {
    id: "q9",
    sub_skill: "Scope",
    question:
      "Which keywords in JavaScript declare variables that are block-scoped?",
    options: [
      "var only",
      "let and const",
      "var and let",
      "const only",
    ],
    correct_answer: "let and const",
  },
  {
    id: "q10",
    sub_skill: "Asynchronous JS",
    question:
      "Which keyword is placed before a function to make it return a Promise?",
    options: ["promise", "defer", "async", "await"],
    correct_answer: "async",
  },
];


// Evaluate the user's answers
export function evaluateAssessment(answers) {
  const skillScores = {};

  questionBank.forEach((question) => {
    const userAnswer = answers[question.id];
    const isCorrect = userAnswer === question.correct_answer;

    if (!skillScores[question.sub_skill]) {
      skillScores[question.sub_skill] = {
        correct: 0,
        total: 0,
      };
    }

    skillScores[question.sub_skill].total += 1;

    if (isCorrect) {
      skillScores[question.sub_skill].correct += 1;
    }
  });

  const results = {};

  for (const [skill, scores] of Object.entries(skillScores)) {
    const accuracy = scores.correct / scores.total;
    const percentage = Math.round(accuracy * 100);

    let level;

    if (accuracy === 1) {
      level = "Mastered";
    } else if (accuracy >= 0.5) {
      level = "Intermediate_Gap";
    } else {
      level = "Beginner_Gap";
    }

    results[skill] = {
      correct: scores.correct,
      total: scores.total,
      percentage,
      level,
    };
  }

  return results;
}


// Get overall performance
export function getOverallScore(answers) {
  let correct = 0;

  questionBank.forEach((question) => {
    if (answers[question.id] === question.correct_answer) {
      correct++;
    }
  });

  return Math.round((correct / questionBank.length) * 100);
}


// Generate recommendations based on skill level
export function getRecommendations(results) {
  const recommendations = [];

  Object.entries(results).forEach(([skill, data]) => {
    if (data.level === "Beginner_Gap") {
      recommendations.push({
        skill,
        level: "Beginner",
        title: `Foundational Review: ${skill}`,
        description:
          "Review the fundamentals and complete beginner-level exercises.",
      });
    } else if (data.level === "Intermediate_Gap") {
      recommendations.push({
        skill,
        level: "Intermediate",
        title: `Targeted Practice: ${skill}`,
        description:
          "Practice intermediate challenges to strengthen this skill.",
      });
    } else {
      recommendations.push({
        skill,
        level: "Advanced",
        title: `Advanced ${skill}`,
        description:
          "Move to advanced concepts and real-world projects.",
      });
    }
  });

  return recommendations;
}
