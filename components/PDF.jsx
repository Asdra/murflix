import { useState, useEffect } from 'react';

const PDF = ({ file, token }) => {
    return (
        <>
            <embed id="pdfFrame" src={`/api/browser?href=${file.href}&token=${token}`} width="600" height="500" alt="pdf" pluginspage="http://www.adobe.com/products/acrobat/readstep2.html" />
            <style jsx>{`
                    #pdfFrame {
                        width: 100%;
                        height: 100%;
                        border: none;
                        object-fit: fill;
                    }
                `}</style>
        </>
    );
}

export default PDF;