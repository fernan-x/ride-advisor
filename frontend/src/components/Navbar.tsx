import { Link } from "@tanstack/react-router";
import { Calendar, Home, SettingsIcon } from "lucide-react";

export const Navbar = () => {
  const links = [
    {
      to: "/",
      label: "Accueil",
      icon: Home,
    },
    {
      to: "/forecast",
      label: "Prévisions",
      icon: Calendar,
    },
    {
      to: "/settings",
      label: "Configuration",
      icon: SettingsIcon,
    },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-2xl px-4 py-3 z-50">
      <div className="flex space-x-2">
        {links.map((link) => (
          <Link
            to={link.to}
            key={link.to}
            className="px-6 py-3 rounded-full transition-all text-gray-600 hover:bg-gray-100 [&.active]:bg-blue-600 [&.active]:text-white [&.active]:shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
