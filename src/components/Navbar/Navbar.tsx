import React, { FC, useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { RiArrowDownSFill } from 'react-icons/ri'
import { MdOutlineClose } from 'react-icons/md'

import classes from './Navbar.module.scss'

export const Navbar: FC = () => {
    const [isScroll, setIsScroll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const styles = {
        close: {
            color: 'white',
        } as const,
    }

    const handleOpenModal: () => void = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleScroll: () => void = useCallback(() => {
        if(window.scrollY > 30) {
            if(!isScroll) {
                setIsScroll(true);
            }
        } else {
            if(isScroll){
                setIsScroll(false);
            }
        }
    }, [isScroll])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [handleScroll])
    
    return (
        <div className={`${classes.navbar} ${isScroll && classes.active}`}>
            <div className={classes.navbar_icon}>
                <img src="https://iconsplace.com/wp-content/uploads/_icons/ff0000/256/png/letter-l-icon-14-256.png" 
                     alt="icon" 
                     className={classes.navbar_icon_img}
                />
                <Link to='/' className={classes.navbar_icon_name}>Cinema</Link>   
            </div>
            <div className={classes.navbar_content}>
                <div className={classes.navbar_content_pages}>
                    <div className={classes.navbar_content_pages_page}>
                        <Link to='/'>Home</Link>
                    </div>
                    <div className={classes.navbar_content_pages_page}>
                        <Link to='/tv'>TV Series</Link>
                    </div>
                    <div className={classes.navbar_content_pages_page}>
                        <Link to='/movie'>Movies</Link>
                    </div>
                    <div className={classes.navbar_content_pages_page}>
                        <Link to='/new'>New & Popular</Link>
                    </div>
                </div>
                <div className={classes.navbar_content_search}>
                    <Link to='/search' className={classes.navbar_content_search_link}>
                        <BsSearch /> 
                    </Link>
                </div>
            </div>
            <div className={`${classes.navbar_sub} ${isScroll && classes.active}`} onClick={handleOpenModal}>
                <p>
                    Discover
                    <span><RiArrowDownSFill /></span>
                </p>
                <div className={`${classes.navbar_sub_modal} ${isModalOpen && classes.active}`} onClick={handleOpenModal}>
                    <div className={classes.navbar_sub_modal_item}>
                        <Link to='/'>Home</Link>
                    </div>
                    <div className={classes.navbar_sub_modal_item}>
                        <Link to='/tv'>TV Series</Link>
                    </div>
                    <div className={classes.navbar_sub_modal_item}>
                        <Link to='/movie'>Movies</Link>
                    </div>
                    <div className={classes.navbar_sub_modal_item}>
                        <Link to='/new'>New & Popular</Link>
                    </div>
                    <div className={classes.navbar_sub_modal_close} onClick={handleOpenModal}>
                        <MdOutlineClose style={styles.close} />
                    </div>
                </div>
            </div>
        </div>
    )
}
