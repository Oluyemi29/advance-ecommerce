"use client";
import React, { useContext, useEffect, useState } from "react";
import queryString from "query-string";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Badge,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import { CartContext } from "./Provider";
import { FaUserCircle } from "react-icons/fa";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { getUserDetails } from "@/Action/PaymentIntent";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type UserProps = {
  name: string | null;
  id: string;
  email: string | null;
  image: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

const Header = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const { isAuthenticated } = useKindeBrowserClient();
  const [presentUser, setPresentUser] = useState<UserProps>({
    name: "",
    id: "",
    email: "",
    image: "",
    role: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const Cart = useContext(CartContext);

  useEffect(() => {
    const getDetails = async () => {
      const userInfo = await getUserDetails();
      if (userInfo) {
        setPresentUser(userInfo);
      }
    };

    getDetails();
  }, []);

  // useEffect(() => {
  //   if (search === "") {
  //     router.push("/");
  //   }
  // }, [router, search]);

  const handleSearch = () => {
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          searchTerm: search,
        },
      },
      {
        skipNull: true,
      }
    );
    router.push(url);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.5, ease: "easeIn" }}
      className=""
    >
      <Navbar maxWidth="full" className="shadow-md">
        <NavbarBrand className="cursor-pointer">
          <Link href={"/"} className="flex items-center gap-3">
            <Image
              src={"/e-logo.jpg"}
              alt="logo"
              width={60}
              height={60}
              className="rounded-md mr-3"
              priority
              quality={95}
            />
            <p className="font-bold text-inherit">Oluyemi</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem className="flex">
            <Input
              placeholder="Search"
              startContent={<FaSearch />}
              type="text"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value);
              }}
            />
            <Button
              onPress={() => handleSearch()}
              className="bg-primary text-white"
            >
              Search
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="flex gap-3">
            <ThemeSwitcher />
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                {isAuthenticated ? (
                  <FaUserCircle className="text-primary text-3xl cursor-pointer" />
                ) : (
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                )}
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  hidden={isAuthenticated}
                  className="h-14 gap-2"
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{presentUser?.email}</p>
                </DropdownItem>
                {isAuthenticated ? (
                  <>
                    <DropdownItem
                      key="login"
                      color="danger"
                      className="text-white bg-red-600 hover:bg-red-600"
                    >
                      <LogoutLink>Log out</LogoutLink>
                    </DropdownItem>
                    {presentUser?.role === "ADMIN" && (
                      <DropdownItem key="admin">
                        <Link href={"/admin"}>Admin</Link>
                      </DropdownItem>
                    )}
                    {presentUser?.role === "ADMIN" ? (
                      <>
                        <DropdownItem key="AdminOrder">
                          <Link href={"/admin/manage-order"}>Order</Link>
                        </DropdownItem>
                      </>
                    ) : (
                      <>
                        <DropdownItem key="Order">
                          <Link href={"/order"}>Order</Link>
                        </DropdownItem>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <DropdownItem key="login">
                      <LoginLink postLoginRedirectURL="/api/creation">
                        Sign in
                      </LoginLink>
                    </DropdownItem>
                    <DropdownItem key="logout">
                      <RegisterLink postLoginRedirectURL="/api/creation">
                        Sign up
                      </RegisterLink>
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem className="text-primary">
            <Link href={"/cart"}>
              <Badge
                color="primary"
                content={Cart?.cart?.length ?? 0}
                placement="top-right"
                size="lg"
              >
                <IoCartOutline color="primary" size={30} />
              </Badge>
            </Link>
          </NavbarItem>
          <NavbarContent className="sm:hidden" justify="end">
            <NavbarMenuToggle />
          </NavbarContent>
        </NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              placeholder="Search"
              startContent={<FaSearch />}
              type="text"
            />
            <Button
              onPress={() => handleSearch()}
              className="bg-primary text-white"
            >
              Search
            </Button>
          </NavbarMenuItem>
          {isAuthenticated ? (
            <>
              {presentUser.role === "ADMIN" ? (
                <>
                  <Link href={"/admin/manage-order"}>
                    <NavbarMenuItem>Admin Order</NavbarMenuItem>
                  </Link>
                </>
              ) : (
                <>
                  <Link href={"/order"}>
                    <NavbarMenuItem>My Order</NavbarMenuItem>
                  </Link>
                </>
              )}
              <div className="bg-red-600 px-2 rounded-md w-full">
                <NavbarMenuItem>
                  <LogoutLink>Log Out</LogoutLink>
                </NavbarMenuItem>
              </div>
            </>
          ) : (
            <>
              <NavbarMenuItem>
                <LoginLink postLoginRedirectURL="/api/creation">
                  Sign in
                </LoginLink>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <RegisterLink postLoginRedirectURL="/api/creation">
                  Sign up
                </RegisterLink>
              </NavbarMenuItem>
            </>
          )}
        </NavbarMenu>
      </Navbar>
    </motion.div>
  );
};

export default Header;
