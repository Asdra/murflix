import { useState, useEffect } from 'react';

const Image = ({ file, token }) => {
    return (
        <>
            <div id="imageWrapper">
                <img src={`/api/browser?href=${file.href}&token=${token}`} />
            </div>
            <style jsx>{`
                    #imageWrapper {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: auto;
                    }
                    img {
                        max-width: 100%;
                        max-height: 100%;
                        border: none;
                        object-fit: fill;
                    }
                `}</style>
        </>
    );
}

export default Image;