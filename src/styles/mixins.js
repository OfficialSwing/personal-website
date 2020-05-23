import { css } from 'styled-components';
import Color from 'color';

import media from './media';

const mixins = {
    darken: (colorValue, amount = '0.05') => Color(colorValue).darken(amount).string(),
    lighten: (colorValue, amount = '0.05') => Color(colorValue).lighten(amount).string(),
    rgba: (colorValue, opacity = '0.05') => Color(colorValue).alpha(opacity).string(),
    customScrollbar: (config = {}) => css`
        &::-webkit-scrollbar {
            width: ${config.width || 8}px;
        }
        &::-webkit-scrollbar-track {
            background: none;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10rem;
            background-color: ${config.color || '#eee'};
        }
    `,
    backgroundImage: imageURL => css`
        background-image: url("${imageURL}");
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;
        background: #fff;
    `,
    placeholderColor: colorValue => css`
        ::-webkit-input-placeholder {
            color: ${colorValue} !important;
            opacity: 0.8 !important;
        }
        :-moz-placeholder {
            color: ${colorValue} !important;
            opacity: 0.8 !important;
        }
        ::-moz-placeholder {
            color: ${colorValue} !important;
            opacity: 0.8 !important;
        }
        :-ms-input-placeholder {
            color: ${colorValue} !important;
            opacity: 0.8 !important;
        }
    `,
    translate: (left = 0, top = 0) => css`
        transform: translate(${left}px, ${top}px);
    `,
    gridLayout: (columnNumber, gridGap, columnWidth) => css`
        display: grid;
        grid-template-columns: repeat(
            ${columnNumber || '16'},
            ${columnWidth || 'minmax(min-content, 1fr)'}
        );
        grid-gap: ${gridGap || '1.6rem'};
    `,
    containAndCenter: css`
        max-width: 110rem;
        margin: 0 auto;
        width: 100%;
    `,
    flexCenter: css`
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    flexBetween: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    flexColumnCenter: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `,
    inlineFlexCenter: css`
        display: inline-flex;
        justify-content: center;
        align-items: center;
    `,
    clearfix: css`
        &:after {
            content: '';
            display: table;
            clear: both;
        }
    `,
    engulf: css`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
    `,
    overflowEllipsis: css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 1px;
    `,
    scrollableY: css`
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    `,
    clickable: css`
        cursor: pointer;
        user-select: none;
    `,
    hardwareAccelerate: css`
        transform: translateZ(0);
    `,
    inlineLink: css`
        display: inline-block;
        text-decoration: none;
        text-decoration-skip-ink: auto;
        position: relative;
        transition: var(--color-transition);
        cursor: pointer;
        color: var(--color-text-link);

        &:after {
            content: '';
            display: block;
            width: 100%;
            height: 0;
            position: absolute;
            bottom: 0.24em;
            background-color: var(--color-text-link);
            transition: var(--transition);
            opacity: 0;
            transform: translateY(-0.5rem);
        }

        &:hover {
            color: var(--color-text-link);
            outline: 0;

            &:after {
                opacity: 1;
                width: 100%;
                transform: translateY(0);
                height: 1.5px;
            }

            & > * {
                color: var(--color-text-link) !important;
                transition: var(--transition);
            }
        }
    `,
    homeSection: css`
        width: 100%;
        margin-bottom: 10rem;

        h3 {
            &:after {
                width: 0;
                transition: all 1s var(--ease-in-expo);
            }
        }
        &:hover {
            transition: var(--transition);
            h3 {
                &:after {
                    transition: all 1s var(--ease-in-expo);
                    width: 30%;
                    ${media.bp800`width: 100%;`};
                }
            }
        }
    `,
    formField: css`
        border-radius: var(--border-radius);
        color: var(--color-text-primary-1);
        background-color: var(--color-background-2);
        border: 1.5px solid var(--color-background-4);

        &:hover {
            border: 1.5px solid var(--color-background-5);
        }

        &:focus,
        &:active {
            border: 1.5px solid var(--color-primary);
        }

        ${props =>
            props.invalid &&
            css`
                &,
                &:invalid,
                &:focus {
                    border: 1.5px solid var(--color-danger) !important;
                }
            `};
    `,
    pagePadding: css`
        padding: 0 var(--page-padding);
        ${media.bp800`
            padding: 0 var(--page-padding-tablet);
        `}
        ${media.bp440`
            padding: 0 var(--page-padding-mobile);
        `}
    `,
};

export default mixins;
