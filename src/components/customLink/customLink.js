import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { buttonStyles } from '@styles';
import OutboundLink from './outboundLink';
import LinkWrapper from './linkWrapper';

const styleLink = Link => styled(Link)`
    ${buttonStyles}
`;

const CustomLink = forwardRef(({ children, href, to, ...props }, ref) => {
    const RenderedLink = styleLink(href ? OutboundLink : LinkWrapper);

    return (
        <RenderedLink ref={ref} href={href} to={href ? null : to} {...props}>
            {children}
        </RenderedLink>
    );
});

CustomLink.propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    href: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['inline-link', 'primary-button']),
};

CustomLink.defaultProps = {
    to: undefined,
    href: undefined,
    className: undefined,
    children: undefined,
    onClick: undefined,
    variant: 'inline-link',
};

export default CustomLink;
