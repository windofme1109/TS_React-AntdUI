import React from 'react';
import Icon from './icon';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import mdx from './icon.mdx';

library.add(fas);

export default {
    title: 'Demo/Icon',
    parameters: {
        docs: {
            page: mdx,
        },
    },
    component: Icon,
};
export const basic = () => <div>
    <Icon icon="coffee" theme="success" size="2x">Basic</Icon>
    test
</div>;