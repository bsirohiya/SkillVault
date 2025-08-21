import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

function ImageModal({ images = [], initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentImage = images[currentIndex];

  const prevImage = () => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-2 sm:p-0 select-none">

        {/* Left Arrow */}
        {images.length > 1 && (
            <ChevronLeft
            draggable={false}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 text-white cursor-pointer select-none"
            onClick={prevImage}/>
        )}

        {/* Right Arrow */}
        {images.length > 1 && (
            <ChevronRight
            draggable={false}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 text-white cursor-pointer select-none"
            onClick={nextImage}/>
        )}

        {/* Close Button */}
        <X
            draggable={false}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 text-white cursor-pointer select-none z-50"
            onClick={onClose}/>

        {/* Image */}
        <div className="relative flex flex-col items-center justify-center max-w-full max-h-full select-none">
            <img
            src={currentImage}
            alt={`post-img-${currentIndex}`}
            className="max-h-[80vh] max-w-[95vw] sm:max-w-[90vw] rounded-lg object-contain select-none"
            draggable={false}/>
        </div>
    </div>

  );
}

export default ImageModal;
