import React, { ReactComponentElement } from 'react';
import Footer from './Footer';
import Header from './Header';

function withDefaultLayout(Content: React.ReactNode) {
    return (
        <div>
            <Header />
            {Content}
            <Footer />
        </div>
    );
}

export default withDefaultLayout;
