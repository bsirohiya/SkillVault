import { useAuth } from '@clerk/clerk-react'
import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { api } from '../api/axios'

function StoryModal({setShowModal, fetchStories}) {

  const {getToken} = useAuth()

    const bgColors = [
      "#4F46E5", // Royal Blue – bright yet refined
      "#7C3AED", // Medium Violet – elegant pop
      "#EC4899", // Hot Pink – bright but stylish
      "#F97316", // Orange – warm and lively
      "#14B8A6", // Teal – fresh and modern
      "#22D3EE", // Cyan – subtle brightness
      "#FBBF24", // Amber – cheerful, classy
      "#000000"  // Indigo – soft but vivid
    ];


    const [mode, setMode] = useState("text")
    const [bg, setBg] = useState(bgColors[0])
    const [text, setText] = useState("")
    const [media, setMedia] = useState(null)
    const [previewURL, setPreviewURL] = useState(null)

    const MAX_VIDEO_DURATION = 60 //SECONDS
    const MAX_VIDEO_SIZE_MB = 50 //MB

    const handleMediaUpload = (e)=> {
        const file = e.target.files?.[0]
        if(file){
            if(file.type.startsWith("video")){
              if(file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024){
                toast.error(`File size cannot exceed ${MAX_VIDEO_SIZE_MB} MB`)
                setMedia(null)
                setPreviewURL(null)
                return
              }

              const video = document.createElement("video")
              video.preload = "metadata"
              video.onloadedmetadata = ()=> {
                window.URL.revokeObjectURL(video.src)
                if(video.duration > MAX_VIDEO_DURATION){
                  toast.error(`Cannot upload video greater than ${MAX_VIDEO_DURATION} sec`)
                  setMedia(null)
                  setPreviewURL(null)
                }else{
                  setMedia(file)
                  setPreviewURL(URL.createObjectURL(file))
                  setText("")
                  setMode("media")
                }
              }
              video.src = URL.createObjectURL(file)
            }else if(file.type.startsWith("image")){
                  setMedia(file)
                  setPreviewURL(URL.createObjectURL(file))
                  setText("")
                  setMode("media")
            }
        }
    }

    const handleCreateStory = async ()=>{
      const media_type = mode === "media" ? media?.type.startsWith("image") ? "image" : "video" : "text"

      if(media_type === "text" && !text){
        throw new Error("Please add something")
      }

      let formData = new FormData()
      formData.append("content", text) 
      formData.append("media_type", media_type) 
      formData.append("media", media) 
      formData.append("background_color", bg) 

      const token = await getToken()

      try {
        const {data} = await api.post("/api/story/create", formData, {headers: {Authorization: `Bearer ${token}`}})

        if(data.success){
          setShowModal(false)
          toast.success(data.message)
          fetchStories()
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    
  return (

    <div className='fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur
    text-white flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-4 flex items-center justify-between'>

          <button onClick={ ()=> setShowModal(false)} className='text-white p-2 cursor-pointer'>
          <ArrowLeft />
          </button>

          <h1 className='text-lg font-semibold'>Create a story</h1>

          <span className='w-10'></span>

        </div>

        <div className='rounded-lg h-96 flex items-center justify-center relative' style={{backgroundColor: bg}}>

          {
            mode === "text" && (
              <textarea onChange={ (e)=> setText(e.target.value)} value={text} placeholder="What's on your mind?" 
               className='bg-transparent text-shadow: 0 0 4px rgba(0,0,0,0.4) placeholder-white/60 w-full h-full p-6 text-lg resize-none focus:outline-none'
              />
            )
          }

          {
            mode === "media" && previewURL && (
              media.type.startsWith("image") ? 
              (
                <img src={previewURL} className='object-contain max-h-full'/>
              ) : 
              (
                <video src={previewURL} className='object-contain max-h-full'/>
              )
            )
          }

        </div>

        <div className='flex mt-4 gap-2'>
          {
            bgColors.map( (color)=>(
              <button key={color} onClick={()=> setBg(color)}
              className='w-6 h-6 rounded-full ring cursor-pointer'
              style={{backgroundColor: color}}
              />
            ))
          }
        </div>

        <div className='flex gap-2 mt-4'>
            <button onClick={()=> {setMode("text"); setMedia(null); setPreviewURL(null)} }
            className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === "text" ? "bg-white text-black" : " bg-zinc-800"}`}
            >
                <TextIcon size={18}/> Text
            </button>

            <label className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === "media" ? "bg-white text-black" : " bg-zinc-800"}`}>
              <input onChange={handleMediaUpload} type="file" accept='image/*, video/*' className='hidden'/>
            <Upload size={18}/> Photo/Video
            </label>
        </div>

          <button 
          onClick={()=> toast.promise(handleCreateStory(), { loading: "Saving.." }
          )}
           className='flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition- cursor-pointer'>
            <Sparkle size={18}/> Create Story
          </button>
      </div>
    </div>

  )
}

export default StoryModal