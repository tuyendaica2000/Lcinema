import React, { FC, CSSProperties } from 'react'

import classes from './Skeleton.module.scss'


interface SkeletonPros {
    className?: string,
    style?: CSSProperties,
}

const Skeleton: FC<SkeletonPros> = ({ className, style }) => {
    return <div className={`${classes.skeleton}`} style={style}></div>
}

export default Skeleton
