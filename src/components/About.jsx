import { motion } from "framer-motion";

const fadeInLeftWithBlur = {
  hidden: { opacity: 0, x: -50, filter: 'blur(10px)' }, // Animation starts from the left with a blur
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)', // Animation ends with full opacity and no blur
    transition: {
      duration: 0.3, // Duration of the animation
      staggerChildren: 0.2, // Stagger animation for child elements
    },
  },
};

export default function About() {
  return (
    <motion.section
      id="about"
      className="section-padding-bottom"
      initial="hidden"
      whileInView="visible"
      variants={fadeInLeftWithBlur}
      viewport={{ amount: 0.2 }}
    >
      <div className="section-header-wrapper">
        <h2>
          About
          <span className="text-green">.</span>
        </h2>
        <div className="section-header-line"></div>
      </div>
      <div>
        <motion.p className="relaxed" variants={fadeInLeftWithBlur}>
          Passionate full-stack developer with a solid foundation in PHP Laravel
          and React.js, specializing in custom theme development for WordPress
          and Shopify. Proficient in HTML, CSS, SCSS, JavaScript, and jQuery, I
          excel at transforming Figma designs into real-world applications with
          precision. Additionally, I am skilled in Webflow, creating seamless
          and visually appealing web experiences. Let’s connect and embark on a
          journey of creativity and innovation in the digital world.
        </motion.p>
        <motion.p className="relaxed" variants={fadeInLeftWithBlur}>
          Outside of coding, I'm exploring SEO and Digital Marketing out of
          personal interest. Fun facts : I've developed this portfolio using
          React.js. In my downtime, I enjoy playing the guitar and diving into
          video games.
        </motion.p>
      </div>
    </motion.section>
  );
}
