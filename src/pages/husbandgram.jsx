import { useState } from 'react';
import { createHusbandGram } from '../utils/api';


  export default function HusbandGramForm() {
    const [genre, setGenre] = useState('Mystery');
    const [question, setQuestion] = useState('');
    const [spicy, setSpicy] = useState(false);
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const generated = await createHusbandGram({ genre, question, spicy });
      setOutput(generated);
      setLoading(false);
    };
  
    return (  // ✅ this return is important
      <div className="min-h-screen flex flex-col items-center justify-start py-10 bg-gradient-to-br from-purple-100 to-white">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
          <select value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full p-2 border rounded">
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Fantasy">Fantasy</option>
          </select>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What should your HusbandGram be about?"
            className="w-full p-2 border rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={spicy}
              onChange={(e) => setSpicy(e.target.checked)}
            />
            <span>Make it spicy hm? 🌶️</span>
          </label>
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md transition"
            disabled={loading}
          >
            {loading ? 'Generating...' : '🔥 Create HusbandGram'}
          </button>
        </form>
  
        {output && (
          <div className="bg-purple-50 mt-8 p-6 rounded-xl w-full max-w-md shadow-md text-center">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Your HusbandGram</h2>
            <p className="text-gray-700">{output}</p>
            <button className="mt-4 text-sm text-purple-600 border border-purple-500 px-4 py-1 rounded-full hover:bg-purple-100">
              Create Audio
            </button>
          </div>
        )}
      </div>
      
    );
  }
  
