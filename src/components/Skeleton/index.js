import React from 'react'
const Skeleton = ({ height = 'h-10', width = 'w-10', bgColor = 'bg-gray-400', round = false, display = 'block' }) => {
  return <div className={`${height} ${width} ${bgColor} ${round} ${display} animate-pulse`}></div>
}

export default Skeleton
