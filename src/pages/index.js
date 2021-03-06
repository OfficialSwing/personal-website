import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { Layout, Hero, About, Projects, Contact, Main } from '@components';

const StyledMain = styled(Main)`
    padding: 0;
`;

const IndexPage = ({ location, data }) => {
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.substring(1);
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView();
                el.focus();
            }
        }
    }, [location.hash]);

    return (
        <Layout location={location}>
            <StyledMain>
                <Hero data={data.hero.edges} />
                <About data={data.about.edges} />
                <Projects data={data.projects.edges} />
                <Contact data={data.contact.edges} />
            </StyledMain>
        </Layout>
    );
};

IndexPage.propTypes = {
    location: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
    {
        hero: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/hero/" } }) {
            edges {
                node {
                    frontmatter {
                        title
                        name
                        subtitle
                        contact
                    }
                }
            }
        }
        about: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
            edges {
                node {
                    frontmatter {
                        title
                        skills
                        avatar {
                            childImageSharp {
                                fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#09162a" }) {
                                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                                }
                            }
                        }
                    }
                    html
                }
            }
        }
        projects: allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/projects/" } }
            sort: { fields: [frontmatter___sort], order: ASC }
        ) {
            edges {
                node {
                    frontmatter {
                        overline
                        title
                        images {
                            image {
                                childImageSharp {
                                    fluid(
                                        maxWidth: 700
                                        quality: 90
                                        traceSVG: { color: "#09162a" }
                                    ) {
                                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                                    }
                                }
                            }
                            alt
                        }
                        tech
                        github
                        external
                    }
                    html
                }
            }
        }
        contact: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/contact/" } }) {
            edges {
                node {
                    frontmatter {
                        title
                        emailText
                    }
                    html
                }
            }
        }
    }
`;
