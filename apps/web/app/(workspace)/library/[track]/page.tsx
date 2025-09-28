"use client";

import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
    const { track } = useParams();

    return (
        <div>{track}</div>
    )
}

export default page