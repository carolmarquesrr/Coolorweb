import React, { useState, useEffect } from 'react';

function Coolors() {
    return (
        <div className="colors" >

<h1 className="name">BYTES 4 COOLORS</h1>

            <RandomColor />
            
        </div>


    );
}



const RandomColor = () => {

    
    const [colors, setColors] = useState([]);
    const [lockedColors, setLockedColors] = useState([]);

    const getRgb = () => Math.floor(Math.random() * 256);

    const rgbToHex = (r, g, b) =>
        '#' +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            })
            .join('');

    useEffect(() => {
        generateColors();
    }, []);


    const generateColors = () => {
        const newColors = Array.from({ length: 5 }, () => {
            const color = {
                r: getRgb(),
                g: getRgb(),
                b: getRgb(),
            };
            return rgbToHex(color.r, color.g, color.b);
        });
        setColors(newColors);
    };

    const handleGenerate = (e) => {
        const newColors = colors.map((color, index) => {
            if (lockedColors[index]) {
                return color;
            }
            const newColor = {
                r: getRgb(),
                g: getRgb(),
                b: getRgb(),
            };
            return rgbToHex(newColor.r, newColor.g, newColor.b);
        });
        setColors(newColors);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === "Space") {
                generateColors();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);



    const handleLock = (index) => {
        const updatedLockedColors = [...lockedColors];
        updatedLockedColors[index] = !updatedLockedColors[index];
        setLockedColors(updatedLockedColors);
    };

    return (
        <div className="container"> 
            <div className='innerWrapper'> 
                {colors.map((color, index) => (





                    <div class="card">
                        <div class="box" style={{ backgroundColor: color }} onClick={() => {
                               navigator.clipboard.writeText(color);
                          }}
                          >
                            {color}
                        </div>
                          <div class='botBox'>
                            <button className="lockbutton" onClick={() => handleLock(index)}>
                                <img width={25} src={lockedColors[index] ? "./img/lock.png" : "./img/unlock.png"} />
                            </button>
                          </div>
                    </div>

                ))}
            </div>
            <button className="generate button-89" role="button" onClick={handleGenerate}>Generate Colors</button>
        </div>
    );
};

export { RandomColor };
export { Coolors };
