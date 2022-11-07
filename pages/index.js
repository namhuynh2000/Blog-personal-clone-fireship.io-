import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { syncSanityToAlgolia } from '../utils/Sanity'

export default function Home() {
  const blazinglyFast = useRef(0);
  const highlyAmusing = useRef(0);
  const [hoverBlazing, setHoverBlazing] = useState(false);

  // useEffect(async () => {

  // }, [])

  return (
    <>
      <Head>
        <title>Fireship</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='px-8 mt-20'>
        <section className='grid grid-cols-2 justify-items-center items-center'>
          <div className='p-[24px] text-center flex flex-col lg:col-span-1 col-span-2'>
            <h1 className='leading-none font-title font-[900] text-[60px]'>LEARN TO CODE <span className='bg-gradient-to-t from-[#f97316] to-[#eab308] bg-clip-text text-transparent'>FASTER.</span></h1>
            <p className='md:text-[25px] text-[20px] font-code font-[500] text-[#b2becd] my-7 relative'>Fireship is a <span className='text-[#eab308]' ref={blazinglyFast} onMouseOver={() => { console.log(blazinglyFast.current) }}>
              {/* <Image className='absolute top-[-10px]' src='/cat.gif' width={75} height={75} /> */}
              blazingly fast</span> && <span className='text-[#ec4899]' ref={highlyAmusing}>highly-amusing</span> way to level up your programming skills.</p>
            <Link href="/labs" className='text-white bg-[#22c55e] text-[14px] mx-auto font-[600] w-[130px] h-[36px] py-2 px-5'>START HERE</Link>
          </div>
          <div className="bg-[url('/tv.png')] bg-cover w-[500px] h-[300px] lg:col-span-1 col-span-2">
            <iframe className="md:w-[330px] md:h-[185px] relative md:left-[48px] md:top-[54px] mx-auto md:mx-0 w-full aspect-video" src="https://player.vimeo.com/video/599890291" frameBorder="0" webkitallowfullscreen="" mozallowfullscreen="" allowFullScreen=""></iframe>
          </div>
        </section>
      </main>
    </>
  )
}

export async function getStaticProps() {

  const query = `*[_type == "post"]{
    "objectID": _id,
    title,
    description,
    slug
  }`

  const query2 = `*[_type == "post"]{
      title}`

  await syncSanityToAlgolia(query);

  return {
    props: {}
  }
}


