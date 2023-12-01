import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

  
const Room = ({roomId}) => {
    

    const myMeeting = async (element) => {
        
        const appId = 1230233891;
        const serverSecret = "9eca270bff94f9cba436251e03426bde";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret,
             roomId, Date.now().toString(), "Udai Singh");

             const zc=ZegoUIKitPrebuilt.create(kitToken);

             zc.joinRoom({
                container:element,
                scenario:{
                    mode:ZegoUIKitPrebuilt.OneONoneCall,
                },
                turnOnMicrophoneWhenJoining:false,
                showScreenSharingButton:false,
                sharedLinks:[{
                    name:'Copy Link',
                    url:`http://localhost:3000/${roomId}`
                }]

             })
    };

    return (
        <div>
            <div ref={myMeeting}/>
        </div>
    )
}

export default Room