import { useRef } from "react";
import SocialIcon from "./SocialIcon";
import { socialLinks, footerColumns } from "../data/portfolio";
import useGsapInView from "../lib/hooks/useGsapInView";

export default function Footer() {
  const footerRef = useRef(null);
  useGsapInView(footerRef, {
    from: { opacity: 0, y: 18 },
    to: { duration: 0.75, ease: "power3.out" },
  });

  return (
    <footer id="contact" ref={footerRef} className="section footer">
      <div className="section-header px-4">
        <h2 className="section-title">Other Projects</h2>
        <p className="section-subtitle">
          Links and resources outside the featured set.
        </p>
      </div>

      <div className="footer-text px-4">
        {footerColumns.map(({ id, heading, links }) => (
          <div key={id} className="footer-text-box">
            <h3 className="footer-heading">{heading}</h3>
            <ul className="footer-list">
              {links.map(({ label, href }) => (
                <li key={label} className="footer-list-item">
                  {href ? (
                    <a
                      className="inline-link"
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {label}
                    </a>
                  ) : (
                    label
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="section-header px-4 mt-12">
        <h2 className="section-title">Contact</h2>
      </div>
      <div className=" px-4 justify-around flex flex-wrap gap-8">
        <ul className="icons">
          {socialLinks.map((link) => (
            <SocialIcon key={link.id} link={link} />
          ))}
        </ul>
      </div>
    </footer>
  );
}
