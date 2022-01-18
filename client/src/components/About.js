import {variantsContainer ,variantsItem } from '../common/animationsConfig'
import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="personal-page" >
            <motion.div className="container" 
                    variants={variantsContainer}
                    initial="hidden"
                    animate="visible">
                <motion.div className="personal-header" variants={variantsItem}>
                    <span>Hi</span>
                </motion.div>
                <motion.p className="personal-content" variants={variantsItem}>
                    Welcome to my very first React.js app! So what does it do?
                    Let's say you own a cat or a dog (or even a horse...) and you're planning on getting a new plant for your house.
                    Gotta make sure it's not toxic ,right?
                    Use this app ! Just search for that plant's name and find out.
                    Hope you enjoy!
                </motion.p>
                <motion.div className="personal-footer" variants={variantsItem}>
                    <span >Dan.<br/></span>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default About
