import React from 'react'
import styles from './footer.module.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <h3 className={styles.copyright}>©2023 Joe's Library</h3>
                </div>
                <ul className={styles.SocialMedia}>
                    <li><FacebookIcon /></li>
                    <li><LinkedInIcon /></li>
                    <li><TwitterIcon /></li>
                    <li><InstagramIcon /></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer