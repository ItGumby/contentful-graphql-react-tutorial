import React from "react";

function Page({heading, color}) {
    return (
        <>
            <h1 style={{backgroundColor: color, padding: '2rem'}}>{heading}</h1>
            <p>this is my page</p>
        </>
    );
}

export default Page;
