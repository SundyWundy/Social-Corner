import React from 'react'

export default function Video() {
    const videos = [
        {
            name: "Terry Suva",
            description: "",
            video: "https://youtu.be/IEvT5vP3F0I"
        }
    ]
    return (
        <div>
            Hi from video
            {
                videos.map(({name, description, video})=>(
                    <div>
                    <video src={video} ></video>
                    </div>
                ))
            }
        </div>
    )
}
