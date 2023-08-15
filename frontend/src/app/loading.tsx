import * as React from 'react';

interface ILoadingProps {
}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
    return <>
        <p>Loading...</p>
    </>;
};

export default Loading;