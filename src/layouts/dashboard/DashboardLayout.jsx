import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import taiyoLogo from "../../assets/images/Taiyo-logo.png";
import ChartsAndMaps from "../../views/ChartsAndMaps";
import ContactsPage from "../../views/ContactsPage";
import dashCollapseIco from "../../assets/icons/control.png";
import dashIco from "../../assets/icons/Chart_fill.png";
import inbIco from "../../assets/icons/Chat.png";
import accIco from "../../assets/icons/User.png";
import sechduleIco from "../../assets/icons/Calendar.png";
import searchIco from "../../assets/icons/Search.png";
import analyticsIco from "../../assets/icons/Chart.png";
import filesIco from "../../assets/icons/Folder.png";
import settingsIco from "../../assets/icons/Setting.png";

const DashboardLayout = () => {
  const location = useLocation();

  const [open, setOpen] = useState(true);

  const Menus = [
    { id: 1, title: "Dashboard", link: "/", img: dashIco },
    { id: 2, title: "Chart & Maps", link: "/chart-map", img: analyticsIco },
    { id: 3, title: "Inbox", link: "", img: inbIco },
    { id: 4, title: "Accounts", link: "", img: accIco, gap: true },
    { id: 5, title: "Schedule ", link: "", img: sechduleIco },
    { id: 6, title: "Search", link: "", img: searchIco },
    { id: 7, title: "Files ", link: "", img: filesIco, gap: true },
    { id: 8, title: "Setting", link: "", img: settingsIco },
  ];

  const headerNavItem = [
    { id: 9, label: "about us", link: "" },
    { id: 10, label: "home", link: "/" },
    { id: 11, label: "contact us", link: "" },
  ];

  return (
    <div>
      <>
        <div className="flex">
          <div
            className={`${
              open ? "md:w-1/6" : "w-1/7"
            } shadow-lg bg-dark-purple h-screen p-5 pt-8 relative duration-300`}
          >
            <img
              src={dashCollapseIco}
              className={`absolute cursor-pointer -right-4 top-6 w-9 border-dark-purple
              border-1 rounded-full  ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
            />

            <ul className="pt-6">
              {Menus.map((Menu, index) => (
                <Link to={Menu.link}>
                  <li
                    key={index}
                    className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4  ${
                      Menu.gap ? "mt-9" : "mt-2"
                    } ${index === 0 && "bg-light-white"} `}
                  >
                    <img src={Menu.img} />
                    <span
                      className={`${!open && "hidden"} ${
                        location.pathname === Menu.link
                          ? "text-[#F0564F]"
                          : "text-[#000000]"
                      } origin-left duration-200 text-[#000000] text-md font-bold hover:text-[#F0564F]`}
                    >
                      {Menu.title}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          {/* <div className="h-screen flex-1 p-7"> */}
          <div className="flex-1 h-screen overflow-y-auto">
            <header className="bg-white shadow-lg">
              <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                aria-label="Global"
              >
                <div className="hidden md:flex lg:flex-1">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">taiyo.ai</span>
                    <img className="h-8 w-auto" src={taiyoLogo} alt="taiyo" />
                  </a>
                </div>
                <div className="hidden md:flex md:gap-x-12">
                  {headerNavItem.map((item) => (
                    <Link
                      to={item.link}
                      className={`${
                        location.pathname === item.link
                          ? "text-[#F0564F]"
                          : "text-[#000000]"
                      } text-md font-semibold capitalize leading-6 hover:text-[#F0564F]`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="px-4 flex md:hidden justify-center">
                  {location.pathname === "/" && (
                    <h3 className="text-2xl font-[600]">Contact Page</h3>
                  )}
                  {location.pathname === "/chart-map" && (
                    <h3 className="text-2xl font-[600]">
                      Charts and Maps Page
                    </h3>
                  )}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                  <a
                    href="#"
                    className="py-2 px-4 rounded-lg text-md font-semibold leading-6 text-[#F0564F] hover:text-[#F0564F] border-2 border-[#F0564F] hover:text-[#ffffff] hover:bg-[#F0564F] hover:border-[#F0564F]"
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </nav>
            </header>
            {location.pathname === "/" && <ContactsPage />}
            {location.pathname === "/chart-map" && <ChartsAndMaps />}
          </div>
        </div>
      </>
    </div>
  );
};

export default DashboardLayout;
