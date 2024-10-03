"use client";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { useEffect, useState } from "react";

import { Login } from "./login";

export const NavBar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(JSON.stringify(localStorage.getItem("token")));
  }, []);

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">TDEE Calculator</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className=" flex gap-5">
          {token ? (
            <Button color="danger">Logout</Button>
          ) : (
            <Button color="primary" variant="flat" onClick={onOpen}>
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <Login isOpen={isOpen} onOpenChange={onOpenChange} />
    </Navbar>
  );
};
