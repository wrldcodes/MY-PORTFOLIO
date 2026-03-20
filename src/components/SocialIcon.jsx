/**
 * Reusable social icon link using react-icons.
 */
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaXTwitter,
} from "react-icons/fa6";

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
  phone: FaPhone,
  x: FaXTwitter,
};

export default function SocialIcon({ link }) {
  const { id, title, href } = link;
  const isDirectAction = href.startsWith("mailto") || href.startsWith("tel");
  const Icon = iconMap[id];

  if (!Icon) return null;

  return (
    <li>
      <a
        href={href}
        target={isDirectAction ? undefined : "_blank"}
        rel="noreferrer"
        aria-label={title}
        title={title}
      >
        <Icon className="social" aria-hidden="true" />
      </a>
    </li>
  );
}
