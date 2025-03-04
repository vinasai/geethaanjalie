import Link from 'next/link';

const AboutArea = ({ about_pt = '' }) => {
   return (
      <>
         <section className={`about__area pb-120 p-relative ${about_pt && about_pt}`}>
            <div className="container">
               <div className="row">
                  <div className="col-xxl-7 col-xl-7 col-lg-7">
                     <div className="about__thumb-wrapper d-sm-flex mr-20 p-relative">
                        <div className="about__shape">
                           <img className="about__shape-1 d-none d-sm-block" src="assets/img/about/about-shape-1.png" alt="" />
                           <img className="about__shape-2 d-none d-sm-block" src="assets/img/about/about-shape-2.png" alt="" />
                           <img className="about__shape-3" src="assets/img/about/about-shape-3.png" alt="" />
                        </div>
                        <div className="about__thumb-left mr-10">
                           <div className="about__thumb-1 mb-10">
                              <img src="assets/img/about/about-1.png" alt="" />
                           </div>
                           <div className="about__thumb-1 mb-10 text-end">
                              <img src="assets/img/about/about-3.png" alt="" />
                           </div>
                        </div>
                        <div className="about__thumb-2 mb-10">
                           <img src="assets/img/about/about-2.png" alt="" />
                        </div>
                     </div>
                  </div>
                  <div className="col-xxl-5 col-xl-5 col-lg-5">
                     <div className="about__content pl-70 pr-25">
                        <div className="section__title-wrapper mb-15">
                           <span className="section__title-pre">About Geethaanjalie</span>
                           <h2 className="section__title">Expertise in Various Musical Disciplines</h2>
                        </div>
                        <p>GEETHAANJALIE School of Carnatic Music has been established in Melbourne, Australia in 2008 by Ahilan Sivanadan, and has been running as a registered institution since 2009.

We teach Carnatic Vocal Music and Carnatic Violin for our students.

Lessons are conducted in person and online.

Our students have been actively participating in annual school concerts, temples, cultural programs organised by various community organisations.

In addition, our students have been participating in many collaborative productions with other music schools and have been accompanying Bharathanatyam performances of various dance schools.</p>

                        {/* <div className="about__list mb-40">
                           <ul>
                              <li><i className="fa-solid fa-check"></i> Access to all our courses</li>
                              <li><i className="fa-solid fa-check"></i> Learn the latest skills</li>
                              <li><i className="fa-solid fa-check"></i> Upskill your organization</li>
                           </ul>
                        </div> */}

                        {/* <div className="about__btn">
                           <Link href="/about">
                              <a className="tp-btn tp-btn-2">Read more</a>
                           </Link>
                        </div> */}
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default AboutArea;