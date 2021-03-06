/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
// const { kebabCase } = require('lodash');

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;
    const postTemplate = path.resolve(`src/templates/post.js`);
    // const tagTemplate = path.resolve('src/templates/tag.js');

    const result = await graphql(`
        {
            postsRemark: allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/posts/" } }
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1000
            ) {
                edges {
                    node {
                        frontmatter {
                            slug
                        }
                    }
                }
            }
            tagsGroup: allMarkdownRemark(limit: 2000) {
                group(field: frontmatter___tags) {
                    fieldValue
                }
            }
        }
    `);

    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    // Create post detail pages
    const posts = result.data.postsRemark.edges;

    posts.forEach(({ node }) => {
        createPage({
            component: postTemplate,
            path: node.frontmatter.slug,
            context: {},
        });
    });

    // // Extract tag data from query
    // const tags = result.data.tagsGroup.group;
    // // Make tag pages
    // tags.forEach(tag => {
    //     createPage({
    //         component: tagTemplate,
    //         path: `/blog/tags/${kebabCase(tag.fieldValue)}/`,
    //         context: {
    //             tag: tag.fieldValue,
    //             slug: `/blog/tags/${kebabCase(tag.fieldValue)}/`,
    //         },
    //     });
    // });
};

// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    // Stop scrollreveal null references to the window on build
    // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
    if (stage === 'build-html') {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /scrollreveal/,
                        use: loaders.null(),
                    },
                ],
            },
        });
    }

    // Allows absolute referencing (e.g. import { Component } from '@components')
    actions.setWebpackConfig({
        resolve: {
            alias: {
                '@components': path.resolve(__dirname, 'src/components'),
                '@config': path.resolve(__dirname, 'src/config'),
                '@fonts': path.resolve(__dirname, 'src/fonts'),
                '@images': path.resolve(__dirname, 'src/images'),
                '@pages': path.resolve(__dirname, 'src/pages'),
                '@styles': path.resolve(__dirname, 'src/styles'),
                '@utils': path.resolve(__dirname, 'src/utils'),
                '@hooks': path.resolve(__dirname, 'src/hooks'),
                '@content': path.resolve(__dirname, 'src/content'),
                '@context': path.resolve(__dirname, 'src/context'),
            },
        },
    });
};
