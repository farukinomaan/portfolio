/**
 * @copyright 2025 Nomaan Faruki
 * @license Apache-2.0
 */


/**
 * Components
 */
import ProjectCard from "./ProjectCard";


const works = [
  {
    imgSrc: '/images/prj2.png',
    title: 'Hotel Reservation Website with SQL Database integerated',
    tags: ['HTML', 'CSS', 'JavaScript', 'NodeJs' , 'SQL'],
    projectLink: 'https://farukinomaan.github.io/Hotel-Reservation-System/'
  },
  {
    imgSrc: '/images/prj3.png',
    title: 'Stock Management System',
    tags: ['Java'],
    projectLink: 'https://pixstock-official.vercel.app/'
  },
  {
    imgSrc: '/images/Questify.png',
    title: 'Quiz Form Builder',
    tags: ['React', 'TailwindCSS', 'NodeJs', 'JavaScript', 'MongoDB', 'Express'],
    projectLink: 'https://github.com/farukinomaan/Questifybynomaan'
  },

  {
    imgSrc: '/images/work3.png',
    title: 'AI Powered ChatBot',
    tags: ['React', 'JavaScript','TailwindCSS', 'Hasura', 'nhost','n8n','GraphQL API'],
    projectLink: 'https://github.com/farukinomaan/ChatbotbyNomaan'
  },
//   {
//     imgSrc: '/images/project-3.jpg',
//     title: 'Recipe app',
//     tags: ['Development', 'API'],
//     projectLink: ''
//   },
//   {
//     imgSrc: '/images/project-4.jpg',
//     title: 'Real state website',
//     tags: ['Web-design', 'Development'],
//     projectLink: ''
//   },
//   {
//     imgSrc: '/images/project-5.jpg',
//     title: 'eCommerce website',
//     tags: ['eCommerce', 'Development'],
//     projectLink: 'https://github.com/codewithsadee/anon-ecommerce-website'
//   },
//   {
//     imgSrc: '/images/project-6.jpg',
//     title: 'vCard Personal portfolio',
//     tags: ['Web-design', 'Development'],
//     projectLink: ''
//   },
  ];


const Work = () => {
  return (
    <section
      id="work"
      className="section"
    >
      <div className="container">

        <h2 className="headline-2 mb-8 reveal-up">
          Project Highlights
        </h2>

        <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
          {works.map(({ imgSrc, title, tags, projectLink }, key) => (
            <ProjectCard
              key={key}
              imgSrc={imgSrc}
              title={title}
              tags={tags}
              projectLink={projectLink}
              classes="reveal-up"
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Work