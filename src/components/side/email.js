import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { uniqueId } from 'lodash';

import { Side, CustomLink, Icon } from '@components';
import { socialMedia, email } from '@config';

const EmailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &:after {
        content: '';
        display: block;
        width: 1px;
        height: 9rem;
        margin: 0 auto;
        background-color: var(--color-side);
    }

    li:last-of-type {
        margin-bottom: 2rem;
    }
`;
const StyledLink = styled(CustomLink)`
    font-family: var(--fonts-mono);
    font-size: var(--font-size-xs);
    letter-spacing: 0.1em;
    writing-mode: vertical-rl;
    margin: 2rem auto;
    padding: 1rem;
    color: var(--color-side);

    &:hover,
    &:focus {
        transform: translateY(-0.3rem);
        color: var(--color-primary);
    }
`;

const Email = ({ isHome, ...otherProps }) => (
    <Side isHome={isHome} {...otherProps}>
        <EmailContainer>
            <StyledLink variant={null} href={`mailto:${email}`}>
                {email}
            </StyledLink>
        </EmailContainer>
    </Side>
);

Email.propTypes = {
    isHome: PropTypes.bool,
};

Email.defaultProps = {
    isHome: false,
};

export default Email;
