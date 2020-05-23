import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { js, constants } from '@utils';
import { navLinks } from '@config';
import { Menu } from '@components';
import { mixins, media } from '@styles';

const navHeight = 100;
const navScrollHeight = 70;
const hamburgerWidth = '30px';

const HeaderContainer = styled.header`
    ${mixins.flexBetween};
    ${mixins.pagePadding}
    position: fixed;
    top: 0;
    background-color: var(--color-background-1);
    transition: var(--transition);
    z-index: var(--z-index-header);
    filter: none !important;
    pointer-events: auto !important;
    user-select: auto !important;
    width: 100%;
    height: ${props =>
        props.scrollDirection === 'none' ? `${navHeight}px` : `${navScrollHeight}px`};
    box-shadow: ${props =>
        props.scrollDirection === 'up' ? `0 1rem 3rem -1rem var(--header-shadow)` : 'none'};
    transform: translateY(
        ${props => (props.scrollDirection === 'down' ? `-${navScrollHeight}px` : '0px')}
    );
    ${media.bp1040`padding: 0 4rem;`};
    ${media.bp800`padding: 0 2.5rem;`};
`;
const NavContainer = styled.nav`
    ${mixins.flexBetween};
    position: relative;
    width: 100%;
    color: var(--color-text-primary-2);
    font-family: var(--fonts-mono);
    ${media.bp800`justify-content: flex-end;`};
`;

const Hamburger = styled.div`
    ${mixins.flexCenter};
    ${mixins.clickable};
    overflow: visible;
    margin: 0 -1.2rem 0 0;
    padding: 1.5rem;
    transition-timing-function: linear;
    transition-duration: 0.15s;
    transition-property: opacity, filter;
    text-transform: none;
    color: inherit;
    border: 0;
    background-color: transparent;
    display: none;
    ${media.bp800`display: flex;`};
`;
const HamburgerBox = styled.div`
    position: relative;
    display: inline-block;
    width: ${hamburgerWidth};
    height: 24px;
`;
const HamburgerContent = styled.div`
    background-color: var(--color-primary);
    position: absolute;
    width: ${hamburgerWidth};
    height: 2px;
    border-radius: var(--border-radius);
    top: 50%;
    left: 0;
    right: 0;
    transform: rotate(${props => (props.isMenuOpen ? `225deg` : `0deg`)});
    transition: transform 0.22s
        cubic-bezier(
            ${props => (props.isMenuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`)}
        )
        ${props => (props.isMenuOpen ? `0.12s` : `0s`)};

    &:before,
    &:after {
        content: '';
        display: block;
        background-color: var(--color-primary);
        position: absolute;
        left: auto;
        right: 0;
        width: ${hamburgerWidth};
        height: 2px;
        transition-timing-function: ease;
        transition-duration: 0.15s;
        transition-property: transform;
        border-radius: 0.4rem;
    }
    &:before {
        width: ${props => (props.isMenuOpen ? `100%` : `120%`)};
        top: ${props => (props.isMenuOpen ? `0` : `-10px`)};
        opacity: ${props => (props.isMenuOpen ? 0 : 1)};
        transition: ${props =>
            props.isMenuOpen ? 'var(--ham-before-active)' : 'var(--ham-before)'};
    }
    &:after {
        width: ${props => (props.isMenuOpen ? `100%` : `80%`)};
        bottom: ${props => (props.isMenuOpen ? `0` : `-10px`)};
        transform: rotate(${props => (props.isMenuOpen ? `-90deg` : `0`)});
        transition: ${props => (props.isMenuOpen ? 'var(--ham-after-active)' : 'var(--ham-after)')};
    }
