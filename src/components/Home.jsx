import "../Home.css"
import lottie from "lottie-web"
import { useEffect, useRef } from "react"
import freelancerGirl from "../assets/freelancer-girl.json"

const Home = () => {
  const animation = useRef(null)
  useEffect(() => {
    lottie.loadAnimation({
      container: animation.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: freelancerGirl,
      description: "girl working from home on laptop"
    })
  }, [])

  return (
    <div className="home-wrapper">
      <div className="glass">
        <div className="intro">
          <h3>Hi...</h3>
          <h1>My name is Onyinye</h1>
          <h3>
            But I'm often called Goldie. I'm passionate about <br />
            frontend web development; and I love pink.
          </h3>
          <h3>Skills:</h3>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Elementor Pro</li>
          </ul>
        </div>
        <div className="buttons">
          <a href="mailto: udeozoonyinye02@gmail.com">Contact Me</a>
          <a
            className="github"
            href="https://github.com/GoldieCodes?tab=repositories"
          >
            See my GitHub Repo
          </a>
        </div>
      </div>
      <div className="lottie" ref={animation}></div>
      <p className="footer">I built this website with React</p>
    </div>
  )
}
export default Home
