import { BadgeCheck, X } from 'lucide-react'
import { useEffect, useState } from 'react'

function StoryViewer({viewStory, setViewStory}) {

    const [progress, setProgress] = useState(0)

    useEffect(() => {
        let timer = null;
        let progressInterval = null;

        if (viewStory && viewStory.media_type !== "video") {
            setProgress(0);
            const duration = 10000; // 10 seconds
            const setTime = 100; // update every 100ms
            let elapsed = 0;

            progressInterval = setInterval(() => {
            elapsed += setTime;
            setProgress((elapsed / duration) * 100);
            if (elapsed >= duration) {
                clearInterval(progressInterval);
            }
            }, setTime);

            //close story after 10 sec

            timer = setTimeout(() => {
            setViewStory(null);
            }, duration);
        }

        return () => {
            if (timer) clearTimeout(timer);
            if (progressInterval) clearInterval(progressInterval);
        };
        }, [viewStory, setViewStory]);


    const handleClose = ()=>{
        setViewStory(null)
    }

    if(!viewStory) return null

    const renderContent = ()=>{
        switch (viewStory.media_type) {
            case "image":
                return (
                    <img src={viewStory.media_url} alt="" className='max-w-full max-h-screen object-contain'/>
                )

            case "video":
            return (
                <video onEnded={()=> setViewStory(null)} src={viewStory.media_url} className='max-h-screen' controls autoPlay/>
            )

            case "text":
                return (
                    <div className='w-full h-full flex items-center justify-center p-8
                     text-white text-2xl text-center'>
                        {viewStory.content}
                    </div>
                )
         
            default:
                return null;
        }
    }

  return (
    <div className='fixed inset-0 h-screen bg-black bg-opacity-90 z-110 flex items-center justify-center' style={{backgroundColor: viewStory.media_type === 'text' ? viewStory.background_color: '#000000'}}>

        {/* Progress Bar */}
        <div className='absolute top-0 left-0 w-full h-1 bg-gray-700'>

           <div className='h-full bg-white transition-[width] duration-100 ease-linear' style= {{ width: `${progress}%`}}>
           </div>

        </div>

        {/* User info- top-left */}
        <div className='absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur-2x1 rounded bg-black/50'>
             <img src={viewStory.user?.profile_picture} alt="" className='size-7 sm:size-8 rounded-full object-cover border border-white'/>

            <div className='text-white font-medium flex items-center gap-1.5'>
            <span>{viewStory.user?.full_name}</span>
            <BadgeCheck size={18}/>
            </div>
        </div>

        <button
        onClick={handleClose}
        className='absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none'
        >
            <X className='w-8 h-8 hover:scale-110 transition cursor-pointer'/>
        </button>

        <div className='max-w-[90-vw] max-h-[90-vh] flex items-center justify-center'>
            {renderContent()}
        </div>


    </div>
  )
}

export default StoryViewer