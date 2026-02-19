import { useDispatch, useSelector } from "react-redux"
import { comp } from "../Redux_store/Comp"

const Main = () => {

    const comp1 = useSelector((state)=>state.comp.comp)
    const dispatch = useDispatch()
    
    const gotosignin = () => {
        dispatch(comp("signin"))
        console.log(comp1)
    }

  return (
    <>
    {comp1 === "homePage" &&
    <div className="homePage">

      {/* HERO SECTION */}
      <section className="heroSection">
        <div className="heroContent">
          <h1 className="heroTitle">
            Welcome to <span>EduTrack</span>
          </h1>

          <p className="heroSubtitle">
            Manage your subjects, track your attendance, and stay above minimum
            percentage with ease.
          </p>

          <div className="heroButtons">
            <button onClick={gotosignin} className="heroBtn primary">Get Started</button>
          </div>
        </div>
      </section>

      <section className="featureSection">
        <h2 className="sectionTitle">Key Features</h2>

        <div className="featureGrid">
          <div className="featureCard">
            <h3>Add Subjects</h3>
            <p>Add subject details like name, code, credits, and faculty.</p>
          </div>

          <div className="featureCard">
            <h3>Track Attendance</h3>
            <p>Mark Present/Absent and maintain accurate attendance records.</p>
          </div>

          <div className="featureCard">
            <h3>Progress Bar</h3>
            <p>See attendance percentage in real-time using progress bars.</p>
          </div>

          <div className="featureCard">
            <h3>Attendance History</h3>
            <p>View all attendance logs with date and time history.</p>
          </div>

          <div className="featureCard">
            <h3>Edit & Update</h3>
            <p>Edit subject information anytime with update option.</p>
          </div>

          <div className="featureCard">
            <h3>Secure & Fast</h3>
            <p>Simple UI with fast performance and smooth navigation.</p>
          </div>
        </div>
      </section>

      {/* HOW TO USE SECTION */}
      <section className="howToSection">
        <h2 className="sectionTitle">How to Use EduTrack</h2>

        <div className="stepsWrapper">
          <div className="stepCard">
            <span className="stepNumber">1</span>
            <h3>Add Subjects</h3>
            <p>Go to Add Subject page and fill subject details.</p>
          </div>

          <div className="stepCard">
            <span className="stepNumber">2</span>
            <h3>Open Attendance</h3>
            <p>Select the subject from Attendance page.</p>
          </div>

          <div className="stepCard">
            <span className="stepNumber">3</span>
            <h3>Mark Present/Absent</h3>
            <p>Click Present or Absent button after each lecture.</p>
          </div>

          <div className="stepCard">
            <span className="stepNumber">4</span>
            <h3>Track Percentage</h3>
            <p>Check progress bar to stay above required attendance.</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="ctaSection">
        <h2>Start Tracking Your Attendance Today 🚀</h2>
        <p>Stay consistent, stay disciplined, and never miss your attendance goal.</p>

        <button className="ctaBtn">Go to Dashboard</button>
      </section>

      </div>    
    }
    </>
)
}

export default Main