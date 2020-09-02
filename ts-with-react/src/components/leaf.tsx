import React from 'react';

import { Consumer } from './hello';

const Leaf: React.FC = () => {
    return (
        <React.Fragment>
            <Consumer>{value => <h1>battery: {value}</h1>}</Consumer>
        </React.Fragment>
    );
};

export default Leaf;
