import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RefreshCw, Trophy, HelpCircle } from 'lucide-react';

const Quiz = ({ data }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    if (!data || !data.questions || data.questions.length === 0) return null;

    // Reset quiz when data changes (e.g. navigating between pages)
    useEffect(() => {
        resetQuiz();
    }, [data]);

    const handleOptionClick = (index) => {
        if (selectedOption !== null) return; // Prevent multiple clicks

        setSelectedOption(index);
        const correct = index === data.questions[currentQuestion].answer;
        setIsCorrect(correct);

        if (correct) {
            setScore(score + 1);
        }

        // Auto advance after short delay
        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < data.questions.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                setShowResult(true);
            }
        }, 2000);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setIsCorrect(null);
    };

    if (showResult) {
        return (
            <div className="bg-gray-900 rounded-2xl p-8 text-center text-white shadow-2xl relative overflow-hidden my-12 border border-gray-800">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                    <Trophy className="w-64 h-64" />
                </div>

                <div className="relative z-10">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-900/50">
                        <Trophy className="w-10 h-10 text-white" />
                    </div>

                    <h3 className="text-3xl font-serif font-bold mb-4">Quiz Completed!</h3>
                    <p className="text-xl text-gray-300 mb-8">
                        You scored <span className="text-red-500 font-bold">{score}</span> out of <span className="font-bold">{data.questions.length}</span>
                    </p>

                    <button
                        onClick={resetQuiz}
                        className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-bold rounded hover:bg-gray-100 transition-colors uppercase tracking-wider text-sm"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" /> Try Again
                    </button>
                </div>
            </div>
        );
    }

    const question = data.questions[currentQuestion];

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden my-12">
            <div className="bg-gray-900 p-6 flex items-center justify-between border-b-4 border-red-600">
                <div className="flex items-center space-x-3">
                    <HelpCircle className="w-6 h-6 text-red-500" />
                    <h3 className="font-bold text-white text-lg tracking-wide uppercase">{data.title || "Test Your Knowledge"}</h3>
                </div>
                <span className="text-gray-400 text-sm font-mono">
                    Question {currentQuestion + 1}/{data.questions.length}
                </span>
            </div>

            <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-8 leading-relaxed">
                    {question.q}
                </h4>

                <div className="space-y-3">
                    {question.options.map((option, idx) => {
                        let btnClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between group ";

                        if (selectedOption === null) {
                            btnClass += "border-gray-200 hover:border-red-200 hover:bg-red-50 cursor-pointer";
                        } else if (idx === question.answer) {
                            btnClass += "border-green-500 bg-green-50 text-green-800";
                        } else if (selectedOption === idx) {
                            btnClass += "border-red-500 bg-red-50 text-red-800";
                        } else {
                            btnClass += "border-gray-100 text-gray-400 opacity-50 cursor-not-allowed";
                        }

                        return (
                            <button
                                key={idx}
                                disabled={selectedOption !== null}
                                onClick={() => handleOptionClick(idx)}
                                className={btnClass}
                            >
                                <span className="font-medium">{option}</span>
                                {selectedOption !== null && idx === question.answer && (
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                )}
                                {selectedOption === idx && idx !== question.answer && (
                                    <XCircle className="w-5 h-5 text-red-600" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {selectedOption !== null && (
                    <div className={`mt-6 p-4 rounded-lg animate-fade-in ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <p className="font-bold mb-1">
                            {isCorrect ? "Correct!" : "Incorrect"}
                        </p>
                        <p className="text-sm opacity-90">
                            {question.explanation}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