`;
const LinksList = styled.ul`
    ${mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;
    ${media.bp800`display: none;`};
`;
const ListItem = styled.li`
    margin-right: 2rem;
    position: relative;
    font-size: var(--font-size-xs);
`;
const StyledLink = styled(Link)`
    padding: 1.2rem 1rem;
    font-weight: 600;
    color: var(--color-text-primary-2);

    &:hover {
        color: var(--color-primary);
    }
`;

class Header extends Component {
    state = {
        // eslint-disable-next-line react/destructuring-assignment
        isMounted: !this.props.isHome,
        isMenuOpen: false,
        scrollDirection: 'none',
        lastDistanceFromTop: 0,
    };

    componentDidMount() {
        setTimeout(
            () =>
                this.setState({ isMounted: true }, () => {
                    window.addEventListener('scroll', () => js.throttle(this.handleScroll()));
                    window.addEventListener('resize', () => js.throttle(this.handleResize()));
                    window.addEventListener('keydown', e => this.handleKeydown(e));
                }),
            100,
        );
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', () => this.handleScroll());
        window.removeEventListener('resize', () => this.handleResize());
        window.removeEventListener('keydown', e => this.handleKeydown(e));
    }

    toggleMenu = () => {
        const { isMenuOpen } = this.state;
        this.setState({ isMenuOpen: !isMenuOpen });
    };

    handleScroll = () => {
        const { isMounted, isMenuOpen, scrollDirection, lastDistanceFromTop } = this.state;
        const distanceFromTopRequired = 5;
        const distanceFromTop = window.scrollY;

        if (
            !isMounted ||
            Math.abs(lastDistanceFromTop - distanceFromTop) <= distanceFromTopRequired ||
            isMenuOpen
        ) {
            return;
        }

        if (distanceFromTop < distanceFromTopRequired) {
            this.setState({ scrollDirection: 'none' });
        } else if (distanceFromTop > lastDistanceFromTop && distanceFromTop > navHeight) {
            if (scrollDirection !== 'down') {
                this.setState({ scrollDirection: 'down' });
            }
        } else if (distanceFromTop + window.innerHeight < document.body.scrollHeight) {
            if (scrollDirection !== 'up') {
                this.setState({ scrollDirection: 'up' });
            }
        }

        this.setState({ lastDistanceFromTop: distanceFromTop });
    };

    handleResize = () => {
        const { isMenuOpen } = this.state;
        if (window.innerWidth > 800 && isMenuOpen) {
            this.toggleMenu();
        }
    };

    handleKeydown = e => {
        const { isMenuOpen } = this.state;
        if (isMenuOpen && e.keyCode === constants.keyCodes.ESCAPE) {
            this.toggleMenu();
        }
    };

    render() {
        const { isMounted, isMenuOpen, scrollDirection } = this.state;
        const { isHome } = this.props;
        const timeout = isHome ? 3000 : 0;
        const fadeClass = isHome ? 'fade' : '';
        const fadeDownClass = isHome ? 'fadedown' : '';
        return (
            <HeaderContainer scrollDirection={scrollDirection}>
                <Helmet>
                    <body className={isMenuOpen ? 'blur' : ''} />
                </Helmet>
                <NavContainer>
                    <TransitionGroup component={null}>
                        {isMounted && (
                            <CSSTransition classNames={fadeClass} timeout={timeout}>
                                <Hamburger onClick={this.toggleMenu}>
                                    <HamburgerBox>
                                        <HamburgerContent isMenuOpen={isMenuOpen} />
                                    </HamburgerBox>
                                </Hamburger>
                            </CSSTransition>
                        )}
                    </TransitionGroup>

                    <LinksList>
                        <TransitionGroup component={null}>
                            {isMounted &&
                                navLinks &&
                                navLinks.map(({ url, name }, i) => (
                                    <CSSTransition
                                        key={`header-link-${i}`}
                                        classNames={fadeDownClass}
                                        timeout={timeout}>
                                        <ListItem
                                            key={i}
                                            style={{
                                                transitionDelay: `${isHome ? i * 100 : 0}ms`,
                                            }}>
                                            <StyledLink to={url}>{name}</StyledLink>
                                        </ListItem>
                                    </CSSTransition>
                                ))}
                        </TransitionGroup>
                    </LinksList>
                </NavContainer>
            </HeaderContainer>
        );
    }
}

Header.propTypes = {
    isHome: PropTypes.bool.isRequired,
};

export default Header;

// const Header = ({ isHome }) => {
//     const [isMounted, setIsMounted] = useState(!isHome);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [scrollDirection, setScrollDirection] = useState('none');
//     const [lastDistanceFromTop, setLastDistanceFromTop] = useState(0);
//     const distanceFromTopRequired = 5;
//     const timeout = isHome ? 3000 : 0;
//     const fadeClass = isHome ? 'fade' : '';
//     const fadeDownClass = isHome ? 'fadedown' : '';

//     const toggleMenu = () => setIsMenuOpen(isMenuOpen);

//     const handleScroll = () => {
//         const distanceFromTop = window.scrollY;
//         // console.log({ distanceFromTop, lastDistanceFromTop, distanceFromTopRequired });

//         if (
//             !isMounted ||
//             Math.abs(lastDistanceFromTop - distanceFromTop) <= distanceFromTopRequired ||
//             isMenuOpen
//         ) {
//             return;
//         }

//         if (distanceFromTop < distanceFromTopRequired) {
//             setScrollDirection('none');
//         }

//         if (distanceFromTop > lastDistanceFromTop && distanceFromTop > navHeight) {
//             if (scrollDirection !== 'down') {
//                 setScrollDirection('down');
//             }
//         } else if (distanceFromTop + window.innerHeight < document.body.scrollHeight) {
//             if (scrollDirection !== 'up') {
//                 setScrollDirection('up');
//             }
//         }

//         setLastDistanceFromTop(distanceFromTop);
//     }

//     const handleResize = () => {
//         if (window.innerWidth > 800 && isMenuOpen) {
//             toggleMenu();
//         }
//     };

//     const handleKeydown = e => {
//         if (isMenuOpen && e.keyCode === constants.keyCodes.ESCAPE) {
//             toggleMenu();
//         }
//     };

//     useEffect(() => {
//         setTimeout(() => {
//             setIsMounted(true);
//             window.addEventListener('scroll', () => js.throttle(handleScroll(), 100));
//             window.addEventListener('resize', () => js.throttle(handleResize(), 100));
//             window.addEventListener('keydown', e => handleKeydown(e));
//         }, 100);
//         return () => {
//             window.removeEventListener('scroll', () => handleScroll());
//             window.removeEventListener('resize', () => handleResize());
//             window.removeEventListener('keydown', e => handleKeydown(e));
//         };
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     useEffect(() => {
//         if (isMenuOpen) {
//             document.body.classList.add('blur');
//         } else {
//             document.body.classList.remove('blur');
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [isMounted]);

//     return (
//         <HeaderContainer>
//             <NavContainer>
//                 <TransitionGroup component={null}>
//                     {isMounted && (
//                         <CSSTransition classNames={fadeClass} timeout={timeout}>
//                             <Hamburger onClick={toggleMenu}>
//                                 <HamburgerBox>
//                                     <HamburgerContent isMenuOpen={isMenuOpen} />
//                                 </HamburgerBox>
//                             </Hamburger>
//                         </CSSTransition>
//                     )}
//                 </TransitionGroup>

//                 <LinksList>
//                     <TransitionGroup component={null}>
//                         {isMounted &&
//                             navLinks &&
//                             navLinks.map(({ url, name }, i) => (
//                                 <CSSTransition
//                                     key={`header-link-${i}`}
//                                     classNames={fadeDownClass}
//                                     timeout={timeout}>
//                                     <ListItem
//                                         key={i}
//                                         style={{
//                                             transitionDelay: `${isHome ? i * 100 : 0}ms`,
//                                         }}>
//                                         <StyledLink to={url}>{name}</StyledLink>
//                                     </ListItem>
//                                 </CSSTransition>
//                             ))}
//                     </TransitionGroup>
//                 </LinksList>
//             </NavContainer>
//         </HeaderContainer>
//     );
// };

// Header.propTypes = {
//     isHome: PropTypes.bool.isRequired,
// };

// export default Header;
