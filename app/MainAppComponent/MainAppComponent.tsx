import React, { useState, useEffect } from 'react';

type ComponentProps = { timesClicked: number; onClick?: (event: React.MouseEvent) => void };

function MainApp({ timesClicked, onClick: clickEmit }: ComponentProps): JSX.Element {
    const [count, setCount] = useState(timesClicked);
    useEffect(() => console.log('use effect'));

    function onClick(event: React.MouseEvent): void {
        setCount(count + 1);
        clickEmit && clickEmit(event);
    }

    return <div onClick={onClick}>{count} times clicked</div>;
}

export default MainApp;
