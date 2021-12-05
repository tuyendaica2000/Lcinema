import React, { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getDataTVPage } from '../api'
import { motion } from "framer-motion"
import { defaultPageFadeInVariants, pageTrans } from '../etc/animation'
import Hero from '../components/Hero/Hero'
import Slider from '../components/Silder/Slider'


const TVPage: FC = () => {
    const { data, isLoading, error } = useQuery('Data TV Page', () => { return getDataTVPage() });
    const [num, setNum] = useState(0);
    
    useEffect(() => {
        if(data) {
            setNum(Math.floor(19 * Math.random()))
        }
    }, [data])

    if(error) {
        return <h1>Something went wrong...</h1>
    }
    
    return (
        <>
            <motion.div 
                initial={defaultPageFadeInVariants.initial}
                animate={defaultPageFadeInVariants.animate}
                exit={defaultPageFadeInVariants.exit}
                transition={pageTrans}
            >
                { data ? <Hero banner={data['Popular TV Series'][num]} isLoading={isLoading}/> : null }
                { data ? Object.keys(data).map((item, index: number) => {
                    return <Slider key={index} data={data[item]} title={item} /> 
                }) : null }
            </motion.div>
        </>
    )
}

    

export default TVPage
