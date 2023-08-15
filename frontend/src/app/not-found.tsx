"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation'

interface INotFoundProps {
}

const NotFound: React.FunctionComponent<INotFoundProps> = (props) => {
    const router = useRouter()
    return <>
        <h1>Page not found</h1>
        <button onClick={() => router.back()}>Go Back</button>
    </>;
};

export default NotFound;
