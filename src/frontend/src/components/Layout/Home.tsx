import React, { PropsWithChildren } from 'react';
import Header from './Header';

const Home = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Header />
        </>
    );
};

export default Home;
