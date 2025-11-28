'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface QuizAnswer {
  questionId: string
  answer: string
  label: string
}

const questions = [
  {
    id: 'country',
    question: 'Where are you located now?',
    type: 'text' as const,
    placeholder: 'E.g., United States, Paris, Koh Samui...'
  },
  {
    id: 'goal',
    question: "What's your main vacation goal?",
    type: 'multiple' as const,
    options: [
      { value: 'a', label: 'Relax and recharge' },
      { value: 'b', label: 'Explore a new culture' },
      { value: 'c', label: 'Have fun and party' },
      { value: 'd', label: 'Stay active with sports and nature' }
    ]
  },
  {
    id: 'companions',
    question: 'Who are you traveling with?',
    type: 'multiple' as const,
    options: [
      { value: 'a', label: 'Solo' },
      { value: 'b', label: 'Partner' },
      { value: 'c', label: 'Friends' },
      { value: 'd', label: 'Family' }
    ]
  },
  {
    id: 'scenery',
    question: 'What kind of scenery inspires you most?',
    type: 'multiple' as const,
    options: [
      { value: 'a', label: 'Beaches and islands' },
      { value: 'b', label: 'Mountains and forests' },
      { value: 'c', label: 'Historic cities' },
      { value: 'd', label: 'Deserts or wide open spaces' }
    ]
  },
  {
    id: 'evenings',
    question: 'How do you prefer to spend your evenings?',
    type: 'multiple' as const,
    options: [
      { value: 'a', label: 'Watching the sunset with a drink' },
      { value: 'b', label: 'Discovering local food and wine' },
      { value: 'c', label: 'Dancing or live music' },
      { value: 'd', label: 'Reading or relaxing quietly' }
    ]
  },
  {
    id: 'pace',
    question: "What's your travel pace?",
    type: 'multiple' as const,
    options: [
      { value: 'a', label: 'Easy and slow' },
      { value: 'b', label: 'Balanced and flexible' },
      { value: 'c', label: 'Busy, every hour counts' },
      { value: 'd', label: 'Spontaneous, go-with-the-flow' }
    ]
  },
  {
    id: 'weather',
    question: "What's your ideal weather?",
    type: 'multiple' as const,
    options: [
      { value: 'a', label: 'Warm and sunny' },
      { value: 'b', label: 'Mild and breezy' },
      { value: 'c', label: 'Cool and crisp' },
      { value: 'd', label: "Doesn't matter" }
    ]
  },
  {
    id: 'accommodation',
    question: "What's your accommodation style?",
    type: 'multiple' as const,
    options: [
      { value: 'a', label: 'Boutique hotel' },
      { value: 'b', label: 'Local guesthouse' },
      { value: 'c', label: 'Luxury resort' },
      { value: 'd', label: 'Camping or eco-lodge' }
    ]
  },
  {
    id: 'food',
    question: 'What kind of food do you crave when traveling?',
    type: 'multiple' as const,
    options: [
      { value: 'a', label: 'Fresh and tropical' },
      { value: 'b', label: 'Rich and traditional' },
      { value: 'c', label: 'Street food and snacks' },
      { value: 'd', label: 'Healthy and local ingredients' }
    ]
  },
  {
    id: 'duration',
    question: 'How long do you want your trip to be?',
    type: 'multiple' as const,
    options: [
      { value: 'a', label: 'A weekend getaway' },
      { value: 'b', label: 'Around one week' },
      { value: 'c', label: 'Two weeks or more' },
      { value: 'd', label: 'A long adventure or gap trip' }
    ]
  },
  {
    id: 'takeaway',
    question: 'What do you want to bring home from your trip?',
    type: 'multiple' as const,
    options: [
      { value: 'a', label: 'Peace of mind' },
      { value: 'b', label: 'Great memories and photos' },
      { value: 'c', label: 'New friendships' },
      { value: 'd', label: 'A sense of discovery' }
    ]
  }
]

export default function TravelQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [textInput, setTextInput] = useState('')
  const [generatingResults, setGeneratingResults] = useState(false)
  const [results, setResults] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnswer = (questionId: string, answer: string, label: string) => {
    const newAnswers = [...answers.filter(a => a.questionId !== questionId), { questionId, answer, label }]
    setAnswers(newAnswers)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      handleAnswer(questions[currentQuestion].id, textInput.trim(), textInput.trim())
      setTextInput('')
    }
  }

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index)
  }

  const submitQuiz = async () => {
    if (answers.length < questions.length) {
      setError('Please answer all questions before getting your recommendations.')
      return
    }

    setGeneratingResults(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch('/api/travel-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      })

      if (!response.ok) {
        throw new Error('Failed to get travel recommendations')
      }

      const data = await response.json()
      setResults(data.recommendations)
    } catch (err) {
      setError('Failed to get travel recommendations. Please try again.')
    } finally {
      setGeneratingResults(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setTextInput('')
    setResults(null)
    setError(null)
  }

  const currentQ = questions[currentQuestion]
  const isAnswered = (questionId: string) => answers.some(a => a.questionId === questionId)
  const getAnswer = (questionId: string) => answers.find(a => a.questionId === questionId)

  if (results) {
    return (
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="py-8 md:py-12">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Perfect Travel Destinations
              </h2>
              <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-ul:my-4 prose-li:my-1 prose-strong:font-semibold prose-strong:text-gray-900">
                <ReactMarkdown>{results}</ReactMarkdown>
              </div>
              <button
                onClick={resetQuiz}
                className="mt-6 text-purple-600 hover:text-purple-700 font-medium"
              >
                Take the quiz again
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="py-8 md:py-12">

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-sm text-gray-500">{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  index === currentQuestion
                    ? 'bg-purple-600 text-white'
                    : isAnswered(questions[index].id)
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Current Question */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm text-left">
            <label className="block text-xl font-semibold text-gray-900 mb-6">
              {currentQ.question}
            </label>

            {currentQ.type === 'text' ? (
              <div className="space-y-4">
                <input
                  type="text"
                  className="form-input w-full"
                  placeholder={currentQ.placeholder}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQ.options?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQ.id, option.value, option.label)}
                    className={`p-4 text-left border rounded-lg transition-colors hover:border-purple-300 hover:bg-purple-50 cursor-pointer ${
                      getAnswer(currentQ.id)?.answer === option.value
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center text-xs font-bold">
                        {option.value.toUpperCase()}
                      </span>
                      {option.label}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Previous
              </button>
              
              {currentQuestion === questions.length - 1 && answers.length === questions.length ? (
                <button
                  onClick={submitQuiz}
                  disabled={generatingResults}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                >
                  {generatingResults ? 'Finding your destinations...' : 'Get My Recommendations'}
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === questions.length - 1}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                </button>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-6">
              {error}
            </div>
          )}

          {/* Loading State */}
          {generatingResults && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center mt-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-4"></div>
              <p className="text-lg text-gray-700">Finding your perfect travel destinations...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
