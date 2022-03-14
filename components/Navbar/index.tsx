import { Component, useState } from "react";
import Link from "next/link";

import ExternalLink from "../ExternalLink";
import GithubIcon from "../Icon/github";
import LinkedinIcon from "../Icon/linkedin";

const tabs = [
  { name: "文章清單", link: "/posts" },
  { name: "關於我", link: "/cv" },
];

const socialMedias = [
  { name: "GithubIcon", link: "https://github.com/wlunareve" },
  {
    name: "fa-linkedin-in",
    link: "https://www.linkedin.com/in/%E6%98%8E%E8%AC%99-%E5%AE%8B-982b30172/",
  },
  {
    name: "fa-instagram",
    link: "https://www.instagram.com/sung35680/?hl=zh-tw",
  },
];

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const toggleMobileTab = () => setIsMobile(!isMobile);

  return (
    <>
      <nav className="nav fixed flex justify-center w-screen min-h-[3.25rem] border-b-2 bg-white z-10">
        <div className="nav__container flex items-center justify-between w-[80vw] max-w-[1680px]">
          <Link href="/" passHref>
            <span className="text-2xl font-bold cursor-pointer">ToD</span>
          </Link>
          <div className="tab flex items-center gap-4 flex-1 mx-4 -my-0 text-xl">
            <div
              className="tab__btn hidden cursor-none"
              onClick={toggleMobileTab}
            >
              <span className="tab__btn-icon" />
              <span className="tab__btn-icon" />
              <span className="tab__btn-icon" />
            </div>
            {!isMobile && (
              <div className="tab__items flex gap-4">
                {tabs.map(({ name, link }) => (
                  <Link key={name} href={link} passHref>
                    <a className="tab__item" cursor-pointer>
                      {name}
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="nav__social-media flex items-cente gap-4">
            <ExternalLink href="https://github.com/wlunareve">
              <GithubIcon />
            </ExternalLink>
            <ExternalLink href="https://www.linkedin.com/in/%E6%98%8E%E8%AC%99-%E5%AE%8B-982b30172/">
              <LinkedinIcon />
            </ExternalLink>
          </div>
        </div>
        {isMobile && (
          <div
            className={`mobile-tab__items relative -top-full grid max-h-0 grid-cols-1 opacity-0 ${
              isMobile ? "mobile-tab__items--active" : null
            }`}
          >
            {tabs.map(({ name, link }) => (
              <Link key={name} href={link} passHref>
                <span
                  className={`mobile-tab__item px-1 py-2 ${
                    isMobile
                      ? "mobile-tab__item--active top-0 max-h-28 opacity-100"
                      : null
                  }`}
                >
                  {name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
