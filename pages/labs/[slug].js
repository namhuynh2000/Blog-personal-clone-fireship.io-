import React from 'react';
import LayoutContent from '../../components/layouts/LayoutContent';
import BlockContent from '@sanity/block-content-to-react';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor, queryData } from '../../libs/library';
import Head from 'next/head';
import { clientSanityConfig } from '../../utils/Sanity'

const serializers = {
    types: {
        code: (props) => {
            return (
                <pre data-language={props.node.language}>
                    <code>{props.node.code}</code>
                </pre>
            )
        },
        youtube: ({ node }) => {
            const { url } = node;
            const id = getYouTubeId(url);
            return (<YouTube videoId={id} opts={{ height: 'auto' }} iframeClassName='w-full aspect-video' />)
        }
    },
}

export default function Slug({ post }) {
    const { poster } = post;
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="detail blog" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LayoutContent post={post}>
                {
                    post.linkYoutube ?
                        (<div className=''>
                            <YouTube videoId={getYouTubeId(post.linkYoutube)} opts={{ height: 'auto' }} iframeClassName='w-full aspect-video' />
                        </div>) :
                        (<div>
                            <Image
                                className='w-full aspect-video object-cover'
                                src={poster ? urlFor(poster)?.url() : '/noimage.png'}
                                alt={poster?.caption ? poster.caption : 'noAlt'}
                                width={500}
                                height={500}
                            />
                        </div>)
                }
                <div className='flex lg:flex-row flex-col lg:items-center lg:justify-between px-3 pb-2 pt-4 mt-3 mb-5 rounded-lg bg-[#2A2E35] overflow-hidden'>
                    <div className='lg:min-w-[70%]'>
                        <div className='font-title lg:text-[60px] sm:text-[55px] text-[40px] bg-clip-text bg-gradient-to-t from-[#f97316] to-[#eab308] text-transparent leading-none'>
                            {post.title}
                        </div>
                        <div className='text-[#6c7983] sm:text-[12px] text-[10px]'>
                            Posted: {Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(post._createdAt))}
                        </div>
                        <div className='text-[#6c7983] sm:text-[12px] text-[10px]'>
                            Updated: {Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(post._updatedAt))}
                        </div>
                    </div>
                    <div className='lg:flex flex-col gap-6 justify-center flex-shrink hidden items-center'>
                        <div className='flex flex-wrap justify-center items-center gap-2'>
                            {
                                post.tag?.map(item => {
                                    return (<Link href={`/tags/${item.title}`} key={item._key} style={{ background: item.favoriteColor ? item.favoriteColor.hex : '#000' }} className={`font-code text-[13px] px-[7px] py-[5px] rounded-[0.375rem] text-center leading-[21px]`}>#{item.title}</Link>)
                                })
                            }
                        </div>
                        <Link href={post.link ? post.link : '#'} target="_blank" className='bg-[#22252a] py-2 px-4 md:text-[14px] hover:bg-[#191C20] text-[11px] font-[500] ml-4 cursor-pointer inline'>
                            SOURCE CODE
                        </Link>
                    </div>
                </div>
                <article className="prose">
                    <BlockContent
                        blocks={post.text}
                        serializers={serializers}
                        imageOptions={{ w: 800, fit: 'max' }}
                        projectId={clientSanityConfig.projectId}
                        dataset={clientSanityConfig.dataset}
                        className="text-white" />
                </article>
            </LayoutContent>
        </>
    )
}

export async function getStaticPaths() {
    const query = `*[_type=="post"]`;
    const posts = await queryData(query)

    const paths = posts.map(post => {
        return {
            params: { slug: post.slug.current },
        }
    })

    // { fallback: false } means other routes should 404
    return { paths, fallback: false }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
    const { slug } = context.params;

    // const query = `*[_type == "tag"]{
    //     _id, title,
    //     "post": *[_type == "post" && references(^._id)].title}`

    const query = `*[_type == "post"]{
        ...,
        tag[]->}`

    const postsWithTags = await queryData(query);

    const post = postsWithTags.find(post => {
        return post.slug.current === slug;
    })

    return {
        props: {
            post: post,
        },
    }
}