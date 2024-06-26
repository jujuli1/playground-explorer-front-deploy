import React from 'react';
import { Link } from 'react-router-dom';
import LogoHeader from '../Pictures/Logo';
import AnimatedUnderlineLink from '../Buttons/LinkBtn';

const Footer: React.FC = () => {
  return (
    <div>
      {/* Footer for desktop */}
      <footer className="mt-96 hidden w-full items-center justify-between bg-primary px-1 py-3 text-background md:flex md:gap-10 md:p-4 md:px-8 xl:px-10 ">
        <Link to="/" className="box-content flex flex-col items-center">
          <LogoHeader />
          <p>© 2024 - PlaygroundExplorer </p>
        </Link>

        <div>
          <ul className="flex flex-wrap justify-end gap-4 px-1">
            <li>
              <AnimatedUnderlineLink href="/cgu">CGU</AnimatedUnderlineLink>
            </li>
            <li>
              <AnimatedUnderlineLink href="/contact">
                Contact
              </AnimatedUnderlineLink>
            </li>
            <li>
              <AnimatedUnderlineLink href="/plan-du-site">
                Plan du site
              </AnimatedUnderlineLink>
            </li>
            <li>
              <AnimatedUnderlineLink href="/politique-de-confidentialite">
                Politique de confidentialité
              </AnimatedUnderlineLink>
            </li>
            <li>
              <AnimatedUnderlineLink href="/mentions-legales">
                Mentions légales
              </AnimatedUnderlineLink>
            </li>
            <li>
              <AnimatedUnderlineLink href="/faq">FAQ</AnimatedUnderlineLink>
            </li>
          </ul>
        </div>
      </footer>
      {/* Footer for mobile */}
      <footer className="w-full flex-col items-center justify-between bg-primary px-1 py-3 text-background md:hidden">
        <div>
          <ul className="grid grid-cols-2 justify-start gap-2 px-1">
            <li>
              <AnimatedUnderlineLink href="/cgu">CGU</AnimatedUnderlineLink>
            </li>
            <li className="text-right">
              <AnimatedUnderlineLink href="/faq">FAQ</AnimatedUnderlineLink>
            </li>
            <li>
              <AnimatedUnderlineLink href="/plan-du-site">
                Plan du site
              </AnimatedUnderlineLink>
            </li>
            <li className="text-right">
              <AnimatedUnderlineLink href="/contact">
                Contact
              </AnimatedUnderlineLink>
            </li>
            <li>
              <AnimatedUnderlineLink href="/politique-de-confidentialite">
                Confidentialité
              </AnimatedUnderlineLink>
            </li>
            <li className="text-right">
              <AnimatedUnderlineLink href="/mentions-legales">
                Mentions légales
              </AnimatedUnderlineLink>
            </li>
          </ul>
          <Link to="/" className="flex flex-col items-center pt-8">
            <LogoHeader />
            <p>© 2024 - PlaygroundExplorer </p>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
