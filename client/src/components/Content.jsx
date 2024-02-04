import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function Content() {
    return (
        <div className='main mt-5 mb-5'>
            <main>
                <section id="home">
                    <div className="container-fluid text-center">
                        <div className="row mx-5 content-1">
                            <div className="col mt-5 mx-5 text-start">
                                <div className='mt-4'>
                                    <h1 className="text-xl">Welcome to manage.com</h1>
                                </div>
                                <p className='mt-4 mb-7 text-md'>Website for managing classes</p>

                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col mt-5">
                                            <img src="./public/react.svg" width="200" height="200" className='rounded float-right' />
                                        </div>
                                        <div className="col mt-5">
                                            <img src="./public/nodejs.svg" width="200" height="200" className='rounded float-right' />
                                        </div>
                                        <div className="col mt-5">
                                            <img src="./public/mongodb.svg" width="200" height="200" className='rounded float-right ' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <img src="./public/pexels-cottonbro-studio-3585000.jpg" width="500" height="700" className='rounded float-right shadow-lg' />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="about">
                    <div className="container-fluid text-center content-2">
                        <div>
                            <h1>About</h1>
                        </div>
                        <div className="container">
                            <p className='mt-4'>Explore a dynamic and responsive web application powered by cutting-edge technologies. Our React-based front-end provides a seamless and engaging user experience, while the robust Node.js back-end ensures efficient data processing and server-side functionalities. Harnessing the power of MongoDB, our database solution offers scalability and flexibility for managing and organizing data. Discover a modern, full-stack web page that brings together the strengths of React, Node.js, and MongoDB to deliver a feature-rich and performant online experience.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Content