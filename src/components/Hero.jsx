/**
 * @copyright 2025 Nomaan Faruki
 * @license Apache-2.0
 */

/**
 * Components
 */
import { ButtonPrimary, ButtonOutline } from "./Button";
// import CodeEditor from './CodeEditor.jsx';

const Hero = () => {
  return (
    <section
      id="home"
      className="pt-28 lg:pt-36"
    >
      <div className="container items-center lg:grid lg:grid-cols-2 lg:gap-10">

        <div>
          <div className="flex items-center gap-3">
            <figure className="img-box w-9 h-9 rounded-lg">
              <img
                src="/images/F1.png"
                width={40}
                height={40}
                alt="Nomaan Faruki portrait"
                className="img-cover"
              />
            </figure>

            <div className="flex items-center gap-1.5 text-amber-100 text-sm tracking-wide">
              {/* <span className="relative w-2 h-2 rounded-full bg-sky-50">
                <span className="absolute inset-0 rounded-full bg-amber-50 animate-ping"></span>
              </span> */}
              

              NOMAAN FARUKI
            </div>
          </div>

          <h2 className="headline-1 max-w-[15ch] sm:max-w-[20ch] lg:max-w-[15ch] mt-5 mb-8 lg:mb-10">
          Crafting seamless digital experiences.
          </h2>

          <div className="flex items-center gap-3">
            <ButtonPrimary
              label="Resume"
              icon="Download"
              href="https://coral-belita-72.tiiny.site"
            />

            <ButtonOutline
              href="#contact"
              label="Reach Out"
              icon="mail"
            />
          </div>
        </div>

        <div className="hidden lg:block">
          {/* <figure className="w-full max-w-[480px] ml-auto bg-gradient-to-t from-sky-400 via-25% via-sky-400/40 to-65% rounded-[60px] overflow-hidden"> */}
          <figure className="w-full max-w-[600px] ml-auto">
            <img
              src="/images/animate.svg"
              width={656}
              height={800}
              alt="code editor"
              className="w-full"
            />
          </figure>
        </div>
        

      </div>

    </section>
  )
}

export default Hero
