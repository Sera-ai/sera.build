import React, { useState, useEffect, memo } from 'react';
import { Handle, Position } from 'reactflow'; // Assuming these are correct imports based on your code snippet

const Component = memo(({ data }) => {
    // Initialize currentIndex only if data.subline is defined and is an array, otherwise default to 0
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Ensure data.subline is defined and is an array before setting up the interval
        if (Array.isArray(data.subline) && data.subline.length > 0) {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    // If we reach the end of the subline array, go back to the first item
                    return (prevIndex + 1) % data.subline.length;
                });
            }, 3000); // 3000ms = 3 seconds

            // Clean up the interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [data.subline]); // Direct dependency on data.subline to handle changes in the actual content or definition of subline

    return (
        <>
            <div className="wrapper gradient">
                <div className="inner">
                    <div className="body">
                        <div>
                            <div className={`${Array.isArray(data.subline) && data.subline.length > 0 ? "" : "full-"}title`}>{data.title}</div>
                            {/* Safely display the current subline item */}
                            {Array.isArray(data.subline) && data.subline.length > 0 && (
                                <div className="subline">{data.subline[currentIndex]}</div>
                            )}
                        </div>
                    </div>
                    <Handle type="target" position={Position.Left} />
                    <Handle type="source" position={Position.Right} />
                </div>
            </div>
        </>
    );
});

export default Component;
