import { useState, useEffect } from 'react';

const GameFrame = ({ file, token }) => {

    const [frameHREF, setFrameHREF] = useState(null);

    useEffect(() => {
        let config = fetch(`/api/browser?href=${file.href}&token=${token}`).then(r => r.json().then(j => {
            setFrameHREF(j.url);
        }));
        console.log(config);
    }, [frameHREF]);

    return (
        <>
            {frameHREF !== null && <>
                <iframe id="gameFrame" src={frameHREF}></iframe>
                <style jsx>{`
                    #gameFrame {
                        width: 100%;
                        height: 100%;
                        border: none;
                        object-fit: fill;
                    }
                `}</style>
            </>
            }
        </>
    );
}

export default GameFrame;