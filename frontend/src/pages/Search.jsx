import React, { useState } from "react"
import { useAuth } from "@clerk/clerk-react"
import { api } from "../api/axios"
import toast from "react-hot-toast"
import PostCard from "../components/PostCard"

function Search() {
  const [input, setInput] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const { getToken } = useAuth()

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    try {
      setLoading(true)

      // ensure hashtag starts with #
      const query = input.startsWith("#") ? input.slice(1) : input

      const { data } = await api.get(`/api/post/search?tag=${query}`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      })

      if (data.success) {
        setResults(data.posts || [])
      } else {
        toast(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C58C34] to-[#d9a74a] bg-clip-text text-transparent">
          Search what you want to learn
        </h1>
        <p className="text-gray-500 mt-2">
          Discover questions, notes, and discussions by searching with hashtags
        </p>
      </div>

      {/* Search Input */}
      <form
        onSubmit={handleSearch}
        className="flex gap-2 mb-6 shadow-md rounded-lg p-2 bg-white/80 backdrop-blur-sm"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search hashtags (e.g., #java, #javascript)"
          className="flex-1 border border-[#d9a74a]/60 rounded-lg px-3 py-2 
            bg-white placeholder:text-gray-400
            outline-none focus:ring-2 focus:ring-[#C58C34] focus:border-[#C58C34] 
            transition"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-[#C58C34] to-[#d9a74a] 
            text-white font-medium rounded-lg shadow 
            hover:from-[#b67b2c] hover:to-[#c6933f] 
            active:scale-95 transition"
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <p className="text-gray-500 text-center animate-pulse">Searching...</p>
      )}

      {/* Results */}
      <div className="space-y-4">
        {results.length > 0 ? (
          results.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          !loading && (
            <p className="text-gray-400 text-center">
              No posts found. Try a different hashtag!
            </p>
          )
        )}
      </div>
    </div>
  )
}

export default Search
