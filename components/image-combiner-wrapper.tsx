"use client"

import dynamic from "next/dynamic"

const ImageCombiner = dynamic(() => import("./image-combiner").then((mod) => ({ default: mod.ImageCombiner })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Loading AI Studio...</p>
      </div>
    </div>
  ),
})

export function ImageCombinerWrapper() {
  return <ImageCombiner />
}
