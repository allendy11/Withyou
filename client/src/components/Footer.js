import React from 'react';
import '../css/Footer.css';
import githubIcon from '../images/github.png';
import LinkToGitHub from './LinkToGitHub';
const Footer = ({ landingOn }) => {
  const front = [
    { github: 'nick0726', name: '김남현' },
    { github: 'Melona0105', name: '박덕원' },
  ];
  const back = [
    { github: 'onniseonmi', name: '최선미' },
    { github: 'allendy11', name: '윤대희' },
  ];

  const footerStyle = {
    color: `${landingOn ? '#f2f0ec' : 'black'}`,
  };

  return (
    <div
      id='footer'
      style={{
        backgroundColor: `${landingOn ? 'transparent' : '#f2f0ec'}`,
        borderTop: `${landingOn ? 'transparent' : 'solid 1px lightgray'}`,
        textShadow: `${landingOn ? '1px 1px 5px #212121' : 'none'}`,
      }}
    >
      <div>
        <div id='footer-title'>
          <a
            href='https://github.com/codestates/Withyou'
            rel='noreferrer'
            target='_blank'
          >
            <span style={footerStyle}>Made by</span>
            <span style={footerStyle}>Withyou</span>
          </a>
        </div>
        <div className='footer-contact'>
          <div>
            <img id='githubIcon' src={githubIcon} alt='github'></img>
            <div id='githubTitle' style={footerStyle}>
              GITHUB
            </div>
          </div>
          <div className='footer-developer'>
            <div className='footer-row'>
              {front.map((el, idx) => (
                <LinkToGitHub
                  key={idx}
                  github={el.github}
                  name={el.name}
                  landingOn={landingOn}
                />
              ))}
            </div>
            <div className='footer-row'>
              {back.map((el, idx) => (
                <LinkToGitHub
                  key={idx}
                  github={el.github}
                  name={el.name}
                  landingOn={landingOn}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
