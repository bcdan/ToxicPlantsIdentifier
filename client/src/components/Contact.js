import {
  AiOutlineMail,
  AiOutlineLinkedin,
  AiOutlineGithub,
} from "react-icons/ai";
import {CONTACT_INFO} from '../common/constants'
import { motion } from "framer-motion";
import {variantsContainer,variantsItem} from '../common/animationsConfig'


const Contact = () => {
    const handleClick = (url)=>{
        window.location.href = url;
    };
    
  return (
    <div className="personal-page">
      <div className="personal-header">
        <span>Contact</span>
      </div>
      <motion.div className="personal-footer contact" variants={variantsContainer} initial="hidden" animate="visible">
        <motion.span variants={variantsItem}>
            <AiOutlineMail onClick={() => handleClick(`mailto:${CONTACT_INFO.email}`)} />
        </motion.span>
        <motion.span variants={variantsItem}>
        <AiOutlineLinkedin onClick={() => handleClick(CONTACT_INFO.linkedIn)} />
        </motion.span>
        <motion.span variants={variantsItem}>
            <AiOutlineGithub onClick={() => handleClick(CONTACT_INFO.github)} />
        </motion.span>
      </motion.div>
    </div>
  );
};

export default Contact;
