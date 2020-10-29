import React from 'react';
import Particles from 'react-particles-js';


const Particle = (props) => {
    const particlesOptions = {
        "particles": {
          "number": {
            "value": 40,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color":{
            "value": props.color === 'red' ? '#FF0000' : '#000000'
          },
          "shape": {
            "type": ["circle", "star"],
            "stroke": {
              "width": 0,
              "color": "#000000"
            }
          },
          "polygon": {
            "nb_sides": 5
          },
          "opacity": {
            "value": 1,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 5,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "random": true,
            "speed": 5,
            "direction": "top",
            "out_mode": "out",
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "events": {
            "onhover": {
              "enable": false,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            }
          },
          "modes": {
            "bubble": {
              "distance": 250,
              "duration": 2,
              "size": 0,
              "opacity": 0
            },
            "repulse": {
              "distance": 400,
              "duration": 4
            }
          }
        }
        }
    return (

        <Particles className="particles" params={particlesOptions} />
    )
}


export default Particle;
