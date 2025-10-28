import { FaGithub, FaInstagram, FaTelegram, FaTwitter, FaLinkedin } from "react-icons/fa";
import useThemeStore from "../Store/themeStore";

export default function Footer() {
  const { darkMode } = useThemeStore();

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/yamneg96" },
    { icon: <FaInstagram />, url: "https://instagram.com/yourprofile" },
    { icon: <FaTelegram />, url: "https://t.me/user1name_123" },
    { icon: <FaTwitter />, url: "https://twitter.com/yourprofile" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/in/yourprofile" },
  ];

  return (
    <footer className={`mt-12 py-8 transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-primary text-black"}`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 space-y-4 md:space-y-0">
        <p className="text-center md:text-left">&copy; {new Date().getFullYear()} YN Portfolio. All rights reserved.</p>

        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-2xl">
          {socialLinks.map((link, idx) => (
            <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="scale-100 hover:scale-150 transition-all hover:text-secondary duration-300">
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
